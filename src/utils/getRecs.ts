import { ArtistAlt, SongAlt, User } from "../types/types";

export const getRecs = (myData: User, allMusic: SongAlt[]) => {
  const favArtists = myData?.favTracks
    ? Array.from(
        new Set(
          myData?.favTracks.flatMap((track: SongAlt) =>
            track.artists.map((artist: ArtistAlt) => artist.name),
          ),
        ),
      )
    : [];

  const recentArtists = myData?.recentTracks
    ? Array.from(
        new Set(
          myData?.recentTracks.flatMap((track: SongAlt) =>
            track.artists.map((artist: ArtistAlt) => artist.name),
          ),
        ),
      )
    : [];

  const favArtistsSet = new Set(favArtists);
  const recentArtistsSet = new Set(recentArtists);

  const filterByArtists = (musicArray: SongAlt[], artistsSet: any) =>
    musicArray.filter((song: SongAlt) =>
      song.artists.some((artist: ArtistAlt) =>
        artistsSet.has(artist.profile.name),
      ),
    );

  const filteredByFavArtists = filterByArtists(allMusic, favArtistsSet);
  const filteredByRecentArtists = filterByArtists(allMusic, recentArtistsSet);
  const filteredMusicByFavRecent = [
    ...filteredByFavArtists,
    ...filteredByRecentArtists,
  ];

  const uniqueRecs = Array.from(
    new Map(filteredMusicByFavRecent.map((song) => [song.id, song])).values(),
  );

  const favTracks = myData?.favTracks || [];
  const isNotInFavTracks = (song: SongAlt) =>
    !favTracks.some((favTrack) => favTrack.id === song.id);
  const newRecsNotInFav = uniqueRecs.filter(isNotInFavTracks);

  function shuffleArray(array: SongAlt[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledUniqueRecs = shuffleArray(newRecsNotInFav);
  const mightMusic = shuffledUniqueRecs.slice(0, 10);
  return mightMusic;
};
