import { useMemo } from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

export type PasswordStrength = "weak" | "fair" | "good" | "strong";

export const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (password.length === 0) return "weak";
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  
  // Character variety
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  // Return strength based on score
  if (score <= 2) return "weak";
  if (score <= 3) return "fair";
  if (score <= 4) return "good";
  return "strong";
};

const strengthLabels: Record<PasswordStrength, string> = {
  weak: "Weak password",
  fair: "Fair password",
  good: "Good password",
  strong: "Strong password",
};

const strengthColors: Record<PasswordStrength, string> = {
  weak: "text-ti-error",
  fair: "text-ti-warning",
  good: "text-ti-info",
  strong: "text-ti-success",
};

export const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const strength = useMemo(() => calculatePasswordStrength(password), [password]);
  
  if (password.length === 0) return null;
  
  return (
    <div className="space-y-1" role="status" aria-live="polite">
      <div className="h-1 bg-ti-grey-200 rounded-full overflow-hidden">
        <div className={`password-strength-bar ${strength}`} />
      </div>
      <p className={`text-xs font-medium ${strengthColors[strength]}`}>
        {strengthLabels[strength]}
      </p>
    </div>
  );
};