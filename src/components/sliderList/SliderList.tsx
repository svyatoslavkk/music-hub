import { useEffect, useState } from "react";
import { Song } from "../../types/types";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useSelector } from "react-redux";
import "@splidejs/react-splide/css";
import DropItem from "../dropItem/DropItem";

interface SliderListProps {
  header: string;
}

export default function SliderList({ header }: SliderListProps) {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
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

  console.log("fetchMusic", fetchMusic);

  useEffect(() => {
    getMusicData();
  }, []);

  return (
    <>
      <section className="slider-list">
        <div>
          <h2 className="mid-header-white">{header}</h2>
        </div>
        <Splide
          options={{
            type: "loop",
            perMove: 1,
            rewind: true,
            height: "10.6rem",
            pagination: false,
            gap: "0.5rem",
            autoWidth: true,
          }}
          aria-labelledby="basic-example-heading"
        >
          {fetchMusic &&
            fetchMusic?.map((song: Song, i) => (
              <SplideSlide key={song.id}>
                <DropItem
                  key={song.id}
                  song={song}
                  fetchMusic={fetchMusic}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  i={i}
                />
              </SplideSlide>
            ))}
        </Splide>
      </section>
    </>
  );
}
