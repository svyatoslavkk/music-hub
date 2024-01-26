import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useState } from "react";
import kizaru from "../../assets/big-baby-tape-kizaru-99-problems.mp3";
import weeknd from "../../assets/Blinding-Lights.mp3";
import doja from "../../assets/doja-cat-paint-the-town-red.mp3";

export default function PreviewSlider() {
  const [currIndex, setCurrIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const slides = [
    {
      url: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
      track: "Blinding Lights",
      artists: "The Weeknd",
      soundFile: weeknd,
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/ru/8/8f/Bandana_I.jpg",
      track: "99 Problems",
      artists: "Big Baby Tape, kizaru",
      soundFile: kizaru,
    },
    {
      url: "https://i.discogs.com/2Eg2LaIQgHdkFLh98icp1rGjlwIGq_8UFlLH7zGMyP4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI4NTcw/MDE1LTE2OTcxMTYy/NjUtNDE5NS5qcGVn.jpeg",
      track: "Paint The Town Red",
      artists: "Doja Cat",
      soundFile: doja,
    },
  ];

  const goToPrev = () => {
    const isFirst = currIndex === 0;
    const newIndex = isFirst ? slides.length - 1 : currIndex - 1;
    setCurrIndex(newIndex);
  };

  const goToNext = () => {
    const isLast = currIndex === slides.length - 1;
    const newIndex = isLast ? 0 : currIndex + 1;
    setCurrIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrIndex(slideIndex);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="preview-slider">
      <div className="preview-image-block">
        <img
          src={slides[currIndex].url}
          className="preview-img"
          alt="Track Image"
        />
        <div className={`preview-slider-content`}>
          <div>
            <div className="flex-content">
              <h2>{slides[currIndex].track}</h2>
              <div className="music-anim">
                {Array.from({ length: 9 }, (_, index) => (
                  <span key={index}></span>
                ))}
              </div>
            </div>
            <p>{slides[currIndex].artists}</p>
          </div>
          <button className="transparent-btn" onClick={toggleMute}>
            {isMuted ? (
              <VolumeOffIcon sx={{ color: "#969696" }} />
            ) : (
              <VolumeUpIcon sx={{ color: "#969696" }} />
            )}
          </button>
        </div>
        <audio
          muted={isMuted}
          controls
          autoPlay
          src={slides[currIndex].soundFile}
        ></audio>
      </div>
      <div className="switch-content">
        <div className="flex-content">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`slide-page ${i === currIndex ? "active" : ""}`}
              onClick={() => goToSlide(i)}
            ></span>
          ))}
        </div>
        <div className="flex-content">
          <button className="border-btn" onClick={goToPrev}>
            <KeyboardArrowLeftIcon sx={{ color: "#969696" }} />
          </button>
          <button className="border-btn" onClick={goToNext}>
            <KeyboardArrowRightIcon sx={{ color: "#969696" }} />
          </button>
        </div>
      </div>
      <div className="gradient-overlay"></div>
    </div>
  );
}
