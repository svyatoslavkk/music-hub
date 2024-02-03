import { Artist, ArtistAlt } from "../../types/types";

export default function Chart({ topFiveSongsDetails }) {
  const fakeArray = [
    {
      times: 65,
      artist: "Trippie Redd",
      name: "The Grinch",
      img: "https://yt3.googleusercontent.com/ENGKGVmKTfkPvzLNMtg_m4DrDgbyNfcTMCHV79hfAlECCsDMa5eSDTHkEgCWw6P_G-KVs0IKdN0=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      times: 12,
      artist: "Travis Scott",
      name: "5% TINT",
      img: "https://i.guim.co.uk/img/media/8af2fea5e5793ec99aaaa931006433d4932fd508/128_270_2702_1621/master/2702.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=4747f7b0c001ecb2b46921a86d122a75",
    },
    {
      times: 35,
      artist: "Drake",
      name: "One Dance",
      img: "https://hips.hearstapps.com/hmg-prod/images/drake_photo_by_prince_williams_wireimage_getty_479503454.jpg",
    },
    {
      times: 50,
      artist: "OG Buda",
      name: "Пинк Флойд",
      img: "https://the-flow.ru/uploads/images/resize/830x0/adaptiveResize/16/09/40/41/55/156005c40cd7.jpg",
    },
    {
      times: 200,
      artist: "Instasamka",
      name: "LIPSI HI",
      img: "https://i0.wp.com/lyricsbyletras.com/wp-content/uploads/2022/06/ef2dd3afe145061096121dd88dc00342.1000x1000x1.jpg?fit=1000%2C1000&ssl=1",
    },
  ];

  const sorted = fakeArray.sort((a, b) => b.times - a.times);

  return (
    <section className="chart">
      <div>
        <h2 className="big-header-white">Most listenable last week</h2>
      </div>
      <div className="stats">
        {topFiveSongsDetails.map((item) => (
          <div className="info">
            <div
              className="bar small-header-white"
              style={{ height: item.count * 10 }}
            >
              {item.count}
            </div>
            <img
              src={item?.img}
              className="bar-image small-circle-img"
              alt="Song Cover"
            />
            {item?.artists && item?.name && (
              <div className="pop-info">
                <h3 className="small-header-white">{item?.name}</h3>
                <div>
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
        ))}
      </div>
      <div className="line"></div>
    </section>
  );
}
