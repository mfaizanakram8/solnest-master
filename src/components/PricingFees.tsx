import React from "react";
import Image from "next/image";

const PricingFees = () => {
  return (
    <section className="bg-white text-black py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">
          Pricing{" "}
          <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">
            &
          </span>{" "}
          Fees
        </h2>
        <p className="mt-4 text-gray-600">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400 text-xl font-semibold">
            Solnest
          </span>{" "}
          provides a clear and straightforward pricing model where you only pay when you profit.
          With a low minimum deposit and zero hidden fees, you can trade confidently and focus entirely on maximizing your earnings.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md text-center">
          <Image
            src="/3.png"
            alt="Minimum Deposit"
            width={192} // approx 48 * 4 (assuming default scale)
            height={192}
            className="mx-auto"
          />
          <h3 className="mt-4 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">
            Minimum Deposit
          </h3>
          <p className="mt-2 text-gray-600">
            Begin your automated trading journey with as little as <strong>2 SOL</strong>, giving you access to SwiftX.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-md text-center">
          <Image
            src="/4.png"
            alt="Simple Fee Structure"
            width={192}
            height={192}
            className="mx-auto"
          />
          <h3 className="mt-4 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">
            Simple Fee Structure
          </h3>
          <p className="mt-2 text-gray-600">
            We charge a <strong>2% profit fee</strong>, with no hidden costs, ensuring full transparency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingFees;
