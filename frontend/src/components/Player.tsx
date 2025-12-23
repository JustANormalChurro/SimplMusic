import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Repeat, Shuffle } from 'lucide-react';

const Player = () => {
    const { currentSong, isPlaying, togglePlay, volume, setVolume, currentTime, duration, seek, nextSong, prevSong } = usePlayer();

    if (!currentSong) return null;

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        seek(Number(e.target.value));
    };

    const thumbnail = currentSong.thumbnails ? currentSong.thumbnails[currentSong.thumbnails.length - 1].url : '';
    const artistName = Array.isArray(currentSong.artists) ? currentSong.artists.map(a => a.name).join(', ') : 'Unknown Artist';

    return (
        <div className="h-24 bg-[#18181b] border-t border-gray-800 flex items-center px-4 fixed bottom-0 w-full z-50 backdrop-blur-lg bg-opacity-95">
            {/* Song Info */}
            <div className="flex items-center w-1/3 gap-4">
                <img src={thumbnail} alt={currentSong.title} className="w-14 h-14 rounded-md shadow-lg object-cover" />
                <div className="flex flex-col overflow-hidden">
                    <span className="text-white font-medium truncate text-sm">{currentSong.title}</span>
                    <span className="text-gray-400 text-xs truncate hover:text-white cursor-pointer transition-colors">{artistName}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center w-1/3">
                <div className="flex items-center gap-6 mb-2">
                    <button className="text-gray-400 hover:text-white transition-colors" title="Shuffle">
                        <Shuffle className="w-4 h-4" />
                    </button>
                    <button onClick={prevSong} className="text-gray-400 hover:text-white transition-colors">
                        <SkipBack className="w-5 h-5" />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        {isPlaying ? <Pause className="w-5 h-5 text-black fill-current" /> : <Play className="w-5 h-5 text-black fill-current ml-1" />}
                    </button>
                    <button onClick={nextSong} className="text-gray-400 hover:text-white transition-colors">
                        <SkipForward className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors" title="Repeat">
                        <Repeat className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex items-center gap-2 w-full max-w-md">
                    <span className="text-xs text-gray-500 font-mono w-10 text-right">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hidden hover:[&::-webkit-slider-thumb]:block"
                    />
                    <span className="text-xs text-gray-500 font-mono w-10">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-end w-1/3 gap-3">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:block"
                />
                <Maximize2 className="w-4 h-4 text-gray-400 ml-2" />
            </div>
        </div>
    );
};

export default Player;
