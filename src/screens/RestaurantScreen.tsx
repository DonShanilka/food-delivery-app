import React from "react";
import { View, Text, Image, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import MenuItemRow from "@/components/MenuItemRow";
import { restaurants } from "@/data/restaurants";
import { useCart } from "@/context/CartContext";
import { RootStackParamList } from "@/types";

type RestaurantRoute = RouteProp<RootStackParamList, "Restaurant">;

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const route = useRoute<RestaurantRoute>();
  const { addToCart, cartCount } = useCart();

  const restaurant = restaurants.find((r) => r.id === route.params.restaurantId)!;

  return (
    <SafeAreaView className="flex-1 bg-light">
      <View>
        <Image source={{ uri: restaurant.image }} className="w-full h-48" />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-12 left-4 bg-white w-9 h-9 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#1A1A1A" />
        </TouchableOpacity>
      </View>
      <View className="px-4 pt-4">
        <Text className="text-dark font-bold text-2xl">{restaurant.name}</Text>
        <Text className="text-muted mt-1">{restaurant.cuisine}</Text>
        <View className="flex-row items-center mt-2">
          <Ionicons name="star" size={14} color="#FF6B35" />
          <Text className="text-dark text-sm ml-1">{restaurant.rating}</Text>
          <Text className="text-muted text-sm mx-2">·</Text>
          <Text className="text-muted text-sm">{restaurant.deliveryTime}</Text>
        </View>
      </View>
      <FlatList
        data={restaurant.menu}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListHeaderComponent={
          <Text className="text-dark font-bold text-lg mb-3 mt-2">Menu</Text>
        }
        renderItem={({ item }) => (
          <MenuItemRow
            item={item}
            onAdd={() => addToCart(item, restaurant.id, restaurant.name)}
          />
        )}
      />
      {cartCount > 0 && (
        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs" as never, { screen: "Cart" } as never)}
          className="absolute bottom-6 left-4 right-4 bg-primary rounded-2xl py-4 flex-row justify-center items-center"
        >
          <Ionicons name="bag-handle" size={18} color="white" />
          <Text className="text-white font-bold ml-2">
            View Cart ({cartCount})
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
