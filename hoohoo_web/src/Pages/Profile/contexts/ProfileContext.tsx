import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {getUserLinkProfile} from '../../../api/jigulink/jigulink.api';
import {useUserStore} from '../../../storage/userStore';
import {ProfileWidgetItemType} from '../types/WidgetItemType';

// Context에서 제공할 값들의 타입 정의
interface ProfileContextType {
  // 위젯 데이터
  originalWidgets: ProfileWidgetItemType[];
  currentWidgets: ProfileWidgetItemType[];
  lastSavedWidgets: ProfileWidgetItemType[];
  deletedWidgetItems: ProfileWidgetItemType[];
  // 상태 플래그
  isEditing: boolean;
  hasChanges: boolean;
  isLoading: boolean;
  noProfileData: boolean;
  isMyLink: boolean;
  isEditingItem: boolean;
  selectedItem: ProfileWidgetItemType | null;
  // 사용자 데이터
  userData: UserData;
  isSyncedWithEM: boolean;
  // 액션 함수들
  setUserData: (userData: UserData) => void;
  startEditing: () => void;

  setCurrentWidgets: React.Dispatch<
    React.SetStateAction<ProfileWidgetItemType[]>
  >;
  setOriginalWidgets: (originalWidgets: ProfileWidgetItemType[]) => void;
  updateWidgets: (updatedWidgets: ProfileWidgetItemType[]) => void;
  fetchUserProfile: (nameTag?: string) => Promise<void>;
  setIsEditing: (isEditing: boolean) => void;
  setDeletedWidgetItems: React.Dispatch<
    React.SetStateAction<ProfileWidgetItemType[]>
  >;
  setIsEditingItem: (isEditingItem: boolean) => void;
  setSelectedItem: (selectedItem: ProfileWidgetItemType | null) => void;
}

// Context 생성
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Context Provider 컴포넌트
interface ProfileProviderProps {
  children: ReactNode;
  nameTag?: string;
}

type UserData = {
  name: string;
  nameTag: string;
  profileImage: string;
  bio: string;

  widgets?: ProfileWidgetItemType[];
  linkedUserInfo?: {
    name: string;
    userId: string;
    profileImage: string;
  };
};

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
  nameTag,
}) => {
  // 위젯 데이터 상태
  const [originalWidgets, setOriginalWidgets] = useState<
    ProfileWidgetItemType[]
  >([]);
  const [currentWidgets, setCurrentWidgets] = useState<ProfileWidgetItemType[]>(
    [],
  );
  const [lastSavedWidgets, setLastSavedWidgets] = useState<
    ProfileWidgetItemType[]
  >([]);

  // 상태 플래그
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletedWidgetItems, setDeletedWidgetItems] = useState<
    ProfileWidgetItemType[]
  >([]);
  const [noProfileData, setNoProfileData] = useState<boolean>(false);
  const [isEditingItem, setIsEditingItem] = useState<boolean>(false);
  // 사용자 데이터
  const [userData, setUserData] = useState<UserData>({
    name: '',
    nameTag: '',
    profileImage: '',
    bio: '',
  });
  const [selectedItem, setSelectedItem] =
    useState<ProfileWidgetItemType | null>(null);
  // 로그인 사용자 인증 정보
  const {user, isAuthenticated, setLinkedUserInfo} = useUserStore();
  const [isMyLink, setIsMyLink] = useState<boolean>(false);
  const [isSyncedWithEM, setIsSyncedWithEM] = useState<boolean>(false);

  // 사용자 인증 정보 변경 시 isMyLink 업데이트
  useEffect(() => {
    if (nameTag) {
      setIsMyLink(user.nameTag === nameTag && isAuthenticated);
    }
  }, [user, nameTag, isAuthenticated]);

  // 사용자 프로필 데이터 가져오기
  const fetchUserProfile = async (profileNameTag?: string) => {
    setIsLoading(true);

    try {
      if (!profileNameTag && !nameTag) {
        setNoProfileData(true);
        setIsLoading(false);
        return;
      }

      const targetNameTag = profileNameTag || nameTag;
      const response = await getUserLinkProfile(targetNameTag!);

      if (response.result) {
        console.log('response.data', response.data);

        setUserData({
          ...response.data,
          name: response.data.name ? response.data.name.split('#')[0] : '',
        });
        setLinkedUserInfo(response.data.linkedUserInfo);
        setIsSyncedWithEM(response.data.linkedUserInfo ? true : false);
        if (response.data.widgets) {
          const newWidgets = response.data.widgets.map(
            (widget: ProfileWidgetItemType) => ({
              ...widget,
              coordinate: {
                x: widget.coordinate?.x ? widget.coordinate.x / 3 : 0,
                y: widget.coordinate?.y ? widget.coordinate.y : 0,
              },
            }),
          );
          setOriginalWidgets(newWidgets);
          setCurrentWidgets(newWidgets);
          setLastSavedWidgets(newWidgets);
        }

        setNoProfileData(false);
      } else {
        setNoProfileData(true);
      }
    } catch (err) {
      setNoProfileData(true);

      console.error('프로필 데이터 로드 중 오류 발생:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 편집 모드 시작
  const startEditing = () => {
    setIsEditing(true);
    // 편집 시작 시 현재 데이터 백업
    setLastSavedWidgets([...currentWidgets]);
  };

  // 위젯 업데이트
  const updateWidgets = (updatedWidgets: ProfileWidgetItemType[]) => {
    setCurrentWidgets(updatedWidgets);
    setHasChanges(true);
  };

  // 위젯 데이터 초기화
  const resetWidgets = () => {
    setCurrentWidgets([]);
    setOriginalWidgets([]);
    setLastSavedWidgets([]);
    setIsEditing(false);
    setHasChanges(false);
  };

  // Context 값
  const value = {
    originalWidgets,
    currentWidgets,
    lastSavedWidgets,
    isEditing,
    hasChanges,
    isLoading,
    deletedWidgetItems,
    noProfileData,
    isMyLink,
    userData,
    selectedItem,
    isEditingItem,
    isSyncedWithEM,
    setUserData,
    setIsMyLink,
    startEditing,
    setIsEditingItem,
    setCurrentWidgets,
    setOriginalWidgets,
    updateWidgets,
    resetWidgets,
    fetchUserProfile,
    setIsEditing,
    setDeletedWidgetItems,
    setSelectedItem,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

// Context 사용을 위한 커스텀 훅
export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);

  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
};
