import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import { supabase } from "../auth/supabaseClient";
import { useAuth } from "../auth/auth-context";

const DailyUse = () => {
  const { user } = useAuth();
  const [todaySpend, setTodaySpend] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchTodaySpend = async () => {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      const { data, error } = await supabase
        .from("transactions")
        .select("amount")
        .eq("user_id", user.id)
        .eq("type", "expense")
        .eq("transaction_date", today);

      if (error) {
        console.error("Error fetching today's spending:", error.message);
        return;
      }

      const total = data.reduce((sum, txn) => sum + Number(txn.amount), 0);
      setTodaySpend(total);
    };

    fetchTodaySpend();
  }, [user]);

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
  ];

  return (
    <div className="flex flex-col h-1/3 bg-slate-700 w-full pt-5 text-white rounded-2xl shadow-lg">
      <h2 className="text-sm mb-2 px-5">Today's Expenditure</h2>
      <p className="text-3xl mb-1 px-5 text-rose-400">
        Ksh {todaySpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </p>
      <div className="flex-1 pb-4" style={{ height: 100, width: "100%" }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
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

export default DailyUse;
