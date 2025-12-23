import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import { PlayerProvider } from './context/PlayerContext';

const Layout = () => {
    return (
        <div className="flex h-screen bg-black text-white overflow-hidden font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col relative h-full">
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
                {/* Spacer for player */}
                <div className="h-24" />
                <Player />
            </div>
        </div>
    );
};

function App() {
  return (
    <PlayerProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="search" element={<Search />} />
                    {/* Placeholder for other routes */}
                    <Route path="*" element={<div className="p-8">Page Not Found</div>} />
                </Route>
            </Routes>
        </Router>
    </PlayerProvider>
  );
}

export default App;
