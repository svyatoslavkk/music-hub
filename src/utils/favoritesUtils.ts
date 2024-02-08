import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { SongAlt, ArtistAlt, User } from "../types/types";

export const isFavoriteSong = (myData: any, song: SongAlt) => {
  return myData?.favTracks.some((favTrack: SongAlt) => favTrack.id === song.id);
};

export const handleAddToFavorites = async (
  userDocRef: any,
  myData: any,
  user: User,
  song: SongAlt,
  setUsers: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  if (userDocRef) {
    const favoriteMusicData = {
      id: song?.id,
      img: song?.img,
      name: song?.name,
      soundFile: song?.soundFile,
      duration: song?.duration,
      artists: song?.artists.map((artist: ArtistAlt) => ({
        name: artist?.profile?.name || artist?.name,
        uri: artist?.profile?.uri || artist?.uri,
      })),
    };
    try {
      if (isFavoriteSong(myData, song)) {
        await updateDoc(userDocRef, {
          favTracks: arrayRemove(favoriteMusicData),
        });
      } else {
        await updateDoc(userDocRef, {
          favTracks: arrayUnion(favoriteMusicData),
        });
      }

      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        const userIndex = updatedUsers.findIndex((u) => u.uid === user?.uid);
        if (userIndex !== -1) {
          const updatedUserData = {
            ...myData,
            favTracks: isFavoriteSong(myData, song)
              ? myData.favTracks.filter(
                  (favTrack: SongAlt) => favTrack.id !== favoriteMusicData.id,
                )
              : [...myData.favTracks, favoriteMusicData],
          };
          updatedUsers[userIndex] = updatedUserData;
        }
        return updatedUsers;
      });
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  }
};
