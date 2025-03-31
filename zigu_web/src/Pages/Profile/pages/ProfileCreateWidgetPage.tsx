import i18next from 'i18next';
import {ColorPicker, IColor, useColor} from 'react-color-palette';
import 'react-color-palette/css';

import React, {useState} from 'react';
import 'react-color-palette/css';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import {useLocation, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {createWidget} from '../../../api/jigulink/jigulink.api';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import ImageCrop from '../components/ImageCrop';
import TopHeaderBackButtonWrapperView from '../components/TopHeaderBackButtonWrapperView';
import WidgetItem from '../components/WidgetItem';
import {useProfile} from '../contexts/ProfileContext';
import {
  ProfileEMWidgetType,
  ProfileWidgetItemSize,
  ProfileWidgetItemType,
} from '../types/WidgetItemType';
import {EMWidgetImage, getEMWidgetData} from '../util/EMWidgetData';
import {calculateNewWidgetCoordinate} from '../util/util';

const WIDTH = window.innerWidth > 600 ? 600 : window.innerWidth;
const WIDGET_WIDTH = (WIDTH - 24 * 2 - 60 - 40) / 4;
const COLOR_OPTIONS = {
  RED: '#E74C3C',
  YELLOW: '#FDB52F',
  ORANGE: '#FF6A00',
  GREEN: '#3EAC4D',
  BLUE: '#6586F2',
  RAINBOW:
    'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
};

const StyledSwiper = styled(Swiper)`
  height: ${WIDTH * 0.6}px; // 원하는 높이 설정

  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const StyledSwiperContainer = styled.div`
  .swiper-pagination-bullet {
    background-color: #cccccc;
    opacity: 0.5;
    width: 10px;
    height: 10px;
  }

  .swiper-pagination-bullet-active {
    background-color: ${theme.mainNeon};
    opacity: 1;
  }

  /* 이전/다음 화살표 크기 및 색상 설정 */
  .swiper-button-prev,
  .swiper-button-next {
    width: 20px;
    height: 20px;
    color: ${theme.mainNeon};

    /* 화살표 아이콘 크기 조정 */
    &::after {
      font-size: 20px;
      font-weight: bold;
    }
  }

  /* 이전 화살표 위치 조정 (필요시) */
  .swiper-button-prev {
    left: -5px;
  }

  /* 다음 화살표 위치 조정 (필요시) */
  .swiper-button-next {
    right: -5px;
  }

  /* 비활성화된 화살표 스타일 */
  .swiper-button-disabled {
    opacity: 0.3;
  }
`;

const DropdownMenu = styled.div`
  background-color: #000;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: ${theme.spacing.md};
  border: 1px solid #333;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  color: ${theme.white};
  cursor: pointer;
  font-size: ${theme.fontSize.lg};
  font-weight: 400;
`;
const PlaceholderText = styled.span`
  color: ${theme.gray};
  opacity: 0.5;
`;
const DropdownContent = styled.div<{isOpen: boolean}>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #333;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`;

const MenuIcon = styled.div`
  margin-right: 15px;
  color: ${theme.mainNeon};
`;
const AssetContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const MenuText = styled.div`
  font-size: ${theme.fontSize.md};
`;
const AssetIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const PreviewContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// 모달 오버레이 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 컨테이너 스타일
const ModalContainer = styled.div`
  background: #121212;
  padding: 20px;

  width: 80%;

  z-index: 1002;
  max-width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  gap: 40px;
  border-radius: 20px;
  /* ColorPicker 스타일 오버라이드 */
  .sketch-picker {
    box-shadow: none !important;
  }
`;
const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
const ApplyButton = styled.button`
  background-color: ${theme.white};
  margin-top: ${theme.spacing.md};
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: ${theme.fontSize.md};
  color: ${theme.darkGray};
  text-align: center;
  padding: ${theme.spacing.rg} ${theme.spacing.md};
  border-radius: 20px;
  cursor: pointer;
`;
function ProfileCreateWidgetPage() {
  const localizedTexts: any = i18next.t('ProfileCreateWidgetPage', {
    returnObjects: true,
  });
  const {state} = useLocation();
  const isEditMode = state?.isEditMode;
  const {isSyncedWithEM, user, setMyWidgets, myWidgets} = useUserStore();
  const {
    setCurrentWidgets,
    setOriginalWidgets,
    selectedItem,
    setSelectedItem,
    setIsEditingItem,
  } = useProfile();
  const navigate = useNavigate();

  const [selectedStyle, setSelectedStyle] = useState<ProfileWidgetItemSize>(
    selectedItem?.sizeType || 'BIG',
  );

  const [selectedColor, setSelectedColor] = useState<string>(
    selectedItem?.bgColor || 'transparent',
  );
  const [hasBorder, setHasBorder] = useState<boolean>(
    selectedItem?.hasBorder || false,
  );
  const [isRainbow, setIsRainbow] = useState<boolean>(false);
  const [color, setColor] = useColor('rgba(0, 0, 0, 1)');
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const [isSelected, setIsSelected] = useState<boolean>(
    !!selectedItem?.bgColor ? true : false,
  );
  const [image, setImage] = useState<string>(selectedItem?.bgImageUrl || '');
  const [description, setDescription] = useState<string>(
    selectedItem?.description || '',
  );
  const [linkURL, setLinkURL] = useState<string>(selectedItem?.linkUrl || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] =
    useState<ProfileEMWidgetType | null>(
      selectedItem?.isEmWidget ? selectedItem?.emWidgetType || null : null,
    );

  const styleOptions: {value: ProfileWidgetItemSize; label: string}[] = [
    {value: 'BIG', label: '큰 위젯'},
    {value: 'LONG', label: '긴 위젯'},
    {value: 'SMALL', label: '작은 위젯'},
  ];
  const emWidgetData = getEMWidgetData();
  const assetOptions = [
    {
      value: 'LEADERBOARD',
      icon: <AssetIcon src={EMWidgetImage.LEADERBOARD} />,
      label: localizedTexts.widgetList['LEADERBOARD'],
    },

    {
      value: 'MY_ITEMS',
      icon: <AssetIcon src={EMWidgetImage.MY_ITEMS} />,
      label: localizedTexts.widgetList['MY_ITEMS'],
    },
    {
      value: 'ACHIEVEMENT',
      icon: <AssetIcon src={EMWidgetImage.ACHIEVEMENT} />,
      label: localizedTexts.widgetList['ACHIEVEMENT'],
    },
    {
      value: 'GROUPS',
      icon: <AssetIcon src={EMWidgetImage.GROUPS} />,
      label: localizedTexts.widgetList['GROUPS'],
    },
    {
      value: 'MY_STORE',
      icon: <AssetIcon src={EMWidgetImage.MY_STORE} />,
      label: localizedTexts.widgetList['MY_STORE'],
    },
    {
      value: 'CO2_SAVED',
      icon: <AssetIcon src={EMWidgetImage.CO2_SAVED} />,
      label: localizedTexts.widgetList['CO2_SAVED'],
    },
    {
      value: 'MY_GALLERY',
      icon: <AssetIcon src={EMWidgetImage.MY_GALLERY} />,
      label: localizedTexts.widgetList['MY_GALLERY'],
    },
  ];

  function handleColorClick(color: string) {
    setIsSelected(true);
    setImage('');
    setSelectedAsset(null);
    setIsRainbow(false);
    if (color === 'BORDER') {
      setHasBorder(true);
      setSelectedColor('transparent');
    } else if (color === 'transparent') {
      setHasBorder(false);
      setSelectedColor('transparent');
    } else {
      setHasBorder(false);
      setSelectedColor(color);
    }
  }
  const handleSaveEditWidget = async () => {
    const widgetData = {
      id: selectedItem?.id || 0,
      sizeType: selectedItem?.sizeType,
      bgType: image ? 'IMAGE' : 'COLOR',
      bgColor: selectedColor,
      bgImageUrl: image,
      hasBorder: hasBorder,
      linkUrl: linkURL,
      description: description,
      isTemp: false,
      coordinate: selectedItem?.coordinate || {x: 0, y: 0},
    } as ProfileWidgetItemType;
    const isEmWidget = !!selectedAsset;
    const emwidget = {
      id: selectedItem?.id || 0,
      sizeType: selectedItem?.sizeType,
      isEmWidget: isEmWidget,
      emWidgetType: selectedAsset as ProfileEMWidgetType,
      coordinate: selectedItem?.coordinate || {x: 0, y: 0},
    } as ProfileWidgetItemType;

    setCurrentWidgets((prev: ProfileWidgetItemType[]) =>
      prev.map(widget => {
        if (widget.id === selectedItem?.id) {
          return isEmWidget ? emwidget : widgetData;
        }
        return widget;
      }),
    );

    setSelectedItem(null);
    navigate('/' + user?.nameTag, {
      replace: true,
      state: {
        keepEditing: true,
      },
    });
  };
  const handleAddWidget = async () => {
    if (!isSelected) {
      toast.error(localizedTexts.toast.selectColor);
      return;
    }
    const newCoordinate = calculateNewWidgetCoordinate(selectedStyle);
    const isEmWidget = !!selectedAsset;
    const emWidgetData = {
      sizeType: selectedStyle,
      isEmWidget: isEmWidget,
      emWidgetType: selectedAsset as ProfileEMWidgetType,
      coordinate: {x: newCoordinate.x * 3, y: newCoordinate.y},
    };
    const widgetData = {
      sizeType: selectedStyle,
      bgType: image ? 'IMAGE' : 'COLOR',
      bgColor: selectedColor,
      bgImageUrl: image,
      hasBorder: hasBorder,
      linkUrl: linkURL,
      description: description,
      coordinate: {x: newCoordinate.x * 3, y: newCoordinate.y},
    };
    const response = await createWidget(isEmWidget ? emWidgetData : widgetData);
    if (response.result) {
      setMyWidgets([
        ...myWidgets,
        {
          ...response.data,
          coordinate: {x: newCoordinate.x, y: newCoordinate.y},
        },
      ]);
      setCurrentWidgets(prev => [
        ...prev,
        {
          ...response.data,
          coordinate: {x: newCoordinate.x, y: newCoordinate.y},
        },
      ]);
      setOriginalWidgets(prev => [
        ...prev,
        {
          ...response.data,
          coordinate: {x: newCoordinate.x, y: newCoordinate.y},
        },
      ]);
      navigate('/' + user?.nameTag, {
        replace: true,
        state: {
          keepEditing: true,
        },
      });
    }
  };

  const handleRainbowClick = (completedColor: IColor) => {
    setIsSelected(true);
    setImage('');
    setSelectedAsset(null);
    setHasBorder(false);
    console.log('color.hex', completedColor);
    setIsRainbow(true);
    setSelectedColor(completedColor.hex);
  };

  const handleColorPickerClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowColorPicker(false);
  };

  const handleAssetSelect = (value: string) => {
    setIsSelected(true);
    setImage('');
    setHasBorder(false);
    setSelectedColor('#383838');

    setSelectedAsset(value as ProfileEMWidgetType);
    setIsDropdownOpen(false);
  };
  const handleLinkURLBlur = () => {
    if (linkURL && !linkURL.startsWith('http')) {
      setLinkURL('https://' + linkURL);
    }
  };

  return (
    <TopHeaderBackButtonWrapperView>
      <Container>
        {/* 에셋 드롭다운 추가 */}

        {/* 스타일 섹션 */}
        {isEditMode ? (
          <PreviewContainer>
            <WidgetItem
              widget={{
                id: 1,
                sizeType: selectedStyle,
                bgType: image ? 'IMAGE' : 'COLOR',
                bgColor: isSelected ? selectedColor : '#bcbcbccd',
                bgImageUrl: image,
                hasBorder: hasBorder,
                description: description,
                coordinate: {x: 0, y: 0},
                emWidgetType: selectedAsset as ProfileEMWidgetType,
                isEmWidget: !!selectedAsset,
                widgetData: {
                  level: 4,
                  numBadges: 2,
                  numMedals: 3,
                  equippedMedals: [
                    {
                      medalTitle: 'ECO_ACTION_TUMBLER',
                      medalLevel: 2,
                    },
                    {
                      medalTitle: 'ECO_ACTION_CARBON_REDUCTION',
                      medalLevel: 3,
                    },
                    {
                      medalTitle: 'REWARD_REDEEM_MEDAL',
                      medalLevel: 4,
                    },
                  ],
                  equippedBadge: 'LITTLE_BY_LITTLE',
                  annualCarbonReduction: 1370,
                  annualEcoActionCount: 100,
                  treeEffect: 3,
                  ecoActionCount: 700,
                  userRank: 17,
                  lastMonthRank: 18,
                  higherRankInfo: {
                    gap: 39,
                    ecoActionCount: 739,
                  },
                  lowerRankInfo: {
                    gap: 25,
                    ecoActionCount: 675,
                  },
                  thumbnails: [
                    'https://picsum.photos/200/300',
                    'https://picsum.photos/200/300',
                    'https://picsum.photos/200/300',
                    'https://picsum.photos/200/300',
                    'https://picsum.photos/200/300',
                    'https://picsum.photos/200/300',
                    'https://picsum.photos/200/300',
                    'https://picsum.photos/200/300',
                  ],
                },
              }}
            />
          </PreviewContainer>
        ) : (
          <>
            <SectionTitle>{localizedTexts.style}</SectionTitle>
            <StyledSwiperContainer>
              <StyledSwiper
                modules={[Pagination, Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{clickable: true}}
                navigation={true}
                onSlideChange={swiper => {
                  setSelectedStyle(styleOptions[swiper.activeIndex].value);
                }}
                initialSlide={styleOptions.findIndex(
                  option => option.value === selectedStyle,
                )}>
                {styleOptions.map(option => (
                  <SwiperSlide key={option.value}>
                    <ScaledWidgetContainer>
                      <WidgetItem
                        widget={{
                          id: 0,
                          sizeType: option.value,
                          bgType: image ? 'IMAGE' : 'COLOR',
                          bgColor: isSelected ? selectedColor : '#bcbcbccd',
                          bgImageUrl: image,
                          hasBorder: hasBorder,
                          description: description,
                          coordinate: {x: 0, y: 0},
                          emWidgetType: selectedAsset as ProfileEMWidgetType,
                          isEmWidget: !!selectedAsset,
                          widgetData: {
                            level: 4,
                            numBadges: 2,
                            numMedals: 3,
                            equippedMedals: [
                              {
                                medalTitle: 'ECO_ACTION_TUMBLER',
                                medalLevel: 2,
                              },
                              {
                                medalTitle: 'ECO_ACTION_CARBON_REDUCTION',
                                medalLevel: 3,
                              },
                              {
                                medalTitle: 'REWARD_REDEEM_MEDAL',
                                medalLevel: 4,
                              },
                            ],
                            equippedBadge: 'LITTLE_BY_LITTLE',
                            annualCarbonReduction: 1370,
                            annualEcoActionCount: 100,
                            treeEffect: 3,
                            ecoActionCount: 700,
                            userRank: 17,
                            lastMonthRank: 18,
                            higherRankInfo: {
                              gap: 39,
                              ecoActionCount: 739,
                            },
                            lowerRankInfo: {
                              gap: 25,
                              ecoActionCount: 675,
                            },
                            thumbnails: [
                              'https://picsum.photos/200/300',
                              'https://picsum.photos/200/300',
                              'https://picsum.photos/200/300',
                              'https://picsum.photos/200/300',
                              'https://picsum.photos/200/300',
                              'https://picsum.photos/200/300',
                              'https://picsum.photos/200/300',
                              'https://picsum.photos/200/300',
                            ],
                          },
                        }}
                      />
                    </ScaledWidgetContainer>
                  </SwiperSlide>
                ))}
              </StyledSwiper>
            </StyledSwiperContainer>
          </>
        )}

        {/* 채우기 섹션 */}
        <SectionTitle>{localizedTexts.fill}</SectionTitle>
        <ColorOptions>
          <ColorOption
            color={COLOR_OPTIONS.RED}
            onClick={() => handleColorClick(COLOR_OPTIONS.RED)}
            selected={selectedColor === COLOR_OPTIONS.RED}
            isSelected={isSelected}
          />
          <ColorOption
            color={COLOR_OPTIONS.YELLOW}
            onClick={() => handleColorClick(COLOR_OPTIONS.YELLOW)}
            selected={selectedColor === COLOR_OPTIONS.YELLOW}
            isSelected={isSelected}
          />
          <ColorOption
            color={COLOR_OPTIONS.ORANGE}
            onClick={() => handleColorClick(COLOR_OPTIONS.ORANGE)}
            selected={selectedColor === COLOR_OPTIONS.ORANGE}
            isSelected={isSelected}
          />
          <ColorOption
            color={COLOR_OPTIONS.GREEN}
            onClick={() => handleColorClick(COLOR_OPTIONS.GREEN)}
            selected={selectedColor === COLOR_OPTIONS.GREEN}
            isSelected={isSelected}
          />
          <ColorOption
            color={COLOR_OPTIONS.BLUE}
            onClick={() => handleColorClick(COLOR_OPTIONS.BLUE)}
            selected={selectedColor === COLOR_OPTIONS.BLUE}
            isSelected={isSelected}
          />
          <ColorOption
            color={COLOR_OPTIONS.RAINBOW}
            onClick={() => setShowColorPicker(true)}
            selected={isRainbow}
            isSelected={isSelected}
          />
          <ColorOption
            color={'transparent'}
            onClick={() => handleColorClick('BORDER')}
            selected={selectedColor === 'transparent' && hasBorder}
            border
            isSelected={isSelected}
          />
          <ColorOption
            color="transparent"
            onClick={() => handleColorClick('transparent')}
            selected={selectedColor === 'transparent' && !hasBorder && !image}
            dashed
            isSelected={isSelected}
          />
          <ImageCrop
            setSelectedColor={setSelectedColor}
            setSelectedAsset={setSelectedAsset}
            setIsSelected={setIsSelected}
            setImage={setImage}
            sizeType={selectedStyle}
          />
        </ColorOptions>

        <SectionTitle>{localizedTexts.url}</SectionTitle>
        <InputField
          placeholder="https://"
          value={linkURL}
          disabled={!!selectedAsset}
          onBlur={handleLinkURLBlur}
          onChange={e => setLinkURL(e.target.value)}
        />

        <SectionTitle inActive={!!image}>{localizedTexts.text}</SectionTitle>
        <InputField
          placeholder={
            !!image
              ? localizedTexts.placeholder.image
              : localizedTexts.placeholder.text
          }
          value={description}
          disabled={!!image || !!selectedAsset}
          onChange={e => setDescription(e.target.value)}
        />
        {isSyncedWithEM && (
          <>
            <SectionTitle>{localizedTexts.asset}</SectionTitle>
            <DropdownMenu>
              <DropdownHeader
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span>
                  {selectedAsset ? (
                    <AssetContainer>
                      {
                        assetOptions.find(
                          asset => asset.value === selectedAsset,
                        )?.icon
                      }
                      {
                        emWidgetData[selectedAsset as ProfileEMWidgetType]
                          ?.title
                      }
                    </AssetContainer>
                  ) : (
                    <PlaceholderText>
                      {localizedTexts.placeholder.asset}
                    </PlaceholderText>
                  )}
                </span>
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </DropdownHeader>
              <DropdownContent isOpen={isDropdownOpen}>
                {assetOptions.map(asset => (
                  <MenuItem
                    key={asset.value}
                    onClick={() => handleAssetSelect(asset.value)}>
                    <MenuIcon>{asset.icon}</MenuIcon>
                    <MenuText>{asset.label}</MenuText>
                  </MenuItem>
                ))}
              </DropdownContent>
            </DropdownMenu>
          </>
        )}

        <UploadButton
          onClick={isEditMode ? handleSaveEditWidget : handleAddWidget}
          disabled={!isSelected}>
          {isEditMode ? localizedTexts.save : localizedTexts.button}
        </UploadButton>
        {showColorPicker && (
          <ModalOverlay onClick={handleColorPickerClose}>
            <ModalContainer onClick={e => e.stopPropagation()}>
              {/* <CloseButton onClick={() => setShowColorPicker(false)}>
                <FaTimes size={20} color={theme.white} />
              </CloseButton> */}
              <ColorPicker
                color={color}
                onChange={setColor}
                hideInput={['hsv']}
                onChangeComplete={handleRainbowClick}
              />

              <ApplyButton onClick={() => setShowColorPicker(false)}>
                {localizedTexts.close}
              </ApplyButton>
            </ModalContainer>
          </ModalOverlay>
        )}
      </Container>
    </TopHeaderBackButtonWrapperView>
  );
}
const PreviewText = styled.div`
  color: ${theme.inActiveGray};
  font-size: ${theme.fontSize.md};
  margin: ${theme.spacing.xm} 0px;
  text-align: center;
`;
// 스타일 컴포넌트
const Container = styled.div`
  width: calc(100% - ${theme.spacing.lg} * 2);
  position: relative;
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SectionTitle = styled.h2<{inActive?: boolean}>`
  color: ${props => (props.inActive ? theme.inActiveGray : theme.mainNeon)};
  font-size: ${theme.fontSize.xl};
  font-weight: 400;
  margin-bottom: 10px;
`;

const ScaledWidgetContainer = styled.div`
  transform: scale(0.8);
  transform-origin: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: ${WIDTH * 0.6}px;
  align-items: center;
`;

const ColorOptions = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
`;

const ColorOption = styled.div<{
  color: string;
  selected?: boolean;
  isSelected?: boolean;
  border?: boolean;
  dashed?: boolean;
}>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color};
  cursor: pointer;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
  @media (max-width: 500px) {
    width: 25px;
    height: 25px;
  }
  @media (max-width: 400px) {
    width: 20px;
    height: 20px;
  }
  @media (max-width: 300px) {
    width: 15px;
    height: 15px;
  }
  ${props =>
    props.border && {
      border: `2px solid ${theme.mainNeon};`,
      opacity: props.isSelected ? '1' : '0.5',
    }}
  ${props =>
    props.dashed && {
      border: `2px dashed ${theme.mainNeon};`,
      opacity: props.isSelected ? '1' : '0.5',
    }}
  ${props =>
    props.isSelected &&
    `
  
  opacity: ${props.selected ? '1' : '0.5'}`}
`;

const InputField = styled.input`
  width: calc(100% - ${theme.spacing.md} * 2);
  padding: ${theme.spacing.md};
  border-radius: 10px;
  border: 1px solid #555;
  background-color: transparent;
  color: white;
  font-size: ${theme.fontSize.md};
  &:focus {
    outline: none;
    border: 1px solid ${theme.mainNeon};
  }
`;
const UploadButton = styled.button<{disabled?: boolean}>`
  width: calc(100%);
  padding: ${theme.spacing.rg} 0px;
  border-radius: 50px;
  border: none;
  background-color: #f1f1f1;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  color: black;
  font-size: ${theme.fontSize.lg};
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
`;

export default ProfileCreateWidgetPage;
