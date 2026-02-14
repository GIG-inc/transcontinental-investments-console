import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ValidationIndicator, ValidationState } from "@/components/auth/ValidationIndicator";
import { WelcomeTransition } from "@/components/auth/WelcomeTransition";
import { AuthFormSkeleton } from "@/components/auth/AuthFormSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { validateEmail, validatePassword } from "@/lib/validation";
import { authApi } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Validation states
  const [emailValidation, setEmailValidation] = useState<ValidationState>("default");
  const [passwordValidation, setPasswordValidation] = useState<ValidationState>("default");
  
  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!value) {
      setEmailValidation("default");
      return;
    }
    const result = validateEmail(value);
    setEmailValidation(result.isValid ? "valid" : "invalid");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!value) {
      setPasswordValidation("default");
      return;
    }
    
    const result = validatePassword(value);
    setPasswordValidation(result.isValid ? "valid" : "invalid");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Validate all fields
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    
    if (emailValidation === "invalid" || passwordValidation === "invalid") {
      setErrorMessage("Please correct the errors before submitting");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await authApi.login({
        email,
        password,
      });

      if (response.error) {
        if (response.status === 401) {
          setErrorMessage("Invalid email or password");
        } else if (response.status === 429) {
          setErrorMessage("Too many attempts. Please try again later.");
        } else {
          setErrorMessage(response.error);
        }
        return;
      }

      // Cookies are set by the server (HttpOnly), no need to store tokens manually
      setShowWelcome(true);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWelcomeComplete = () => {
    // Navigate to dashboard after welcome animation
    navigate("/dashboard");
  };

  return (
    <>
      <AuthLayout>
        {isPageLoading ? (
          <AuthFormSkeleton type="login" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Header */}
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-ti-black">
                Sign in to your account
              </h2>
              <p className="text-sm text-ti-grey-500">
                Enter your credentials to access your dashboard
              </p>
            </div>

            {/* Error Message */}
            <AnimatePresence mode="wait">
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-ti-error-light border border-ti-error rounded-input p-3"
                  role="alert"
                >
                  <p className="text-sm text-ti-error font-medium">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-ti-black">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className="pr-10"
                    required
                    aria-describedby="email-validation"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ValidationIndicator
                      state={emailValidation}
                      label="Email"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-ti-black">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="pr-20"
                    required
                    aria-describedby="password-validation"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <ValidationIndicator
                      state={passwordValidation}
                      label="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-ti-grey-500 hover:text-ti-black transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-ti-grey-600 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                
                <button
                  type="button"
                  onClick={() => navigate("/auth/forgot-password")}
                  className="text-sm font-medium text-ti-black hover:text-ti-grey-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="auth"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Sign up link */}
              <div className="text-center pt-4">
                <p className="text-sm text-ti-grey-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/auth/signup")}
                    className="font-semibold text-ti-black hover:text-ti-grey-700 transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              </div>
              </form>
            </div>
          </motion.div>
        )}
      </AuthLayout>

      {/* Welcome Transition */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeTransition
            isReturning={true}
            onComplete={handleWelcomeComplete}
          />
        )}
      </AnimatePresence>
    </>
  );
}