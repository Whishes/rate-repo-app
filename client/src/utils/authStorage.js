import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
      const storeToken = await AsyncStorage.getItem(
          `${this.namespace}: user`,
      );
      return storeToken;
  }

  async setAccessToken(accessToken) {
      await AsyncStorage.setItem(
          `${this.namespace}: user`,
          accessToken
      );
  }

  async removeAccessToken() {
      await AsyncStorage.removeItem(`${this.namespace}: user`);
  }
}

export default AuthStorage;