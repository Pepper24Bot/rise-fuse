import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStorage } from "wagmi";

// Adapter wrapper
export const asyncStorage = createStorage({
  storage: {
    async getItem(key: string) {
      return await AsyncStorage.getItem(key);
    },
    async setItem(key: string, value: string) {
      await AsyncStorage.setItem(key, value);
    },
    async removeItem(key: string) {
      await AsyncStorage.removeItem(key);
    },
  },
});
