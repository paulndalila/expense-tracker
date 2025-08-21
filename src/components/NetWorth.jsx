import { ResponsiveBar } from "@nivo/bar";

const NetWorth = () => {
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
      <p className="text-3xl mb-1 px-5">Ksh 17,650.00</p>
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
