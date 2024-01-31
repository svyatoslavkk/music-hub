import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

interface GenresProps {
  uniqueArtistsArray: string[];
  handleGenreClick: (genre: string) => void;
}

export default function Genres({
  uniqueArtistsArray,
  handleGenreClick,
}: GenresProps) {
  const [initialRandomArtists, setInitialRandomArtists] = useState<string[]>(
    [],
  );
  const [randomArtists, setRandomArtists] = useState<string[]>([]);

  useEffect(() => {
    if (initialRandomArtists.length === 0) {
      const getRandomArtists = (artistsArray: string[]) => {
        const artistsCopy = [...artistsArray];
        const getRandomInt = (max: number) => {
          return Math.floor(Math.random() * max);
        };

        const newRandomArtists: string[] = [];
        for (let i = 0; i < 7 && artistsCopy.length > 0; i++) {
          const randomIndex = getRandomInt(artistsCopy.length);
          const randomArtist = artistsCopy.splice(randomIndex, 1)[0];
          newRandomArtists.push(randomArtist);
        }

        return newRandomArtists;
      };

      const initialArtists = getRandomArtists(uniqueArtistsArray);
      setInitialRandomArtists(initialArtists);
      setRandomArtists(initialArtists);
    }
  }, [initialRandomArtists, setInitialRandomArtists, uniqueArtistsArray]);

  return (
    <section className="genres">
      <Splide
        options={{
          type: "loop",
          perMove: 1,
          rewind: true,
          height: "2.0rem",
          pagination: false,
          gap: "0.5rem",
          autoWidth: true,
          arrows: false,
        }}
        aria-labelledby="basic-example-heading"
      >
        {randomArtists.length > 0 &&
          randomArtists.map((item) => (
            <SplideSlide
              key={item}
              className="genre"
              onClick={() => handleGenreClick(item)}
            >
              <span className="small-header-white">{item}</span>
            </SplideSlide>
          ))}
      </Splide>
    </section>
  );
}
