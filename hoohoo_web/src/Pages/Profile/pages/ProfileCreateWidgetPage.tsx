import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {createWidget} from '../../../api/jigulink/jigulink.api';
import {theme} from '../../../style';
import {
  checkAWSKey,
  compressImage,
  generateUniqueKey,
  uploadImageToS3,
} from '../../../util/MediaUtil';
import {WIDGET_PREFIX} from '../../../util/S3Config';
import TopHeaderBackButtonWrapperView from '../components/TopHeaderBackButtonWrapperView';
import WidgetItem from '../components/WidgetItem';
import {ProfileWidgetItemSize} from '../types/WidgetItemType';
const COLOR_OPTIONS = {
  RED: '#E74C3C',
  YELLOW: '#FDB52F',
  ORANGE: '#FF6A00',
  GREEN: '#3EAC4D',
  BLUE: '#6586F2',
};
function ProfileCreateWidgetPage() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] =
    useState<ProfileWidgetItemSize>('BIG');
  const [selectedColor, setSelectedColor] = useState<string>('transparent');
  const [hasBorder, setHasBorder] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [linkURL, setLinkURL] = useState<string>('');
  function handleColorClick(color: string) {
    setIsSelected(true);
    setImage('');
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
  const handleAddWidget = async () => {
    const widgetData = {
      sizeType: selectedStyle,
      bgType: image ? 'IMAGE' : 'COLOR',
      bgColor: selectedColor,
      bgImageUrl: image,
      hasBorder: hasBorder,
      linkUrl: linkURL,
      description: description,
    };
    const response = await createWidget(widgetData);
    if (response.result) {
      navigate(-1);
    }
  };
  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const compressedImage = await compressImage(file, 1080);
    const uriKey = generateUniqueKey(WIDGET_PREFIX, 'png');
    const {accessKey, keyId} = await checkAWSKey();
    if (!accessKey || !keyId) {
      toast.error('Failed to upload image');
      return;
    } else {
      const result = await uploadImageToS3(compressedImage, true, uriKey);

      if (result) {
        console.log('result', result);
        setIsSelected(true);
        setImage(result);
      }
    }

    // const compressedImage = await compressImage(file, 1080);
    //   const uriKey = generateUniqueKey(PROFILE_PREFIX + `/`, 'png');
    //   const result = await uploadImageToS3(compressedImage, true, uriKey);
    //   console.log('result', result);
    //   if (result) {
    //     setProfileImage(result);
    //   }
  };
  return (
    <TopHeaderBackButtonWrapperView>
      <Container>
        <PreviewContainer>
          {!isSelected ? (
            <PreviewText>Preview widget</PreviewText>
          ) : (
            <WidgetItem
              widget={{
                id: 0,
                sizeType: selectedStyle,
                bgType: image ? 'IMAGE' : 'COLOR',
                bgColor: selectedColor,
                bgImageUrl: image,
                hasBorder: hasBorder,
                description: description,
              }}
            />
          )}
        </PreviewContainer>
        {/* 스타일 섹션 */}
        <SectionTitle>Style</SectionTitle>
        <StyleOptions>
          <StyleOption
            selected={selectedStyle === 'BIG'}
            shape="BIG"
            onClick={() => setSelectedStyle('BIG')}
          />
          <StyleOption
            selected={selectedStyle === 'LONG'}
            shape="LONG"
            onClick={() => setSelectedStyle('LONG')}
          />
          <StyleOption
            selected={selectedStyle === 'SMALL'}
            shape="SMALL"
            onClick={() => setSelectedStyle('SMALL')}
          />
        </StyleOptions>

        {/* 채우기 섹션 */}
        <SectionTitle>Fill</SectionTitle>
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
          <ImageButton
            onClick={() =>
              document.getElementById('widget_profileImageInput')?.click()
            }>
            <ProfileImageInput
              type="file"
              id="widget_profileImageInput"
              accept="image/*"
              multiple={false}
              onChange={handleProfileImageChange}
            />
            <span>Image</span>
          </ImageButton>
        </ColorOptions>

        <SectionTitle>Link</SectionTitle>
        <InputField
          placeholder="https://"
          value={linkURL}
          onChange={e => setLinkURL(e.target.value)}
        />

        <SectionTitle inActive={!!image}>Text</SectionTitle>
        <InputField
          placeholder={
            !!image
              ? "If you add an image, the text can't be displayed."
              : 'Please enter the widget text'
          }
          value={description}
          disabled={!!image}
          onChange={e => setDescription(e.target.value)}
        />

        <UploadButton onClick={handleAddWidget}>Add</UploadButton>
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

const StyleOptions = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const WIDTH = window.innerWidth > 600 ? 600 : window.innerWidth;
const WIDGET_WIDTH = (WIDTH - 24 * 2 - 60 - 40) / 4;
const StyleOption = styled.div<{selected: boolean; shape: string}>`
  width: 100px;
  height: 100px;
  ${props => {
    switch (props.shape) {
      case 'BIG':
        return `
            width: ${WIDGET_WIDTH}px;
            height: ${WIDGET_WIDTH}px;
            border-radius: 10px;
          `;
      case 'LONG':
        return `
            width: ${WIDGET_WIDTH * 2}px;
            height: ${WIDGET_WIDTH / 3}px;
            border-radius: 30px;
          `;
      case 'SMALL':
        return `
            width: ${WIDGET_WIDTH}px;
            height: ${WIDGET_WIDTH / 3}px;
            border-radius: 30px;
          `;
      default:
        return '';
    }
  }}

  border: 2px solid ${props => (props.selected ? theme.mainNeon : theme.white)};

  cursor: pointer;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 15px;
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
  background-color: ${props => props.color};
  cursor: pointer;
  @media (max-width: 600px) {
    width: 20px;
    height: 20px;
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
  ${props => props.isSelected && `opacity: ${props.selected ? '1' : '0.5'}`}
`;

const ImageButton = styled.button`
  background-color: transparent;
  border: 2px solid #ffffff;
  border-radius: 20px;
  color: white;
  padding: 8px 20px;
  cursor: pointer;
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
const GuideText = styled.p`
  color: ${theme.gray};
  font-size: ${theme.fontSize.md};
  margin-bottom: ${theme.spacing.md};
`;
const PreviewContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UploadButton = styled.button`
  width: calc(100%);
  padding: ${theme.spacing.rg} 0px;
  border-radius: 50px;
  border: none;
  background-color: #dddddd;
  color: black;
  font-size: ${theme.fontSize.lg};
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
`;
const ProfileImageInput = styled.input`
  display: none;
`;
export default ProfileCreateWidgetPage;
