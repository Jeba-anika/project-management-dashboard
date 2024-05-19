import create from 'zustand';


const useAuthStore = create((set) => ({
    user: {},
    setUser: (user) => set(() => ({ user: { ...user } })),
}));

export const useAuth = () => {
    const { user, setUser } = useAuthStore();
    return { user, setUser };
};
