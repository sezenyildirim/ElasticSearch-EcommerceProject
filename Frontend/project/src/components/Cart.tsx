import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Sepetim</h2>
      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 min-h-[200px] flex flex-col items-center justify-center">
          <ShoppingCart className="h-10 w-10" />
          <p className="text-gray-500">Sepetinizde ürün bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <ul className="divide-y divide-gray-200">
            {cart.map((item, idx) => (
              <li key={item.phone.id + item.selectedStorage + item.selectedColor} className="py-4 flex items-center gap-4">
                <img src={item.phone.image} alt={item.phone.name} className="w-16 h-16 object-cover rounded-lg border" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{item.phone.name}</div>
                  <div className="text-sm text-gray-500">Renk: {item.selectedColor} | Hafıza: {item.selectedStorage}</div>
                  <div className="text-sm text-gray-500">Adet: {item.quantity}</div>
                </div>
                <div className="font-bold text-lg text-gray-900">{item.phone.price * item.quantity}₺</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart; 