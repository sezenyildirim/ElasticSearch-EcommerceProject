import React from 'react';
import { X, Star, Filter } from 'lucide-react';
import { FilterOptions } from '../types';
import { brands, storageOptions, /* featureOptions */ reviewsOptions } from '../data/phones';

import featureLabels from '../data/featuresLabel';


interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onClose
}) => {
  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleStorageChange = (storage: number) => {
    const newStorage = filters.storage.includes(storage)
      ? filters.storage.filter(s => s !== storage)
      : [...filters.storage, storage];
    onFiltersChange({ ...filters, storage: newStorage });
  };


  const handleFeatureChange = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    onFiltersChange({ ...filters, features: newFeatures });
  };


  const handleRatingChange = (rating: number) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter(f => f !== rating)
      : [...filters.ratings, rating];
    onFiltersChange({ ...filters, ratings: newRatings });
  };

  const handlePriceChange = (min: number, max: number) => {
    const newPrices = filters.priceRange.includes(min)
      ? filters.priceRange.filter(f => f !== min)
      : [...filters.priceRange, min];
    onFiltersChange({ ...filters, priceRange: [min, max] });



    onFiltersChange({ ...filters, priceRange: [min, max] });
  };

  const clearFilters = () => {
    onFiltersChange({
      brands: [],
      priceRange: [0, 20000],
      storage: [],
      features: [],
      ratings: []
    });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-20 w-80 bg-white shadow-xl lg:shadow-none
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Filtrele</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Temizle
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Fiyat Aralığı</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceRange[0] === 40000 && filters.priceRange[1] === 50000}
                  onChange={() => handlePriceChange(40000, 50000)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">40.000₺ - 50.000₺</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceRange[0] === 50000 && filters.priceRange[1] === 750000}
                  onChange={() => handlePriceChange(50000, 750000)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">50.000₺ - 75.000₺</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceRange[0] === 75000}
                  onChange={() => handlePriceChange(75000, 200000)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">75.000₺ üzeri</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceRange[0] === 0 && filters.priceRange[1] === 20000000}
                  onChange={() => handlePriceChange(0, 20000000)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Tüm Fiyatlar</span>
              </label>
            </div>
          </div>



          {/* Brands */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Marka</h3>
            <div className="space-y-3">
              {brands.map(brand => (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Storage */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Hafıza</h3>
            <div className="space-y-3">
              {storageOptions.map(storage => (
                <label key={storage} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.storage.includes(storage)}
                    onChange={() => handleStorageChange(storage)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  {
                    storage === 128 || storage === 256 || storage === 512 ?
                      (<span className="ml-2 text-sm text-gray-700">{storage} GB</span>)
                      :

                      (

                        <span className="ml-2 text-sm text-gray-700">{storage} TB</span>
                      )
                  }
                </label>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Özellikler</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {Object.entries(featureLabels).map(([key, label]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.features.includes(key)}
                    onChange={() => handleFeatureChange(key)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>




          {/* Reviews */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Değerlendirme</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {reviewsOptions.map((option) => {
                const ratingValue = parseFloat(option);
                return (
                  <label
                    key={ratingValue}
                    className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
                  >
                    <input
                      type="checkbox"
                      value={ratingValue}
                      className="accent-yellow-400"
                      checked={filters.ratings.includes(ratingValue)}
                      onChange={() => handleRatingChange(ratingValue)}
                    />
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }, (_, index) => {
                        if (index + 1 <= Math.floor(ratingValue)) {
                          return (
                            <Star
                              key={index}
                              className="h-5 w-5 text-yellow-400 fill-current"
                            />
                          );
                        } else {
                          return (
                            <Star
                              key={index}
                              className="h-5 w-5 text-gray-300"
                            />
                          );
                        }
                      })}
                      <span className="text-xs text-gray-700 ml-1">
                        {ratingValue} yıldız
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;