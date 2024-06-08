import jsPDF from "jspdf";
const genaratePdf = (data) => {
  console.log(data);
  const doc = new jsPDF();
  doc.text(`Smartphone invoices: ${data?.name}`, 30, 10);
  doc.text(`Product Name : ${data?.name}`, 10, 20);
  doc.text(`Quantity : ${data?.quantity}`, 10, 30);
  doc.text(`Product Sale Date : ${data?.saleDate}`, 10, 40);
  doc.text(`Buyer Name : ${data?.buyerName}`, 10, 50);

  doc.save("invoices.pdf");
};
export default genaratePdf;
