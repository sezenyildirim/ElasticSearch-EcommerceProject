import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react'; 
import { Phone } from '../types';
import Pagination from './Pagination';


interface ProductCardProps {
  phone: Phone;
  onViewDetails: (phone: Phone) => void;
  onAddToCart: (phone: Phone) => void;
  onToggleWishlist: (phoneId: string) => void;
  isInWishlist: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;

}

const ProductCard: React.FC<ProductCardProps> = ({
  phone,
  onViewDetails,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  currentPage,
  totalPages,

  onPageChange
}) => {

  const featuresObject = phone.features;
  const featuresArray =
    featuresObject && typeof featuresObject === 'object'
      ? Object.entries(featuresObject)
          .filter(([key, value]) =>
            (typeof value === 'boolean' && value === true) ||
            typeof value === 'string'
          )
          .map(([key, value]) => {
            if (typeof value === 'string') return value; 
            return key
              .replace(/_/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase());
          })
      : [];
  







  return (
    <>
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
             src={phone.image} 
            alt={phone.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {(
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {phone.storage} GB
              </span>
            )}
         
           {(

              <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {phone.color}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => onToggleWishlist(phone.id)}
            className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isInWishlist 
                ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
            }`}
          >
            <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => onViewDetails(phone)}
              className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
            >
              Gözat
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Brand & Name */}
          <div className="mb-2">
            <p className="text-sm text-blue-600 font-medium">{phone.brand}</p>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{phone.name}</h3>
          </div>

          {/* Rating */}
      {/*     <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-900">{phone.rating}</span>
            </div>
            <span className="ml-2 text-sm text-gray-500">({phone.reviews})</span>
          </div> */}

          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-4 h-[52px]">
    {featuresArray.slice(0, 4).map((feature, index) => (
      <span
        key={feature || index}
        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full h-[20px]"
      >
        {feature}
      </span>
    ))}
    {featuresArray.length > 4 && (
      <span className="text-xs text-gray-400">+{featuresArray.length - 4} more</span>
    )}
  </div>


          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">{phone.price}₺</span>
          
            </div>
      
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(phone)}
        /*     disabled={!phone.inStock} */
            className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              phone.inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
           /*    : 'bg-gray-100 text-gray-400 cursor-not-allowed' */
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Sepete ekle</span>  
         {/*    <span>{phone.inStock ? 'Sepete ekle' : 'Stokta yok'}</span> */}
          </button>
        </div>
      </div>
      {/* Pagination'ı kartın altına ekle */}
      {(typeof currentPage === 'number' && typeof totalPages === 'number' && typeof onPageChange === 'function' && totalPages > 1) && (
       <Pagination currentPage={currentPage as number} totalPages={totalPages as number} onPageChange={onPageChange as (page: number) => void} />
      )}
    </>
  );
};

export default ProductCard;