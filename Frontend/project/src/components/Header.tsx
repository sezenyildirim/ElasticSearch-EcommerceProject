import React from 'react';
import { Search, ShoppingCart, Heart, Menu } from 'lucide-react';
import { Link,useLocation } from 'react-router-dom';
import { FilterOptions } from '../types';


interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchTrigger:() => void;
  cartItemsCount: number;
  wishlistCount: number;
  onMenuClick: () => void;
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;

}
const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  onSearchTrigger,
  cartItemsCount,
  wishlistCount,
  onMenuClick,
  onFiltersChange,
  
}) => {

  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;




  
  const clearFilters = () => {
    onFiltersChange({
      brands: [],
      priceRange: [0, 20000],
      storage: [],
      features: [],
      ratings: []
    });
    onSearchChange(""); // Arama terimini de temizle
  };
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden mr-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to={'/'} onClick={clearFilters} className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PhoneMarkt</Link>
        </div>
         {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Ara..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                 if(e.key === 'Enter'){
                  onSearchTrigger();
                 }
                }}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        <div className="flex items-center gap-4">


<Link 
              to="/favorites" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                wishlistCount > 0
                  ? 'text-red-500 bg-red-50' // Favori varsa kırmızı
                  : isActive('/favorites')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Heart className={`h-4 w-4 ${wishlistCount > 0 ? 'fill-current text-red-500' : ''}`} />
              <span>Favorilerim</span>
            </Link>

<Link 
              to="/cart" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                isActive('/cart') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Sepetim</span>
              {cartItemsCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;