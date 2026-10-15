import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RestaurantCard from "@/components/RestaurantCard";
import { apiGet, normalizeImageValue } from "@/services/api";
import { Restaurant, MainTabParamList, RootStackParamList } from "@/types";

const DEFAULT_RESTAURANT_IMAGE = require("@/assets/images/main-splashimage.png");

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
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
          name: item.name || "Restaurant",
          cuisine: Array.isArray(item.cuisine)
            ? item.cuisine.join(", ")
            : item.cuisine || item.category || "Restaurant",
          category:
            item.category ||
            (Array.isArray(item.cuisine)
              ? item.cuisine[0]
              : item.cuisine?.split(" · ")[0]) ||
            "Restaurant",
          image:
            normalizeImageValue(item.image) ||
            DEFAULT_RESTAURANT_IMAGE,
          rating: typeof item.rating === "number" ? item.rating : 4.5,
          deliveryTime: item.deliveryTime ?? "30-40 min",
          deliveryFee:
            typeof item.deliveryFee === "number" ? item.deliveryFee : 0,
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

  const categories = [
    "All",
    ...Array.from(
      new Set(restaurants.map((restaurant) => restaurant.category || restaurant.cuisine.split(" · ")[0]))
    ),
  ];

  const filtered = restaurants.filter((r) => {
    const cuisine = r.cuisine;
    const matchesCategory =
      selectedCategory === "All" ||
      r.category === selectedCategory ||
      cuisine.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesCategory && (
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      cuisine.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-neutral-500 text-sm">Deliver to</Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="location" size={18} color="#22C55E" />
          <Text className="text-dark font-bold text-lg ml-1">Home · Maharagama</Text>
        </View>
        <View className="flex-row items-center bg-white rounded-xl px-3 py-2.5 mt-4">
          <Ionicons name="search" size={18} color="#22C55E" />
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
          <ActivityIndicator size="large" color="#22C55E" />
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
            <View>
              <Text className="text-dark font-bold text-lg mb-3">
                Explore categories
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {categories.map((category) => {
                  const isSelected = selectedCategory === category;

                  return (
                    <Pressable
                      key={category}
                      onPress={() => setSelectedCategory(category)}
                      className={`mr-3 items-center justify-center rounded-2xl px-4 py-3 ${
                        isSelected ? "bg-green-500" : "bg-neutral-100"
                      }`}
                    >
                      <Ionicons
                        name={category === "All" ? "grid-outline" : "restaurant-outline"}
                        size={22}
                        color={isSelected ? "#FFFFFF" : "#22C55E"}
                      />
                      <Text
                        className={`mt-1 text-xs font-semibold ${
                          isSelected ? "text-white" : "text-dark"
                        }`}
                      >
                        {category}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
              <Text className="text-dark font-bold text-lg mb-3">
                Restaurants near you
              </Text>
            </View>
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
