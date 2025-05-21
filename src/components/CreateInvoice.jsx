import axios from "axios";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const BASE_API = import.meta.env.VITE_BASE_URL;

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    contactNumber: "",
    shopAddress: "",
    customerName: "",
    customerPhone: "",
    items: [
      {
        itemName: "",
        quantity: "",
        price: "",
      },
    ],
    tax: "",
    totalAmount: 0,
    due: "",
  });

  const resetForm = () => {
  setFormData({
    shopName: "",
    contactNumber: "",
    shopAddress: "",
    customerName: "",
    customerPhone: "",
    items: [
      {
        itemName: "",
        quantity: "",
        price: "",
      },
    ],
    tax: "",
    totalAmount: 0,
    due: "",
  });
};


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    // Update formData and recalculate totalAmount
    const updatedFormData = { ...formData, items: newItems };
    updatedFormData.totalAmount = calculateTotal(newItems);
    setFormData(updatedFormData);
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      // const tax = parseFloat(item.tax) || 0;
      return total + price * quantity;
    }, 0);
  };

  const addItem = () => {
    const newItems = [
      ...formData.items,
      { itemName: "", quantity: "", price: "" },
    ];
    setFormData({
      ...formData,
      items: newItems,
      totalAmount: calculateTotal(newItems),
    });
  };

  
const handleSubmit = async (e) => {
  setLoading(true);
  e.preventDefault();
  try {
    const response = await axios.post(`${BASE_API}/api/invoice`, formData);
    console.log("Invoice created successfully:", response.data);
resetForm();
    if (response) {
      toast.success("Invoice created successfully", { autoClose: 1200 });
      setTimeout(() => {
        navigate("/invoice-page"); // ✅ pass data here
      }, 2000);
    }
  } catch (error) {
    console.error("Error creating invoice:", error);
    alert("Error creating invoice");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gray-100 flex items-center justify-center px-3 py-5">
      <div className="max-w-5xl w-full bg-white p-4">
        <h2 className="pb-14 text-xl font-medium text-gray-700 text-center">
          Please provide your details below to receive your invoice.
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {/* Shop Info */}
          <div className="flex flex-col gap-1">
            <label>Enter Business/Shop Name</label>
            <input
              type="text"
              value={formData.shopName}
              onChange={(e) =>
                setFormData({ ...formData, shopName: e.target.value })
              }
              className="border outline-none focus:border-violet-600 border-gray-300 rounded-md p-1.5 w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Contact Number</label>
            <input
            inputMode="numeric"
              type="text"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              className="border outline-none focus:border-violet-600 border-gray-300 rounded-md p-1.5 w-full"
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label>Shop Address</label>
            <input
              type="text"
              value={formData.shopAddress}
              onChange={(e) =>
                setFormData({ ...formData, shopAddress: e.target.value })
              }
              className="border outline-none focus:border-violet-600 border-gray-300 rounded-md p-1.5 w-full"
            />
          </div>

          {/* Customer Info */}
          <div className="flex flex-col gap-1">
            <label>Customer Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              className="border outline-none focus:border-violet-600 border-gray-300 rounded-md p-1.5 w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>
              Customer Phone no.{" "}
              <span className="text-red-500 italic text-sm">(optional)</span>
            </label>
            <input
              inputMode="numeric"
              type="text"
              value={formData.customerPhone}
              onChange={(e) =>
                setFormData({ ...formData, customerPhone: e.target.value })
              }
              className="border outline-none focus:border-violet-600 border-gray-300 rounded-md p-1.5 w-full"
            />
          </div>

          {/* Items */}
          <div className="md:col-span-2">
            <label className="block mb-2">Enter Product name/Description</label>
            {formData.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
              >
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Product name / description"
                    value={item.itemName}
                    onChange={(e) =>
                      handleItemChange(index, "itemName", e.target.value)
                    }
                    className="border outline-none focus:border-violet-600 border-gray-300 rounded-md p-1.5"
                  />
                  <input
                  inputMode="numeric"
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className="border outline-none focus:border-violet-600 border-gray-300 rounded-md p-1.5"
                  />
                  <input
                  inputMode="numeric"
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                    className="border outline-none focus:border-violet-600 border-gray-300 rounded-md p-1.5"
                  />
                </div>
                <div className="flex w-full justify-end items-end">
                  <button
                    type="button"
                    onClick={addItem}
                    className="text-violet-600 px-4 rounded"
                  >
                    + Add more
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tax, Total, Due */}
          {/* <div className="flex flex-col gap-1">
            <label>
              Tax{" "}
              <span className="text-red-500 italic text-sm">(optional)</span>
            </label>
            <input
              type="number"
              value={formData.tax}
              onChange={(e) =>
                setFormData({ ...formData, tax: e.target.value })
              }
              className="border outline-none focus:border-violet-600 border-gray-300 rounded-md p-1.5"
            />
          </div> */}

          <div className="flex flex-col gap-1">
            <label>Total Amount </label>
            <input
              type="number"
              value={formData.totalAmount}
              readOnly
              className="border outline-none focus:border-violet-600 border-gray-300 rounded-md p-1.5 bg-gray-100"
            />
          </div>

          {/* <div className="flex flex-col gap-1">
            <label>
              Due <span className="text-red-500 italic text-sm">(if any)</span>
            </label>
            <input
              type="number"
              value={formData.due}
              onChange={(e) =>
                setFormData({ ...formData, due: e.target.value })
              }
              className="border outline-none focus:border-violet-600 border-gray-300 rounded-md p-1.5"
            />
          </div> */}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 bg-violet-600 text-white w-full rounded-md mb-3"
            >
              {loading ? (
                <>
                  <FiLoader className="mx-auto animate-spin" />
                </>
              ) : (
                "Create Invoice"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
