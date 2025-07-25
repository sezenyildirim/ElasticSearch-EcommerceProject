import React, { useState } from 'react';
import { X, Star, Heart, ShoppingCart, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { Phone } from '../types';

import featureLabels from '../data/featuresLabel';


interface ProductDetailProps {
  phone: Phone;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (phone: Phone, storage: string, color: string) => void;
  onToggleWishlist: (phoneId: string) => void;
  isInWishlist: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  phone,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  const [selectedStorage, setSelectedStorage] = useState(phone.storage);
  const [selectedColor, setSelectedColor] = useState(phone.color);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    onAddToCart(phone, selectedStorage, selectedColor);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Ürün detayları</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
              <img
                src={phone.image}
                alt={phone.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <p className="text-sm text-blue-600 font-medium mb-1">{phone.brand}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{phone.name}</h1>
                
                {/* Rating */}
              <div className="flex items-center mb-4">
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => {
      if (i < Math.floor(phone.rating)) {
        return <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />;
      } else {
        return <Star key={i} className="h-5 w-5 text-gray-300" />;
      }
    })}
    <span className="ml-2 text-lg font-medium text-gray-900">{phone.rating}</span>
  </div>
  <span className="ml-2 text-gray-500">({phone.reviews} Değerlendirme)</span>
</div>

                <p className="text-gray-600 leading-relaxed">{phone.description}</p>
              </div>

              {/* Price */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">{phone.price}₺</span>
                
                </div>
              </div>

              {/* Storage Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Hafıza</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    key={phone.storage}
                    onClick={() => setSelectedStorage(phone.storage)}
                    className={`p-3 rounded-xl border-2 text-center font-medium transition-all ${
                      selectedStorage === phone.storage
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {phone.storage}
                  </button>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Renk</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="color"
                      value={phone.color}
                      checked={selectedColor === phone.color}
                      onChange={() => setSelectedColor(phone.color)}
                      className="form-radio h-4 w-4 text-blue-600 mr-3"
                    />
                    <span className="text-gray-700">{phone.color}</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  /* disabled={!phone.inStock} */
                  className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                    phone.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                      /* : 'bg-gray-100 text-gray-400 cursor-not-allowed' */
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
               {/*    <span>{phone.inStock ? 'Sepete ekle' : 'Stokta yok'}</span> */}
                      <span>Sepete ekle</span>
                </button>
                
                <button
                  onClick={() => onToggleWishlist(phone.id)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    isInWishlist
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Features */}
              {Array.isArray(phone.features) ? (
  phone.features.map((feature, index) => (
    <div key={index} className="flex items-center gap-2">
      <Check className="h-4 w-4 text-green-500" />
      {feature}
    </div>
  ))
) : typeof phone.features === 'object' && phone.features !== null ? (
  Object.entries(phone.features)
    .filter(([_, val]) => val === true)
    .map(([key, _]) => (
      <div key={key} className="flex items-center gap-2">
        <Check className="h-4 w-4 text-green-500" />
        {featureLabels[key] || key}
      </div>
    ))
) : (
  <div className="flex items-center gap-2">
    <Check className="h-4 w-4 text-green-500" />
    {phone.features}
  </div>
)}

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Ücretsiz kargo</p>
                  <p className="text-xs text-gray-500">10.000,00₺ ve üzeri alışverişlerde</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">2 Yıl Garanti</p>
                  <p className="text-xs text-gray-500">Tam koruma</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">30 gün içerisinde iade</p>
                  <p className="text-xs text-gray-500"></p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Detaylar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* width */}
              {phone.width && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <dt className="text-sm font-medium text-gray-500 mb-1">Ekran</dt>
                  <dd className="text-sm text-gray-900">{phone.width}"</dd>
                </div>
              )}
              {/* os */}
              {phone.features && typeof phone.features === 'object' && !Array.isArray(phone.features) && 'os' in phone.features && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <dt className="text-sm font-medium text-gray-500 mb-1">OS</dt>
                  <dd className="text-sm text-gray-900">{(phone.features as Record<string, any>).os}</dd>
                </div>
              )}
              {/* specs varsa onları da göster */}
              {phone.specs && typeof phone.specs === 'object' && !Array.isArray(phone.specs) &&
                Object.entries(phone.specs).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-xl">
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {typeof value === 'object' ? JSON.stringify(value) : value}
                    </dd>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;