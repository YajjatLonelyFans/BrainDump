import { Brain, Plus } from 'lucide-react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg group-hover:from-emerald-400 group-hover:to-teal-500 transition-all duration-300 shadow-lg">
              <Brain className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-semibold text-slate-100 tracking-wide">
              Brain Dump
            </span>
          </div>

          <button className="flex items-center space-x-2 bg-emerald-600 text-white px-5 py-2 rounded-lg font-medium shadow-lg hover:bg-emerald-500 hover:shadow-emerald-500/30 transform transition-all duration-200">
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            <Link to={"/create"}>
            <span>New Note</span>
            </Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;