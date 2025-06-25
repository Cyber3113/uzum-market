
import React, { useState } from 'react';
import ProductCarousel from '@/components/ProductCarousel';
import ShoppingCart from '@/components/ShoppingCart';
import LocationDisplay from '@/components/LocationDisplay';
import CategoryFilter from '@/components/CategoryFilter';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  soldCount: number;
}

const allProducts: Product[] = [
  { id: 1, name: "iPhone 15 Pro", price: 1299, image: "🍎", category: "Elektronika", soldCount: 2500 },
  { id: 2, name: "Samsung Galaxy S24", price: 999, image: "📱", category: "Elektronika", soldCount: 2200 },
  { id: 3, name: "MacBook Air M3", price: 1599, image: "💻", category: "Elektronika", soldCount: 1800 },
  { id: 4, name: "Nike Air Max", price: 150, image: "👟", category: "Kiyim", soldCount: 3500 },
  { id: 5, name: "Adidas Ultraboost", price: 180, image: "👟", category: "Kiyim", soldCount: 3200 },
  { id: 6, name: "Sony WH-1000XM5", price: 399, image: "🎧", category: "Elektronika", soldCount: 1500 },
  { id: 7, name: "Calvin Klein T-shirt", price: 45, image: "👕", category: "Kiyim", soldCount: 4200 },
  { id: 8, name: "Rolex Submariner", price: 8999, image: "⌚", category: "Soat", soldCount: 850 },
  { id: 9, name: "Dell XPS 13", price: 1199, image: "💻", category: "Elektronika", soldCount: 1200 },
  { id: 10, name: "Zara Jacket", price: 89, image: "🧥", category: "Kiyim", soldCount: 2800 },
  { id: 11, name: "Apple Watch Series 9", price: 399, image: "⌚", category: "Soat", soldCount: 1900 },
  { id: 12, name: "AirPods Pro", price: 249, image: "🎧", category: "Elektronika", soldCount: 3100 }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  
  const categories = Array.from(new Set(allProducts.map(product => product.category)));
  
  const filteredProducts = selectedCategory === 'Barchasi' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prev => ({
      ...prev,
      [product.id]: Math.max(0, (prev[product.id] || 0) + quantity)
    }));
  };

  return (
    <div className="min-h-screen seasonal-background relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              🛍️ Uzum Market
            </h1>
            <p className="text-gray-600 mt-2">Eng yaxshi mahsulotlar eng yaxshi narxlarda</p>
          </div>
          <LocationDisplay />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-12">
        <ProductCarousel onAddToCart={handleAddToCart} cartItems={cartItems} />
        
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Category Products Grid */}
        {selectedCategory !== 'Barchasi' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selectedCategory} Mahsulotlari
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} 
                     className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in">
                  <div className="text-4xl mb-4 text-center">{product.image}</div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-xl font-bold text-green-600 mb-2">${product.price}</p>
                  <p className="text-sm text-gray-500 mb-4">Sotildi: {product.soldCount.toLocaleString()} ta</p>
                  
                  {cartItems[product.id] ? (
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => handleAddToCart(product, -1)}
                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                      >
                        <span className="text-red-600 font-bold">-</span>
                      </button>
                      <span className="font-bold text-lg">{cartItems[product.id]}</span>
                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
                      >
                        <span className="text-green-600 font-bold">+</span>
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAddToCart(product, 1)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Savatchaga qo'shish
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shopping Cart */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ShoppingCart cartItems={cartItems} products={allProducts} />
        </div>
      </main>
    </div>
  );
};

export default Index;
