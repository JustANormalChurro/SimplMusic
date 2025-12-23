import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Settings, Music2 } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-black h-full flex flex-col border-r border-gray-900 p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Music2 className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">SimplMusic</span>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`
          }
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`
          }
        >
          <Search className="w-5 h-5" />
          <span className="font-medium">Search</span>
        </NavLink>

        <NavLink
          to="/library"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`
          }
        >
          <Library className="w-5 h-5" />
          <span className="font-medium">Library</span>
        </NavLink>
      </nav>

      <div className="pt-4 border-t border-gray-900 space-y-2">
         <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Playlists
         </div>
         {/* Placeholder for playlists */}
         <div className="px-4 py-2 text-sm text-gray-400 hover:text-white cursor-pointer">Liked Songs</div>
         <div className="px-4 py-2 text-sm text-gray-400 hover:text-white cursor-pointer">Top Hits 2024</div>
         <div className="px-4 py-2 text-sm text-gray-400 hover:text-white cursor-pointer">Chill Vibes</div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-900">
         <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`
          }
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
