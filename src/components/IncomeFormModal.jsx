const IncomeFormModal = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const income = {
      amount: data.get("amount"),
      source: data.get("source"),
      description: data.get("description"),
      date: data.get("date"),
      method: data.get("method"),
    };
    console.log("Income recorded:", income);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-1/3 p-6 relative">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Record Income
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="number"
            name="amount"
            placeholder="Amount (Ksh)"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400"
            required
          />
          <select
            name="source"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select Source</option>
            <option>Salary</option>
            <option>Business</option>
            <option>Investment</option>
            <option>Gift</option>
            <option>Other</option>
          </select>
          <input
            type="text"
            name="description"
            placeholder="Description (optional)"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400"
          />
          <input
            type="date"
            name="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400"
          />
          <select
            name="method"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400"
          >
            <option value="">Payment Method</option>
            <option>Cash</option>
            <option>MPesa</option>
            <option>Bank</option>
            <option>Card</option>
          </select>

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
              className="px-4 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeFormModal;
