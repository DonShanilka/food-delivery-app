import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
// import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Feather,
  AntDesign,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { RootStackParamList } from "@/types";
import { apiPost } from "@/services/api";

export default function RegisterScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await apiPost("/users/register", {
        first_name: name,
        last_name: "",
        email,
        password,
        phone: "",
      });

      navigation.navigate("Login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Illustration */}
        <View className="items-center mt-4">
          <Image
            source={require("@/assets/images/register.png")}
            className="w-64 h-52"
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <View className="px-7">
          <Text className="text-3xl font-bold text-gray-800">Sign up</Text>

          <Text className="text-gray-400 mt-2">
            Create your account to continue.
          </Text>
        </View>

        {/* Form */}
        <View className="px-7 mt-4">
          {/* Name */}
          <View className="border border-gray-200 rounded-xl flex-row items-center px-4 h-14 mb-4">
            <FontAwesome5 name="user-alt" size={16} color="#9CA3AF" />
            <TextInput
              placeholder="Full Name"
              className="flex-1 ml-3 text-gray-700"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email */}
          <View className="border border-gray-200 rounded-xl flex-row items-center px-4 h-14 mb-4">
            <Feather name="mail" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Email"
              className="flex-1 ml-3 text-gray-700"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <View className="border border-gray-200 rounded-xl flex-row items-center px-4 h-14 mb-4">
            <Feather name="lock" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              className="flex-1 ml-3 text-gray-700"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View className="border border-gray-200 rounded-xl flex-row items-center px-4 h-14">
            <Feather name="lock" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showConfirm}
              className="flex-1 ml-3 text-gray-700"
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Feather
                name={showConfirm ? "eye" : "eye-off"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {error && <Text className="text-red-500 mt-4">{error}</Text>}

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            activeOpacity={0.9}
            className="bg-green-500 rounded-xl h-14 items-center justify-center mt-7"
          >
            <Text className="text-white text-lg font-bold">
              {loading ? "Signing Up..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="mx-3 text-gray-400">Or sign up with</Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
          </View>

          {/* Social Buttons */}
          <View className="flex-row justify-between">
            <TouchableOpacity className="border border-gray-200 rounded-xl h-14 flex-1 mr-2 justify-center items-center flex-row">
              <AntDesign name="google" size={20} color="#DB4437" />
              <Text className="ml-2 font-semibold">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity className="border border-gray-200 rounded-xl h-14 flex-1 ml-2 justify-center items-center flex-row">
              <FontAwesome name="facebook" size={20} color="#1877F2" />
              <Text className="ml-2 font-semibold">Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Login */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500">Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-green-500 font-bold ml-2">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
