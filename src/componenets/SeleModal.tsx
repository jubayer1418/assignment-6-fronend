import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSellProductMutation } from "../redux/features/products/smartapi";
import genaratePdf from "../utils/genaratePdf";
import convertDateToISO from "../utils/date";

const SalesModal = ({ id, name }: { id: string; name: string }) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const handleOpen = () => setOpen(!open);
  const [sellProduct] = useSellProductMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait...");

    try {
      const productQuantity = Number(data.quantity);
      const { productId, buyerName, saleDate } = data;
      const sellData = {
        productId,
        saleDate: convertDateToISO(saleDate),
        buyerName,
        quantity: productQuantity,
      };
      if (!buyerName || !productQuantity) {
        toast.error("Please provide input value", {
          id: toastId,
          duration: 2000,
        });
      }
      setData(sellData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await sellProduct(sellData);

      if (res?.error) {
        toast.error(`${data.quantity} is more than the product quantity`, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Product sell successfully!", {
          id: toastId,
          duration: 2000,
        });

        setModal(true);

        reset();
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };
  const handlePdf = () => {
    genaratePdf({ ...data, name });
    setModal(false);
    handleOpen();
  };
  return (
    <>
      <Button
        placeholder={""}
        variant="filled"
        color="orange"
        className="py-2 px-3"
        onClick={handleOpen}
      >
        Sell
      </Button>
      <Dialog
        placeholder={""}
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card placeholder={""} className="mx-auto w-full max-w-[24rem]">
            <CardBody placeholder={""} className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Typography placeholder={""} variant="h4" color="blue-gray">
                  Sell The Product
                </Typography>
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

              <Typography placeholder={""} className="-mb-2" variant="h6">
                Quantity
              </Typography>
              <Input
                {...register("quantity")}
                type="number"
                crossOrigin={""}
                placeholder={""}
                label="Quantity"
                size="lg"
              />
              <Typography placeholder={""} className="-mb-2" variant="h6">
                Buyer Name
              </Typography>
              <Input
                {...register("buyerName")}
                crossOrigin={""}
                placeholder={""}
                label="Buyer Name"
                size="lg"
              />
              <Typography placeholder={""} className="-mb-2" variant="h6">
                Date of Sell
              </Typography>
              <input
                {...register("saleDate")}
                placeholder={""}
                type="date"
                className="bg-blue-gray-200"
              />
              <div className="hidden">
                <Input
                  {...register("productId")}
                  defaultValue={id}
                  type="text"
                  crossOrigin={""}
                  placeholder={""}
                  label="id"
                  size="lg"
                />
              </div>
              {modal && (
                <Button
                  onClick={() => handlePdf()}
                  placeholder={""}
                  color="red"
                  variant="gradient"
                  fullWidth
                >
                  download invoice
                </Button>
              )}
              <div className="-ml-2.5 -mt-3"></div>
            </CardBody>
            <CardFooter placeholder={""} className="pt-0">
              <Button
                type="submit"
                placeholder={""}
                color="green"
                variant="gradient"
                fullWidth
              >
                Sell Product
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
};

export default SalesModal;
