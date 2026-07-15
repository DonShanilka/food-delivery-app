import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MenuItem } from "@/types";

interface Props {
  item: MenuItem;
  onAdd: () => void;
}

export default function MenuItemRow({ item, onAdd }: Props) {
  return (
    <View className="flex-row bg-white rounded-2xl p-3 mb-3 items-center">
      <Image source={{ uri: item.image }} className="w-20 h-20 rounded-xl" />
      <View className="flex-1 ml-3">
        <Text className="text-dark font-semibold text-base">{item.name}</Text>
        <Text className="text-muted text-xs mt-1" numberOfLines={2}>
          {item.description}
        </Text>
        <Text className="text-primary font-bold mt-1">
          ${item.price.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onAdd}
        className="bg-primary w-9 h-9 rounded-full items-center justify-center"
      >
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
