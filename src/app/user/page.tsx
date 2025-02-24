"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

interface UserData {
  id: string;
  plan?: string;
  investedAmount?: number;
  profit?: number;
  withdraw?: number;
  solanaBalance?: number;
}

export default function UserPanel() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [solanaAddress, setSolanaAddress] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(""); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchCurrentUser = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUsers([{ id: userSnap.id, ...userSnap.data() }] as UserData[]);
      } else {
        console.log("No such user document!");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawRequest = async () => {
    if (!withdrawAmount || !solanaAddress || !selectedPlan) {
      alert("Please enter the withdrawal amount, Solana address, and select a plan!");
      return;
    }
  
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid withdrawal amount!");
      return;
    }
  
    if (!currentUser) {
      alert("User not authenticated!");
      return;
    }
  
    // Get the current user's Solana balance
    const user = users[0]; // Since users array contains only the current user
    if (!user || user.solanaBalance === undefined) {
      alert("Solana balance not available. Please refresh and try again.");
      return;
    }
  
    if (amount > user.solanaBalance) {
      alert("Withdrawal amount exceeds available Solana balance!");
      return;
    }
  
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        withdrawalRequests: arrayUnion({
          amount,
          address: solanaAddress,
          plan: selectedPlan,
          timestamp: new Date().toISOString(),
          status: "Pending",
        }),
      });
      console.log("Submitted",selectedPlan);
      alert("Withdrawal request submitted!");
      setWithdrawAmount("");
      setSolanaAddress("");
      setSelectedPlan(""); // Reset plan selection
      setIsModalOpen(false); // Close modal after submission
    } catch (err) {
      alert("Failed to submit withdrawal request. Try again.");
    }
  };
  

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 mt-28">
      <h2  className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">User Panel</h2>
      <button
        onClick={() => {
          if(currentUser){
          setLoading(true);
          fetchCurrentUser(currentUser.uid);
          }
          else{
            console.log("User not authenticated");
          }
        }}
       className="block mx-auto  bg-gradient-to-r from-purple-500 to-green-400 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Refresh
      </button>
      <div className="overflow-x-auto my-6 border rounded-lg shadow-md">
        <table  className="w-full border-collapse text-left">
          <thead>
            <tr className=" bg-gradient-to-r from-purple-500 to-green-400 text-white"><th className="border p-2">Plan</th><th className="border p-2">Invested Amount</th><th className="border p-2">Profit</th><th className="border p-2">Withdraw</th><th className="border p-2">Solana Balance</th></tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="border p-2">{user.plan ?? "-"}</td>
                <td className="border p-2">{user.investedAmount ?? "-"} SOL</td>
                <td className="border p-2">{user.profit ?? "-"} SOL</td>
                <td className="border p-2">{user.withdraw ?? "-"} SOL</td>
                <td className="border p-2">{user.solanaBalance ?? "-"} SOL</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Withdraw Request Button */}
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Withdraw Request</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-green-400 px-6 py-3 rounded-md text-white hover:opacity-80"
        >
          Make Request
        </button>
      </div>

      {/* Withdrawal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>

            {/* Amount Input */}
            <input
              type="number"
              placeholder="Enter amount in SOL"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="p-2 w-full rounded-md border-gray-300 bg-gray-100 text-black mb-3"
            />

            {/* Solana Address Input */}
            <input
              type="text"
              placeholder="Enter Solana Address"
              value={solanaAddress}
              onChange={(e) => setSolanaAddress(e.target.value)}
              className="p-2 w-full rounded-md border-gray-300 bg-gray-100 text-black mb-3"
            />

              {/* Plan Selection Dropdown 🆕 */}
              <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="p-2 w-full rounded-md border-gray-300 bg-gray-100 text-black mb-3"
            >
              <option value="">Select Plan</option>
              <option value="Basic">Nest Starter</option>
              <option value="Silver">Golden Nest</option>
              <option value="Gold">Royal Nest</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handleWithdrawRequest}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
