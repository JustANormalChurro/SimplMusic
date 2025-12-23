import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { ytmusic } from '../api/ytmusic';
import type { Song } from '../api/ytmusic';

interface PlayerContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    volume: number;
    currentTime: number;
    duration: number;
    playSong: (song: Song) => Promise<void>;
    togglePlay: () => void;
    setVolume: (volume: number) => void;
    seek: (time: number) => void;
    nextSong: () => void;
    prevSong: () => void;
    addToQueue: (song: Song) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [queue, setQueue] = useState<Song[]>([]);
    const [volume, setVolumeState] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio();

        const audio = audioRef.current;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleEnded = () => nextSong();
        const handleLoadedMetadata = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);

    const playSong = async (song: Song) => {
        // Optimistic update
        setCurrentSong(song);
        setIsPlaying(true);

        try {
            // Fetch streaming data
            const songData = await ytmusic.getSong(song.videoId);

            // Find best audio format
            const formats = songData.streamingData?.adaptiveFormats || [];
            const audioFormat = formats.find((f: any) => f.mimeType.includes('audio/mp4')) ||
                                formats.find((f: any) => f.mimeType.includes('audio'));

            if (audioFormat && audioRef.current) {
                audioRef.current.src = audioFormat.url;
                audioRef.current.volume = volume;
                audioRef.current.play().catch(e => console.error("Playback failed", e));

                // Fetch watch playlist (queue) if queue is empty
                if (queue.length === 0) {
                     const watchData = await ytmusic.getWatchPlaylist(song.videoId);
                     if (watchData.tracks) {
                         // transform watch tracks to Song interface
                         const newQueue = watchData.tracks.map((t: any) => ({
                             videoId: t.videoId,
                             title: t.title,
                             artists: t.artists,
                             thumbnails: t.thumbnail,
                             duration: t.length
                         }));
                         // Remove current song from start of queue if present to avoid immediate repeat logic issues
                         const filteredQueue = newQueue.filter((s: Song) => s.videoId !== song.videoId);
                         setQueue(filteredQueue);
                     }
                }
            } else {
                console.error("No suitable audio format found");
            }
        } catch (error) {
            console.error("Error playing song:", error);
            setIsPlaying(false);
        }
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const setVolume = (val: number) => {
        setVolumeState(val);
        if (audioRef.current) {
            audioRef.current.volume = val;
        }
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const nextSong = () => {
        if (queue.length > 0) {
            const next = queue[0];
            setQueue(prev => prev.slice(1));
            playSong(next);
        }
    };

    const prevSong = () => {
        // Simplified previous: just restart song for now if > 3s, else nothing (no history implemented yet)
        if (audioRef.current) {
             if (audioRef.current.currentTime > 3) {
                 audioRef.current.currentTime = 0;
             }
        }
    };

    const addToQueue = (song: Song) => {
        setQueue(prev => [...prev, song]);
    };

    return (
        <PlayerContext.Provider value={{
            currentSong,
            isPlaying,
            queue,
            volume,
            currentTime,
            duration,
            playSong,
            togglePlay,
            setVolume,
            seek,
            nextSong,
            prevSong,
            addToQueue
        }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};
