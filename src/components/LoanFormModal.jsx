const LoanFormModal = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const loan = {
      amount: data.get("amount"),
      type: data.get("type"), // Loan or Debt
      lender: data.get("lender"),
      description: data.get("description"),
      date: data.get("date"),
      dueDate: data.get("dueDate"),
      method: data.get("method"),
    };
    console.log("Loan/Debt recorded:", loan);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-1/3 p-6 relative">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Record Loan/Debt
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* Amount */}
          <input
            type="number"
            name="amount"
            placeholder="Amount (Ksh)"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400"
            required
          />

          {/* Loan or Debt */}
          <select
            name="type"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select Type</option>
            <option>Loan (I borrowed)</option>
            <option>Debt (I lent out)</option>
          </select>

          {/* Lender / Borrower */}
          <input
            type="text"
            name="lender"
            placeholder="Lender/Borrower Name"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400"
            required
          />

          {/* Description */}
          <input
            type="text"
            name="description"
            placeholder="Description (optional)"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex flex-col">
            {/* Date Borrowed */}
            <label htmlFor="borrowed_date" className="text-xs">
              Date Borrowed
            </label>
            <input
              type="date"
              name="date"
              id="borrowed_date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            {/* Due Date */}
            <label htmlFor="due_date" className="text-xs">
              Due date
            </label>
            <input
              type="date"
              name="dueDate"
              id="due_date"
              className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Payment Method */}
          <select
            name="method"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Payment Method</option>
            <option>Cash</option>
            <option>MPesa</option>
            <option>Bank</option>
            <option>Card</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanFormModal;
