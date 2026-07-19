import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MenuItem } from "@/types";

interface Props {
  item: MenuItem;
  onAdd: () => void;
}

const PLACEHOLDER = "https://via.placeholder.com/160x160.png?text=Menu";

export default function MenuItemRow({ item, onAdd }: Props) {
  const [failed, setFailed] = useState(false);

  const imageUri =
    item.image && item.image.length > 0
      ? item.image.startsWith("data:image")
        ? item.image
        : `data:image/png;base64,${item.image}`
      : PLACEHOLDER;

  return (
    <View className="flex-row bg-white rounded-2xl p-3 mb-3 items-center shadow-sm">
      <Image
        source={{ uri: imageUri }}
        className="w-20 h-20 rounded-xl"
        resizeMode="cover"
        onError={(e) => {
          console.log("Image Error:", e.nativeEvent.error);
          setFailed(true);
        }}
      />

      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-semibold text-black">
            {item.name}
          </Text>

          {item.discount > 0 && (
            <View className="bg-green-100 px-2 py-1 rounded-full">
              <Text className="text-green-500 text-[11px] font-semibold">
                -{item.discount}%
              </Text>
            </View>
          )}
        </View>

        <Text numberOfLines={2} className="text-gray-500 text-xs mt-1">
          {item.description}
        </Text>

        <View className="flex-row justify-between items-center mt-3">
          <View>
            <Text className="text-green-500 font-bold text-lg">
              Rs. {Number(item.price).toFixed(2)}
            </Text>

            <Text className="text-gray-400 text-xs mt-1">
              ⭐ {item.rating} • {item.preparationTime} min
            </Text>
          </View>

          <TouchableOpacity
            onPress={onAdd}
            className="bg-green-500 w-10 h-10 rounded-full justify-center items-center"
          >
            <Ionicons name="add" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
