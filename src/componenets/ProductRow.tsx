import { useDeleteProductMutation } from "../redux/features/products/smartapi";

import Swal from "sweetalert2";

import EditDublicate from "../page/EditDublicate";
import Update from "../page/UpdateProduct";
import SalesModal from "./SeleModal";
export type TSmartphone = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  releaseDate: Date;
  brand: string;
  model: string;
  operatingSystem: string;
  storageCapacity: string;
  screenSize: string;
  camera: string;
  battery: string;
};

export default function ProductRow({ data, handleCheckboxClick }) {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
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
        const res = await deleteProduct(id);
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
    <tbody>
      {data?.data?.map((p) => (
        <tr key={p.name}>
          <th>
            <label>
              <input
                type="checkbox"
                onClick={() => handleCheckboxClick(p._id)}
                className="checkbox"
              />
            </label>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-14 h-14">
                  <img
                    src={p.productImage}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
            </div>
          </td>
          <td className="font-bold">{p.name}</td>
          <td>{p.model}</td>
          <td>{p.brand}</td>
          <td>{p.operatingSystem}</td>
          <td>{p.price}</td>
          <td>{p.quantity}</td>
          <td>
            <SalesModal name={p.name} id={p._id}></SalesModal>
          </td>
          <td>
            <Update id={p._id}></Update>
          </td>
          <td>
            <EditDublicate id={p._id}></EditDublicate>
          </td>
          <th>
            <button
              onClick={() => handleDelete(p._id)}
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          </th>
        </tr>
      ))}
    </tbody>
  );
}
