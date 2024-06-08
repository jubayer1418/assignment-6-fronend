import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../redux/features/products/smartapi";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { InputDefault } from "../componenets/ui/Input";
import { SelectDefault } from "../componenets/ui/Select";
import getCurrentDateInput from "../utils/getDate";
const image_upload_token = import.meta.env.VITE_image_upload_token;
export default function Update({ id }: { id: string }) {
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const { data: productData } = useGetSingleProductQuery(id);

  const [updateProduct] = useUpdateProductMutation();
  const handleOpen = () => setOpen(!open);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      if (data.productImage[0]) {
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
              const productDataa = {
                ...data,
                price,
                quantity,
                productImage: productImageURL,
              };

              const res = await updateProduct({ productDataa, id });

              if (res.error) {
                throw new Error("Provided all parameters");
              }

              toast.success("Product added successfully!", {
                id: toastId,
                duration: 2000,
              });
              handleOpen();
            } else {
              throw new Error("Provided all parameters");
            }
          })
          .catch((err) => {
            toast.error(err.message || `something went wrong`, {
              id: toastId,
              duration: 2000,
            });
          });
      } else {
        const price = Number(data.price);
        const quantity = Number(data.quantity);
        const productDataa = {
          ...data,
          price,
          quantity,
          productImage: productData?.data?.productImage,
        };

        const res = await updateProduct({ productDataa, id });

        if (res.error) {
          throw new Error("Provided all parameters");
        }

        toast.success("Product added successfully!", {
          id: toastId,
          duration: 2000,
        });
        handleOpen();
      }
    } catch (error) {
      toast.error(`something went wrong`, { id: toastId, duration: 2000 });
    }
  };
  return (
    <>
      <Button
        placeholder={""}
        variant="outlined"
        color="purple"
        className="py-2 px-3"
        onClick={handleOpen}
      >
        Update
      </Button>
      <Dialog placeholder={""} open={open} handler={handleOpen}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center">
              <DialogHeader placeholder={""}>Update Product</DialogHeader>
              <div
                onClick={handleOpen}
                className="me-4 cursor-pointer border-2 border-red-400 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <DialogBody placeholder={""}>
              <div className="flex flex-wrap -m-2 -mr-4">
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
                      defaultValue={productData?.data?.name}
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
                    defaultValue={productData?.data?.brand}
                  />
                </div>
                <div className="p-2  w-1/2">
                  <div className="relative">
                    <InputDefault
                      register={register}
                      type={"text"}
                      label={"Phone Model"}
                      name={"model"}
                      defaultValue={productData?.data?.model}
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
                      defaultValue={productData?.data?.price}
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
                      defaultValue={productData?.data?.quantity}
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
                      defaultValue={productData?.data?.operatingSystem}
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
                      defaultValue={productData?.data?.storageCapacity}
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
                      defaultValue={productData?.data?.screenSize}
                      disabled={false}
                    />
                  </div>
                </div>
                <div className="p-2  w-1/2">
                  <div className="relative">
                    <InputDefault
                      register={register}
                      type={"Date"}
                      label={"Phone Release Date"}
                      name={"releaseDate"}
                      disabled={false}
                      defaultValue={getCurrentDateInput(
                        productData?.data?.releaseDate
                      )}
                    />
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
                      defaultValue={productData?.data?.battery}
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
                      defaultValue={productData?.data?.camera}
                    />
                  </div>
                </div>
              </div>
            </DialogBody>
            <DialogFooter placeholder={""}>
              <Button
                type="submit"
                placeholder={""}
                variant="gradient"
                color="green"
              >
                <span>Update</span>
              </Button>
            </DialogFooter>
          </form>
        </div>
      </Dialog>
    </>
  );
}
