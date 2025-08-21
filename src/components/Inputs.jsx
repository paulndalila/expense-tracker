import { useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SpendFormModal from "./SpendFormModal";
import IncomeFormModal from "./IncomeFormModal";
import LoanFormModal from "./LoanFormModal";

const Inputs = () => {
  const [showSpendForm, setShowSpendForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showLoanForm, setShowLoanForm] = useState(false);

  return (
    <div className="flex items-center px-2 md:px-0 w-full md:w-fit justify-between md:justify-end gap-0 md:gap-4">
      {/* Spend Button */}
      <button
        onClick={() => setShowSpendForm(true)}
        className="flex items-center gap-2 border-2 border-red-500 px-4 py-2 rounded-full text-[10px] md:text-xs font-medium text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
      >
        <TrendingDownIcon fontSize="small" />
        Spend
      </button>

      {/* Income Button */}
      <button
        onClick={() => setShowIncomeForm(true)}
        className="flex items-center gap-2 border-2 border-green-500 px-4 py-2 rounded-full text-[10px] md:text-xs font-medium text-green-600 hover:bg-green-500 hover:text-white transition-all duration-200 cursor-pointer"
      >
        <AttachMoneyIcon fontSize="small" />+ Income
      </button>

      {/* Loan/Debt Button */}
      <button
        onClick={() => setShowLoanForm(true)}
        className="flex items-center gap-2 border-2 border-indigo-500 px-4 py-2 rounded-full text-[10px] md:text-xs font-medium text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 cursor-pointer"
      >
        <AccountBalanceWalletIcon fontSize="small" />+ Loan/Debt
      </button>

      {/* Modals */}
      {showSpendForm && (
        <SpendFormModal onClose={() => setShowSpendForm(false)} />
      )}
      {showIncomeForm && (
        <IncomeFormModal onClose={() => setShowIncomeForm(false)} />
      )}
      {showLoanForm && <LoanFormModal onClose={() => setShowLoanForm(false)} />}
    </div>
  );
};

export default Inputs;
