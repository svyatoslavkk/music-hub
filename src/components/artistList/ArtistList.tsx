import ArtistItem from "../artistItem/ArtistItem";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

interface ArtistListProps {
  header: string;
}

export default function ArtistList({ header }: ArtistListProps) {
  const artists = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/The_Weeknd_Portrait_by_Brian_Ziff.jpg/220px-The_Weeknd_Portrait_by_Brian_Ziff.jpg",
      name: "The Weeknd",
    },
    {
      img: "https://cdns-images.dzcdn.net/images/artist/a538ec3bf7d84faf8ff85457ef8cbe12/500x500.jpg",
      name: "kizaru",
    },
    {
      img: "https://m.media-amazon.com/images/M/MV5BOWRiMzRlZGUtNjA1Zi00OGJlLTg3Y2QtYjQ3MDNhOTQ1OWVjXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_FMjpg_UX1000_.jpg",
      name: "Dua Lipa",
    },
  ];

  return (
    <section className="slider-list">
      <div>
        <h2 className="big-header-white">{header}</h2>
      </div>
      <Splide
        options={{
          type: "loop",
          perMove: 1,
          rewind: true,
          height: "6.8rem",
          pagination: false,
          gap: "1.25rem",
          autoWidth: true,
        }}
        aria-labelledby="basic-example-heading"
      >
        {artists.map((drop) => (
          <SplideSlide key={drop.name}>
            <ArtistItem drop={drop} />
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}
