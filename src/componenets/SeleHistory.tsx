import { useState } from "react";
import { useGetHistoryQuery } from "../redux/features/products/smartapi";

export default function SeleHistory() {
  const [filter, setFilter] = useState("");
  console.log(filter)
  const { data } = useGetHistoryQuery(filter);
console.log(data)
  return (
    <div className="overflow-x-auto">
      <div className="w-72">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="block appearance-none w-60 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
        >
          <option value="" disabled>
            Show Data by Filter
          </option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Product Name</th>
            <th>Buyer Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((p, i) => (
            <tr key={p._id}>
              <th>{i + 1}</th>
              <td>{p?.productId?.name}</td>
              <td>{p?.buyerName}</td>
              <td>{p?.productId?.price}</td>
              <td>{p?.quantity}</td>
              <td>{p?.productId?.price * p?.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
