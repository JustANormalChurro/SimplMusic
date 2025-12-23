import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface Artist {
    name: string;
    id: string;
}

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface Song {
    videoId: string;
    title: string;
    artists: Artist[];
    album?: {
        name: string;
        id: string;
    };
    thumbnails: Thumbnail[];
    duration?: string;
}

export interface Album {
    browseId: string;
    playlistId: string;
    title: string;
    thumbnails: Thumbnail[];
    artist: string;
    year: string;
    type: string;
}

export interface SearchResult {
    category: string;
    resultType: string;
    videoId?: string;
    browseId?: string;
    title: string;
    artists?: Artist[];
    thumbnails: Thumbnail[];
}

export const ytmusic = {
    search: async (query: string, filter?: string) => {
        const params = { q: query, filter };
        const response = await axios.get(`${API_BASE_URL}/search`, { params });
        return response.data;
    },
    getHome: async () => {
        const response = await axios.get(`${API_BASE_URL}/home`);
        return response.data;
    },
    getSong: async (videoId: string) => {
        const response = await axios.get(`${API_BASE_URL}/song/${videoId}`);
        return response.data;
    },
    getAlbum: async (browseId: string) => {
        const response = await axios.get(`${API_BASE_URL}/album/${browseId}`);
        return response.data;
    },
    getArtist: async (channelId: string) => {
        const response = await axios.get(`${API_BASE_URL}/artist/${channelId}`);
        return response.data;
    },
    getWatchPlaylist: async (videoId?: string, playlistId?: string) => {
        const params = { videoId, playlistId };
        const response = await axios.get(`${API_BASE_URL}/watch`, { params });
        return response.data;
    },
    getCharts: async (country: string = 'ZZ') => {
        const response = await axios.get(`${API_BASE_URL}/charts`, { params: { country } });
        return response.data;
    },
    getLyrics: async (browseId: string) => {
        const response = await axios.get(`${API_BASE_URL}/lyrics/${browseId}`);
        return response.data;
    }
};
