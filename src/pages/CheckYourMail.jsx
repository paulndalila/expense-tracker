import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Particles from "../components/Particles";

const CheckYourMail = () => {
  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      {/* absolute this to center */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 text-green-500 rounded-full p-4 text-5xl shadow-md">
              <CheckCircleOutlineIcon fontSize="inherit" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2 select-none">
            Check Your Mail
          </h1>
          <p className="text-gray-600 mb-6 select-none">
            We’ve sent a confirmation link to your email. Please check your
            inbox and follow the instructions to proceed.
          </p>

          {/* Optionally enable later */}
          {/* 
          <div className="mt-4 text-sm text-gray-500">
            Didn’t receive the email?{" "}
            <button className="text-blue-600 hover:underline">Resend</button>
          </div> 
          */}
        </div>
      </div>
    </div>
  );
};

export default CheckYourMail;
