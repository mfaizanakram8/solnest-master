"use client";
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/config";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Meteors } from "./ui/meteors";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";

export function SignupFormDemo() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data in Firestore with default values
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        plan: "Basic Plan",
        totalInvestment: 0,
        profitLoss: 0,
        totalWithdrawals: 0,
        solanaBalance: 0,
      });

      router.push("/signin"); // Redirect to signin after signup
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // If user does not exist, create Firestore document with default values
        await setDoc(userRef, {
          email: user.email,
          plan: "Basic Plan",
          totalInvestment: 0,
          profitLoss: 0,
          totalWithdrawals: 0,
          solanaBalance: 0,
        });
      }

      router.push("/signin"); // Redirect to signin after Google signup
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Solnest
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Revolutionizing Crypto 🚀
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <form className="my-8 space-y-4" onSubmit={handleSignup}>
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </LabelInputContainer>


        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-green-400 w-full text-white rounded-md h-10 font-medium"
        >
          Sign Up &rarr;
        </button>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignup}
            type="button"
            className="flex items-center justify-center w-full bg-gray-50 dark:bg-zinc-900 h-10 rounded-md shadow-input"
          >
            <IconBrandGoogle className="h-4 w-4 mr-2" />
            Sign up with Google
          </button>
        </div>
      </form>

      <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="text-gradient bg-clip-text bg-gradient-to-r from-purple-500 to-green-400"
        >
          Login
        </Link>
      </p>

      <Meteors number={20} />
    </div>
  );
}

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col space-y-2 w-full">{children}</div>
);
