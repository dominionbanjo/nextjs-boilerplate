import { describe, it, expect } from "vitest";
import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart,
  CartItem,
} from "@/redux/slices/cartSlice";

const mockItem: CartItem = {
  id: "product-123",
  title: "Wireless Headphones",
  description: "Noise-cancelling over-ear headphones",
  price: 129.99,
  image: "/headphones.png",
};

const mockItem2: CartItem = {
  id: "product-456",
  title: "Mechanical Keyboard",
  description: "Compact mechanical keyboard",
  price: 89.99,
  image: "/keyboard.png",
};

describe("Cart Redux Slice Unit Tests", () => {
  it("1. should return the initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
    });
  });

  it("2. should add a new item to the cart", () => {
    const nextState = cartReducer(undefined, addToCart(mockItem));
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual(mockItem);
  });

  it("3. should not add duplicate items to the cart", () => {
    const stateWithOneItem = cartReducer(undefined, addToCart(mockItem));
    const nextState = cartReducer(stateWithOneItem, addToCart(mockItem));
    expect(nextState.items).toHaveLength(1); // Length remains 1
  });

  it("4. should remove an item from the cart by id", () => {
    const stateWithOneItem = cartReducer(undefined, addToCart(mockItem));
    const nextState = cartReducer(stateWithOneItem, removeFromCart("product-123"));
    expect(nextState.items).toHaveLength(0);
  });

  it("5. should clear the cart items completely", () => {
    const stateWithOneItem = cartReducer(undefined, addToCart(mockItem));
    const stateWithTwoItems = cartReducer(stateWithOneItem, addToCart(mockItem2));
    const clearedState = cartReducer(stateWithTwoItems, clearCart());
    expect(clearedState.items).toHaveLength(0);
  });
});
