import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            minute: 0,
            second: 0
        },
        totalTime: {
            minute: 0,
            second: 0
        }
    });

    const Play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const Pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithID = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previous = () => {
        let currentIndex = songsData.findIndex(song => song.id === track.id);
        let prevIndex = (currentIndex - 1 + songsData.length) % songsData.length;
        setTrack(songsData[prevIndex]);
        audioRef.current.play();
        setPlayStatus(true);
    };

    const next = () => {
        let currentIndex = songsData.findIndex(song => song.id === track.id);
        let nextIndex = (currentIndex + 1) % songsData.length;
        setTrack(songsData[nextIndex]);
        audioRef.current.play();
        setPlayStatus(true);
    };

    const seekSong = async (e) => {
        audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.clientWidth) * audioRef.current.duration;
    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime({
                    currentTime: {
                        minute: Math.floor(audioRef.current.currentTime / 60),
                        second: Math.floor(audioRef.current.currentTime % 60)
                    },
                    totalTime: {
                        minute: Math.floor(audioRef.current.duration / 60),
                        second: Math.floor(audioRef.current.duration % 60)
                    }
                })
            }
        }, 1000);
    }, [audioRef])

    const ContextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        Play, Pause,
        playWithID,
        previous, next,
        seekSong
    }

    return (
        <PlayerContext.Provider value={ContextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;