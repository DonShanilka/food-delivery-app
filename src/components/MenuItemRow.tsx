import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MenuItem } from "@/types";

interface Props {
  item: MenuItem;
  onAdd: () => void;
}

export default function MenuItemRow({ item, onAdd }: Props) {
  const imageUri =
    item.image && item.image.length > 0
      ? item.image
      : "https://via.placeholder.com/160x160.png?text=Menu";

  return (
    <View className="flex-row bg-white rounded-2xl p-3 mb-3 items-center shadow-sm" style={{ elevation: 1 }}>
      <Image source={{ uri: imageUri }} className="w-20 h-20 rounded-xl" />
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-dark font-semibold text-base">{item.name}</Text>
          {item.discount > 0 && (
            <View className="bg-green-100 px-2 py-1 rounded-full">
              <Text className="text-green-700 text-[11px] font-semibold">
                -{item.discount}%
              </Text>
            </View>
          )}
        </View>
        <Text className="text-muted text-xs mt-1" numberOfLines={2}>
          {item.description || "Delicious choice from the menu."}
        </Text>
        <View className="flex-row items-center justify-between mt-3">
          <View>
            <Text className="text-primary font-bold text-base">
              ${item.price.toFixed(2)}
            </Text>
            <Text className="text-muted text-[11px] mt-1">
              {item.preparationTime ? `${item.preparationTime} min` : "Ready soon"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onAdd}
            className="bg-primary w-9 h-9 rounded-full items-center justify-center"
          >
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
