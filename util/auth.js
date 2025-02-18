/** @format */

import axios from 'axios';
import Constants from 'expo-constants';

const FIREBASE_API_KEY = Constants.expoConfig.extra.FIREBASE_API_KEY;

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_API_KEY}`;
  try {
    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });
    const token = response.data.idToken;
    return token;
  } catch (error) {
    console.error(
      'Error creating user:',
      error.response?.data || error.message
    );
    throw error;
  }
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}
export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
