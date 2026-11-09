import { create } from 'zustand';

const getInitialItems = () => { //retrieves the initial cart items from LocalStorage,returning an empty array if none found or parsing fails
  try {
    const saved = localStorage.getItem('cart_items');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse cart items from localStorage:', error);
    return [];
  }
};

export const useCartStore = create((set) => ({ //zustand store for managing shopping cart state
  items: getInitialItems(),
  addItem: (product) =>
    set((state) => {
      const existingIndex = state.items.findIndex((i) => i.id === product.id);
      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { items: updatedItems };
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
          },
        ],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  setQuantity: (id, quantity) =>
    set((state) => {
      if (quantity < 1) {
        return { items: state.items.filter((item) => item.id !== id) };
      }
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }),

  clear: () => set({ items: [] }),
}));
useCartStore.subscribe((state) => {   //Save cart changes to localStorage outside React component lifecycle
  try {
    localStorage.setItem('cart_items', JSON.stringify(state.items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
});