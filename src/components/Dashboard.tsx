"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { getAllUsers, updateUserData } from "../UserService";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

interface UserData {
  id: string;
  email: string;
  walletAddress?: string;
  investedAmount?: number;
  profit?: number;
  withdraw?: number;
  solanaBalance?: number;
}

interface WithdrawRequest {
  id: string;
  userId: string;
  amount: number;
  status: string;
  timestamp: string;
  email?: string;
  plan: string;
  address?: string;  // Add this line
}
interface Transaction {
  id: string;
  senderEmail: string;
  senderPublicKey: string;
  receiverPublicKey: string;
  card: string;
  amount: number;
  status: string;
  timestamp: string;
}

const ADMIN_EMAIL = "solnestofficial@gmail.com";

export default function AdminDashboard() {
  const router = useRouter(); // Initialize router
  const [users, setUsers] = useState<UserData[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        if (user.email !== ADMIN_EMAIL) {
          router.push("/"); 
        } else {
          setCurrentUser(user);
          fetchUsers();
          fetchWithdrawRequests();
          fetchTransactions(); // Fetch transactions
          setLoading(false);
        }
      } else {
        router.push("/login"); // Redirect unauthenticated users to login
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUsers = async () => {
    try {
      const userData: UserData[] = await getAllUsers();
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      const transactionList: Transaction[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        transactionList.push({
          id: doc.id,
          senderEmail: data.senderEmail || "Unknown",
          senderPublicKey: data.senderPublicKey,
          receiverPublicKey: data.receiverPublicKey,
          card: data.card,
          amount: data.amount,
          status: data.status,
          timestamp: data.timestamp,
        });
      });

      setTransactions(transactionList);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchWithdrawRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const requests: WithdrawRequest[] = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (
          userData.withdrawalRequests &&
          Array.isArray(userData.withdrawalRequests)
        ) {
          userData.withdrawalRequests.forEach((request: WithdrawRequest) => {
            requests.push({
              id: request.id, // Include request ID
              userId: doc.id, // Attach user ID
              email: userData.email, // Attach user email
              plan: request.plan || "N/A", // Include plan
              amount: request.amount,
              address: request.address || "",
              status: request.status,
              timestamp: request.timestamp,
            });
          });
        }
      });

      setWithdrawRequests(requests);
    } catch (error) {
      console.error("Error fetching withdraw requests:", error);
    }
  };
  const handleUpdate = async (
    userId: string,
    field: keyof UserData,
    value: string
  ) => {
    try {
      const updatedValue = Number(value);
      if (isNaN(updatedValue)) return;
      await updateUserData(userId, { [field]: updatedValue });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, [field]: updatedValue } : user
        )
      );
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleWithdrawAction = async (
    userId: string,
    requestTimestamp: string,
    newStatus: string
  ) => {
    if (!confirm("Are you sure you want to approve this withdrawal?")) {
      return;
    }
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.error("User not found");
        return;
      }

      const userData = userSnap.data();

      if (
        !userData.withdrawalRequests ||
        !Array.isArray(userData.withdrawalRequests)
      ) {
        console.error("No withdrawal requests found or invalid format");
        return;
      }

      // Update the request with the new status
      const updatedRequests = userData.withdrawalRequests.map(
        (req: WithdrawRequest) =>
          req.timestamp === requestTimestamp
            ? { ...req, status: newStatus }
            : req
      );

      // Save back to Firestore
      await updateDoc(userRef, { withdrawalRequests: updatedRequests });

      // Update UI
      setWithdrawRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.timestamp === requestTimestamp
            ? { ...req, status: newStatus }
            : req
        )
      );

      console.log("Withdrawal request updated successfully");
    } catch (error) {
      console.error("Error updating withdrawal request:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <button
        onClick={() => {
          setLoading(true);
          fetchUsers();
          fetchWithdrawRequests();
        }}
        className="bg-gradient-to-r from-purple-500 to-green-400 text-white px-4 py-2 rounded mb-4"
      >
        Refresh
      </button>
      <div  className="overflow-x-auto my-6 border rounded-lg shadow-md">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gradient-to-r from-purple-500 to-green-400 text-white"> 
              <th className="border p-2">Email</th>
              <th className="border p-2">Invested Amount</th>
              <th className="border p-2">Profit</th>
              <th className="border p-2">Withdraw</th>
              <th className="border p-2">Solana Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <input
                  aria-label="Enter your name"
                    type="number"
                    value={user.investedAmount ?? ""}
                    onChange={(e) =>
                      handleUpdate(user.id, "investedAmount", e.target.value)
                    }
                    className="border p-2 w-full bg-purple-500  text-white"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    aria-label="Enter your name"
                    value={user.profit ?? ""}
                    onChange={(e) =>
                      
                      handleUpdate(user.id, "profit", e.target.value)
                    }
                    className="border p-2 w-full bg-purple-500  text-white"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    aria-label="Enter your name"
                    value={user.withdraw ?? ""}
                    onChange={(e) =>
                      handleUpdate(user.id, "withdraw", e.target.value)
                    }
                    className="border p-2 w-full bg-purple-500  text-white"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={user.solanaBalance ?? ""}
                    aria-label="Enter your name"
                    onChange={(e) =>
                      handleUpdate(user.id, "solanaBalance", e.target.value)
                    }
                    className="border p-2 w-full bg-purple-500  text-white"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="text-xl font-bold mb-2">Withdrawal Requests</h3>
      <div className="overflow-x-auto my-6 border rounded-lg shadow-md">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gradient-to-r from-purple-500 to-green-400 text-white">
            <th className="border p-2">Email</th>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
          {withdrawRequests.map((request) => (
              <tr key={request.timestamp} className="border">
                <td className="border p-2">{request.email}</td>
                <td className="border p-2">{request.plan}</td>
                <td className="border p-2">{request.amount} SOL</td>
                <td className="border p-2">{request.address || "N/A"}</td>
                <td className="border p-2">{request.status}</td>
                <td className="border p-2">
                  {request.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleWithdrawAction(
                            request.userId,
                            request.timestamp,
                            "Approved"
                          )
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Approve
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="text-xl font-bold mb-2">Transaction History</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-black text-white">
              <th className="border p-2">Sender Email</th>
              <th className="border p-2">Sender Public Key</th>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Amount (SOL)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border">
                <td className="border p-2">{transaction.senderEmail || "Unknown"}</td>
                <td className="border p-2">{transaction.senderPublicKey}</td>
                <td className="border p-2">{transaction.card}</td>
                <td className="border p-2">{transaction.amount} SOL</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
