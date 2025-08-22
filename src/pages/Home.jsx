import Inputs from "../components/Inputs";
import DailyUse from "../components/DailyUse";
import NetWorth from "../components/NetWorth";
import MonthlyUse from "../components/MonthlyUse";
import Recents from "../components/Recents";
import { useAuth } from "../auth/auth-context";
import TopSpendings from "../components/TopSpendings";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuth();

  // useEffect(() => {
  //   console.log(user.email);
  // }, [user]);
  return (
    <div className="min-h-screen md:h-screen flex items-center w-full md:max-w-7xl mx-auto py-2">
      <div className="w-full h-full flex flex-col md:flex-row gap-4">
        {/* Greetings */}
        <div className="flex flex-col gap-1 px-2 md:hidden">
          <h1 className="ps-1 text-lg text-gray-800 w-full font-bold">
            Hello {user?.email}!
          </h1>
          <div className="w-full flex items-center justify-center">
            <Inputs />
          </div>
        </div>

        {/* Cards */}
        <div className="w-full md:w-2/8 h-[80vh] md:h-[90vh] flex flex-col px-2 md:px-0 gap-2 overflow-hidden">
          <NetWorth />
          <DailyUse />
          <MonthlyUse />
        </div>

        <div className="w-full md:w-6/8 h-[90vh] flex flex-col bg-white rounded-lg py-4 px-6 shadow-lg">
          {/* Greetings */}
          <div className="hidden md:flex items-center justify-between">
            <h1 className="text-2xl">
              Greetings, <strong>{user?.email}!</strong>
            </h1>
            <Inputs />
          </div>

          {/* Transactions */}
          <div className="flex flex-col md:flex-row flex-1 gap-6 w-full overflow-hidden mt-2">
            <div className="w-full md:w-2/6 h-full overflow-hidden overflow-y-auto">
              <Recents />
            </div>
            <div className="w-full md:w-4/6 flex-1 overflow-hidden overflow-y-auto">
              <TopSpendings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
