import Inputs from "../components/Inputs";
import Recents from "../components/Recents";
import DailyUse from "../components/DailyUse";
import NetWorth from "../components/NetWorth";
import { useAuth } from "../auth/auth-context";
import MonthlyUse from "../components/MonthlyUse";
import TopSpendings from "../components/TopSpendings";

import { Helmet } from "react-helmet";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen md:h-screen flex items-center w-full md:max-w-7xl mx-auto py-2">
      <Helmet>
        <title>Expense Tracker</title>
        <meta
          name="description"
          content="A simple and effective expense tracker to help you manage, analyze, and monitor your spending habits with ease."
        />
        <meta name="author" content="Paul Ndalila" />

        <meta property="og:title" content="Expense Tracker" />
        <meta
          property="og:description"
          content="Stay on top of your finances with our expense tracker—designed to simplify budgeting and monitor your expenditure effectively."
        />
        <meta
          property="og:image"
          content="https://et.paulndalila.top/banner.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Expense Tracker" />
      </Helmet>

      <div className="w-full h-full flex flex-col md:flex-row gap-4">
        {/* Greetings */}
        <div className="flex flex-col gap-1 px-2 md:hidden">
          <h1 className="ps-1 text-lg text-gray-800 w-full font-bold">
            Hello {user?.user_metadata.full_name}!
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

        <div className="w-full md:w-6/8 h-[100vh] md:h-[90vh] flex flex-col bg-white rounded-lg py-4 px-6 shadow-lg">
          {/* Greetings */}
          <div className="hidden md:flex items-center justify-between">
            <h1 className="text-2xl">
              Greetings, <strong>{user?.user_metadata.full_name}!</strong>
            </h1>
            <Inputs />
          </div>

          {/* Transactions */}
          <div className="flex flex-col md:flex-row flex-1 gap-6 w-full overflow-hidden mt-2">
            <div className="w-full md:w-2/6 h-1/2 md:h-full overflow-hidden overflow-y-auto lin">
              <Recents />
            </div>
            <div className="w-full md:w-4/6 h-1/2 md:h-full overflow-hidden overflow-y-auto">
              <TopSpendings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
