import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import { apiPost } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const result = await apiPost<{ success: boolean; data: any }>(
        "/users/login",
        { email, password },
      );
      console.log("Login success", result);
      if (result?.data) {
        await setUser(result.data);
      }
      navigation.navigate("MainTabs", { screen: "Home" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-12">
        <View className="mb-10">
          <Text className="text-4xl font-extrabold text-white">
            Welcome Back
          </Text>
          <Text className="text-white text-base mt-2">
            Login to continue with healthy food delivery.
          </Text>
        </View>

        <View className="bg-slate-50 rounded-[30px] p-6">
          <Text className="text-gray-700 text-sm font-semibold mb-2">
            Email
          </Text>
          <TextInput
            className="border border-gray-200 rounded-2xl px-4 py-3 mb-4 text-base text-gray-900"
            placeholder="Enter your email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text className="text-gray-700 text-sm font-semibold mb-2">
            Password
          </Text>
          <TextInput
            className="border border-gray-200 rounded-2xl px-4 py-3 mb-6 text-base text-gray-900"
            placeholder="Enter your password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error ? (
            <Text className="text-red-500 text-sm mb-4">{error}</Text>
          ) : null}

          <TouchableOpacity
            className="bg-[#84C441] rounded-full py-4 items-center mb-4"
            activeOpacity={0.8}
            onPress={handleLogin}
          >
            <Text className="text-white text-lg font-bold">
              {loading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-500">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text className="text-[#5E9F2D] font-bold">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    // </LinearGradient>
  );
}
