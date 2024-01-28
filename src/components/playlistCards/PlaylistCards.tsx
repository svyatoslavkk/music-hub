import plImgFirst from "../../assets/pl_image_first.jpg";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import plImgSecond from "../../assets/pl_image_second.jpg";
import plImgThird from "../../assets/pl_image_third.jpg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function PlaylistCards() {
  const plCardsContent = [
    {
      number: 17,
      name: "Chill Mix",
      img: plImgFirst,
      bgClr: "#FD9C02",
    },
    {
      number: 21,
      name: "Gamer Mix",
      img: plImgSecond,
      bgClr: "#DC225A",
    },
    {
      number: 16,
      name: "Future Mix",
      img: plImgThird,
      bgClr: "#234EFF",
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
          <SplideSlide>
            <div className="pl-card" style={{ backgroundColor: el.bgClr }}>
              <div className="pl-card-info" style={{ padding: 8 }}>
                <span className="small-text-white">{el.number} tracks</span>
                <h3 className="big-header-white">{el.name}</h3>
                <button className="circle-btn">
                  <PlayArrowRoundedIcon />
                  <p className="small-text">Play</p>
                </button>
              </div>
              <img className="pl-card-img" src={el.img} alt="Pl Img" />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}
