const useAuthStore = (set, get) => ({
  user: {},

  login: (item) => {
    set((state) => ({
      user: { ...state.user, ...item },
    }));
  },
  logout: () => {
    set(() => ({
      user: {},
    }));
  },
});
//   {
//     name: "", // Specify a name for persistence
//     skipHydration: true,
//   }

export default useAuthStore;
