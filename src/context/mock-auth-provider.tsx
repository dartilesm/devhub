"use client";

import { createContext, useContext, useState } from "react";

type MockUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  imageUrl: string;
  email: string;
};

const defaultUser: MockUser = {
  id: "mock_user_1",
  username: "johndoe",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  imageUrl: "https://avatars.githubusercontent.com/u/1?v=4",
  email: "john@example.com",
};

type MockAuthContextType = {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: MockUser | null;
  signIn: () => void;
  signOut: () => void;
};

const MockAuthContext = createContext<MockAuthContextType | null>(null);

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(defaultUser);

  const value = {
    isLoaded: true,
    isSignedIn: !!user,
    user,
    signIn: () => setUser(defaultUser),
    signOut: () => setUser(null),
  };

  return <MockAuthContext.Provider value={value}>{children}</MockAuthContext.Provider>;
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error("useMockAuth must be used within a MockAuthProvider");
  }
  return context;
}

export function useMockUser() {
  const { user } = useMockAuth();
  return { user, isLoaded: true, isSignedIn: !!user };
}
