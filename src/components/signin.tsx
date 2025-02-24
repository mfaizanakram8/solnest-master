"use client";
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/config";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Meteors } from "./ui/meteors";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SigninFormDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/user"); // Redirect to user.tsx after login
    } catch (err) {
      setError((err as any).message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/"); // Redirect to user.tsx after Google login
    } catch (err) {
      setError((err as any).message);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Solnest
      </h2>
      <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
        Revolutionizing Crypto 🚀
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <form className="my-8" onSubmit={handleSignin}>
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-green-400 w-full text-white rounded-md h-10 font-medium"
        >
          Login &rarr;
        </button>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignin}
            type="button"
            className="flex items-center justify-center w-full bg-gray-50 dark:bg-zinc-900 h-10 rounded-md shadow-input"
          >
            Sign in with Google
          </button>
        </div>
      </form>

      <p>
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-gradient bg-clip-text bg-gradient-to-r from-purple-500 to-green-400"
        >
          Signup
        </Link>
      </p>
      <Meteors number={20} />
    </div>
  );
}

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col space-y-2 w-full">{children}</div>
);
