import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";

const menuItems: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: "person-outline", label: "Personal Information" },
  { icon: "location-outline", label: "Saved Addresses" },
  { icon: "card-outline", label: "Payment Methods" },
  { icon: "notifications-outline", label: "Notifications" },
  { icon: "help-circle-outline", label: "Help & Support" },
  { icon: "log-out-outline", label: "Log Out" },
];

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleMenuPress = (label: string) => {
    if (label === "Log Out") {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-light">
      <View className="px-4 pt-6 items-center">
        <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
          <Text className="text-white font-bold text-2xl">JD</Text>
        </View>
        <Text className="text-dark font-bold text-xl mt-3">Jane Doe</Text>
        <Text className="text-muted text-sm">jane.doe@example.com</Text>
      </View>
      <View className="px-4 mt-6">
        {menuItems.map((mi) => (
          <TouchableOpacity
            key={mi.label}
            className="flex-row items-center bg-white rounded-2xl px-4 py-4 mb-3"
            activeOpacity={0.8}
            onPress={() => handleMenuPress(mi.label)}
          >
            <Ionicons name={mi.icon} size={20} color="#FF6B35" />
            <Text className="text-dark ml-3 flex-1">{mi.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#8A8A8A" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
