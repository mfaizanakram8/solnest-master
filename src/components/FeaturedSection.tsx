'use client';

import Image from 'next/image';
import { FaRobot, FaTachometerAlt, FaExchangeAlt, FaUser } from 'react-icons/fa';

export default function MevBotUi() {
  return (
    <section className="bg-white text-black py-16 px-6 flex flex-col md:flex-row items-center justify-center md:space-x-12">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-3xl font-bold ">Key <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400'>Features</span> </h1>
        <p className="text-lg mt-4 text-gray-700">
          Solnest delivers automated trading, lightning-fast <br /> execution, and seamless cross-platform integration, <br />empowering you to capitalize on every opportunity <br />on Solana.
        </p>
        <div className="mt-12 space-y-8 relative">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500 text-white p-4 rounded-full"><FaRobot size={24} /></div>
            <div>
              <h3 className="text-lg font-semibold">Automated Trading</h3>
              <p className="text-gray-600">Solnest front-runs and back-runs trades automatically.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500 text-white p-4 rounded-full"><FaTachometerAlt size={24} /></div>
            <div>
              <h3 className="text-lg font-semibold">Ultra-Fast Execution</h3>
              <p className="text-gray-600">Uses the Jito validator for the fastest possible trades.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500 text-white p-4 rounded-full"><FaExchangeAlt size={24} /></div>
            <div>
              <h3 className="text-lg font-semibold">Cross-Platform Integration</h3>
              <p className="text-gray-600">Works with Jupiter, Raydium, and Orca for more <br /> opportunities.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500 text-white p-4 rounded-full"><FaUser size={24} /></div>
            <div>
              <h3 className="text-lg font-semibold">User-Friendly</h3>
              <p className="text-gray-600">Ideal for both beginners and experienced traders.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Image src="/2.png" alt="SwiftX Features" width={400} height={400} />
      </div>
    </section>
  );
}
