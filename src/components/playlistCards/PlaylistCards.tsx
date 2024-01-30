import plImgFirst from "../../assets/pl_image_first.jpg";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import plImgSecond from "../../assets/pl_image_second.jpg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { useMusicContext } from "../../context/MusicContext";

export default function PlaylistCards() {
  const { welcomePlaylists } = useMusicContext();
  const id = welcomePlaylists.map((el) => {
    el.id;
  });
  console.log("welcomePlaylists", welcomePlaylists);

  const plCardsContent = [
    {
      playlistId: welcomePlaylists[1].id,
      number: 17,
      name: "Chill Mix",
      img: plImgFirst,
      bgClr: "#FD9C02",
      link: `/${welcomePlaylists[1].id}`,
    },
    {
      playlistId: welcomePlaylists[0].id,
      number: 21,
      name: "Gamer Mix",
      img: plImgSecond,
      bgClr: "#DC225A",
      link: `/${welcomePlaylists[0].id}`,
    },
  ];

  return (
    <section className="playlist-cards">
      <Splide
        options={{
          perPage: 1,
          perMove: 1,
          type: "fade",
          rewind: true,
          height: "13.7rem",
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
                <h3 className="big-header-white">{el.name}</h3>
                <button className="circle-btn">
                  <PlayArrowRoundedIcon />
                  <p className="small-text">Play</p>
                </button>
              </div>
              <img className="pl-card-img" src={el.img} alt="Pl Img" />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}
