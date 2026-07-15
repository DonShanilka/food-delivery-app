import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "@/screens/HomeScreen";
import CartScreen from "@/screens/CartScreen";
import OrdersScreen from "@/screens/OrdersScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { useCart } from "@/context/CartContext";
import { MainTabParamList } from "@/types";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator<MainTabParamList>();

function CartIconWithBadge({ color, size }: { color: string; size: number }) {
  const { cartCount } = useCart();
  return (
    <View>
      <Ionicons name="bag-handle-outline" size={size} color={color} />
      {cartCount > 0 && (
        <View className="absolute -top-1 -right-2 bg-primary rounded-full w-4 h-4 items-center justify-center">
          <Text className="text-white text-[10px] font-bold">{cartCount}</Text>
        </View>
      )}
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6B35",
        tabBarInactiveTintColor: "#8A8A8A",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CartIconWithBadge color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
