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
import { Ionicons } from "@expo/vector-icons";
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
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name ?? "");
      setLastName(user.last_name ?? "");
      setEmail(user.email ?? "");
      setPhone(user.phone ?? "");
      setAddress(user.address ?? "");
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
        address,
        profile_image: profileImage,
      };

      const response = await apiPut<{ success: boolean; data: User }>(
        `/users/${user._id}`,
        payload,
      );
      const updatedUser = response?.data ?? response;

      if (updatedUser) {
        await setUser(updatedUser);
        setMessage("Profile updated successfully.");
        setEditing(false);
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
      <SafeAreaView className="flex-1 bg-white px-4 justify-center">
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
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-neutral-500 text-sm">Profile</Text>
            <Text className="text-black font-bold text-3xl">
              {firstName} {lastName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setEditing((prev) => !prev)}
            className="bg-slate-100 rounded-full p-3"
          >
            <Ionicons
              name={editing ? "checkmark" : "pencil"}
              size={22}
              color="#5E9F2D"
            />
          </TouchableOpacity>
        </View>

        <View className="items-center mb-6">
          <Image
            source={{ uri: profileImage || DEFAULT_PROFILE_IMAGE }}
            className="w-24 h-24 rounded-full bg-gray-200"
            resizeMode="cover"
          />
          <Text className="text-dark text-xl font-semibold mt-4">
            {firstName} {lastName}
          </Text>
          <Text className="text-muted text-sm">{email}</Text>
        </View>

        <View className="bg-white rounded-3xl p-5 space-y-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-dark font-semibold text-lg">Profile Details</Text>
            {editing ? (
              <Text className="text-sm text-green-500">Editing</Text>
            ) : null}
          </View>

          <View>
            <Text className="text-muted mb-1">First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              editable={editing}
              className="bg-slate-50 rounded-2xl px-4 py-3 text-base text-dark"
            />
          </View>

          <View>
            <Text className="text-muted mb-1">Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              editable={editing}
              className="bg-slate-50 rounded-2xl px-4 py-3 text-base text-dark"
            />
          </View>

          <View>
            <Text className="text-muted mb-1">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              editable={editing}
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-slate-50 rounded-2xl px-4 py-3 text-base text-dark"
            />
          </View>

          <View>
            <Text className="text-muted mb-1">Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              editable={editing}
              className="bg-slate-50 rounded-2xl px-4 py-3 text-base text-dark"
            />
          </View>

          <View>
            <Text className="text-muted mb-1">Address</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              editable={editing}
              className="bg-slate-50 rounded-2xl px-4 py-3 text-base text-dark"
            />
          </View>

          <View>
            <Text className="text-muted mb-1">Profile Image URL</Text>
            <TextInput
              value={profileImage}
              onChangeText={setProfileImage}
              placeholder="https://..."
              editable={editing}
              className="bg-slate-50 rounded-2xl px-4 py-3 text-base text-dark"
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
            <Text className="text-center text-sm text-green-500">{message}</Text>
          ) : null}

          {editing ? (
            <TouchableOpacity
              className="bg-green-500 rounded-2xl py-4 items-center"
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold">Save Changes</Text>
              )}
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            className="bg-slate-50 rounded-2xl py-4 items-center"
            onPress={handleLogout}
          >
            <Text className="text-red-500 font-bold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
