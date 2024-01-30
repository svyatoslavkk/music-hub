import "./loader.scss";

export default function TinyLoader() {
  return (
    <div className="tiny-spinner">
      <svg viewBox="25 25 50 50" className="tiny-circular">
        <circle
          stroke-miterlimit="10"
          stroke-width="5"
          fill="none"
          r="20"
          cy="50"
          cx="50"
          className="tiny-path"
        ></circle>
      </svg>
    </div>
  );
}
