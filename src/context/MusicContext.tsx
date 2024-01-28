import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase/firebase";

const MusicContext = createContext<
  | {
      fetchMusic: any[];
      getMusicData: () => Promise<void>;
    }
  | undefined
>(undefined);

export const MusicProvider: React.FC<any> = ({ children }) => {
  const [fetchMusic, setFetchMusic] = useState([]);
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

  useEffect(() => {
    getMusicData();
  }, []);

  return (
    <MusicContext.Provider value={{ fetchMusic, getMusicData }}>
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
