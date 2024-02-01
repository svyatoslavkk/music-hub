import React, { useEffect, useState } from "react";
import { Song } from "../../types/types";
import { useSelector } from "react-redux";
import DropItem from "../dropItem/DropItem";

export default function GridBlock({ music }) {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  return (
    <section className="grid-block">
      <div>
        <h2 className="big-header-white">Newest</h2>
      </div>
      <div className="grid-list">
        {music &&
          music
            ?.slice(0, 4)
            .map((song: Song, i: number) => (
              <DropItem
                key={song.id}
                song={song}
                music={music}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
              />
            ))}
      </div>
    </section>
  );
}
