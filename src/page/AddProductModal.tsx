import { SubmitHandler, useForm } from "react-hook-form";

import { toast } from "sonner";
import { InputDefault } from "../componenets/ui/Input";
import { SelectDefault } from "../componenets/ui/Select";
import { useAddProductMutation } from "../redux/features/products/smartapi";
import { useNavigate } from "react-router-dom";
const image_upload_token = import.meta.env.VITE_image_upload_token;
type Inputs = {
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
  productImage: string;
};
export default function AddProductModal() {
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;
  const [addProduct] = useAddProductMutation();
  const { register, handleSubmit, control, reset } = useForm<Inputs>();
  const router =useNavigate()
  const onsubmit: SubmitHandler<Inputs> = async (data) => {
    const toastId = toast.loading("Please wait...");
    try {
      const formData = new FormData();
      formData.append("image", data.productImage[0]);
      fetch(image_upload_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(async (profileResponse) => {
          if (profileResponse.success) {
            const productImageURL = profileResponse.data.display_url;

            const price = Number(data.price);
            const quantity = Number(data.quantity);

            const productData = {
              ...data,
              price,
              quantity,
              productImage: productImageURL,
            };

            const res = await addProduct(productData);
            console.log(res);
            if (res?.error?.status === 401) {
              toast.error(res?.error?.data?.message);
            } else if (res.error) {
              throw new Error("Already added product");
            }

            toast.success("Product added successfully!", {
              id: toastId,
              duration: 2000,
            });
            router("/all-products")
            reset();
          } else {
            throw new Error("Provided all parameters");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message || `something went wrong`, {
            id: toastId,
            duration: 2000,
          });
        });
    } catch (error) {
      toast.error(`something went wrong`, { id: toastId, duration: 2000 });
    }
  };
  return (
    <section className="text-gray-600 body-font relative w-full">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Add Product
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="lg:w-1/2 md:w-2/3 mx-auto"
        >
          <div className="flex flex-wrap  -m-2 -mr-8">
            <div className="p-2 w-1/2">
              <div className="relative">
                <InputDefault
                  register={register}
                  type={"file"}
                  label={"Phone Img"}
                  name={"productImage"}
                  disabled={false}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <InputDefault
                  register={register}
                  type={"text"}
                  label={"Phone name"}
                  name={"name"}
                  disabled={false}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <SelectDefault
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
                label={"Select Brand"}
                name={"brand"}
                control={control}
                disabled={false}
              />
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <InputDefault
                  register={register}
                  type={"text"}
                  label={"Phone Model"}
                  name={"model"}
                  disabled={false}
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <InputDefault
                  register={register}
                  type={"number"}
                  label={"Phone Price"}
                  name={"price"}
                  disabled={false}
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <InputDefault
                  register={register}
                  type={"number"}
                  label={"Phone Quantity"}
                  name={"quantity"}
                  disabled={false}
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <SelectDefault
                  data={["Android", "IOS"]}
                  label={"Select Operating System"}
                  name={"operatingSystem"}
                  control={control}
                  disabled={false}
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <SelectDefault
                  data={[
                    "16GB",
                    "32GB",
                    "64GB",
                    "128GB",
                    "256GB",
                    "512GB",
                    "1TB",
                  ]}
                  label={"Select Storage Capacity"}
                  name={"storageCapacity"}
                  control={control}
                  disabled={false}
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <SelectDefault
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
                  label={"Select Screen Size"}
                  name={"screenSize"}
                  control={control}
                  disabled={false}
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="">
                <input type="date" {...register("releaseDate")} />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <SelectDefault
                  data={[
                    "1000mAh",
                    "2000mAh",
                    "3000mAh",
                    "4000mAh",
                    "5000mAh",
                    "6000mAh",
                    "7000mAh",
                  ]}
                  label={"Select Battery"}
                  name={"battery"}
                  control={control}
                  disabled={false}
                />
              </div>
            </div>
            <div className="p-2  w-1/2">
              <div className="relative">
                <SelectDefault
                  data={[
                    "8MP",
                    "12MP",
                    "16MP",
                    "20MP",
                    "24MP",
                    "32MP",
                    "48MP",
                    "64MP",
                    "108MP",
                  ]}
                  label={"Select Camera"}
                  name={"camera"}
                  control={control}
                  disabled={false}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Add Smart Phone
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
