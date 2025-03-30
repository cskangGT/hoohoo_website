import i18next from 'i18next';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactCrop, {Crop, PixelCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import useWindowResize from '../../../components/hooks/useWindowResize';
import {theme} from '../../../style';
import {
  checkAWSKey,
  compressImage,
  generateUniqueKey,
  uploadImageToS3,
} from '../../../util/MediaUtil';
import {WIDGET_PREFIX} from '../../../util/S3Config';
import {useProfile} from '../contexts/ProfileContext';
import {ProfileWidgetItemSize} from '../types/WidgetItemType';
import {getCroppedImg} from '../util/util';
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 90%;
  max-height: 90vh;
  width: auto;
  z-index: 1002;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  gap: 20px;
  border-radius: 20px;

  .ReactCrop__crop-selection {
    border: 2px solid ${theme.mainNeon};
  }
`;
const CroppingImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
`;
const ApplyButton = styled.button`
  background-color: ${theme.mainNeon};
  color: black;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;
const ImageButton = styled.button`
  background-color: transparent;
  border: 2px solid #ffffff;
  border-radius: 20px;
  color: white;
  padding: 8px 20px;
  cursor: pointer;
`;
const ProfileImageInput = styled.input`
  display: none;
`;

type ImageCropProps = {
  setSelectedColor: (color: string) => void;
  setIsSelected: (isSelected: boolean) => void;
  setImage: (image: string) => void;

  sizeType: ProfileWidgetItemSize;
};
function ImageCrop({
  setSelectedColor,
  setIsSelected,
  setImage,

  sizeType,
}: ImageCropProps) {
  const localizedTexts: any = i18next.t('ProfileCreateWidgetPage', {
    returnObjects: true,
  });
  const {itemWidth, itemHeight, longItemWidth, bigItemHeight} = useWindowResize(
    {
      maxWidth: 600,
    },
  );
  const {selectedItem} = useProfile();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [src, setSrc] = useState<string>(selectedItem?.bgImageUrl || '');
  const [showImageCropper, setShowImageCropper] = useState<boolean>(false);

  // 크롭 영역의 초기값과 고정 비율 설정
  const getCropAspect = useCallback(() => {
    if (sizeType === 'SMALL') {
      return itemWidth / itemHeight;
    } else if (sizeType === 'LONG') {
      return longItemWidth / itemHeight;
    } else if (sizeType === 'BIG') {
      return 1; // 정사각형
    }
    return 1;
  }, [sizeType, itemWidth, itemHeight, longItemWidth]);

  // 초기 크롭 영역 설정
  const getInitialCrop = useCallback((): Crop => {
    const aspect = getCropAspect();
    return {
      unit: '%', // px 대신 %를 사용하여 반응형으로 설정
      width: 50, // 초기 너비를 90%로 설정
      height: 50 / aspect, // 비율에 맞게 높이 조정
      x: 5, // 가운데 정렬을 위해 (100 - width) / 2
      y: 5,
    };
  }, [getCropAspect]);

  // 이미지가 로드될 때 초기 크롭 영역 설정
  useEffect(() => {
    setCrop(getInitialCrop());
  }, [sizeType, getInitialCrop]);

  const handleImageCropClose = () => {
    setShowImageCropper(false);
  };

  const onCompleteCrop = useCallback((c: PixelCrop) => {
    setCompletedCrop(c);
  }, []);
  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setSrc(reader.result.toString());
        setShowImageCropper(true);
      }
    };
    reader.readAsDataURL(file);
  };
  const handleCropApply = useCallback(async () => {
    if (!completedCrop || !imgRef.current) return;

    try {
      // crop 영역만큼 잘린 이미지 파일
      const croppedFile = await getCroppedImg(imgRef.current, completedCrop);
      if (!croppedFile) return;

      // 압축
      const compressedFile = await compressImage(croppedFile, 1080);

      const {accessKey, keyId} = await checkAWSKey();
      if (!accessKey || !keyId) {
        // toast.error(localizedTexts.toast.failedToUploadImage);
        toast.error(localizedTexts.toast.failedToUploadImage);
        return;
      }

      const uriKey = generateUniqueKey(WIDGET_PREFIX, 'png');
      const resultUrl = await uploadImageToS3(compressedFile, true, uriKey);

      if (resultUrl) {
        setSelectedColor('transparent');
        setIsSelected(true);
        setImage(resultUrl);
        setShowImageCropper(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [completedCrop]);

  return (
    <>
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
        <span>{localizedTexts.image}</span>
      </ImageButton>
      {showImageCropper && (
        <ModalOverlay onClick={handleImageCropClose}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <ReactCrop
              crop={crop}
              aspect={getCropAspect()} // 위젯 타입에 따른 비율 설정
              onChange={newCrop => setCrop(newCrop)}
              onComplete={onCompleteCrop}
              minWidth={100} // 최소 크롭 영역 설정
              minHeight={100}
              keepSelection // 크롭 영역 유지
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
              }}>
              <CroppingImage
                ref={imgRef}
                src={src}
                alt="to-crop"
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                }}
              />
            </ReactCrop>
            <ApplyButton onClick={handleCropApply}>
              {localizedTexts.apply || '크롭 적용'}
            </ApplyButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
}

export default ImageCrop;
