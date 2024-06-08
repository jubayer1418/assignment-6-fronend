import { SubmitHandler, useForm } from "react-hook-form";
type Inputs = {
  productId: string;
  quantity: number;
  buyerName: string;
  dateOfSale: Date;
};

export default function sellModel() {
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          {...register("quantity")}
          placeholder="Quantity"
          className="input mb-4 input-bordered input-success w-full max-w-xs"
        />
        <input
          type="text"
          {...register("buyerName")}
          placeholder="Buyer Name"
          className="input input-bordered input-success w-full max-w-xs"
        />
        <input
          type="date"
          {...register("dateOfSale")}
          className="mt-4 input input-bordered input-success w-full max-w-xs"
        />
        <br />
        <button type="submit" className="btn btn-primary mt-4">
          Sell
        </button>
      </form>
    </div>
  );
}
