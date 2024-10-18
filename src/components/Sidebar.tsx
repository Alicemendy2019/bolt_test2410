import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Building2, MessageSquare, Home } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transition duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-center mt-8">
        <div className="flex items-center">
          <span className="text-white text-2xl mx-2 font-semibold">Menu</span>
        </div>
      </div>

      <nav className="mt-10">
        <Link
          className="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
          to="/"
          onClick={() => setIsOpen(false)}
        >
          <Home className="h-6 w-6" />
          <span className="mx-3">ホーム</span>
        </Link>
        <Link
          className="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
          to="/url-search"
          onClick={() => setIsOpen(false)}
        >
          <Search className="h-6 w-6" />
          <span className="mx-3">URLから会社情報を取得</span>
        </Link>
        <Link
          className="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
          to="/company-search"
          onClick={() => setIsOpen(false)}
        >
          <Building2 className="h-6 w-6" />
          <span className="mx-3">会社情報から企業を検索</span>
        </Link>
        <Link
          className="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
          to="/contact"
          onClick={() => setIsOpen(false)}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="mx-3">お問い合わせ</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;