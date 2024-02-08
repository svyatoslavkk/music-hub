import { TopFiveChartProps } from "../../types/interfaces";
import { ArtistAlt, SongAlt } from "../../types/types";

export default function Chart({ topFiveSongsDetails }: TopFiveChartProps) {
  const totalListens = topFiveSongsDetails.reduce(
    (acc: number, item: SongAlt) =>
      acc + (typeof item.count === "number" ? item.count : 0),
    0,
  );

  return (
    <section className="chart">
      <div>
        <h2 className="big-header-white">Most listenable last week</h2>
      </div>
      <div className="stats">
        {topFiveSongsDetails.map((item: SongAlt) => {
          if (typeof item.count !== "number") return null;
          const barHeight = (item.count / totalListens) * 100 * 2;
          return (
            <div className="info">
              <div
                className="bar small-header-white"
                style={{ height: `${barHeight}px` }}
              >
                {item.count ? item.count : 0}
              </div>
              <img
                src={item?.img}
                className="bar-image small-circle-img"
                alt="Song Cover"
              />
              {item?.artists && item?.name && (
                <div className="pop-info">
                  <h3 className="small-header-white">{item?.name}</h3>
                  <div className="artists">
                    {item?.artists.map((artist: ArtistAlt, i: number) => (
                      <span key={i} className="small-text-white">
                        {artist?.profile?.name || artist?.name}
                        {i < item?.artists.length - 1 ? (
                          <span className="small-text-white">, </span>
                        ) : (
                          ""
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="line"></div>
    </section>
  );
}
