import { Skeleton } from "@/components/ui/skeleton";

interface AuthFormSkeletonProps {
  type: 'login' | 'signup' | 'forgot' | 'otp' | 'reset';
}

export const AuthFormSkeleton = ({ type }: AuthFormSkeletonProps) => {
  const renderLoginSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-32 bg-ti-light-grey" />
        <Skeleton className="h-4 w-48 bg-ti-light-grey" />
      </div>
      
      {/* Email/Username field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 bg-ti-light-grey" />
        <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
      </div>
      
      {/* Password field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20 bg-ti-light-grey" />
        <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
      </div>
      
      {/* Remember me & Forgot */}
      <div className="flex justify-between">
        <Skeleton className="h-4 w-28 bg-ti-light-grey" />
        <Skeleton className="h-4 w-32 bg-ti-light-grey" />
      </div>
      
      {/* Submit button */}
      <Skeleton className="h-12 w-full rounded-button bg-ti-light-grey" />
      
      {/* Sign up link */}
      <div className="flex justify-center">
        <Skeleton className="h-4 w-40 bg-ti-light-grey" />
      </div>
    </div>
  );

  const renderSignupSkeleton = () => (
    <div className="space-y-4 animate-pulse">
      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-40 bg-ti-light-grey" />
        <Skeleton className="h-4 w-56 bg-ti-light-grey" />
      </div>
      
      {/* Name row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-ti-light-grey" />
          <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-ti-light-grey" />
          <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
        </div>
      </div>
      
      {/* Username */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20 bg-ti-light-grey" />
        <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
      </div>
      
      {/* Email */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16 bg-ti-light-grey" />
        <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
      </div>
      
      {/* Phone */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28 bg-ti-light-grey" />
        <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
      </div>
      
      {/* Password */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20 bg-ti-light-grey" />
        <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
        {/* Password rules */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Skeleton className="h-3 w-28 bg-ti-light-grey" />
          <Skeleton className="h-3 w-24 bg-ti-light-grey" />
          <Skeleton className="h-3 w-32 bg-ti-light-grey" />
          <Skeleton className="h-3 w-20 bg-ti-light-grey" />
        </div>
      </div>
      
      {/* Confirm Password */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32 bg-ti-light-grey" />
        <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
      </div>
      
      {/* Terms */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded bg-ti-light-grey" />
        <Skeleton className="h-4 w-48 bg-ti-light-grey" />
      </div>
      
      {/* Submit button */}
      <Skeleton className="h-12 w-full rounded-button bg-ti-light-grey" />
      
      {/* Login link */}
      <div className="flex justify-center">
        <Skeleton className="h-4 w-44 bg-ti-light-grey" />
      </div>
    </div>
  );

  const renderForgotSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-44 bg-ti-light-grey" />
        <Skeleton className="h-4 w-64 bg-ti-light-grey" />
      </div>
      
      {/* Email field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32 bg-ti-light-grey" />
        <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
      </div>
      
      {/* Submit button */}
      <Skeleton className="h-12 w-full rounded-button bg-ti-light-grey" />
      
      {/* Back link */}
      <div className="flex justify-center">
        <Skeleton className="h-4 w-28 bg-ti-light-grey" />
      </div>
    </div>
  );

  const renderOtpSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-36 bg-ti-light-grey" />
        <Skeleton className="h-4 w-72 bg-ti-light-grey" />
      </div>
      
      {/* OTP inputs */}
      <div className="flex justify-center gap-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-12 rounded-input bg-ti-light-grey" />
        ))}
      </div>
      
      {/* Countdown */}
      <div className="flex justify-center">
        <Skeleton className="h-4 w-32 bg-ti-light-grey" />
      </div>
      
      {/* Submit button */}
      <Skeleton className="h-12 w-full rounded-button bg-ti-light-grey" />
      
      {/* Resend link */}
      <div className="flex justify-center">
        <Skeleton className="h-4 w-24 bg-ti-light-grey" />
      </div>
    </div>
  );

  const renderResetSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-40 bg-ti-light-grey" />
        <Skeleton className="h-4 w-52 bg-ti-light-grey" />
      </div>
      
      {/* New Password */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28 bg-ti-light-grey" />
        <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
        {/* Password rules */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Skeleton className="h-3 w-28 bg-ti-light-grey" />
          <Skeleton className="h-3 w-24 bg-ti-light-grey" />
          <Skeleton className="h-3 w-32 bg-ti-light-grey" />
          <Skeleton className="h-3 w-20 bg-ti-light-grey" />
        </div>
      </div>
      
      {/* Confirm Password */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-36 bg-ti-light-grey" />
        <Skeleton className="h-12 w-full rounded-input bg-ti-light-grey" />
      </div>
      
      {/* Submit button */}
      <Skeleton className="h-12 w-full rounded-button bg-ti-light-grey" />
    </div>
  );

  switch (type) {
    case 'login':
      return renderLoginSkeleton();
    case 'signup':
      return renderSignupSkeleton();
    case 'forgot':
      return renderForgotSkeleton();
    case 'otp':
      return renderOtpSkeleton();
    case 'reset':
      return renderResetSkeleton();
    default:
      return renderLoginSkeleton();
  }
};
