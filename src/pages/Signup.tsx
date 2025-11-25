import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ValidationIndicator, ValidationState } from "@/components/auth/ValidationIndicator";
import { WelcomeTransition } from "@/components/auth/WelcomeTransition";
import { PasswordRulesIndicator } from "@/components/auth/PasswordRulesIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  validateName,
  validateUsername,
  validateEmail,
  validatePhone,
  validatePassword,
  validatePasswordMatch,
} from "@/lib/validation";
import { motion, AnimatePresence, number } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Validation states
  const [firstNameValidation, setFirstNameValidation] = useState<ValidationState>("default");
  const [lastNameValidation, setLastNameValidation] = useState<ValidationState>("default");
  const [usernameValidation, setUsernameValidation] = useState<ValidationState>("default");
  const [emailValidation, setEmailValidation] = useState<ValidationState>("default");
  const [phoneValidation, setPhoneValidation] = useState<ValidationState>("default");
  const [passwordValidation, setPasswordValidation] = useState<ValidationState>("default");
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState<ValidationState>("default");
  
  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  // Real-time validation handlers
  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    if (!value) {
      setFirstNameValidation("default");
      return;
    }
    const result = validateName(value, "First name");
    setFirstNameValidation(result.isValid ? "valid" : "invalid");
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    if (!value) {
      setLastNameValidation("default");
      return;
    }
    const result = validateName(value, "Last name");
    setLastNameValidation(result.isValid ? "valid" : "invalid");
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (!value) {
      setUsernameValidation("default");
      return;
    }
    const result = validateUsername(value);
    setUsernameValidation(result.isValid ? "valid" : "invalid");
  };

  const handleUsernameBlur = async () => {
    if (!username || usernameValidation !== "valid") return;
    
    // API Integration Point: Check username availability
    // GET /api/auth/check-username?username={username}
    // Response: { available: boolean }
    
    // Simulate API check
    await new Promise(resolve => setTimeout(resolve, 300));
    const isAvailable = true; // Mock response
    
    setUsernameValidation(isAvailable ? "valid" : "invalid");
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!value) {
      setEmailValidation("default");
      return;
    }
    const result = validateEmail(value);
    setEmailValidation(result.isValid ? "valid" : "invalid");
  };

  const handleEmailBlur = async () => {
    if (!email || emailValidation !== "valid") return;
    
    // API Integration Point: Check email availability
    // GET /api/auth/check-email?email={email}
    // Response: { available: boolean }
    
    // Simulate API check
    await new Promise(resolve => setTimeout(resolve, 300));
    const isAvailable = true; // Mock response
    
    setEmailValidation(isAvailable ? "valid" : "invalid");
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (!value) {
      setPhoneValidation("default");
      return;
    }
    const result = validatePhone(value);
    setPhoneValidation(result.isValid ? "valid" : "invalid");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!value) {
      setPasswordValidation("default");
      return;
    }
    const result = validatePassword(value);
    setPasswordValidation(result.isValid ? "valid" : "invalid");
    
    // Revalidate confirm password if it has a value
    if (confirmPassword) {
      const matchResult = validatePasswordMatch(value, confirmPassword);
      setConfirmPasswordValidation(matchResult.isValid ? "valid" : "invalid");
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (!value) {
      setConfirmPasswordValidation("default");
      return;
    }
    const result = validatePasswordMatch(password, value);
    setConfirmPasswordValidation(result.isValid ? "valid" : "invalid");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Validate all fields
    if (!firstName || !lastName || !username || !email || !phone || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    
    if (!agreeToTerms) {
      setErrorMessage("Please agree to the Terms and Conditions");
      return;
    }
    
    // Check all validations
    const allValid = [
      // firstNameValidation,
      // lastNameValidation,
      // usernameValidation,
      emailValidation,
      // phoneValidation,
      passwordValidation,
      // confirmPasswordValidation
    ].every(state => state === "valid");
    
    if (!allValid) {
      setErrorMessage("Please correct the errors before submitting");
      return;
    }
    
    setLoading(true);
      
  try {
    setLoading(true);
    setErrorMessage("");

    const payload = {
      fullname: `${firstName} ${lastName}`,
      username,
      email,
      phonenumber: phone,
      password
    };
    console.log(JSON.stringify(payload));
    const response = await fetch("http://localhost:7000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
   

  );

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Validation failed. Check your input.");
      } else if (response.status === 409) {
        throw new Error("Username or email already exists.");
      } else {
        throw new Error("Server error. Please try again later.");
      }
    }

    const data = await response.json();

    if (data.success) {
      setShowWelcome(true);
      // store token if needed: localStorage.setItem("token", data.token);
    } else {
      setErrorMessage("Registration failed. Please try again.");
    }
  } catch (error) {
    setErrorMessage(error.message);
  } finally {
    setLoading(false);
  }

  };

  const handleWelcomeComplete = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <AuthLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-h-[90vh] overflow-y-auto pr-2"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-ti-black">
                Create your account
              </h2>
              <p className="text-sm text-ti-grey-500">
                Join Transcontinental Investments today
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
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-semibold text-ti-black">
                  First Name
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => handleFirstNameChange(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ValidationIndicator state={firstNameValidation} label="First name" />
                  </div>
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-semibold text-ti-black">
                  Last Name
                </Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => handleLastNameChange(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ValidationIndicator state={lastNameValidation} label="Last name" />
                  </div>
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-semibold text-ti-black">
                  Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    onBlur={handleUsernameBlur}
                    className="pr-10"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ValidationIndicator state={usernameValidation} label="Username" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-ti-black">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                    className="pr-10"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ValidationIndicator state={emailValidation} label="Email" />
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-ti-black">
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ValidationIndicator state={phoneValidation} label="Phone number" />
                  </div>
                </div>
                <p className="text-xs text-ti-grey-500">Use E.164 format: +[country code][number]</p>
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
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="pr-20"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <ValidationIndicator state={passwordValidation} label="Password" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-ti-grey-500 hover:text-ti-black transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <PasswordRulesIndicator password={password} />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-ti-black">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    className="pr-20"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <ValidationIndicator state={confirmPasswordValidation} label="Confirm password" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-ti-grey-500 hover:text-ti-black transition-colors"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                  required
                />
                <Label htmlFor="terms" className="text-sm text-ti-grey-600 leading-tight cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="font-medium text-ti-black hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-medium text-ti-black hover:underline">
                    Privacy Policy
                  </a>
                </Label>
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
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Sign in link */}
              <div className="text-center pt-4">
                <p className="text-sm text-ti-grey-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/auth/login")}
                    className="font-semibold text-ti-black hover:text-ti-grey-700 transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </AuthLayout>

      {/* Welcome Transition */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeTransition
            firstName={firstName}
            isReturning={false}
            onComplete={handleWelcomeComplete}
          />
        )}
      </AnimatePresence>
    </>
  );
}