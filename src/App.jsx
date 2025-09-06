import React, { useContext, useEffect } from "react";
import SideBar from "./components/SideBar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const { audioRef, track, Play, Pause, playStatus } = useContext(PlayerContext);

  // ✅ Handle spacebar play/pause toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault(); // prevent page scroll
        if (playStatus) {
          Pause();
        } else {
          Play();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playStatus, Play, Pause]);

  return (
    <div className="h-screen bg-black">
      {/* Main layout */}
      <div className="h-[90%] flex">
        <SideBar />
        <Display />
      </div>

      {/* Music Player */}
      <Player />

      {/* 🎵 Audio element controlled by context */}
      <audio
        ref={audioRef}
        src={track.file}  // ✅ confirmed "file" field
        preload="auto"
        onLoadedData={() => {
          console.log("Audio loaded:", track.file);
        }}
        onError={() => {
          console.error("Error loading audio:", track.file);
        }}
      />
    </div>
  );
};

export default App;
