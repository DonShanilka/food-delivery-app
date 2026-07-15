import React, { useState } from "react";
import { View, Text, FlatList, TextInput, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants } from "@/data/restaurants";
import { RootStackParamList } from "@/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState("");

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
      />
    </SafeAreaView>
  );
}
