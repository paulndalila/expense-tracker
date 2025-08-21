import { Divider } from "@mui/material";
import WorkHistoryIcon from "@mui/icons-material/WorkHistoryOutlined";

const Recents = () => {
  return (
    <>
      <h3 className="py-2 flex items-center gap-1 text-sm text-gray-800">
        <WorkHistoryIcon fontSize="small" />
        Recent Transactions
      </h3>
      <Divider />
      <div className="flex flex-col gap-4 py-4 pe-2">
        <div className="grid grid-cols-2 *:text-xs  *:font-medium">
          <div>
            <h1>Water</h1>
            <p className="text-[10px] text-gray-500">Aug 18</p>
          </div>
          <p className="text-rose-500 text-end">-Ksh.400</p>
        </div>
        <div className="grid grid-cols-2 *:text-xs  *:font-medium">
          <div>
            <h1>Food</h1>
            <p className="text-[10px] text-gray-500">Aug 18</p>
          </div>
          <p className="text-rose-500 text-end">-Ksh.350</p>
        </div>
        <div className="grid grid-cols-2 *:text-xs  *:font-medium">
          <div>
            <h1>Fare</h1>
            <p className="text-[10px] text-gray-500">Aug 18</p>
          </div>
          <p className="text-rose-500 text-end">-Ksh.190</p>
        </div>
        <div className="grid grid-cols-2 *:text-xs *:font-medium">
          <div>
            <h1>Deposit</h1>
            <p className="text-[10px] text-gray-500">Aug 18</p>
          </div>
          <p className="text-green-500 text-end">+Ksh.250</p>
        </div>
      </div>
    </>
  );
};

export default Recents;
