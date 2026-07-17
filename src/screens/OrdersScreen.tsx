import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { apiGet } from "@/services/api";
import { Order, OrderStatus } from "@/types";

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; icon: string }
> = {
  PENDING: { label: "Pending", color: "#FFB703", icon: "time-outline" },
  CONFIRMED: {
    label: "Confirmed",
    color: "#2196F3",
    icon: "checkmark-done-outline",
  },
  PREPARING: {
    label: "Preparing",
    color: "#5E9F2D",
    icon: "restaurant-outline",
  },
  READY_FOR_PICKUP: {
    label: "Ready",
    color: "#4CAF50",
    icon: "bicycle-outline",
  },
  OUT_FOR_DELIVERY: {
    label: "On the way",
    color: "#2EC4B6",
    icon: "bicycle-outline",
  },
  DELIVERED: {
    label: "Delivered",
    color: "#4CAF50",
    icon: "checkmark-circle-outline",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "#E53935",
    icon: "close-circle-outline",
  },
};

export default function OrdersScreen() {
  const { user } = useAuth();
  const { orders, loadOrders } = useCart();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const response = await apiGet<{
          success: boolean;
          count?: number;
          data: Order[];
        }>(`/order/getAll?userId=${user._id}`);
        loadOrders(response.data || []);
      } catch (err: any) {
        setError(err.message || "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    if (isFocused && user) {
      fetchOrders();
    }
  }, [user, loadOrders, isFocused]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-dark text-base">Loading orders...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-dark text-base text-center">
          Please login to view your orders.
        </Text>
      </SafeAreaView>
    );
  }

  if (orders.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Ionicons name="receipt-outline" size={64} color="#5E9F2D" />
        <Text className="text-neutral-500 text-base mt-4">No orders yet</Text>
        {error ? (
          <Text className="text-red-500 text-sm mt-2">{error}</Text>
        ) : null}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-dark font-bold text-2xl px-4 pt-4 mb-2">
        Your Orders
      </Text>
      <FlatList
        data={orders}
        keyExtractor={(o) => o._id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        renderItem={({ item: order }) => {
          const status = statusConfig[order.status];
          return (
            <View className="bg-white rounded-3xl p-4 mb-4">
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                  <Text className="text-dark font-semibold text-base">
                    {order.restaurantName ||
                      (typeof order.restaurantId === "string"
                        ? order.restaurantId
                        : order.restaurantId?.name) ||
                      "Order"}
                  </Text>
                  <Text className="text-muted text-sm mt-1">
                    {order.items.length} item(s) · $
                    {order.totalPrice.toFixed(2)}
                  </Text>
                </View>
                <View
                  className="rounded-full px-3 py-1"
                  style={{ backgroundColor: `${status.color}22` }}
                >
                  <Text
                    className="text-[11px] font-semibold"
                    style={{ color: status.color }}
                  >
                    {status.label}
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center mt-4">
                <Text className="text-muted text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </Text>
                <Ionicons
                  name={status.icon as any}
                  size={18}
                  color={status.color}
                />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
