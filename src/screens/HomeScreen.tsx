import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RestaurantCard from "@/components/RestaurantCard";
import { apiGet } from "@/services/api";
import { Restaurant } from "@/types";
import { RootStackParamList } from "@/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const response = await apiGet<{ success: boolean; count: number; data: any[] }>(
          "/resturent/getAll"
        );

        const mapped = response.data.map((item) => ({
          id: item._id,
          name: item.name,
          cuisine: Array.isArray(item.cuisine)
            ? item.cuisine.join(", ")
            : item.cuisine || item.category || "Restaurant",
          image:
            item.image && typeof item.image === "string"
              ? item.image
              : "https://via.placeholder.com/640x400.png?text=Restaurant",
          rating: item.rating ?? 4.5,
          deliveryTime: item.deliveryTime ?? "30-40 min",
          deliveryFee: item.deliveryFee ?? 0,
        }));

        setRestaurants(mapped);
      } catch (err: any) {
        setError(err.message || "Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-light">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-muted text-sm">Deliver to</Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="location" size={18} color="#FF6B35" />
          <Text className="text-dark font-bold text-lg ml-1">Home · Maharagama</Text>
        </View>
        <View className="flex-row items-center bg-white rounded-xl px-3 py-2.5 mt-4">
          <Ionicons name="search" size={18} color="#8A8A8A" />
          <TextInput
            placeholder="Search restaurants or cuisines"
            value={query}
            onChangeText={setQuery}
            className="flex-1 ml-2 text-dark"
            placeholderTextColor="#8A8A8A"
          />
        </View>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#84C441" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center px-8">
          <Text className="text-red-500 text-center">{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingTop: 8 }}
          ListHeaderComponent={
            <Text className="text-dark font-bold text-lg mb-3">
              Restaurants near you
            </Text>
          }
          renderItem={({ item }) => (
            <RestaurantCard
              restaurant={item}
              onPress={() =>
                navigation.navigate("Restaurant", { restaurantId: item.id })
              }
            />
          )}
          ListEmptyComponent={
            <View className="items-center mt-20">
              <Text className="text-muted">No restaurants found.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
