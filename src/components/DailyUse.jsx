import { ResponsiveLine } from "@nivo/line";

const DailyUse = () => {
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
      <p className="text-3xl mb-1 px-5">Ksh 650.00</p>
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
