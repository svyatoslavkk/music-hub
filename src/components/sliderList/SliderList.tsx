import React, { useEffect, useState } from "react";
import { Song } from "../../types/types";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useSelector } from "react-redux";
import DropItem from "../dropItem/DropItem";

interface SliderListProps {
  music: Song[];
  header: string;
}

export default function SliderList({ music, header }: SliderListProps) {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const [splideOptions, setSplideOptions] = useState({
    type: "slide",
    perMove: 1,
    height: "17.3rem",
    pagination: true,
    gap: "0.5rem",
    arrows: false,
    autoWidth: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 624) {
        setSplideOptions({
          type: "loop",
          perMove: 1,
          rewind: true,
          height: "10.6rem",
          pagination: false,
          gap: "0.5rem",
          autoWidth: true,
        });
      } else if (screenWidth >= 624) {
        setSplideOptions({
          type: "loop",
          perMove: 1,
          rewind: true,
          height: "11.6rem",
          pagination: false,
          gap: "0.5rem",
          autoWidth: true,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section className="slider-list">
        <div>
          <h2 className="big-header-white">{header}</h2>
        </div>
        <Splide options={splideOptions} aria-labelledby="basic-example-heading">
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
