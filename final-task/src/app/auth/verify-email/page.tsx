"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const otpString = otp.join("");

    if (otpString.length !== 4) {
      setError("Please enter the complete OTP");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://akil-backend.onrender.com/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            OTP: otpString,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Email verification failed");
      } else {
        setSuccess("Email verified successfully!");
        setTimeout(() => {
          router.push(
            "/auth/signin?message=Email verified successfully! Please sign in."
          );
        }, 2000);
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError("An error occurred during verification. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://akil-backend.onrender.com/resend-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to resend code");
      } else {
        setSuccess("Verification code resent successfully!");
      }
    } catch (error) {
      console.error("Resend error:", error);
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Verify Email
          </h2>
          <p className="text-sm text-gray-600 text-justify">
            We've sent a verification code to the email address you provided. To
            complete the verification process, please enter the code here.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                placeholder="0"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg transition-all duration-200 placeholder:text-gray-300 ${
                  digit
                    ? "border-[#4640DE] focus:ring-2 focus:ring-[#4640DE] focus:ring-opacity-50 focus:border-[#4640DE]"
                    : "border-gray-300 focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE] focus:ring-opacity-50"
                }`}
                disabled={isLoading}
              />
            ))}
          </div>

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-600">
              You can request to{" "}
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading}
                className="font-bold text-[#4640DE] hover:text-[#4640DE]/80 disabled:opacity-50"
              >
                Resend code
              </button>{" "}
              in <br /><span className="font-bold text-[#4640DE]">0:30</span>
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-white py-3 rounded-full font-medium disabled:opacity-50"
            style={{
              backgroundColor: "#4640DE4D",
              borderColor: "#4640DE",
            }}
          >
            {isLoading ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
