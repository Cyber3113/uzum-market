
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  soldCount: number;
}

interface ShoppingCartProps {
  cartItems: { [key: number]: number };
  products: Product[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems, products }) => {
  const cartProducts = products.filter(product => cartItems[product.id] > 0);
  const totalAmount = cartProducts.reduce((total, product) => 
    total + (product.price * cartItems[product.id]), 0
  );
  const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  if (cartProducts.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-gray-600">🛒 Savatcha bo'sh</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🛒 Savatcha</span>
          <span className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
            {totalItems} ta
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{product.image}</span>
              <div>
                <h4 className="font-medium text-sm">{product.name}</h4>
                <p className="text-xs text-gray-500">${product.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold">{cartItems[product.id]}x</span>
              <span className="font-bold text-green-600">
                ${(product.price * cartItems[product.id]).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
        
        <Separator />
        
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Jami:</span>
          <span className="text-green-600">${totalAmount.toFixed(2)}</span>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
          Buyurtma berish
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShoppingCart;
