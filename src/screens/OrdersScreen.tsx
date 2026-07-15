import React from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/context/CartContext";

const statusConfig = {
  preparing: { label: "Preparing", color: "#FF6B35", icon: "restaurant-outline" as const },
  on_the_way: { label: "On the way", color: "#2EC4B6", icon: "bicycle-outline" as const },
  delivered: { label: "Delivered", color: "#4CAF50", icon: "checkmark-circle-outline" as const },
};

export default function OrdersScreen() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-light items-center justify-center">
        <Ionicons name="receipt-outline" size={64} color="#8A8A8A" />
        <Text className="text-muted text-base mt-4">No orders yet</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-light">
      <Text className="text-dark font-bold text-2xl px-4 pt-4 mb-2">
        Your Orders
      </Text>
      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item: order }) => {
          const status = statusConfig[order.status];
          return (
            <View className="bg-white rounded-2xl p-4 mb-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-dark font-semibold text-base">
                  {order.restaurantName}
                </Text>
                <Text className="text-muted text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Text className="text-muted text-sm mt-1">
                {order.items.length} item(s) · ${order.total.toFixed(2)}
              </Text>
              <View className="flex-row items-center mt-3">
                <Ionicons name={status.icon} size={16} color={status.color} />
                <Text style={{ color: status.color }} className="ml-2 font-medium text-sm">
                  {status.label}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
