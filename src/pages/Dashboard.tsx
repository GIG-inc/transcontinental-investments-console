import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import logoBlack from "@/assets/logo-black.png";

export default function Dashboard() {
  const handleLogout = () => {
    // API Integration Point: POST /api/auth/logout
    // Clear session/token and redirect to login
    window.location.href = "/auth/login";
  };

  return (
    <div className="min-h-screen bg-ti-grey-50">
      {/* Header */}
      <header className="bg-ti-white border-b border-ti-grey-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <img src={logoBlack} alt="Transcontinental Investments" className="h-8" />
            
            <Button
              variant="authGhost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-ti-black mb-2">Dashboard</h1>
            <p className="text-lg text-ti-grey-600">
              Welcome to Transcontinental Investments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Portfolio Value", value: "$---.---", change: "--%" },
              { title: "Total Returns", value: "$--.--", change: "--%" },
              { title: "Active Investments", value: "--", change: "-- new" },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-ti-white rounded-input border border-ti-grey-200 p-6"
              >
                <h3 className="text-sm font-medium text-ti-grey-600 mb-2">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-ti-black mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-ti-success font-medium">
                  {stat.change}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-ti-white rounded-input border border-ti-grey-200 p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-ti-black mb-4">
              Dashboard Coming Soon
            </h2>
            <p className="text-ti-grey-600 mb-6">
              Your comprehensive investment dashboard with real-time analytics,
              portfolio management, and market insights will be available here.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="auth">Explore Features</Button>
              <Button variant="authSecondary">View Documentation</Button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}