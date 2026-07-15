import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "@/context/CartContext";

const paymentMethods = ["Cash on Delivery", "Card", "Wallet"];

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const { cart, cartTotal, placeOrder } = useCart();
  const [payment, setPayment] = useState(paymentMethods[0]);
  const deliveryFee = 1.99;
  const total = cartTotal + deliveryFee;

  const handlePlaceOrder = () => {
    placeOrder();
    navigation.navigate("MainTabs" as never, { screen: "Orders" } as never);
  };

  return (
    <SafeAreaView className="flex-1 bg-light">
      <ScrollView className="px-4 pt-4">
        <Text className="text-dark font-bold text-2xl mb-4">Checkout</Text>

        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="text-dark font-semibold mb-2">Delivery Address</Text>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={18} color="#FF6B35" />
            <Text className="text-muted ml-2">
              Home · Maharagama, Western Province
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="text-dark font-semibold mb-3">Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method}
              onPress={() => setPayment(method)}
              className="flex-row items-center justify-between py-2"
            >
              <Text className="text-dark">{method}</Text>
              <Ionicons
                name={payment === method ? "radio-button-on" : "radio-button-off"}
                size={20}
                color="#FF6B35"
              />
            </TouchableOpacity>
          ))}
        </View>

        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="text-dark font-semibold mb-3">Order Summary</Text>
          {cart.map((c) => (
            <View key={c.item.id} className="flex-row justify-between mb-1">
              <Text className="text-muted">
                {c.quantity}x {c.item.name}
              </Text>
              <Text className="text-dark">
                ${(c.item.price * c.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View className="border-t border-gray-100 mt-2 pt-2 flex-row justify-between">
            <Text className="text-muted">Delivery Fee</Text>
            <Text className="text-dark">${deliveryFee.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-dark font-bold">Total</Text>
            <Text className="text-primary font-bold">${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      <View className="px-4 pb-6">
        <TouchableOpacity
          onPress={handlePlaceOrder}
          className="bg-primary rounded-2xl py-4 items-center"
        >
          <Text className="text-white font-bold text-base">
            Place Order · ${total.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
