"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { FaPaperPlane, FaGlobe, FaChevronDown } from "react-icons/fa";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState<string>("+91");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;

    // Ensure +91 prefix stays
    if (!value.startsWith("+91")) {
      value = "+91" + value.replace(/[^0-9]/g, "");
    }

    // Limit to 13 characters (+91 + 10 digits)
    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    setPhoneNumber(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const trimmedPhone = phoneNumber.trim();

    if (trimmedPhone && trimmedPhone.length >= 10) {
      setIsLoading(true);

      try {
        // Simulate OTP sending
        console.log("Sending OTP to:", trimmedPhone);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Handle success - redirect to dashboard
        // window.location.href = '/dashboard'
      } catch (error) {
        console.error("Error sending OTP:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a valid phone number");
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(145deg, var(--color-bg-page-start), var(--color-bg-page-end))",
        fontFamily: "var(--font-family)",
      }}
    >
      <div className="w-full max-w-105 animate-fade-in">
        {/* Login Card */}
        <div
          className="bg-white px-8 py-10 sm:px-9 sm:py-10 rounded-2xl shadow-lg w-full border"
          style={{
            borderRadius: "var(--radius-card)",
            boxShadow: "var(--shadow-card)",
            borderColor: "var(--color-border-card)",
            backdropFilter: "blur(2px)",
          }}
        >
          {/* Brand Section */}
          <div className="text-center mb-8">
            <h1
              className="text-[2.2rem] font-bold tracking-tight mt-1"
              style={{
                color: "var(--color-text-green)",
                letterSpacing: "-0.5px",
              }}
            >
              Fasal Sathi
            </h1>
            <p
              className="text-[0.95rem] font-medium tracking-wide inline-block px-6 py-1 rounded-xl mt-1"
              style={{
                color: "var(--color-text-muted)",
                backgroundColor: "var(--color-tagline-bg)",
                borderRadius: "var(--radius-badge)",
                letterSpacing: "0.3px",
              }}
            >
              Crop advisory for farmers
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Phone Input Group */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="mobileInput"
                className="font-semibold text-[0.95rem] flex items-center gap-2"
                style={{ color: "var(--color-text-body)" }}
              >
                Phone number
              </label>

              <div
                className="flex items-center transition-all duration-200"
                style={{
                  border: "1.5px solid var(--color-border-input)",
                  borderRadius: "var(--radius-input)",
                  padding: "0.2rem 0.2rem 0.2rem 1.5rem",
                  backgroundColor: "var(--color-input-bg)",
                }}
                onFocus={(e) => {
                  const target = e.currentTarget;
                  target.style.borderColor = "var(--color-primary-light)";
                  target.style.boxShadow = "var(--shadow-focus)";
                  target.style.backgroundColor = "var(--color-input-bg-focus)";
                }}
                onBlur={(e) => {
                  const target = e.currentTarget;
                  target.style.borderColor = "var(--color-border-input)";
                  target.style.boxShadow = "none";
                  target.style.backgroundColor = "var(--color-input-bg)";
                }}
              >
                <input
                  type="tel"
                  id="mobileInput"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter your mobile number"
                  required
                  className="w-full border-none py-3.5 pr-1 text-base bg-transparent outline-none font-medium tracking-wide"
                  style={{
                    color: "var(--color-text-muted)",
                  }}
                />
              </div>
            </div>

            {/* Send OTP Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-semibold text-[1.1rem] tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                color: "var(--color-text-green)",
                border: "1px solid var(--color-border-card)",
                borderRadius: "var(--radius-button)",
                backgroundColor: isLoading
                  ? "var(--color-primary-soft)"
                  : "transparent",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.backgroundColor = "var(--color-primary-dark)";
                target.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                if (!isLoading) {
                  target.style.backgroundColor = "transparent";
                  target.style.color = "var(--color-text-green)";
                }
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-base" />
                  <span>Send OTP</span>
                </>
              )}
            </button>

            {/* Language Selector */}
            <div
              className="flex items-center justify-center gap-2.5 py-2.5 mt-1 rounded-xl font-medium text-[0.95rem] cursor-default transition-colors duration-200"
              style={{
                backgroundColor: "var(--color-lang-bg)",
                color: "var(--color-text-lang)",
                border: "1px solid var(--color-border-lang)",
                borderRadius: "var(--radius-button)",
              }}
            >
              <FaGlobe style={{ color: "var(--color-primary-light)" }} />
              <span>Language</span>
              <span
                className="px-4 py-0.5 rounded-xl font-semibold text-[0.9rem] tracking-wide"
                style={{
                  backgroundColor: "var(--color-badge-bg)",
                  color: "var(--color-text-badge)",
                  borderRadius: "var(--radius-badge)",
                  letterSpacing: "0.3px",
                }}
              >
                English
              </span>
              <FaChevronDown
                className="text-[0.7rem] ml-0.5"
                style={{ color: "#568a5e" }}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
