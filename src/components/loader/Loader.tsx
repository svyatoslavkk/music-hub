import "./loader.scss";

export default function Loader() {
  return (
    <div className="spinner">
      <svg viewBox="25 25 50 50" className="circular">
        <circle
          stroke-miterlimit="10"
          stroke-width="3"
          fill="none"
          r="20"
          cy="50"
          cx="50"
          className="path"
        ></circle>
      </svg>
    </div>
  );
}
