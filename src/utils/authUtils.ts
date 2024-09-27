import { redirect } from "react-router-dom";
import Cookie from "./Cookie";

export const authToken = "authToken";
export const setAuthToken = async (value: string) => {
  Cookie.set(authToken, value, "7");
  //localStorage.setItem(authToken, value);
};

export const getAuthToken = () => {
  return Cookie.get(authToken);
  //return localStorage.getItem(authToken);
};

export const removeAuthToken = () => {
  localStorage.removeItem(authToken);
};

export function isAuthenticated() {
  const token = getAuthToken();
  return !!token;
}

export function tokenLoader() {
  return getAuthToken();
}

export async function checkLoggedIn() {
  const token = isAuthenticated();
  if (token) {
    return redirect("/");
  }
  return null;
}

export async function checkAuthLoader() {
  const token = isAuthenticated();
  if (!token) {
    return redirect("/login");
  }
  return null;
}

export async function userLogout() {
  removeAuthToken();
  return redirect("/login");
}
