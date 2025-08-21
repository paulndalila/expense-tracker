import { Divider } from "@mui/material";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";

const TopSpendings = () => {
  return (
    <>
      <h3 className="py-2 flex items-center gap-1 text-sm text-gray-800">
        <HourglassTopOutlinedIcon fontSize="small" /> Top Spendings (18th Aug to
        date)
      </h3>
      <Divider />
      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-2 *:text-xs  *:font-medium">
          <div>
            <h1>Rent</h1>
            <p className="text-[10px] text-gray-500 ms-2">(6,000/month)</p>
          </div>
          <p className="text-gray-700 text-end">Ksh.48,000.00</p>
        </div>
        <div className="grid grid-cols-2 *:text-xs  *:font-medium">
          <div>
            <h1>Clothing</h1>
            <p className="text-[10px] text-gray-500 ms-2">(2,000/month)</p>
          </div>
          <p className="text-gray-700 text-end">Ksh.18,000.00</p>
        </div>
        <div className="grid grid-cols-2 *:text-xs  *:font-medium">
          <div>
            <h1>Fare</h1>
            <p className="text-[10px] text-gray-500 ms-2">(2,500/month)</p>
          </div>
          <p className="text-gray-700 text-end">Ksh.20,000.00</p>
        </div>
      </div>
    </>
  );
};

export default TopSpendings;
