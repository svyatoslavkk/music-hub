import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase/firebase";

const MusicContext = createContext<
  | {
      fetchMusic: any[];
      allMusic: any[];
      getMusicData: () => Promise<void>;
      getAllMusic: () => Promise<void>;
    }
  | undefined
>(undefined);

export const MusicProvider: React.FC<any> = ({ children }) => {
  const [fetchMusic, setFetchMusic] = useState([]);
  const [allMusic, setAllMusic] = useState([]);
  const musicCollectionRef = collection(database, "Music Data");

  const getMusicData = async () => {
    try {
      const musicDocSnapshot = await getDocs(musicCollectionRef);
      const musicDoc = musicDocSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const musicArray = musicDoc[0]?.data?.[0]?.popularMusic || [];
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
    getMusicData();
    getAllMusic();
  }, []);

  return (
    <MusicContext.Provider
      value={{ fetchMusic, allMusic, getMusicData, getAllMusic }}
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
