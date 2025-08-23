import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/auth-context";
import { supabase } from "../auth/supabaseClient";
import WorkHistoryIcon from "@mui/icons-material/WorkHistoryOutlined";

const Recents = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("transaction_date", { ascending: false })
        .limit(5); // get 5 most recent

      if (error) {
        console.error("Error fetching transactions:", error.message);
      } else {
        setTransactions(data);
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <>
      <h3 className="py-2 flex items-center gap-1 text-sm text-gray-800">
        <WorkHistoryIcon fontSize="small" />
        Recent Transactions
      </h3>
      <Divider />
      <div className="flex flex-col gap-4 py-4 pe-2">
        {transactions.length === 0 ? (
          <p className="text-xs text-gray-500">No recent transactions</p>
        ) : (
          transactions.map((txn) => (
            <div
              key={txn.id}
              className="grid grid-cols-2 *:text-xs *:font-medium"
            >
              <div>
                <h1>{txn.item || "Untitled"}</h1>
                <p className="text-[10px] text-gray-500 capitalize">
                  {txn.type}
                </p>
              </div>
              <p
                className={`text-end ${
                  txn.type === "income" ? "text-green-500" : "text-rose-500"
                }`}
              >
                {txn.type === "income" ? "+" : "-"}Ksh.{txn.amount}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Recents;
