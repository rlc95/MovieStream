import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar({ search, onSearchChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-indigo-800/60 shadow-md px-4 py-3 sticky top-0 z-50">
      < div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo / Brand */}
        < div className="text-white text-xl font-bold">🎬 MVStream</div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>

        {/* Menu Items */}
         <div className={`w-full md:flex md:items-center md:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
            
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                value={search}
                onChange={onSearchChange}
                placeholder="Search movies..."
                className="pl-4 pr-4 py-2 rounded-md bg-white/90 text-gray-800 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Optional Nav Links */}
            {/* 
            <a href="#" className="text-white hover:text-blue-300">Home</a>
            <a href="#" className="text-white hover:text-blue-300">Categories</a>
            */}
          </div>
        </div>
      </div>
    </nav>
  );
}
