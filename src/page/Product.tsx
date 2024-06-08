import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CardHeader, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Swal from "sweetalert2";
import ProductRow from "../componenets/ProductRow";
import { SelectSearch } from "../componenets/ui/Select";
import {
  useAllDeleteProductMutation,
  useGetProductQuery,
} from "../redux/features/products/smartapi";

export default function Product() {
  const [brand, setBrand] = useState("");
  const [storageCapacity, setStorageCapacity] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [screenSize, setScreenSize] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page] = useState(1);
  const [productsId, setProductsId] = useState<string[]>([]);
  const [deletedAll] = useAllDeleteProductMutation();
  const query = {
    name,
    brand,
    operatingSystem,
    storageCapacity,
    screenSize,
    minPrice,
    maxPrice,
    searchTerm,
    page,
    limit: 35,
  };
  const { data } = useGetProductQuery(query);

  const handleCheckboxClick = (id: string) => {
    if (productsId) {
      const index = productsId.indexOf(id);

      if (index === -1) {
        setProductsId([...productsId, id]);
      } else {
        const newProductsId = [...productsId];
        newProductsId.splice(index, 1);
        setProductsId(newProductsId);
      }
    }
  };
  const handleDeleteMany = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deletedAll(productsId);

        if (res.error.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.error.data.message,
          });
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div>
      <div>
        <CardHeader
          placeholder={""}
          floated={false}
          shadow={false}
          className="rounded-none p-4  overflow-visible"
        >
          <div className="mb-6 mt-4 flex flex-wrap items-center justify-between gap-8">
            <div className="">
              <SelectSearch
                data={[
                  "Apple",
                  "Samsung",
                  "Huawei",
                  "Xiaomi",
                  "Oppo",
                  "Vivo",
                  "Lenovo",
                  "LG",
                  "Google",
                  "OnePlus",
                ]}
                setBrand={setBrand}
                label={"Filter by Brand"}
                name={"brand"}
                brand={brand}
                disabled={false}
              />
            </div>
            <div className="">
              <SelectSearch
                data={[
                  "4 inches",
                  "4.7 inches",
                  "5 inches",
                  "5.5 inches",
                  "6 inches",
                  "6.4 inches",
                  "6.7 inches",
                  "6.9 inches",
                ]}
                setBrand={setScreenSize}
                label={"Filter by Screen Size"}
                name={"screenSize"}
                brand={screenSize}
                disabled={false}
              />
            </div>
            <div className="">
              <SelectSearch
                data={["Android", "IOS"]}
                setBrand={setOperatingSystem}
                label={"Filter by Operating System"}
                name={"operatingSystem"}
                brand={operatingSystem}
                disabled={false}
              />
            </div>
            <div className="">
              <SelectSearch
                data={[
                  "16GB",
                  "32GB",
                  "64GB",
                  "128GB",
                  "256GB",
                  "512GB",
                  "1TB",
                ]}
                setBrand={setStorageCapacity}
                label={"Filter by Storage Capacity"}
                name={"storageCapacity"}
                brand={operatingSystem}
                disabled={false}
              />
            </div>

            <div className="flex gap-2">
              <input
                onChange={(e) => setMinPrice(e.target.value)}
                type="number"
                className="border border-gray-400 hover:border-gray-500 px-2 py-2 rounded focus:outline-none focus:shadow-outline w-40 text-sm"
                placeholder="Min Price"
              />
              <input
                onChange={(e) => setMaxPrice(e.target.value)}
                type="number"
                className="border border-gray-400 hover:border-gray-500 px-2 py-2 rounded focus:outline-none focus:shadow-outline w-40 text-sm"
                placeholder="Max Price"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <Typography placeholder={""} variant="h4" color="blue-gray">
                All Products
              </Typography>
            </div>
            <div className="w-full md:w-96 mb-4">
              <Input
                crossOrigin={""}
                onChange={(e) => setSearchTerm(e.target.value)}
                label="Search Product"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <button
                  disabled={!productsId[0]}
                  onClick={handleDeleteMany}
                  className="btn btn-warning"
                >
                  Deleted All
                </button>
              </th>
              <th></th>
              <th>Name</th>
              <th>Model</th>
              <th>Brand</th>

              <th>Operating System</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sell</th>
              <th>Update</th>
              <th>Duplicate && Edit</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* row 1 */}
          <ProductRow handleCheckboxClick={handleCheckboxClick} data={data} />
        </table>
      </div>
    </div>
  );
}
