import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { app, database } from "../firebase/firebase";
import { ArtistAlt, Playlist, SongAlt, User } from "../types/types";

const MusicContext = createContext<
  | {
      user: User;
      users: User[];
      setUsers: React.Dispatch<SetStateAction<User[]>>;
      fireData: any[];
      fetchMusic: SongAlt[];
      allMusic: SongAlt[];
      newestMusic: SongAlt[];
      mightMusic: SongAlt[];
      welcomePlaylists: Playlist[];
      isExpanded: boolean;
      fetchData: () => Promise<void>;
      getMusicData: () => Promise<void>;
      getAllMusic: () => Promise<void>;
      getPlaylists: () => Promise<void>;
      togglePlayerView: () => Promise<void>;
      isLoading: boolean;
    }
  | undefined
>(undefined);

export const MusicProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [fireData, setFireData] = useState<any[]>([]);
  const [fetchMusic, setFetchMusic] = useState<SongAlt[]>([]);
  const [allMusic, setAllMusic] = useState<SongAlt[]>([]);
  const [newestMusic, setNewestMusic] = useState<SongAlt[]>([]);
  const [mightMusic, setMightMusic] = useState<SongAlt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [welcomePlaylists, setWelcomePlaylists] = useState<Playlist[]>([]);

  const [isExpanded, setIsExpanded] = useState(false);
  const collectionRef = collection(database, "Users Data");
  const musicCollectionRef = collection(database, "Music Data");
  const playlistsCollectionRef = collection(database, "Playlist Data");

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
        (item) => item.id === "3GYHK0jYEV5qV4bc5nCG",
      );
      const musicArray = targetMusic?.allMusic || [];
      const popularMixSongs = musicArray.filter(
        (song: SongAlt) => song.playlist === "Popular Mix",
      );
      setFetchMusic(popularMixSongs);
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
      console.error("Error getting popular music:", error);
    }
  };

  const getNewestMusic = async () => {
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
      const sortedMusic = musicArray.sort((a, b) => {
        const dateA = new Date(
          parseInt(a?.release_date?.split("-")[2]),
          parseInt(a?.release_date?.split("-")[1]) - 1,
          parseInt(a?.release_date?.split("-")[0]),
        );
        const dateB = new Date(
          parseInt(b?.release_date?.split("-")[2]),
          parseInt(b?.release_date?.split("-")[1]) - 1,
          parseInt(b?.release_date?.split("-")[0]),
        );
        return dateB - dateA;
      });
      setNewestMusic(sortedMusic);
    } catch (error) {
      console.error("Error getting new music:", error);
    }
  };

  const getMightLikeMusic = async () => {
    setIsLoading(true);
    try {
      const favArtists = new Set(
        myData?.favTracks
          ? myData.favTracks.flatMap((track) =>
              track.artists.map((artist: ArtistAlt) => artist.name),
            )
          : [],
      );

      const recentArtists = new Set(
        myData?.recentTracks
          ? myData.recentTracks.flatMap((song) =>
              song.artists.map((artist: ArtistAlt) => artist.name),
            )
          : [],
      );

      const filterByArtists = (
        musicArray: SongAlt[],
        artistsSet: Set<string>,
      ) =>
        musicArray.filter((song) =>
          song.artists.some((artist: ArtistAlt) =>
            artistsSet.has(artist.profile.name),
          ),
        );

      const filteredByFavArtists = filterByArtists(allMusic, favArtists);
      const filteredByRecentArtists = filterByArtists(allMusic, recentArtists);

      const filteredMusicByFavRecent = [
        ...filteredByFavArtists,
        ...filteredByRecentArtists,
      ];

      const uniqueRecs = Array.from(
        new Map(
          filteredMusicByFavRecent.map((song) => [song.id, song]),
        ).values(),
      );

      const favTracks = myData?.favTracks || [];
      const isNotInFavTracks = (song: SongAlt) =>
        !favTracks.some((favTrack) => favTrack.id === song.id);

      const newRecsNotInFav = uniqueRecs.filter(isNotInFavTracks);

      const shuffleArray = (array: SongAlt[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const shuffledUniqueRecs = shuffleArray(newRecsNotInFav);
      const getMusic = shuffledUniqueRecs.slice(0, 10);
      setMightMusic(getMusic);
    } catch (error) {
      console.error("Error getting might like music:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getPlaylists = async () => {
    try {
      const playlistDocSnapshot = await getDocs(playlistsCollectionRef);
      const playlistDoc = playlistDocSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const targetMusic = playlistDoc.find(
        (item) => item.id === "Rf5DvjfzNQey8DYUyTwX",
      );
      const playlistsArray = targetMusic?.welcomePlaylists || [];
      setWelcomePlaylists(playlistsArray);
    } catch (error) {
      console.error("Error getting posts document:", error);
    }
  };

  const togglePlayerView = async () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  useEffect(() => {
    getMusicData();
    getAllMusic();
    getPlaylists();
    getNewestMusic();
    getMightLikeMusic();
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
        newestMusic,
        mightMusic,
        welcomePlaylists,
        isExpanded,
        getMusicData,
        getAllMusic,
        getPlaylists,
        togglePlayerView,
        isLoading,
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
