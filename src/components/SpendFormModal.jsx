import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useAuth } from "../auth/auth-context.jsx";
import { supabase } from "../auth/supabaseClient.js";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

const commonItems = ["Fare", "Rent", "Food", "Shopping", "Bills", "Other"];

const SpendFormModal = ({ onClose }) => {
  const { user } = useAuth();
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.target);

    const spend = {
      user_id: user.id,
      amount: parseFloat(data.get("amount")),
      description: data.get("description") || null,
      transaction_date: data.get("date"),
      type: "expense",
      item: data.get("item"),
      paid_in: data.get("method"),
    };

    const { error } = await supabase.from("transactions").insert([spend]);

    if (error) {
      console.error("Error saving spend:", error.message);
      alert("Failed to save transaction ❌");
    } else {
      alert("Spending recorded ✅");
      onClose();
      window.location.href = "/";
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-1/3 p-6 relative">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Record Spending
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="number"
            name="amount"
            placeholder="Amount (Ksh)"
            className="border-1 border-gray-300 rounded-sm p-2 text-sm focus:ring-2 focus:ring-red-400"
            required
          />
          {/* <input
            type="text"
            name="item"
            placeholder="e.g fare"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-red-400"
            required
          /> */}
          {/* Autocomplete Input for Item */}
          <Autocomplete
            freeSolo
            options={commonItems}
            onInputChange={(e, newValue) => setItem(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="item"
                label="Item"
                placeholder="e.g. Fare"
                size="small"
                required
              />
            )}
          />
          <input
            type="text"
            name="description"
            placeholder="Description (optional)"
            className="border-1 border-gray-300 rounded-sm p-2 text-sm focus:ring-2 focus:ring-red-400"
          />
          <input
            type="date"
            name="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className="border-1 border-gray-300 rounded-sm p-2 text-sm focus:ring-2 focus:ring-red-400"
          />
          <select
            name="method"
            className="border-1 border-gray-300 rounded-sm p-2 text-sm focus:ring-2 focus:ring-red-400"
          >
            <option value="">Payment Method</option>
            <option value="cash">Cash</option>
            <option value="mpesa">MPesa</option>
            <option value="bank">Bank</option>
            <option value="card">Card</option>
            <option value="other">Other</option>
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            >
              {loading ? (
                <CircularProgress
                  size={14}
                  thickness={8}
                  sx={{ color: "white" }}
                />
              ) : (
                <span>Save</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpendFormModal;
