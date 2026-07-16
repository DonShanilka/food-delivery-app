import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Restaurant } from "@/types";

interface Props {
  restaurant: Restaurant;
  onPress: () => void;
}

export default function RestaurantCard({ restaurant, onPress }: Props) {
  const cuisineLabel = Array.isArray(restaurant.cuisine)
    ? restaurant.cuisine.join(", ")
    : restaurant.cuisine || "Restaurant";

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
      style={{ elevation: 2 }}
    >
      <Image
        source={{
          uri:
            restaurant.image && restaurant.image.length > 0
              ? restaurant.image
              : "https://via.placeholder.com/640x400.png?text=Restaurant",
        }}
        className="w-full h-40"
      />
      <View className="p-3">
        <Text className="text-dark font-bold text-lg">{restaurant.name}</Text>
        <Text className="text-muted text-sm mt-0.5">{cuisineLabel}</Text>
        <View className="flex-row items-center mt-2">
          <Ionicons name="star" size={14} color="#FF6B35" />
          <Text className="text-dark text-sm ml-1 font-medium">
            {restaurant.rating?.toFixed(1) ?? "4.5"}
          </Text>
          <Text className="text-muted text-sm mx-2">·</Text>
          <Ionicons name="time-outline" size={14} color="#8A8A8A" />
          <Text className="text-muted text-sm ml-1">
            {restaurant.deliveryTime ? `${restaurant.deliveryTime} min` : "30-40 min"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
