export default function Speed() {
    return (
      <section className="bg-white text-black py-16 px-8 lg:px-24 text-center">
        {/* Heading */}
        <h2 className="text-2xl lg:text-3xl font-semibold">
          Unbeatable Speed <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400"> &gt; </span> Outstanding Profits{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400"> &gt; </span> Unlock The <br />Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">Solnest</span> Today
        </h2>
  
        {/* Stats Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StatCard title="Total Profits" value="$464,786" />
          <StatCard title="Total Users" value="3,186" />
          <StatCard title="Total Attacks" value="148,152" />
        </div>
      </section>
    );
  }
  
  // Stat Card Component
  type StatCardProps = {
    title: string;
    value: string;
  };
  
  const StatCard = ({ title, value }: StatCardProps) => {
    return (
      <div className="bg-black/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">{title}</h3>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
    );
  };
  