import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MenuItemRow from "@/components/MenuItemRow";
import { useCart } from "@/context/CartContext";
import { apiGet, normalizeImageValue } from "@/services/api";
import { RootStackParamList, Restaurant, MenuItem } from "@/types";

type RestaurantRoute = RouteProp<RootStackParamList, "Restaurant">;

export default function RestaurantScreen() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "Restaurant">
    >();
  const route = useRoute<RestaurantRoute>();
  const { addToCart, cartCount } = useCart();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const restaurantRes = await apiGet<{ success: boolean; data: any }>(
          `/resturent/getById/${route.params.restaurantId}`,
        );
        const menuRes = await apiGet<{ success: boolean; data: any[] }>(
          `/menu/restaurant/${route.params.restaurantId}`,
        );

        setRestaurant({
          id: restaurantRes.data._id,
          name: restaurantRes.data.name || "Restaurant",
          cuisine: Array.isArray(restaurantRes.data.cuisine)
            ? restaurantRes.data.cuisine.join(", ")
            : restaurantRes.data.cuisine ||
              restaurantRes.data.category ||
              "Restaurant",
          image:
            normalizeImageValue(restaurantRes.data.image) ||
            "https://via.placeholder.com/640x400.png?text=Restaurant",
          rating:
            typeof restaurantRes.data.rating === "number"
              ? restaurantRes.data.rating
              : 4.5,
          deliveryTime: restaurantRes.data.deliveryTime ?? "30-40 min",
          deliveryFee:
            typeof restaurantRes.data.deliveryFee === "number"
              ? restaurantRes.data.deliveryFee
              : 0,
          description: restaurantRes.data.description || "",
          address: restaurantRes.data.address || "",
          phone: restaurantRes.data.phone || "",
          email: restaurantRes.data.email || "",
          openingTime: restaurantRes.data.openingTime || "",
          closingTime: restaurantRes.data.closingTime || "",
          category: restaurantRes.data.category || "",
          isActive: restaurantRes.data.isActive ?? true,
        });

        setMenuItems(
          menuRes.data.map((item) => ({
            id: item._id,
            restaurantId: item.restaurantId ?? route.params.restaurantId,
            name: item.name || "Menu item",
            description: item.description || "",
            price: typeof item.price === "number" ? item.price : 0,
            rating: typeof item.rating === "number" ? item.rating : 0,
            image:
              normalizeImageValue(item.image) ||
              "https://via.placeholder.com/160x160.png?text=Menu",
            isAvailable: item.isAvailable ?? true,
            preparationTime:
              typeof item.preparationTime === "number"
                ? item.preparationTime
                : 25,
            discount: typeof item.discount === "number" ? item.discount : 0,
          })),
        );
      } catch (err: any) {
        setError(err.message || "Failed to load restaurant details");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [route.params.restaurantId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#84C441" />
      </SafeAreaView>
    );
  }

  if (error || !restaurant) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white px-8">
        <Text className="text-red-500 text-center">
          {error || "Restaurant not found."}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <Image
          source={{
            uri: typeof restaurant.image === "string" ? restaurant.image : "",
          }}
          onError={() => {}}
          resizeMode="cover"
          className="w-full h-48"
        />
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
        <View className="flex-row flex-wrap items-center gap-2 mt-3">
          <View className="flex-row items-center bg-white/90 rounded-full px-3 py-2">
            <Ionicons name="star" size={14} color="#22C55E" />
            <Text className="text-dark text-sm ml-1">{restaurant.rating}</Text>
          </View>
          <View className="flex-row items-center bg-white/90 rounded-full px-3 py-2 border border-gray-200">
            <Ionicons name="time-outline" size={14} color="#22C55E" />
            <Text className="text-dark text-sm ml-1">
              {restaurant.deliveryTime}
            </Text>
          </View>
          <View className="flex-row items-center bg-white/90 rounded-full px-3 py-2">
            <Ionicons name="cart-outline" size={14} color="#22C55E" />
            <Text className="text-dark text-sm ml-1">
              {restaurant.deliveryFee === 0
                ? "Free delivery"
                : `$${restaurant.deliveryFee.toFixed(2)}`}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        ListHeaderComponent={
          <Text className="text-dark font-bold text-lg mb-3 mt-2">Menu</Text>
        }
        renderItem={({ item }) => (
          <MenuItemRow
            item={item}
            onAdd={() => addToCart(item, restaurant.id, restaurant.name)}
          />
        )}
        ListEmptyComponent={
          <View className="items-center mt-20">
            <Text className="text-muted">No menu items available.</Text>
          </View>
        }
      />
      {cartCount > 0 && (
        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs", { screen: "Cart" })}
          className="absolute bottom-6 left-4 right-4 bg-green-500 rounded-2xl py-4 flex-row justify-center items-center"
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
