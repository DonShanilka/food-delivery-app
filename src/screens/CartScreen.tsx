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
      <SafeAreaView className="flex-1 bg-light items-center justify-center">
        <Ionicons name="bag-outline" size={64} color="#8A8A8A" />
        <Text className="text-muted text-base mt-4">Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-light">
      <Text className="text-dark font-bold text-2xl px-4 pt-4">Your Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(c) => c.item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item: c }) => (
          <View className="flex-row bg-white rounded-2xl p-3 mb-3 items-center">
            <Image source={{ uri: c.item.image }} className="w-16 h-16 rounded-xl" />
            <View className="flex-1 ml-3">
              <Text className="text-dark font-semibold">{c.item.name}</Text>
              <Text className="text-primary font-bold mt-1">
                ${(c.item.price * c.quantity).toFixed(2)}
              </Text>
            </View>
            <View className="flex-row items-center bg-light rounded-full px-2 py-1">
              <TouchableOpacity onPress={() => updateQuantity(c.item.id, -1)}>
                <Ionicons name="remove-circle-outline" size={22} color="#FF6B35" />
              </TouchableOpacity>
              <Text className="mx-2 text-dark font-medium">{c.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(c.item.id, 1)}>
                <Ionicons name="add-circle-outline" size={22} color="#FF6B35" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View className="px-4 pb-6">
        <View className="flex-row justify-between mb-4">
          <Text className="text-muted text-base">Subtotal</Text>
          <Text className="text-dark font-bold text-base">
            ${cartTotal.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Checkout")}
          className="bg-primary rounded-2xl py-4 items-center"
        >
          <Text className="text-white font-bold text-base">
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
