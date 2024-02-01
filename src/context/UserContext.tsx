import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { app, database } from "../firebase/firebase";
import { User } from "../types/types";

const UserContext = createContext<
  | {
      user: User;
      users: User[];
      setUsers: any;
      fireData: any[];
    }
  | undefined
>(undefined);

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [fireData, setFireData] = useState<any[]>([]);
  const collectionRef = collection(database, "Users Data");

  const getUsers = async () => {
    try {
      const snapshot = await getDocs(collectionRef);
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error getting users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const myData =
    users.length > 0 ? users.filter((data) => data.uid === user?.uid)[0] : null;
  const userDocRef = myData ? myData.docId : null;

  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (token) {
      const auth = getAuth(app);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        setUsers,
        fireData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useMusicContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
