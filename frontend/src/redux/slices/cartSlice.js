import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch the cart from user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:9000/api/cart`, {
            params: { userId, guestId },
        });
        if (!response.data) {
            return { products: [] }; // Return empty cart if no data
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        // Return empty cart on error to prevent UI breaking
        return { products: [] };
    }
});

// Add to cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity, category, collections, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:9000/api/cart`, {
            productId,
            quantity,
            category,
            collections,
            guestId,
            userId,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
    }
});

// Update cart item quantity
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async ({ productId, quantity, guestId, userId, category, collections }, { rejectWithValue }) => {
    try {
        // Validate input parameters
        if (!productId || !category || !collections) {
            return rejectWithValue({ message: "Missing required fields" });
        }

        // Ensure quantity is a valid positive number and within reasonable limits
        const parsedQuantity = parseInt(quantity);
        if (isNaN(parsedQuantity)) {
            return rejectWithValue({ message: "Quantity must be a valid number" });
        }
        if (parsedQuantity < 0) {
            return rejectWithValue({ message: "Quantity cannot be negative" });
        }
        if (parsedQuantity > 99) {
            return rejectWithValue({ message: "Quantity cannot exceed 99 items" });
        }
        const validQuantity = parsedQuantity;
        
        const response = await axios.put(`http://localhost:9000/api/cart`, {
            productId,
            quantity: validQuantity,
            category,
            collections,
            guestId,
            userId,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        return rejectWithValue(error.response?.data || { message: "Failed to update cart item" });
    }
});

// Remove an item from cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ productId, guestId, userId, category, collections }, { rejectWithValue, getState }) => {
    try {
        // Validate required fields
        if (!productId || !category || !collections) {
            return rejectWithValue({ message: "Missing required fields for cart item removal" });
        }

        // Attempt to remove the item
        const response = await axios({
            method: "DELETE",
            url: `http://localhost:9000/api/cart`,
            data: { productId, guestId, userId, category, collections },
        });

        // If server responds with cart data, use it
        if (response.data && response.data.cart) {
            saveCartToStorage(response.data.cart);
            return response.data.cart;
        }

        // If server doesn't respond with cart, remove item locally
        const currentState = getState();
        const updatedProducts = currentState.cart.cart.products.filter(
            (item) => !(item.productId === productId && item.category === category && item.collections === collections)
        );
        const updatedCart = {
            ...currentState.cart.cart,
            products: updatedProducts,
            totalPrice: updatedProducts.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0)
        };
        saveCartToStorage(updatedCart);
        return updatedCart;
    } catch (error) {
        console.error("Error removing item from cart:", error);
        // Return current cart state to prevent UI breaking
        const currentState = getState();
        return currentState.cart.cart;
    }
});

// Merge guest cart into user cart
export const mergeCart = createAsyncThunk("cart/mergeCart", async ({ guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `http://localhost:9000/api/cart/merge`,
            { guestId, userId },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch cart";
            })

            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add to cart";
            })

            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update item quantity";
            })

            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove item from cart";
            })

            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge cart";
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
