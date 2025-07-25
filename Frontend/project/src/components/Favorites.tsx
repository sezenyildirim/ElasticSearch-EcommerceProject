import React from 'react';
import { Phone } from '../types';
import ProductCard from './ProductCard';

interface FavoritesProps {
  phones: Phone[];
  wishlist: string[];
  onToggleWishlist: (phoneId: string) => void;
  onViewDetails: (phone: Phone) => void;
  onAddToCart: (phone: Phone) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ phones, wishlist, onToggleWishlist, onViewDetails, onAddToCart }) => {
  const favoritePhones = phones.filter(phone => wishlist.includes(phone.id));

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <span className="text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
        Favorilerim
      </h2>
      {favoritePhones.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 min-h-[200px] flex flex-col items-center justify-center">
          <p className="text-gray-500">Beğendiğiniz ürünler burada listelenecek.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {favoritePhones.map(phone => (
            <ProductCard
              key={phone.id}
              phone={phone}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; 