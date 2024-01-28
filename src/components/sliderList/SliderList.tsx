import DropItem from "../dropItem/DropItem";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

interface SliderListProps {
  header: string;
}

export default function SliderList({ header }: SliderListProps) {
  const slides = [
    {
      url: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
      track: "Blinding Lights",
      artists: "The Weeknd",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/ru/8/8f/Bandana_I.jpg",
      track: "99 Problems",
      artists: "Big Baby Tape, kizaru",
    },
    {
      url: "https://i.discogs.com/2Eg2LaIQgHdkFLh98icp1rGjlwIGq_8UFlLH7zGMyP4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI4NTcw/MDE1LTE2OTcxMTYy/NjUtNDE5NS5qcGVn.jpeg",
      track: "Paint The Town Red",
      artists: "Doja Cat",
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
          {slides.map((drop) => (
            <SplideSlide>
              <DropItem drop={drop} />
            </SplideSlide>
          ))}
        </Splide>
      </section>
    </>
  );
}
