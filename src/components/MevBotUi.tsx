'use client';

import Image from 'next/image';

export default function MevBotUi() {
  return (
    <section className="bg-white text-black py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
           <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400'>Solnest</span>:The Top MEV Bot on Solana, Stay Ahead of the Game and Boost Your Profits Effortlessly.
        </h1>
        <p className="text-lg mt-4">Launch Your Profitable MEV Bot Journey in Just <strong className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400'>30 Seconds!</strong></p>
        <p className="mt-2 text-gray-700">
          Join the <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400 font-semibold'>Solnest</span>  Solana Bot on Telegram and start automated trading instantly.
          Unlock maximum profits with the fastest MEV strategies on Solana.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center md:odd:translate-y-8">
          <Image src="/ko.png" alt="Fund Your Wallet" width={400} height={400} className="mx-auto" />
          <h3 className="text-xl font-semibold mt-4">1. <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400'>Fund Your Wallet</span> </h3>
          <p className="text-gray-600 mt-2">Open SwiftX MEV bot & deposit SOL to your wallet or import your private key.</p>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center md:even:translate-y-8">
          <Image src="/ko1.png" alt="Select MEV Strategy" width={400} height={400} className="mx-auto" />
          <h3 className="text-xl font-semibold mt-4">2. <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400'> Select MEV Strategy</span></h3>
          <p className="text-gray-600 mt-2">Choose from frontrun, arbitrage & more to start trading instantly.</p>
        </div>
      </div>
    </section>
  );
}
