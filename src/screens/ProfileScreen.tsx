import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, User } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { apiPut } from "@/services/api";

const DEFAULT_PROFILE_IMAGE =
  "https://via.placeholder.com/160x160.png?text=Profile";

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, setUser, logout } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name ?? "");
      setLastName(user.last_name ?? "");
      setEmail(user.email ?? "");
      setPhone(user.phone ?? "");
      setProfileImage(user.profile_image ?? "");
      setStatus(user.status ?? "");
      setRole(user.role ?? "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setMessage(null);

    try {
      const payload: Partial<User> = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        profile_image: profileImage,
      };

      const response = await apiPut<any>(`/users/${user._id}`, payload);
      const updatedUser: User = response?.data ?? response;

      if (updatedUser) {
        await setUser(updatedUser);
        setMessage("Profile updated successfully.");
      }
    } catch (err: any) {
      setMessage(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-light px-4 justify-center">
        <Text className="text-center text-dark text-lg mb-4">
          Please log in to view your profile.
        </Text>
        <TouchableOpacity
          className="bg-primary rounded-full py-4 mx-10 items-center"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-white font-bold">Go to Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-light">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="items-center mb-6">
          <Image
            source={{ uri: profileImage || DEFAULT_PROFILE_IMAGE }}
            className="w-24 h-24 rounded-full bg-gray-200"
            resizeMode="cover"
          />
          <Text className="text-dark text-2xl font-bold mt-4">
            {firstName} {lastName}
          </Text>
          <Text className="text-muted text-sm">{email}</Text>
        </View>

        <View
          className="bg-white rounded-3xl p-5 space-y-4 shadow-sm"
          style={{ elevation: 2 }}
        >
          <Text className="text-dark font-semibold text-lg">
            Profile Details
          </Text>

          <View>
            <Text className="text-muted mb-1">First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              className="border border-gray-200 rounded-2xl px-4 py-3 text-base text-dark"
            />
          </View>

          <View>
            <Text className="text-muted mb-1">Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              className="border border-gray-200 rounded-2xl px-4 py-3 text-base text-dark"
            />
          </View>

          <View>
            <Text className="text-muted mb-1">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-gray-200 rounded-2xl px-4 py-3 text-base text-dark"
            />
          </View>

          <View>
            <Text className="text-muted mb-1">Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              className="border border-gray-200 rounded-2xl px-4 py-3 text-base text-dark"
            />
          </View>

          <View>
            <Text className="text-muted mb-1">Profile Image URL</Text>
            <TextInput
              value={profileImage}
              onChangeText={setProfileImage}
              placeholder="https://..."
              className="border border-gray-200 rounded-2xl px-4 py-3 text-base text-dark"
            />
          </View>

          <View className="flex-row justify-between mt-2">
            <View>
              <Text className="text-muted text-xs">Role</Text>
              <Text className="text-dark font-semibold">{role}</Text>
            </View>
            <View>
              <Text className="text-muted text-xs">Status</Text>
              <Text className="text-dark font-semibold">{status}</Text>
            </View>
          </View>

          {message ? (
            <Text className="text-center text-sm text-primary">{message}</Text>
          ) : null}

          <TouchableOpacity
            className="bg-primary rounded-2xl py-4 items-center"
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold">Save Changes</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white rounded-2xl py-4 items-center border border-red-200"
            onPress={handleLogout}
          >
            <Text className="text-red-500 font-bold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
