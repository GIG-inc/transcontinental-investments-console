import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    // In a real app, you would check for existing session/token here
    const timer = setTimeout(() => {
      navigate("/auth/login");
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ti-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-4"
      >
        <Loader2 className="w-12 h-12 text-ti-white mx-auto animate-spin" />
        <p className="text-ti-grey-300 text-sm">Loading Transcontinental Investments...</p>
      </motion.div>
    </div>
  );
};

export default Index;