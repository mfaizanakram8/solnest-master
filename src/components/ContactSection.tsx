'use client'
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandInstagram,
  IconMail,
} from "@tabler/icons-react";

const ContactSection = () => {
  const links = [
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Email",
      icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
  ];

  return (
    <section className="bg-white text-black py-12 px-6 text-center ">
      <h2 className="text-3xl font-bold">Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">Touch</span></h2>
      <p className="mt-4 text-gray-600 max-w-xl mx-auto">
        Need assistance? Reach out to us, and we’re here to help with any questions or support you need.
      </p>
      
      <div className="flex justify-center mt-6">
        <FloatingDock mobileClassName="translate-y-20" items={links} />
      </div>
      
      <div className="mt-10 border-t pt-4 text-gray-500">
        Copyright © 2025. All rights reserved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">Solnest.</span>
      </div>
    </section>
  );
};

export default ContactSection;
