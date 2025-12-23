import React, { useState } from 'react';
import { ytmusic } from '../api/ytmusic';
import type { Song, SearchResult } from '../api/ytmusic';
import { usePlayer } from '../context/PlayerContext';
import { Play, Search as SearchIcon } from 'lucide-react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const { playSong } = usePlayer();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const data = await ytmusic.search(query);
            setResults(data);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlay = (item: SearchResult) => {
        if (item.resultType === 'song' || item.resultType === 'video') {
            if (item.videoId) {
                const song: Song = {
                    videoId: item.videoId,
                    title: item.title,
                    artists: item.artists || [],
                    thumbnails: item.thumbnails,
                };
                playSong(song);
            }
        } else if (item.resultType === 'album') {
             // Handle album view (not implemented yet, but could navigate to album page)
             console.log("Album clicked:", item);
        }
    };

    return (
        <div className="p-8 pb-32">
            <div className="sticky top-0 bg-black/95 backdrop-blur-sm z-10 pb-6 pt-2">
                <form onSubmit={handleSearch} className="relative max-w-xl">
                    <SearchIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="What do you want to play?"
                        className="w-full bg-[#27272a] text-white pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-500"
                        autoFocus
                    />
                </form>
            </div>

            {loading ? (
                <div className="text-center text-gray-500 mt-20">Searching...</div>
            ) : (
                <div className="space-y-8">
                    {/* Group by category if needed, for now just list grid */}
                    {results.length > 0 && (
                        <div>
                             <h2 className="text-2xl font-bold mb-4">Top Results</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {results.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 bg-[#18181b] p-3 rounded-lg hover:bg-[#27272a] transition-colors cursor-pointer group"
                                        onClick={() => handlePlay(item)}
                                    >
                                        <div className="relative w-16 h-16 flex-shrink-0">
                                            <img
                                                src={item.thumbnails ? item.thumbnails[item.thumbnails.length - 1].url : ''}
                                                alt={item.title}
                                                className={`w-full h-full object-cover shadow-md ${item.resultType === 'artist' ? 'rounded-full' : 'rounded-md'}`}
                                            />
                                            {(item.resultType === 'song' || item.resultType === 'video') && (
                                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                                                     <Play className="w-6 h-6 text-white fill-current" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <h3 className="font-semibold text-white truncate">{item.title}</h3>
                                            <p className="text-sm text-gray-400 truncate capitalize">
                                                {item.resultType} • {item.artists ? item.artists.map(a => a.name).join(', ') : item.category}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}

                    {results.length === 0 && !loading && query && (
                         <div className="text-center text-gray-500 mt-20">No results found for "{query}"</div>
                    )}

                    {results.length === 0 && !query && (
                        <div className="text-center text-gray-500 mt-20">
                            <div className="mb-4">
                                <SearchIcon className="w-16 h-16 mx-auto opacity-20" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Play what you love</h3>
                            <p>Search for artists, songs, podcasts, and more.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
