import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, MenuItem, Order } from "@/types";

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (
    item: MenuItem,
    restaurantId: string,
    restaurantName: string,
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  placeOrder: (order?: Order) => void;
  loadOrders: (orders: Order[]) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (
    item: MenuItem,
    restaurantId: string,
    restaurantName: string,
  ) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [...prev, { item, restaurantId, restaurantName, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev: any) => prev.filter((c: any) => c.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev: any) =>
      prev
        .map((c: any) =>
          c.item.id === itemId ? { ...c, quantity: c.quantity + delta } : c,
        )
        .filter((c: any) => c.quantity > 0),
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const placeOrder = (order?: Order) => {
    if (order) {
      setOrders((prev) => [order, ...prev]);
      clearCart();
      return;
    }

    if (cart.length === 0) return;
    const newOrder: Order = {
      _id: Date.now().toString(),
      items: cart.map((c) => ({
        name: c.item.name,
        quantity: c.quantity,
        price: c.item.price,
      })),
      address: "Home",
      phoneNumber: "",
      totalPrice: cartTotal,
      status: "PENDING",
      paymentMethod: "CASH",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  };

  const loadOrders = (orders: Order[]) => {
    setOrders(orders);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        loadOrders,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
