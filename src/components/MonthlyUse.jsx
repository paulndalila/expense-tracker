import { useEffect, useState } from "react";
import { supabase } from "../auth/supabaseClient";
import { useAuth } from "../auth/auth-context";
import { ResponsiveLine } from "@nivo/line";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MonthlyUse = () => {
  const { user } = useAuth();
  const [monthSpend, setMonthSpend] = useState(0);
  const [lastMonthSpend, setLastMonthSpend] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchMonthSpends = async () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // current month (1-12)

      // current month range
      const firstDayCurr = `${year}-${String(month).padStart(2, "0")}-01`;
      const lastDayCurr = new Date(year, month, 0).toISOString().split("T")[0];

      // last month range
      const prevMonth = month - 1 === 0 ? 12 : month - 1;
      const prevYear = month - 1 === 0 ? year - 1 : year;
      const firstDayPrev = `${prevYear}-${String(prevMonth).padStart(
        2,
        "0"
      )}-01`;
      const lastDayPrev = new Date(prevYear, prevMonth, 0)
        .toISOString()
        .split("T")[0];

      // fetch current month
      const { data: currData, error: currErr } = await supabase
        .from("transactions")
        .select("amount")
        .eq("user_id", user.id)
        .eq("type", "expense")
        .gte("transaction_date", firstDayCurr)
        .lte("transaction_date", lastDayCurr);

      if (currErr) {
        console.error(
          "Error fetching current month spending:",
          currErr.message
        );
        return;
      }

      // fetch last month
      const { data: prevData, error: prevErr } = await supabase
        .from("transactions")
        .select("amount")
        .eq("user_id", user.id)
        .eq("type", "expense")
        .gte("transaction_date", firstDayPrev)
        .lte("transaction_date", lastDayPrev);

      if (prevErr) {
        console.error("Error fetching last month spending:", prevErr.message);
        return;
      }

      const currTotal = currData.reduce(
        (sum, txn) => sum + Number(txn.amount),
        0
      );
      const prevTotal = prevData.reduce(
        (sum, txn) => sum + Number(txn.amount),
        0
      );

      setMonthSpend(currTotal);
      setLastMonthSpend(prevTotal);
    };

    fetchMonthSpends();
  }, [user]);

  const percentageChange =
    lastMonthSpend > 0
      ? ((monthSpend - lastMonthSpend) / lastMonthSpend) * 100
      : null;

  const data = [
    {
      id: "Sales",
      data: [
        { x: "Jan", y: 30 },
        { x: "Feb", y: 45 },
        { x: "Mar", y: 60 },
        { x: "Apr", y: 50 },
      ],
    },
    {
      id: "Expenses",
      data: [
        { x: "Jan", y: 20 },
        { x: "Feb", y: 25 },
        { x: "Mar", y: 35 },
        { x: "Apr", y: 30 },
      ],
    },
  ];

  return (
    <div className="hidden: md:flex flex-col h-1/3 bg-slate-700 w-full pt-5 text-white rounded-2xl shadow-lg">
      <h2 className="text-sm mb-2 px-5">
        {new Date().toLocaleString("default", { month: "long" })} Expenditure
      </h2>
      <p className="text-3xl mb-1 px-5">
        Ksh {monthSpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </p>

      {percentageChange !== null && (
        <div className="flex items-center gap-1 text-xs px-5 mb-2">
          {percentageChange >= 0 ? (
            <ArrowDropUpIcon className="text-red-400" fontSize="small" />
          ) : (
            <ArrowDropDownIcon className="text-green-400" fontSize="small" />
          )}
          <span
            className={
              percentageChange >= 0 ? "text-red-400" : "text-green-400"
            }
          >
            {Math.abs(percentageChange).toFixed(1)}% vs last month
          </span>
        </div>
      )}
      <div className="flex-1 pb-4" style={{ height: 100, width: "100%" }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 20, bottom: 5, left: 20 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          enableGridY={false}
          enableArea={true}
          enableGridX={false}
          useMesh={true}
          animate={true}
          colors={{ scheme: "category10" }}
        />
      </div>
    </div>
  );
};

export default MonthlyUse;
