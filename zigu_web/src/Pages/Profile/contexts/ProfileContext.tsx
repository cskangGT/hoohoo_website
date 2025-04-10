import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getUserLinkProfile} from '../../../api/jigulink/jigulink.api';
import {validateSession} from '../../../api/login/auth';
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
  profileError: boolean;
  hasChanges: boolean;
  isLoading: boolean;
  firstLoad: boolean;
  noProfileData: boolean;
  isMyLink: boolean;
  showSave: boolean;
  isDarkMode: boolean;
  isEditingItem: boolean;
  selectedItem: ProfileWidgetItemType | null;
  hasSynced: boolean;
  // 사용자 데이터
  userData: UserData;

  // 액션 함수들
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  startEditing: () => void;
  setShowSave: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentWidgets: React.Dispatch<
    React.SetStateAction<ProfileWidgetItemType[]>
  >;
  setOriginalWidgets: React.Dispatch<
    React.SetStateAction<ProfileWidgetItemType[]>
  >;
  updateWidgets: (updatedWidgets: ProfileWidgetItemType[]) => void;
  fetchUserProfile: (nameTag?: string) => Promise<void>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedWidgetItems: React.Dispatch<
    React.SetStateAction<ProfileWidgetItemType[]>
  >;
  setIsEditingItem: React.Dispatch<React.SetStateAction<boolean>>;
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
  console.log('nameTag', nameTag);

  // 위젯 데이터 상태
  const {state} = useLocation();
  const paidPlan = state?.paidPlan;

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
  const [showSave, setShowSave] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletedWidgetItems, setDeletedWidgetItems] = useState<
    ProfileWidgetItemType[]
  >([]);
  const [hasSynced, setHasSynced] = useState<boolean>(false);

  const navigate = useNavigate();
  const [noProfileData, setNoProfileData] = useState<boolean>(false);
  const [profileError, setProfileError] = useState<boolean>(false);
  const [isEditingItem, setIsEditingItem] = useState<boolean>(false);

  // design
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

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
  const {user, isAuthenticated, setLinkedUserInfo, setProfileImage, setUser} =
    useUserStore();
  const [validatedMyToken, setValidatedMyToken] = useState<boolean>(false);
  const [isMyLink, setIsMyLink] = useState<boolean>(false);
  useEffect(() => {
    const darkMode = localStorage.getItem('isDarkMode');
    if (darkMode) {
      setIsDarkMode(darkMode === 'true');
    }
  }, []);
  // 사용자 인증 정보 변경 시 isMyLink 업데이트
  useEffect(() => {
    if (nameTag) {
      console.log('user', user);

      const mine = user.nameTag === nameTag && validatedMyToken;
      setIsMyLink(mine);
    }
  }, [user, nameTag, validatedMyToken]);

  // 사용자 프로필 데이터 가져오기
  const fetchUserProfile = async (profileNameTag?: string) => {
    if (firstLoad) {
      setIsLoading(true);
      setFirstLoad(false);
    } else {
      return;
    }

    if (!profileNameTag && !nameTag) {
      setNoProfileData(true);
      setIsLoading(false);
      return;
    }

    const targetNameTag = profileNameTag || nameTag;

    const response = await getUserLinkProfile(targetNameTag!);

    if (response.result) {
      // console.log('response.data', response.data);

      setUserData({
        ...response.data,
        name: response.data.name ? response.data.name.split('#')[0] : '',
      });
      console.log('targetNameTag', targetNameTag);
      console.log('user.nameTag', user.nameTag);

      if (user.nameTag === targetNameTag) {
        const res = await validateSession();

        if (res.result) {
          setValidatedMyToken(true);
          if (!response.data.hasPlan && !paidPlan) {
            // if just paid or has plan before, stay on the page
            navigate('/setup/plan');
          }
          setProfileImage(response.data.profileImage);
          response.data.linkedUserInfo &&
            setLinkedUserInfo({
              userId: response.data.linkedUserInfo.userId,
              name: response.data.linkedUserInfo.name,
              profileImage: response.data.linkedUserInfo.profileImage,
            });
        } else {
          setUser({
            username: '',
            nameTag: '',
            profileImage: '',
            hasPlan: false,
          });
        }
      }
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
        console.log('newWidgets', newWidgets);
        setHasSynced(!!response.data?.linkedUserInfo?.userId);
        setOriginalWidgets(newWidgets);
        setCurrentWidgets(newWidgets);
        setLastSavedWidgets(newWidgets);
      }

      setNoProfileData(false);
    } else {
      if (response.status === 404) {
        setNoProfileData(true);
      } else {
        setProfileError(true);
      }
    }

    setIsLoading(false);
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

  // Context 값
  const value = {
    originalWidgets,
    profileError,
    currentWidgets,
    lastSavedWidgets,
    isEditing,
    hasChanges,
    showSave,
    isDarkMode,
    isLoading,
    deletedWidgetItems,
    hasSynced,
    noProfileData,
    isMyLink,
    userData,
    selectedItem,
    isEditingItem,
    firstLoad,
    setUserData,
    setIsMyLink,
    setShowSave,
    setIsDarkMode,
    startEditing,
    setIsEditingItem,
    setCurrentWidgets,
    setOriginalWidgets,
    updateWidgets,

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
