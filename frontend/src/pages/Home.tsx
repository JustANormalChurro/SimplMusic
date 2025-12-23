import { useEffect, useState } from 'react';
import { ytmusic } from '../api/ytmusic';
import type { Song } from '../api/ytmusic';
import { usePlayer } from '../context/PlayerContext';
import { Play } from 'lucide-react';

const Home = () => {
    const [homeData, setHomeData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { playSong } = usePlayer();

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const data = await ytmusic.getHome();
                setHomeData(data);
            } catch (error) {
                console.error("Failed to fetch home data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHome();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-full text-white">Loading...</div>;

    const handlePlay = (item: any) => {
        // item can be a song, video, or we need to extract song data
        // For quick picks, it usually has videoId
        if (item.videoId) {
            const song: Song = {
                videoId: item.videoId,
                title: item.title,
                artists: item.artists,
                thumbnails: item.thumbnails,
                duration: item.duration // might need parsing if string
            };
            playSong(song);
        }
    };

    return (
        <div className="p-8 pb-32">
            <h1 className="text-3xl font-bold mb-6">Home</h1>

            {homeData.map((section, index) => (
                <div key={index} className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {section.contents.map((item: any, idx: number) => (
                            <div
                                key={idx}
                                className="bg-[#18181b] p-4 rounded-lg hover:bg-[#27272a] transition-colors group cursor-pointer"
                                onClick={() => handlePlay(item)}
                            >
                                <div className="relative aspect-square mb-4">
                                    <img
                                        src={item.thumbnails ? item.thumbnails[item.thumbnails.length - 1].url : ''}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-md shadow-lg"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <Play className="w-6 h-6 text-white ml-1 fill-current" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-white truncate mb-1" title={item.title}>{item.title}</h3>
                                <p className="text-sm text-gray-400 truncate">
                                    {item.artists ? item.artists.map((a: any) => a.name).join(', ') : item.description || item.year}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
