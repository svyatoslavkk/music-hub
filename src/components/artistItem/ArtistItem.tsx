export default function ArtistItem({ drop }) {
  return (
    <div className="column-content">
      <img src={drop.img} className="mid-circle-img" alt={drop.name} />
      <span className="small-text-white">{drop.name}</span>
    </div>
  );
}
