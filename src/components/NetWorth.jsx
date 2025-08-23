import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/auth-context";
import { supabase } from "../auth/supabaseClient";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const NetWorth = () => {
  const { user } = useAuth();
  const [netWorth, setNetWorth] = useState(0);
  const [isNegative, setIsNegative] = useState(null);
  const [isZero, setIsZero] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchNetWorth = async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("type, amount")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching transactions:", error.message);
        return;
      }

      let totalIncome = 0;
      let totalExpenses = 0;
      let totalLoans = 0;

      data.forEach((txn) => {
        const amt = Number(txn.amount);
        if (txn.type === "income") totalIncome += amt;
        if (txn.type === "expense") totalExpenses += amt;
        if (txn.type === "loan" || txn.type === "debt_repayment")
          totalLoans += amt;
      });

      const net = totalIncome - totalExpenses - totalLoans;
      setNetWorth(net);
    };

    fetchNetWorth();
  }, [user]);

  useEffect(() => {
    setIsNegative(netWorth < 0);
    setIsZero(netWorth === 0);
  }, [netWorth]);

  //only for UI display
  const data = [
    { day: "Mon", value: 3 },
    { day: "Tue", value: 5 },
    { day: "Wed", value: 2 },
    { day: "Thu", value: 7 },
    { day: "Fri", value: 4 },
  ];

  return (
    <div className="flex flex-col h-1/3 bg-[#42224a] w-full pt-5 text-white rounded-2xl shadow-lg">
      <h2 className="text-sm mb-2 px-5">Net Worth</h2>
      <div className="flex items-center gap-2 px-5 mb-1">
        <p
          className={`text-3xl ${
            isNegative
              ? "text-red-400"
              : isZero
              ? "text-yellow-400"
              : "text-green-400"
          }`}
        >
          Ksh {netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        {isNegative ? (
          <TrendingDownIcon className="text-red-400" />
        ) : isZero ? null : (
          <TrendingUpIcon className="text-green-400" />
        )}
      </div>
      <div className="flex-1 pb-4" style={{ height: 100, width: "100%" }}>
        <ResponsiveBar
          data={data}
          keys={["value"]}
          indexBy="day"
          margin={{ top: 0, right: 5, bottom: 10, left: 5 }}
          padding={0.3}
          colors={["#8f659a"]} // Tailwind amber-400 for contrast
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          axisBottom={null}
          enableLabel={false}
          borderRadius={4}
          animate={true}
          enableGridY={false}
        />
      </div>
    </div>
  );
};

export default NetWorth;
