"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface CartItem { id: string; name: string; brand: string; price: number; mrp: number; img: string; quantity: number; }
interface CartState { items: CartItem[]; wishlist: string[]; }
type Action =
  | { type: "ADD"; item: Omit<CartItem,"quantity"> }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "TOGGLE_WISH"; id: string }
  | { type: "CLEAR" };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const ex = state.items.find(i => i.id === action.item.id);
      if (ex) return { ...state, items: state.items.map(i => i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i) };
      return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] };
    }
    case "REMOVE": return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case "UPDATE_QTY":
      if (action.qty <= 0) return { ...state, items: state.items.filter(i => i.id !== action.id) };
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, quantity: action.qty } : i) };
    case "TOGGLE_WISH":
      return { ...state, wishlist: state.wishlist.includes(action.id) ? state.wishlist.filter(w => w !== action.id) : [...state.wishlist, action.id] };
    case "CLEAR": return { ...state, items: [] };
    default: return state;
  }
}

const Ctx = createContext<{ state: CartState; dispatch: React.Dispatch<Action>; cartCount: number; cartTotal: number; inWish: (id: string) => boolean; inCart: (id: string) => boolean; } | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], wishlist: [] });
  const cartCount = state.items.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const inWish = (id: string) => state.wishlist.includes(id);
  const inCart = (id: string) => state.items.some(i => i.id === id);
  return <Ctx.Provider value={{ state, dispatch, cartCount, cartTotal, inWish, inCart }}>{children}</Ctx.Provider>;
}

export const useCart = () => { const c = useContext(Ctx); if (!c) throw new Error("useCart outside provider"); return c; };
