import React, { useEffect, useState } from "react";
import { Song } from "../../types/types";
import { useSelector } from "react-redux";
import DropItem from "../dropItem/DropItem";
import TrackListItem from "../trackListItem/TrackListItem";

export default function Popular({ music }) {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  return (
    <section className="popular">
      <div>
        <h2 className="big-header-white">Popular</h2>
      </div>
      <div className="column-content">
        {music &&
          music
            ?.slice(0, 5)
            .map((song: Song, i) => (
              <TrackListItem
                key={song.id}
                song={song}
                filteredAllMusic={music}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
              />
            ))}
      </div>
    </section>
  );
}
