import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProfileWidgetItemType } from '../Pages/Profile/types/WidgetItemType';
import { defaultProfileImage } from '../style';

interface UserData {
    username: string;
    email?: string;
    nameTag: string;
    profileImage?: string;
    hasPlan: boolean;
}

interface LinkedUserInfo {
    userId: string;
    name: string;
    profileImage: string;
}

interface UserState {
    user: UserData;
    linkedUserInfo: LinkedUserInfo;
    myWidgets: ProfileWidgetItemType[];

    isAuthenticated: boolean;
    isSyncedWithEM: boolean;
    setUser: (user: UserData) => void;
    logout: () => void;
    setMyWidgets: (widgets: ProfileWidgetItemType[]) => void;
    setLinkedUserInfo: (linkedUserInfo: LinkedUserInfo) => void;
    setProfileImage: (profileImage: string) => void;
}

const initialUser: UserData = {
    username: '',
    email: '',
    nameTag: '',
    profileImage: '',
    hasPlan: false,
};
export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: initialUser,
            linkedUserInfo: {
                userId: '',
                name: '',
                profileImage: ''
            },
            myWidgets: [],
            isAuthenticated: false,
            isSyncedWithEM: false,

            setUser: (user) => set({
                user: {
                    ...user,
                    username: user.username.includes('#')
                        ? user.username.split('#')[0]
                        : user.username,
                    profileImage: user.profileImage || defaultProfileImage
                },
                isAuthenticated: true,

            }),
            setProfileImage: (profileImage: string) => set((state) => ({
                user: {
                    ...state.user,
                    profileImage: profileImage
                }
            })),
            setLinkedUserInfo: (linkedUserInfo: LinkedUserInfo) => set((state) => {
                return {
                    linkedUserInfo: linkedUserInfo,
                    isSyncedWithEM: linkedUserInfo.userId !== ''
                }
            }),
            setMyWidgets: (widgets: ProfileWidgetItemType[]) => set({
                myWidgets: widgets
            }),
            logout: () => set({
                user: initialUser, isAuthenticated: false, isSyncedWithEM: false,
                linkedUserInfo: {
                    userId: '',
                    name: '',
                    profileImage: ''
                },
                myWidgets: []
            }),
        }),
        {
            name: 'user-storage',
        }
    )
);