import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useSelector } from "react-redux";
import "@splidejs/react-splide/css";
import DropItem from "../dropItem/DropItem";
import kizaru from "../../assets/big-baby-tape-kizaru-99-problems.mp3";
import weeknd from "../../assets/Blinding-Lights.mp3";
import doja from "../../assets/doja-cat-paint-the-town-red.mp3";
import triTelefona from "../../assets/scally-milano-voskresenskii-tri-telefona.mp3";

interface SliderListProps {
  header: string;
}

export default function SliderList({ header }: SliderListProps) {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const slides = [
    {
      key: 1,
      url: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
      track: "Blinding Lights",
      artists: "The Weeknd",
      soundFile: weeknd,
    },
    {
      key: 2,
      url: "https://upload.wikimedia.org/wikipedia/ru/8/8f/Bandana_I.jpg",
      track: "99 Problems",
      artists: "Big Baby Tape, kizaru",
      soundFile: kizaru,
    },
    {
      key: 3,
      url: "https://i.discogs.com/2Eg2LaIQgHdkFLh98icp1rGjlwIGq_8UFlLH7zGMyP4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI4NTcw/MDE1LTE2OTcxMTYy/NjUtNDE5NS5qcGVn.jpeg",
      track: "Paint The Town Red",
      artists: "Doja Cat",
      soundFile: doja,
    },
    {
      key: 4,
      url: "https://images.genius.com/231de282b39e5166343ddb68a40eefd7.1000x1000x1.png",
      track: "Три Телефона",
      artists: "Scally Milano, Voskresenskii",
      soundFile: triTelefona,
    },
  ];

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
          {slides.map((song, i) => (
            <SplideSlide key={song.track}>
              <DropItem
                key={song.key}
                song={song}
                slides={slides}
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
