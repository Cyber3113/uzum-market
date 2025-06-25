
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  soldCount: number;
}

// Kengaytirilgan mahsulotlar ro'yxati
const allProducts: Product[] = [
  // Mavjud mahsulotlar
  { id: 1, name: "iPhone 15 Pro", price: 1299, image: "🍎", category: "Elektronika", soldCount: 2500 },
  { id: 2, name: "Samsung Galaxy S24", price: 999, image: "📱", category: "Elektronika", soldCount: 2200 },
  { id: 3, name: "MacBook Air M3", price: 1599, image: "💻", category: "Elektronika", soldCount: 1800 },
  { id: 6, name: "Sony WH-1000XM5", price: 399, image: "🎧", category: "Elektronika", soldCount: 1500 },
  { id: 9, name: "Dell XPS 13", price: 1199, image: "💻", category: "Elektronika", soldCount: 1200 },
  { id: 12, name: "AirPods Pro", price: 249, image: "🎧", category: "Elektronika", soldCount: 3100 },
  
  { id: 4, name: "Nike Air Max", price: 150, image: "👟", category: "Kiyim", soldCount: 3500 },
  { id: 5, name: "Adidas Ultraboost", price: 180, image: "👟", category: "Kiyim", soldCount: 3200 },
  { id: 7, name: "Calvin Klein T-shirt", price: 45, image: "👕", category: "Kiyim", soldCount: 4200 },
  { id: 10, name: "Zara Jacket", price: 89, image: "🧥", category: "Kiyim", soldCount: 2800 },
  
  { id: 8, name: "Rolex Submariner", price: 8999, image: "⌚", category: "Soat", soldCount: 850 },
  { id: 11, name: "Apple Watch Series 9", price: 399, image: "⌚", category: "Soat", soldCount: 1900 },
  
  // Qo'shimcha mahsulotlar har bir kategoriya uchun
  ...Array.from({length: 20}, (_, i) => ({
    id: 13 + i,
    name: `Elektronika ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 100,
    image: "📱",
    category: "Elektronika",
    soldCount: Math.floor(Math.random() * 5000) + 100
  })),
  ...Array.from({length: 20}, (_, i) => ({
    id: 33 + i,
    name: `Kiyim ${i + 1}`,
    price: Math.floor(Math.random() * 500) + 50,
    image: "👕",
    category: "Kiyim",
    soldCount: Math.floor(Math.random() * 3000) + 100
  })),
  ...Array.from({length: 20}, (_, i) => ({
    id: 53 + i,
    name: `Soat ${i + 1}`,
    price: Math.floor(Math.random() * 2000) + 200,
    image: "⌚",
    category: "Soat",
    soldCount: Math.floor(Math.random() * 1500) + 50
  }))
];

const ITEMS_PER_PAGE = 12;

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});

  const categoryProducts = useMemo(() => {
    return allProducts.filter(product => 
      product.category.toLowerCase() === category?.toLowerCase()
    );
  }, [category]);

  const totalPages = Math.ceil(categoryProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = categoryProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prev => ({
      ...prev,
      [product.id]: Math.max(0, (prev[product.id] || 0) + quantity)
    }));
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Murakkab pagination logikasi
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen seasonal-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Orqaga
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{category} Mahsulotlari</h1>
          </div>
          <div className="text-sm text-gray-600">
            Jami: {categoryProducts.length} ta mahsulot
          </div>
        </div>

        {/* Mahsulotlar statistikasi */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{category} haqida ma'lumot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{categoryProducts.length}</div>
              <div className="text-sm text-gray-600">Jami mahsulotlar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${Math.min(...categoryProducts.map(p => p.price))}
              </div>
              <div className="text-sm text-gray-600">Eng arzon narx</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.max(...categoryProducts.map(p => p.soldCount)).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Eng ko'p sotilgan</div>
            </div>
          </div>
        </div>

        {/* Mahsulotlar grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentProducts.map((product) => (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {renderPaginationItems()}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
