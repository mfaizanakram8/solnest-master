import { db } from "./firebase/config";
import { doc, updateDoc, deleteDoc, getDoc, collection, getDocs } from "firebase/firestore";

interface UserData {
  id: string;
  email: string;
  investedAmount?: number;
  profit?: number;
  withdraw?: number;
}

// Get all registered users
export const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    
    return usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as UserData[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Update any user's data (for admin)
export const updateUserData = async (userId: string, newData: Partial<UserData>) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, newData);
    console.log(`User ${userId} data updated successfully!`);
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

// Get specific user data
export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    return userSnap.exists() ? ({ id: userSnap.id, ...userSnap.data() } as UserData) : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// Remove a user's data
export const removeUserData = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
    console.log(`User ${userId} data removed successfully!`);
  } catch (error) {
    console.error("Error removing user data:", error);
    throw error;
  }
};
