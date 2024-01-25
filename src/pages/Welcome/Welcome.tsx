import { useGetTopTracksQuery } from "../../redux/api/api";

export default function Welcome() {
  const {
    data: topTracks,
    isLoading: topTracksLoading,
    error: topTracksError,
  } = useGetTopTracksQuery({});
  if (topTracksLoading) {
    return <p>Loading...</p>;
  }
  if (topTracksError) {
    return <p>Loading...</p>;
  }
  console.log("topTracks", topTracks);
  return <div>Welcome</div>;
}
