import React, { useState } from "react";
import { auth } from "@site/src/utils/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "@site/src/contexts/AuthContext";
import { Redirect } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Login() {
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { siteConfig } = useDocusaurusContext();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        hd: "iiit-bh.ac.in",
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (!email.endsWith("@iiit-bh.ac.in")) {
        await auth.signOut();
        setError("Please use your IIIT Bhubaneswar email address to login");
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Login failed. Please ensure you are using your IIIT-BH email.");
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div
      className="container"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "var(--ifm-background-color)",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          background: "var(--ifm-background-surface-color)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            marginBottom: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/img/iiit 128x128.svg"
            alt="IIIT-BH Logo"
            style={{
              width: "100px",
              height: "100px",
              marginBottom: "24px",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
            }}
          />
          <h1
            style={{
              marginBottom: "16px",
              fontSize: "28px",
              fontWeight: "600",
              color: "var(--ifm-heading-color)",
              lineHeight: "1.3",
            }}
          >
            Welcome to {siteConfig.title}
          </h1>
          <p
            style={{
              marginBottom: "32px",
              color: "var(--ifm-color-emphasis-700)",
              fontSize: "16px",
              maxWidth: "280px",
            }}
          >
            Sign in with your IIIT-BH institutional email to access interview
            experiences
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          style={{
            padding: "14px 28px",
            backgroundColor: "#1a73e8",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            fontSize: "16px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "280px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#1557b0";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#1a73e8";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          }}
        >
          <svg
            style={{ marginRight: "12px" }}
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Sign in with Google
        </button>

        {error && (
          <div
            style={{
              color: "#d32f2f",
              marginTop: "24px",
              padding: "12px 16px",
              backgroundColor: "rgba(211, 47, 47, 0.08)",
              borderRadius: "8px",
              fontSize: "14px",
              border: "1px solid rgba(211, 47, 47, 0.2)",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}