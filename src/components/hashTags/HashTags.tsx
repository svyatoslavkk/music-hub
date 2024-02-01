import { Link } from "react-router-dom";

export default function HashTags() {
  const hashs = [
    "OG Buda",
    "Travis Scott",
    "Instasamka",
    "Trippie Redd",
    "Playboi Carti",
    "21 Savage",
  ];
  return (
    <section className="hashtags">
      <div>
        <h2 className="big-header-white">Hashtags</h2>
      </div>
      <div className="hashtags-list">
        {hashs.map((hash) => (
          <Link
            key={hash}
            to={`/explore?hash=${encodeURIComponent(hash)}`}
            className="genre"
            style={{ textDecoration: "none" }}
          >
            <span className="small-header-white">{hash}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
