export default function DropItem({ drop }) {
  return (
    <>
      <div className="drop-item">
        <img className="large-sq-img" src={drop.url} alt={drop.track} />
        <div className="drop-item-overlay"></div>
        <div className="info">
          <div className="text">
            <h3 className="small-header-white">{drop.track}</h3>
            <span className="small-text-white">{drop.artists}</span>
          </div>
        </div>
      </div>
    </>
  );
}
