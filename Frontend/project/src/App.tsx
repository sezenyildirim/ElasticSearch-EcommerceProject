import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Favorites from './components/Favorites';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import Pagination from './components/Pagination';
import { Phone, FilterOptions, CartItem } from './types';

function App() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    priceRange: [0,200000],
    storage: [],
    features: [],
    ratings : []
  });
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

 const generateFeatureQueryParams = (features: string[]) => {
  const featureKeys = ['face_id', 's_pen', 'wireless_charging'];

  return featureKeys.reduce((acc, key) => {
    acc[`features.${key}`] = features.includes(key);
    return acc;
  }, {} as Record<string, boolean>);
};

const featureParams = generateFeatureQueryParams(filters.features);
  



useEffect(() => {
  const queryParams = new URLSearchParams();
  queryParams.append("page", currentPage.toString());
  queryParams.append("perPage", "9");

  const hasFilters =
    filters.brands.length > 0 ||
    filters.storage.length > 0 ||
    filters.features.length > 0 ||
    filters.ratings.length > 0;

  const hasSearch = searchTerm.trim().length > 0;

  if (hasFilters) {
    queryParams.append("priceRange.Min", filters.priceRange[0].toString());
    queryParams.append("priceRange.Max", filters.priceRange[1].toString());
    filters.brands.forEach(brand => queryParams.append("brands", brand));
    filters.storage.forEach(storage => queryParams.append("storage", storage.toString()));
    filters.ratings.forEach(rating => queryParams.append("ratings", `${rating}`));

    const featureParams = generateFeatureQueryParams(filters.features);
    Object.entries(featureParams).forEach(([key, value]) => {
      queryParams.append(key, value.toString());
    });
    
    if (hasSearch) queryParams.append("searchText", searchTerm);

    fetch(`https://localhost:7140/api/ECommerce/SearchFilters?${queryParams}`)
      .then(res => res.json())
      .then(data => {
        setPhones(data.items || []);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      })
      .catch(err => console.error("SearchFilters hatası:", err));
  } else if (hasSearch) {
    fetch(`https://localhost:7140/api/ECommerce/SearchText?searchText=${encodeURIComponent(searchTerm)}&page=${currentPage}&perPage=9`)
      .then(res => res.json())
      .then(data => {
        setPhones(data.items || []);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      })
      .catch(err => console.error("SearchText hatası:", err));
  } else {
    fetch(`https://localhost:7140/api/ECommerce/List?page=${currentPage}&perPage=9`)
      .then(res => res.json())
      .then(data => {
        setPhones(data.items || []);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      })
      .catch(err => console.error("List hatası:", err));
  }
}, [filters, searchTrigger, currentPage]);



  
  const handleAddToCart = (phone: Phone, storage?: string, color?: string) => {
    const selectedStorage = storage || phone.storage;
    const selectedColor = color || phone.color;
    
    const existingItem = cart.find(item => 
      item.phone.id === phone.id && 
      item.selectedStorage === selectedStorage && 
      item.selectedColor === selectedColor
    );

    if (existingItem) {
      setCart(cart.map(item => 
        item === existingItem 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { phone, selectedStorage, selectedColor, quantity: 1 }]);
    }

    if (selectedPhone) {
      setSelectedPhone(null);
    }
  };

  const handleToggleWishlist = (phoneId: string) => {
    setWishlist(prev => 
      prev.includes(phoneId) 
        ? prev.filter(id => id !== phoneId)
        : [...prev, phoneId]
    );
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchTrigger={() => {
          setCurrentPage(1); 
          setSearchTrigger(prev => prev + 1);
        }}
        cartItemsCount={cartItemsCount}
        filters={filters}
        onFiltersChange={setFilters}
        wishlistCount={wishlist.length}
        onMenuClick={() => setIsFilterOpen(true)}
      />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <div className="flex">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                />
                <main className="flex-1 lg:ml-8">
                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {searchTerm ? `"${searchTerm}" için arama sonuçları` : 'Tüm Ürünler'}
                      </h1>
                      <p className="text-gray-600 mt-1">
                        toplam {totalCount} ürün listeleniyor
                      </p>
                    </div>
                    <button
                      onClick={() => setIsFilterOpen(true)}
                      className="lg:hidden bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Filters
                    </button>
                  </div>
                  {/* Products Grid */}
                  {Array.isArray(phones) && phones.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {phones.map(phone => (
                        <ProductCard
                          key={phone.id}
                          phone={phone}
                          onViewDetails={setSelectedPhone}
                          onAddToCart={(phone) => handleAddToCart(phone)}
                          onToggleWishlist={handleToggleWishlist}
                          isInWishlist={wishlist.includes(phone.id)}
                        />
                      ))}
                     
                    </div>



                  ) : (
                    <div className="text-center py-12">
                      <div className="max-w-md mx-auto">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Ürün bulunamadı</h3>
                        <p className="text-gray-500">Aradığınız kriterlere uygun ürün bulunamadı başka filtreler ile arama yapınız</p>
                      </div>
                    </div>

                    
                  )}

                       <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                </main>

            
              </div>
            } />
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route path="/favorites" element={<Favorites phones={phones} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} onViewDetails={setSelectedPhone} onAddToCart={handleAddToCart} />} />
          </Routes>
        </div>
        {/* Product Detail Modal */}
        {selectedPhone && (
          <ProductDetail
            phone={selectedPhone}
            isOpen={!!selectedPhone}
            onClose={() => setSelectedPhone(null)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={wishlist.includes(selectedPhone.id)}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;