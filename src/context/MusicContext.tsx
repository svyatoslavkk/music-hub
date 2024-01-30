import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { app, database } from "../firebase/firebase";
import { Song, SongAlt } from "../types/types";

const MusicContext = createContext<
  | {
      user: any;
      users: any[];
      setUsers: any;
      fireData: any[];
      fetchMusic: Song[];
      allMusic: SongAlt[];
      fetchData: () => Promise<void>;
      getMusicData: () => Promise<void>;
      getAllMusic: () => Promise<void>;
    }
  | undefined
>(undefined);

export const MusicProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [fireData, setFireData] = useState<any[]>([]);
  const [fetchMusic, setFetchMusic] = useState([]);
  const [allMusic, setAllMusic] = useState([]);
  const collectionRef = collection(database, "Users Data");
  const musicCollectionRef = collection(database, "Music Data");

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

  const fetchData = async () => {
    try {
      const response = await getDocs(collectionRef);
      setFireData(
        response.docs.map((data) => ({ ...data.data(), id: data.id })),
      );
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  const getMusicData = async () => {
    try {
      const musicDocSnapshot = await getDocs(musicCollectionRef);
      const musicDoc = musicDocSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const targetMusic = musicDoc.find(
        (item) => item.id === "Ma7QsebecH8zxAYi5hd0",
      );
      const musicArray = targetMusic?.data?.[0]?.popularMusic || [];
      setFetchMusic(musicArray);
    } catch (error) {
      console.error("Error getting posts document:", error);
    }
  };

  const getAllMusic = async () => {
    try {
      const musicDocSnapshot = await getDocs(musicCollectionRef);
      const musicDoc = musicDocSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const targetMusic = musicDoc.find(
        (item) => item.id === "3GYHK0jYEV5qV4bc5nCG",
      );
      const musicArray = targetMusic?.allMusic || [];
      setAllMusic(musicArray);
    } catch (error) {
      console.error("Error getting posts document:", error);
    }
  };

  useEffect(() => {
    getUsers();
    getMusicData();
    getAllMusic();
  }, []);

  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (token) {
      fetchData();

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
    <MusicContext.Provider
      value={{
        user,
        users,
        setUsers,
        fireData,
        fetchData,
        fetchMusic,
        allMusic,
        getMusicData,
        getAllMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
