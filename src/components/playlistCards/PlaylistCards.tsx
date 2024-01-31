import plImgFirst from "../../assets/pl_image_first.jpg";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import plImgSecond from "../../assets/pl_image_second.jpg";
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
  ];

  return (
    <section className="playlist-cards">
      <div>
        <h2 className="mid-header-white">Playlists for You</h2>
      </div>
      <Splide
        options={{
          perPage: 1,
          perMove: 1,
          type: "fade",
          rewind: true,
          height: "14.3rem",
          pagination: true,
          gap: "0.5rem",
        }}
        aria-labelledby="basic-example-heading"
      >
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
