import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { RootStackParamList } from "@/types";
import { apiPost } from "@/services/api";
import { Order, PaymentMethod } from "@/types";

const paymentMethods = ["Cash on Delivery", "Card", "Wallet"];

export default function CheckoutScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { cart, cartTotal, clearCart, placeOrder, updateQuantity } = useCart();
  const [payment, setPayment] = useState(paymentMethods[0]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const deliveryFee = 1.99;
  const total = cartTotal + deliveryFee;

  useEffect(() => {
    if (user) {
      setPhone(user.phone ?? "");
      setAddress(user.address ?? "");
    }
  }, [user]);

  const mapPaymentMethod = (method: string): PaymentMethod => {
    if (method === "Card") return "CARD";
    if (method === "Wallet") return "ONLINE";
    return "CASH";
  };

  const handlePlaceOrder = async () => {
    setError(null);
    if (!user) {
      setError("Please login before placing an order.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        userId: user._id,
        restaurantId: cart[0].restaurantId,
        items: cart.map((c) => ({
          name: c.item.name,
          quantity: c.quantity,
          price: c.item.price,
        })),
        address: address || "Home",
        phoneNumber: phone || user.phone || "",
        totalPrice: total,
        paymentMethod: mapPaymentMethod(payment),
        notes,
      };

      const order = await apiPost<Order>("/orders", payload);
      placeOrder(order);
      clearCart();
      setSuccessVisible(true);
    } catch (err: any) {
      setError(err.message || "Unable to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessVisible(false);
    navigation.navigate("MainTabs", { screen: "Orders" });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 pt-5">
        <View className="flex-row justify-between items-end mb-5">
          <View>
            <Text className="text-neutral-500 text-sm">Checkout</Text>
            <Text className="text-black font-bold text-3xl">Your Basket</Text>
          </View>
          <View className="bg-[#84C441] px-4 py-2 rounded-full">
            <Text className="text-white text-sm">{cart.length} items</Text>
          </View>
        </View>

        <View className="bg-white rounded-[32px] p-5 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-black font-semibold text-base">Delivery Address</Text>
              <Text className="text-muted text-sm mt-1">Where should we deliver your order?</Text>
            </View>
            <Ionicons name="location-outline" size={24} color="#5E9F2D" />
          </View>
          <TextInput
            className="rounded-3xl px-4 py-4 text-base text-gray-900 bg-slate-50"
            placeholder="Enter delivery address"
            placeholderTextColor="#9ca3af"
            value={address}
            onChangeText={setAddress}
          />
          <View className="flex-row items-center mt-4 px-3 py-3 rounded-3xl bg-slate-50">
            <Ionicons name="map-outline" size={18} color="#5E9F2D" />
            <Text className="text-muted ml-3 text-sm">
              {address ? "Delivery location added" : "Add delivery address to view route"}
            </Text>
          </View>
        </View>

        <View className="bg-white/95 rounded-[32px] p-5 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-black font-semibold text-base">Order Items</Text>
              <Text className="text-muted text-sm mt-1">Swipe or tap to edit quantities</Text>
            </View>
            <Ionicons name="basket-outline" size={24} color="#FF6B35" />
          </View>
          {cart.map((c) => (
            <View key={c.item.id} className="flex-row items-center justify-between mb-4">
              <View className="flex-1 pr-3">
                <Text className="text-dark font-semibold">{c.item.name}</Text>
                <Text className="text-muted text-sm mt-1">${c.item.price.toFixed(2)} each</Text>
              </View>
              <View className="flex-row items-center bg-gray-50 rounded-full px-3 py-2">
                <TouchableOpacity
                  onPress={() => updateQuantity(c.item.id, -1)}
                  activeOpacity={0.8}
                  className="p-1 rounded-full"
                >
                  <Ionicons name="remove-circle-outline" size={22} color="#FF6B35" />
                </TouchableOpacity>
                <Text className="px-4 text-dark font-semibold">{c.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(c.item.id, 1)}
                  activeOpacity={0.8}
                  className="p-1 rounded-full"
                >
                  <Ionicons name="add-circle-outline" size={22} color="#FF6B35" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View className="bg-white rounded-[32px] p-5 mb-4">
          <Text className="text-dark font-semibold text-base mb-4">Payment Method</Text>
          <View className="flex-row justify-between gap-2">
            {paymentMethods.map((method) => {
              const active = payment === method;
              return (
                <TouchableOpacity
                  key={method}
                  onPress={() => setPayment(method)}
                  activeOpacity={0.85}
                  className={`flex-1 rounded-3xl px-4 py-3 ${
                    active ? "bg-black" : "bg-slate-50"
                  }`}
                >
                  <Text className={`text-center font-semibold ${active ? "text-white" : "text-dark"}`}>
                    {method}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text className="text-muted text-sm mt-3">
            {payment === "Cash on Delivery" ? "Pay when food arrives" : "Secure online payment."}
          </Text>
        </View>

        <View className="bg-white rounded-[32px] p-5 mb-28">
          <View className="flex-row justify-between mb-3">
            <Text className="text-muted">Subtotal</Text>
            <Text className="text-dark font-semibold">${cartTotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-muted">Delivery fee</Text>
            <Text className="text-dark font-semibold">${deliveryFee.toFixed(2)}</Text>
          </View>
          <View className="border-t border-gray-100 pt-4 flex-row justify-between items-center">
            <Text className="text-dark font-bold text-lg">Total</Text>
            <Text className="text-black font-bold text-lg">${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {error ? (
        <View className="absolute bottom-24 left-4 right-4 bg-red-100 rounded-3xl p-3 shadow-md">
          <Text className="text-red-700 text-sm text-center">{error}</Text>
        </View>
      ) : null}

      <View className="absolute bottom-6 left-4 right-4">
        <TouchableOpacity
          onPress={handlePlaceOrder}
          disabled={loading}
          activeOpacity={0.85}
          className={`rounded-[30px] py-4 items-center ${
            loading ? "bg-gray-400" : "bg-black"
          } shadow-lg`}
        >
          <Text className="text-white font-bold text-base">
            {loading ? "Placing order..." : `Checkout · $${total.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={successVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/30 justify-center items-center px-6">
          <View className="w-full bg-white rounded-3xl p-6">
            <View className="bg-green-100 w-16 h-16 rounded-full items-center justify-center mb-5">
              <Ionicons name="checkmark" size={28} color="#2E7D32" />
            </View>
            <Text className="text-dark font-bold text-2xl mb-3">Order successfully placed!</Text>
            <Text className="text-muted text-sm mb-6">
              Your order is now being prepared. Track it in the Orders tab.
            </Text>
            <TouchableOpacity
              onPress={handleSuccessClose}
              activeOpacity={0.85}
              className="bg-black rounded-3xl py-4 items-center"
            >
              <Text className="text-white font-semibold">View Orders</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setSuccessVisible(false)} className="mt-4 items-center">
              <Text className="text-muted text-sm">Continue browsing</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
