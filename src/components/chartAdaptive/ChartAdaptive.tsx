import { chartAdaptiveData } from "../../constants/constants";

export default function ChartAdaptive() {
  return (
    <section className="chart">
      <div>
        <h2 className="big-header-white" style={{ textAlign: "center" }}>
          Here you can see your most listened tracks
        </h2>
      </div>
      <div className="stats" style={{ opacity: 0.2 }}>
        {chartAdaptiveData.map((el) => {
          const barHeight = (el.count / 100) * 100 * 2;
          return (
            <div className="info">
              <div
                className="bar small-header-white"
                style={{ height: `${barHeight}px` }}
              >
                {el.count}
              </div>
              <img
                src={el.img}
                className="bar-image small-circle-img"
                alt="Song Cover"
              />
            </div>
          );
        })}
      </div>
      <div className="line"></div>
    </section>
  );
}
