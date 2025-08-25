import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100/10">
      <div className="relative w-32 h-32 mb-6">
        {/* Rotating Arc */}
        <motion.div
          className="absolute inset-0 rounded-full border-t-4 border-slate-700"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        />

        {/* Second Arc rotating opposite direction */}
        <motion.div
          className="absolute inset-2 rounded-full border-b-4 border-slate-400"
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
        />

        {/* Center Logo */}
        <div className="absolute inset-4 flex items-center justify-center rounded-full shadow-md">
          <img
            src="./logo.png"
            alt="Expense Tracker logo"
            className="w-18 h-18 object-contain"
          />
        </div>
      </div>

      {/* Loading Text */}
      {/* <motion.p
        className="text-gray-600 text-lg font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading, please wait...
      </motion.p> */}
    </div>
  );
};

export default Loader;
