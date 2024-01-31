import { Song, SongAlt } from "../../types/types";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useSelector } from "react-redux";
import DropItem from "../dropItem/DropItem";
import { useMusicContext } from "../../context/MusicContext";

interface SliderListProps {
  music: Song[];
  header: string;
}

export default function SliderList({ music, header }: SliderListProps) {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  return (
    <>
      <section className="slider-list">
        <div>
          <h2 className="big-header-white">{header}</h2>
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
          {music &&
            music?.map((song: Song, i) => (
              <SplideSlide key={song.id}>
                <DropItem
                  key={song.id}
                  song={song}
                  music={music}
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
