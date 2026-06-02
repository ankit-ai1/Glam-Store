"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  gender: "male" | "female" | "other";
  dob: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pendingOTP: string | null;
}

interface AuthContextType extends AuthState {
  sendOTP: (email: string) => Promise<void>;
  verifyOTPAndLogin: (email: string, otp: string) => Promise<void>;
  verifyOTPAndRegister: (userData: Omit<User, "id" | "avatar">, otp: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
  logout: () => void;
  // legacy shim so existing callers don't crash during transition
  login: (email: string, _pw: string) => Promise<void>;
  register: (name: string, email: string, _pw: string) => Promise<void>;
}

const AuthCtx = createContext<AuthContextType | null>(null);
const STORAGE_KEY = "glam_store_auth";
const USERS_KEY = "glam_store_users";

function genOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getAvatarUrl(gender: string, seed: string) {
  const s = encodeURIComponent(seed);
  if (gender === "male")   return `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${s}&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear`;
  if (gender === "female") return `https://api.dicebear.com/7.x/lorelei/svg?seed=${s}&backgroundColor=ffd5dc,ffdfbf&backgroundType=gradientLinear`;
  return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${s}&backgroundColor=c0aede,b6e3f4&backgroundType=gradientLinear`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    pendingOTP: null,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { user } = JSON.parse(stored);
        setState({ user, isAuthenticated: true, isLoading: false, pendingOTP: null });
      } else {
        setState(s => ({ ...s, isLoading: false }));
      }
    } catch {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const getUsers = (): User[] => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
  };
  const saveUsers = (users: User[]) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const sendOTP = async (email: string) => {
    await new Promise(r => setTimeout(r, 500));
    const otp = genOTP();
    setState(s => ({ ...s, pendingOTP: otp }));
  };

  const verifyOTPAndLogin = async (email: string, otp: string) => {
    if (otp !== state.pendingOTP) throw new Error("Invalid OTP. Please try again.");
    await new Promise(r => setTimeout(r, 300));
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error("No account found with this email. Please register first.");
    setState({ user, isAuthenticated: true, isLoading: false, pendingOTP: null });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
  };

  const verifyOTPAndRegister = async (userData: Omit<User, "id" | "avatar">, otp: string) => {
    if (otp !== state.pendingOTP) throw new Error("Invalid OTP. Please try again.");
    await new Promise(r => setTimeout(r, 300));
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase()))
      throw new Error("This email is already registered. Please sign in.");
    const user: User = {
      ...userData,
      id: Math.random().toString(36).slice(2, 11),
      avatar: getAvatarUrl(userData.gender, userData.email),
    };
    saveUsers([...users, user]);
    setState({ user, isAuthenticated: true, isLoading: false, pendingOTP: null });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
  };

  const updateProfile = (data: Partial<User>) => {
    if (!state.user) return;
    // Priority: 1) explicitly uploaded photo, 2) gender changed → regenerate, 3) keep existing
    let avatar: string | undefined = state.user.avatar;
    if (data.avatar) {
      avatar = data.avatar;                               // custom photo wins
    } else if (data.gender && data.gender !== state.user.gender) {
      avatar = getAvatarUrl(data.gender, state.user.email); // gender changed → new DiceBear
    }
    const updated: User = { ...state.user, ...data, avatar };
    const users = getUsers();
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx >= 0) users[idx] = updated; else users.push(updated);
    saveUsers(users);
    setState(s => ({ ...s, user: updated }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: updated }));
  };

  const logout = () => {
    setState({ user: null, isAuthenticated: false, isLoading: false, pendingOTP: null });
    localStorage.removeItem(STORAGE_KEY);
  };

  // legacy shims
  const login = async (email: string, _pw: string) => {
    const otp = genOTP();
    setState(s => ({ ...s, pendingOTP: otp }));
    await verifyOTPAndLogin(email, otp);
  };
  const register = async (name: string, email: string, _pw: string) => {
    const otp = genOTP();
    setState(s => ({ ...s, pendingOTP: otp }));
    await verifyOTPAndRegister({ name, email, mobile: "", gender: "other", dob: "" }, otp);
  };

  // Fix avatars for any stored users that still use the old avataaars URL
  useEffect(() => {
    if (!state.user) return;
    if (state.user.avatar?.includes("avataaars") && state.user.gender) {
      updateProfile({ avatar: getAvatarUrl(state.user.gender, state.user.email) });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user?.id]);

  return (
    <AuthCtx.Provider value={{ ...state, sendOTP, verifyOTPAndLogin, verifyOTPAndRegister, updateProfile, logout, login, register }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
