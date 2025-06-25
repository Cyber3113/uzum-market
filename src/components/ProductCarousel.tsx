
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  soldCount: number;
}

const products: Product[] = [
  { id: 1, name: "iPhone 15 Pro", price: 1299, image: "🍎", category: "Elektronika", soldCount: 2500 },
  { id: 2, name: "Samsung Galaxy S24", price: 999, image: "📱", category: "Elektronika", soldCount: 2200 },
  { id: 3, name: "MacBook Air M3", price: 1599, image: "💻", category: "Elektronika", soldCount: 1800 },
  { id: 4, name: "Nike Air Max", price: 150, image: "👟", category: "Kiyim", soldCount: 3500 },
  { id: 5, name: "Adidas Ultraboost", price: 180, image: "👟", category: "Kiyim", soldCount: 3200 },
  { id: 6, name: "Sony WH-1000XM5", price: 399, image: "🎧", category: "Elektronika", soldCount: 1500 },
  { id: 7, name: "Calvin Klein T-shirt", price: 45, image: "👕", category: "Kiyim", soldCount: 4200 },
  { id: 8, name: "Rolex Submariner", price: 8999, image: "⌚", category: "Soat", soldCount: 850 }
];

interface ProductCarouselProps {
  onAddToCart: (product: Product, quantity: number) => void;
  cartItems: { [key: number]: number };
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ onAddToCart, cartItems }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 4));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product, 1);
    toast({
      title: "Mahsulot qo'shildi!",
      description: `${product.name} savatchaga qo'shildi`,
      duration: 2000,
    });
  };

  const handleQuantityChange = (product: Product, change: number) => {
    const currentQuantity = cartItems[product.id] || 0;
    const newQuantity = currentQuantity + change;
    
    if (newQuantity <= 0) {
      onAddToCart(product, -currentQuantity);
      toast({
        title: "Mahsulot o'chirildi",
        description: `${product.name} savatchadan o'chirildi`,
        duration: 2000,
      });
    } else {
      onAddToCart(product, change);
      toast({
        title: change > 0 ? "Miqdor ko'paytirildi" : "Miqdor kamaytirildi",
        description: `${product.name}: ${newQuantity} ta`,
        duration: 1500,
      });
    }
  };

  const visibleProducts = products.slice(currentSlide * 4, currentSlide * 4 + 4);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        🔥 Eng Ko'p Sotilgan Mahsulotlar
      </h2>
      
      <div className="relative overflow-hidden rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, index) => (
            <Card key={product.id} 
                  className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="text-6xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-green-600 mb-2">${product.price}</p>
                <p className="text-sm text-gray-500 mb-4">Sotildi: {product.soldCount.toLocaleString()} ta</p>
                
                {cartItems[product.id] ? (
                  <div className="flex items-center justify-center space-x-3 animate-scale-in">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(product, -1)}
                      className="w-8 h-8 p-0 rounded-full hover:bg-red-100 hover:border-red-300 transition-all duration-200"
                    >
                      <Minus className="h-4 w-4 text-red-600" />
                    </Button>
                    <span className="font-bold text-lg min-w-[2rem] text-center">
                      {cartItems[product.id]}
                    </span>
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuantityChange(product, 1)}
                      className="w-8 h-8 p-0 rounded-full hover:bg-green-100 hover:border-green-300 transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 text-green-600" />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Savatchaga qo'shish
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(products.length / 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
