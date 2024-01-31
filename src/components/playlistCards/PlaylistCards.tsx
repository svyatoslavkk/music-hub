import React, { useEffect, useState } from "react";
import plImgFirst from "../../assets/pl_image_first.jpg";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import plImgSecond from "../../assets/pl_image_second.jpg";
import plImgThird from "../../assets/pl_image_third.jpg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { useMusicContext } from "../../context/MusicContext";

export default function PlaylistCards() {
  const { welcomePlaylists } = useMusicContext();

  const firstPlaylist = welcomePlaylists[1] || {
    id: "defaultId1",
    name: "Default Playlist 1",
  };
  const secondPlaylist = welcomePlaylists[0] || {
    id: "defaultId0",
    name: "Default Playlist 0",
  };

  const plCardsContent = [
    {
      playlistId: firstPlaylist.id,
      number: 17,
      name: "Chill Mix",
      miniDesc: "Just relax and listen",
      img: plImgFirst,
      bgClr: "#FD9C02",
      link: `/${firstPlaylist.id}`,
    },
    {
      playlistId: secondPlaylist.id,
      number: 21,
      name: "Gamer Mix",
      miniDesc: "Listen while you play",
      img: plImgSecond,
      bgClr: "#DC225A",
      link: `/${secondPlaylist.id}`,
    },
    {
      playlistId: secondPlaylist.id,
      number: 10,
      name: "Dance Mix",
      miniDesc: "For your energy",
      img: plImgThird,
      bgClr: "#234EFF",
      link: `/${secondPlaylist.id}`,
    },
  ];

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
          type: "slide",
          perMove: 1,
          rewind: true,
          height: "14.3rem",
          pagination: true,
          gap: "0.5rem",
          arrows: false,
          autoWidth: false,
        });
      } else if (screenWidth >= 624 && screenWidth < 924) {
        setSplideOptions({
          type: "loop",
          perMove: 1,
          rewind: true,
          height: "17.3rem",
          pagination: true,
          gap: "1rem",
          arrows: false,
          autoWidth: true,
        });
      } else {
        setSplideOptions({
          type: "loop",
          perMove: 1,
          rewind: true,
          height: "18.0rem",
          pagination: false,
          gap: "1.25rem",
          arrows: true,
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
    <section className="playlist-cards">
      <div>
        <h2 className="big-header-white">Playlists for You</h2>
      </div>
      <Splide options={splideOptions} aria-labelledby="basic-example-heading">
        {plCardsContent.map((el) => (
          <SplideSlide key={el.name}>
            <Link
              to={el.link}
              className="pl-card"
              style={{ backgroundColor: el.bgClr, textDecoration: "none" }}
            >
              <div className="pl-card-info" style={{ padding: 8 }}>
                <span className="small-text-white">{el.number} tracks</span>
                <div className="play flex-content">
                  <button
                    className="blur-circle-btn"
                    style={{ backgroundColor: "#d0d2d8" }}
                  >
                    <PlayArrowRoundedIcon
                      sx={{ color: "#190b14" }}
                      fontSize="medium"
                    />
                  </button>
                  <div>
                    <h3 className="mid-header-white">{el.name}</h3>
                    <p className="small-text-white">{el.miniDesc}</p>
                  </div>
                </div>
              </div>
              <div
                className="pl-card-overlay"
                style={{
                  background: `linear-gradient(to top, ${el.bgClr}, ${el.bgClr}00)`,
                }}
              ></div>
              <img className="pl-card-img" src={el.img} alt="Pl Img" />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}
