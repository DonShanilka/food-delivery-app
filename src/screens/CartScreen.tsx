import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCart } from "@/context/CartContext";
import { RootStackParamList } from "@/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function CartScreen() {
  const navigation = useNavigation<Nav>();
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Ionicons name="bag-outline" size={64} color="#8A8A8A" />
        <Text className="text-neutral-500 text-base mt-4">Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-black font-bold text-2xl px-4 pt-4">Your Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(c) => c.item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 160 }}
        renderItem={({ item: c }) => (
          <View className="bg-white rounded-3xl p-4 mb-4">
            <View className="flex-row items-center">
              <Image
                source={{ uri: c.item.image }}
                className="w-16 h-16 rounded-3xl"
              />
              <View className="flex-1 ml-4">
                <Text className="text-dark font-semibold text-base">
                  {c.item.name}
                </Text>
                <Text className="text-primary font-bold mt-1 text-sm">
                  ${(c.item.price * c.quantity).toFixed(2)}
                </Text>
                <Text className="text-muted text-xs mt-1">
                  {c.item.description ?? "Delicious choice"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => removeFromCart(c.item.id)}
                className="p-2 rounded-full"
                activeOpacity={0.8}
              >
                <Ionicons name="trash-outline" size={22} color="#5E9F2D" />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center justify-between mt-4 bg-slate-50 rounded-full px-2 py-2">
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => updateQuantity(c.item.id, -1)}
                  className="p-2 rounded-full"
                  activeOpacity={0.8}
                >
                  <Ionicons name="remove-circle-outline" size={24} color="#5E9F2D" />
                </TouchableOpacity>
                <Text className="mx-3 text-dark font-semibold">{c.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(c.item.id, 1)}
                  className="p-2 rounded-full"
                  activeOpacity={0.8}
                >
                  <Ionicons name="add-circle-outline" size={24} color="#5E9F2D" />
                </TouchableOpacity>
              </View>
              <Text className="text-xs text-muted uppercase tracking-[0.2em]">
                Quantity
              </Text>
            </View>
          </View>
        )}
      />
      <View className="px-4 pb-6">
        <View className="bg-white rounded-3xl p-4 mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-muted text-base">Subtotal</Text>
            <Text className="text-dark font-semibold text-base">
              ${cartTotal.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-muted text-sm">Delivery</Text>
            <Text className="text-dark font-semibold text-sm">$1.99</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Checkout")}
          activeOpacity={0.85}
          className="bg-primary rounded-3xl py-4 items-center"
        >
          <Text className="text-white font-bold text-base">
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
