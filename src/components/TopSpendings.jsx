// src/components/TopSpendings.jsx
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import { supabase } from "../auth/supabaseClient";
import { useAuth } from "../auth/auth-context";

const TopSpendings = () => {
  const { user } = useAuth();
  const [topSpendings, setTopSpendings] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchTopSpendings = async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("item, amount, transaction_date")
        .eq("user_id", user.id)
        .eq("type", "expense") // only expenses
        .order("amount", { ascending: false });

      if (error) {
        console.error("Error fetching top spendings:", error.message);
        return;
      }

      // Group by item (case-insensitive) and sum
      const grouped = data.reduce((acc, txn) => {
        if (!txn.item) return acc;

        // normalize: lowercase + trim spaces
        const key = txn.item.trim().toLowerCase();

        if (!acc[key]) {
          acc[key] = { total: 0, count: 0, original: txn.item };
        }
        acc[key].total += Number(txn.amount);
        acc[key].count += 1;

        return acc;
      }, {});

      // Convert to array, sort by total spent
      const sorted = Object.entries(grouped)
        .map(([key, { total, count, original }]) => ({
          item:
            original.charAt(0).toUpperCase() + original.slice(1).toLowerCase(), // prettier label
          total,
          count,
          avg: total / count,
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5); // top 5 spendings

      setTopSpendings(sorted);
    };

    fetchTopSpendings();
  }, [user]);

  return (
    <>
      <h3 className="py-2 flex items-center gap-1 text-sm text-gray-800">
        <HourglassTopOutlinedIcon fontSize="small" />
        Top Spendings (since {new Date().toLocaleDateString()})
      </h3>
      <Divider />
      <div className="flex flex-col gap-4 p-4">
        {topSpendings.length === 0 ? (
          <p className="text-xs text-gray-500">No spendings recorded yet</p>
        ) : (
          topSpendings.map((s) => (
            <div
              key={s.item}
              className="grid grid-cols-2 *:text-xs *:font-medium"
            >
              <div>
                <h1>{s.item || "Unnamed"}</h1>
                <p className="text-[10px] text-gray-500 ms-2">
                  ({s.count}x, ~Ksh.{s.avg.toFixed(0)}/each)
                </p>
              </div>
              <p className="text-gray-700 text-end">Ksh.{s.total.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TopSpendings;
