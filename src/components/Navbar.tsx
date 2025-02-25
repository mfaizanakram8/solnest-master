"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "@/firebase/config"; // Ensure this is your Firebase config file

const Navbar = () => {
  const router = useRouter(); // Initialize the router
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Firebase authentication check
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    router.push("/"); // Navigate to the home page after logout
  };

  const handleUserPanelNavigation = async () => {
    router.push("/user"); // Navigate to the user panel page
  };

  // Check if it's the home page
  const isHomePage = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md py-6 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="Logo"
          className="h-16 w-16"
          width={200}
          height={200}
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 font-semibold">
        {[
          { href: "/", label: "Overview" },
          { href: "/#earn", label: "Analytics & Profits" },
          { href: "/#feature", label: "Top Features" },
          { href: "/#pricing", label: "Costs & Charges" },
          { href: "/#faqs", label: "Common Questions" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm transition-colors duration-300 ${
              isHomePage
                ? isScrolled
                  ? "text-slate-500"
                  : "text-white"
                : "text-black"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Right-side Links (Login/Logout + Start The Bot) */}
      <div className="hidden md:flex items-center space-x-6">
        {user ? (
          isHomePage ? (
            <button
              onClick={handleUserPanelNavigation}
              className="text-sm font-semibold text-white hover:text-gray-300 transition-colors duration-300"
            >
              User Panel
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-red-500 hover:text-gray-300 transition-colors duration-300"
            >
              Logout
            </button>
          )
        ) : (
          <Link
            href="/signin"
            className={`text-sm font-semibold transition-colors duration-300 ${
              isHomePage
                ? isScrolled
                  ? "text-slate-500"
                  : "text-white"
                : "text-black"
            }`}
          >
            Login
          </Link>
        )}

        {/* CTA Button */}
        <Link
          href="/Start"
          className="bg-gradient-to-r from-pink-500 to-green-400 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          Start The Bot
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 text-lg">
          <button
            title="close"
            className="absolute top-4 right-6 text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </button>

          {[
            { href: "#home", label: "Overview" },
            { href: "#earn", label: "Analytics & Profits" },
            { href: "#feature", label: "Top Features" },
            { href: "#pricing", label: "Costs & Charges" },
            { href: "#faqs", label: "Common Questions" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-gray-300 text-white"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}

          {/* Login / Logout in Mobile Menu */}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="hover:text-gray-300 text-red-500"
            >
              User Panel
            </button>
          ) : (
            <Link
              href="/signin"
              className="hover:text-gray-300 text-white"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}

          {/* Start The Bot Button in Mobile Menu */}
          <Link
            href="/Start"
            className="bg-gradient-to-r from-pink-500 to-green-400 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Start The Bot
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
