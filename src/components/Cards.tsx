"use client";
import { animate, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GoCopilot } from "react-icons/go";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/config"; // Ensure you have Firebase initialized

export function CardDemo() {

  const auth = getAuth(app);
  const [userEmail, setUserEmail] = useState("guest@example.com");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "guest@example.com");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (cardTitle: string) => {
    const targetAppUrl = `${process.env.NEXT_PUBLIC_CASH_APP_URL}/?email=${encodeURIComponent(userEmail)}`;
    window.location.href = targetAppUrl;
  };

  return (
    <div className="flex justify-center items-center">
      <Card
        className="cursor-pointer hover:shadow-lg transition"
        onClick={() => handleClick("Basic Plan")}
      >
        <CardSkeletonContainer>
          <Skeleton />
        </CardSkeletonContainer>
        <CardTitle>Damn good card</CardTitle>
        <CardDescription>
          A card that showcases a set of tools that you use to create your product.
        </CardDescription>
        <Link href={"#" } className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">Learn more</Link>
      </Card>
      <Card
       className="cursor-pointer hover:shadow-lg transition"
       onClick={() => handleClick("Silver Plan")}
      >
        <CardSkeletonContainer>
          <Skeleton />
        </CardSkeletonContainer>
        <CardTitle>Cool Card</CardTitle>
        <CardDescription>
          A card showcasing some awesome tools for your project.
        </CardDescription>
        <Link href={"#"} className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">Learn more</Link>
      </Card>
      <Card
        className="cursor-pointer hover:shadow-lg transition"
        onClick={() => handleClick("Gold Plan")}
      >
        <CardSkeletonContainer>
          <Skeleton />
        </CardSkeletonContainer>
        <CardTitle>Awesome Card</CardTitle>
        <CardDescription>
          An amazing card to display your work and achievements.
        </CardDescription>
        <Link href={"#"} className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">Learn more</Link>
      </Card>
    </div>
  );
}

const Skeleton = () => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-4",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-5",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    animate(sequence, {
      // @ts-ignore
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);

  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        <Container className="h-8 w-8 circle-1">
          <ClaudeLogo className="h-4 w-4 " />
        </Container>
        <Container className="h-12 w-12 circle-2">
          <GoCopilot className="h-6 w-6 dark:text-white" />
        </Container>
        <Container className="circle-3">
          <OpenAILogo className="h-8 w-8 dark:text-white" />
        </Container>
        <Container className="h-12 w-12 circle-4">
          <MetaIconOutline className="h-6 w-6 " />
        </Container>
        <Container className="h-8 w-8 circle-5">
          <GeminiLogo className="h-4 w-4 " />
        </Container>
      </div>

      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};

const Sparkles = () => {
  const [sparkles, setSparkles] = useState<{
    id: number;
    top: string;
    left: string;
    opacity: number;
    scale: number[];
  }[]>([]);

  useEffect(() => {
    const randomMove = () => Math.random() * 2 - 1;
    const randomOpacity = () => Math.random();
    const random = () => Math.random();

    const newSparkles = [...Array(12)].map((_, i) => ({
      id: i,
      top: `calc(${random() * 100}% + ${randomMove()}px)`,
      left: `calc(${random() * 100}% + ${randomMove()}px)`,
      opacity: randomOpacity(),
      scale: [1, 1.2, 0],
    }));

    setSparkles(newSparkles);
  }, []);

  return (
    <div className="absolute inset-0">
      {sparkles.map((sparkle) => (
        <motion.span
          key={`star-${sparkle.id}`}
          animate={{
            top: sparkle.top,
            left: sparkle.left,
            opacity: sparkle.opacity,
            scale: sparkle.scale,
          }}
          transition={{
            duration: Math.random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: sparkle.top,
            left: sparkle.left,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-black dark:bg-white"
        ></motion.span>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-800 dark:text-white py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-[15rem] md:h-[20rem] rounded-xl z-40",
        className,
        showGradient &&
          "bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]`,
        className
      )}
    >
      {children}
    </div>
  );
};

const ClaudeLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 512 512"
      className={className}
    >
      <rect fill="#CC9B7A" width="512" height="512" rx="104.187" ry="105.042" />
      <path
        fill="#1F1F1E"
        fillRule="nonzero"
        d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z"
      />
    </svg>
  );
};

const OpenAILogo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.586 11.544a5.56 5.56 0 0 1-7.393-3.394l-.883 1.373a3.847 3.847 0 0 0-3.205-1.677A3.83 3.83 0 0 0 6.57 11.06a3.84 3.84 0 0 0 1.59 4.788 3.845 3.845 0 0 0 5.458-.557l.89 1.373a5.56 5.56 0 0 1 7.394-3.392zm-2.034 6.014a5.56 5.56 0 0 1-7.394 3.393l-.888-1.373a3.837 3.837 0 0 0-5.459.558A3.841 3.841 0 0 0 6.57 20.94a3.83 3.83 0 0 0 3.206 1.679 3.843 3.843 0 0 0 5.459-.557l.889-1.373a5.56 5.56 0 0 1 7.394-3.392z"
      />
    </svg>
  );
};

const MetaIconOutline = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40"
    width="40"
    viewBox="0 0 24 24"
    className={className}
  >
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5v14M20 5v14M4 12l8 7 8-7"
      ></path>
    </g>
  </svg>
);

const GeminiLogo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    className={className}
  >
    <path
      fill="currentColor"
      d="M35.054 27.768l-5.275-5.276a1.778 1.778 0 0 0-2.521 2.52l3.608 3.61H4.59l3.608-3.61a1.778 1.778 0 0 0-2.521-2.52L4.946 27.768A8.74 8.74 0 0 0 7.263 19.94c1.803-3.605 5.25-6.263 9.429-6.263 5.016 0 9.128 3.273 10.465 7.789 1.336 4.517.489 9.277-3.103 12.242z"
    />
  </svg>
);
