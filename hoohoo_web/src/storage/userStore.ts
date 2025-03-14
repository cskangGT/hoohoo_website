import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { defaultProfileImage } from '../style';

interface UserData {
    username: string;
    email?: string;
    nameTag: string;
    profileImage?: string;
}

interface UserState {
    user: UserData;
    isAuthenticated: boolean;
    setUser: (user: UserData) => void;
    logout: () => void;
}

const initialUser: UserData = {
    username: '',
    email: '',
    nameTag: '',
    profileImage: '',
};
export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: initialUser,
            isAuthenticated: false,
            setUser: (user) => set({
                user: {
                    ...user,
                    username: user.username.includes('#')
                        ? user.username.split('#')[0]
                        : user.username,
                    profileImage: user.profileImage || defaultProfileImage
                },
                isAuthenticated: true
            }),
            logout: () => set({
                user: initialUser, isAuthenticated: false
            }),
        }),
        {
            name: 'user-storage',
        }
    )
);