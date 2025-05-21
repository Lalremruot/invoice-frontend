import axios from "axios";
import { useEffect, useState } from "react";

const BASE_API = import.meta.env.VITE_BASE_URL;

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState({});

  useEffect(() => {
    getInvoice();
  }, []);

  const getInvoice = async () => {
    try {
      const response = await axios.get(`${BASE_API}/api/invoice`);
      // const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      // const latest = sorted[0];
      setInvoiceData(response?.data);
      console.log("Invoices fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  return (
    <div className="w-full md:max-w-4xl md:mx-auto px-4 py-10">
      <div className="flex w-full justify-between">
        <div>
          <h1 className="text-xl font-mono md:text-6xl font-extrabold text-gray-800 leading-tight">
            INVOICE
          </h1>
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm font-mono md:text-xl text-gray-600">
            Invoice no.- <br />
            {invoiceData.invoiceNumber}
          </p>
          <p className="mt-4 font-mono text-sm md:text-xl text-gray-600">
            Date:{" "}
            {invoiceData?.date &&
              new Date(invoiceData.date)
                .toLocaleDateString("en-GB")
                .replaceAll("/", "-")}
          </p>
        </div>
      </div>
      <div className="flex justify-between w-full pt-8">
        <div className="py-3">
          <h2 className="font-medium font-mono text-gray-500 pb-4 flex justify-start">
            FROM
          </h2>
          <p className="font-semibold font-mono text-lg text-gray-800 pb-2">
            {invoiceData.shopName}
          </p>
          <p className="font-normal font-mono text-gray-700 pb-2">
            {invoiceData.shopAddress}
          </p>
        </div>
        <div className="py-3">
          <h2 className="font-medium font-mono text-gray-500 pb-4 flex justify-end">
            BILL TO
          </h2>
          <p className="font-semibold font-mono text-lg text-gray-800 pb-2">
            {invoiceData.customerName}
          </p>
          <p className="font-normal font-mono text-gray-700 pb-2">
            {invoiceData.customerPhone}
          </p>
        </div>
      </div>

      <div className="pt-5">
        <div className="overflow-x-hidden">
          {" "}
          {/* prevent horizontal scroll */}
          <table className="min-w-full table-auto border-gray-300 md:table-fixed">
            <thead>
              <tr>
                <th className="border-b text-md font-mono border-gray-300 font-medium py-4 px-2 text-start w-20">
                  SL NO.
                </th>
                <th className="border-b text-md font-mono border-gray-300 font-medium py-4 px-2 text-start max-w-[150px] break-words whitespace-normal">
                  DESCRIPTION
                </th>
                <th className="border-b text-md font-mono border-gray-300 font-medium py-4 px-2 text-start w-20">
                  QUANTITY
                </th>
                <th className="border-b text-md font-mono border-gray-300 font-medium py-4 px-2 text-start w-20">
                  PRICE
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items &&
                invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b text-sm font-mono border-gray-300 py-4 px-2">
                      {index + 1}
                    </td>
                    <td className="border-b text-sm font-mono border-gray-300 py-4 px-2 max-w-[150px] break-words whitespace-normal">
                      {item.itemName}
                    </td>
                    <td className="border-b text-sm font-mono border-gray-300 py-4 px-2">
                      {item.quantity}
                    </td>
                    <td className="border-b text-sm font-mono border-gray-300 py-4 px-2">
                      {item.price}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end w-full pt-8">
          <div className="flex w-full items-center flex-col justify-between">
            <div className="py-3 flex items-center gap-20 justify-between w-full">
              <h2 className="font-normal text-gray-700 font-mono">
                Material Cost
              </h2>
              <p>₹{invoiceData.materialCost}</p>
            </div>
            <div className="py-3 flex items-center gap-20 justify-between w-full">
              <h2 className="font-normal text-gray-700 font-mono">
                Labour Cost
              </h2>
              <p>₹{invoiceData.labourCost}</p>
            </div>
            <div className="py-3 flex items-center gap-20 justify-between w-full">
              <h2 className="font-normal text-gray-700 font-mono">Subtotal</h2>
              <p>₹{invoiceData.totalAmount}</p>
            </div>
            {/* <div className="py-3 flex items-center gap-20 justify-between w-full border-b border-gray-300">
              <h2 className="font-normal text-gray-700 font-mono">Tax(%)</h2>
              <p>₹{invoiceData.tax}</p>
            </div> */}
            <div className="py-3 flex items-center gap-20 justify-between w-full border-b border-gray-300">
              <h2 className="font-semibold text-gray-800 font-mono">Total</h2>
              <p className="font-semibold text-gray-800 font-mono">
                ₹
                {(parseFloat(invoiceData.totalAmount) || 0) +
                  (parseFloat(invoiceData.materialCost) || 0) +
                  (parseFloat(invoiceData.labourCost) || 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-center justify-center w-full pt-8 border-b border-gray-300 py-2">
          {/* <h2 className="font-semibold font-mono">Terms</h2> */}
          <p className="font-mono">Thank you for your business</p>
        </div>
        <div className="flex justify-center w-full py-6">
          <button
            onClick={() => window.print()}
            className="print-hidden bg-violet-600 font-mono hover:bg-violet-700 w-full text-center transition text-white py-2 px-6 rounded-xl gap-2 text-lg shadow-lg"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
