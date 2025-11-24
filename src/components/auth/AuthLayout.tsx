import { ReactNode } from "react";
import { motion } from "framer-motion";
import logoWhite from "@/assets/logo-white.png";
import patternDark from "@/assets/pattern-dark.png";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - 75% on desktop, full width on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="auth-split-left w-full md:w-3/4 min-h-[40vh] md:min-h-screen flex flex-col justify-center items-center p-8 md:p-16"
        style={{
          backgroundImage: `url(${patternDark})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-2xl w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="mb-12"
          >
            <img
              src={logoWhite}
              alt="Transcontinental Investments"
              className="h-12 md:h-16 w-auto"
            />
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="space-y-6"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-ti-white">
              Your gateway to
              <br />
              strategic investments
            </h1>
            <p className="text-lg md:text-xl text-ti-grey-300 leading-relaxed max-w-xl">
              Transcontinental Investments delivers institutional-grade portfolio
              management with global reach. Access sophisticated investment
              strategies backed by decades of financial expertise.
            </p>
            <div className="flex items-center gap-8 text-ti-grey-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-ti-success rounded-full" />
                <span>Secure Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-ti-success rounded-full" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-ti-success rounded-full" />
                <span>Global Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Column - 25% on desktop, full width on mobile */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        className="auth-split-right w-full md:w-1/4 min-h-screen flex items-center justify-center p-6 md:p-8"
      >
        <div className="w-full max-w-md">
          {children}
        </div>
      </motion.div>
    </div>
  );
};