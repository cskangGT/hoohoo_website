import emailjs from '@emailjs/browser';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../../../style';

const Title = styled.h1`
  font-size: ${theme.fontSize['2xl']};
  font-weight: 600;
  color: #000;
  margin-bottom: 20px;
`;

const inquiryOptions = {
  ticketeer: ['partnership', 'advertisement'],
  earthmera: [
    'ecoProduct',
    'ecoService',
    'ecoBoard',
    'partnership',
    'categoryRegistration',
    'nearbyStore',
  ],
  emCorporate: ['partnership', 'advertisement'],
  zigu: ['partnership', 'advertisement'],
};

const productOptions = [
  'ticketeer',
  'earthmera',
  'emCorporate',
  'zigu',
] as const;
type ProductOption = (typeof productOptions)[number];
type InquiryOption = keyof typeof inquiryOptions;

interface BusinessInquiryFormData {
  type: InquiryOption;
  product: ProductOption;
  email: string;
  linkedin?: string;
  company: string;
  title: string;
  message: string;
  name: string;
}

export const BusinessInquiryForm: React.FC = () => {
  const localizedTexts: any = i18next.t('BusinessInquiryForm', {
    returnObjects: true,
  });
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type') as InquiryOption | null;
  const productParam = searchParams.get('product') as ProductOption | null;
  console.log('typeParam', typeParam);
  console.log('productParam', productParam);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {errors, isValid},
  } = useForm<BusinessInquiryFormData>({
    mode: 'onChange',
    defaultValues: {
      type: typeParam || ('' as InquiryOption),
      product: productParam || ('' as ProductOption),
      email: '',
      linkedin: '',
      company: '',
      name: '',
      title: '',
      message: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({open: false, severity: 'success', message: ''});

  const selectedProduct = watch('product');

  // product가 변경될 때 type을 초기화
  useEffect(() => {
    if (selectedProduct === productParam) {
      setValue('type', typeParam || ('' as InquiryOption));
    } else {
      setValue('type', '' as InquiryOption);
    }
  }, [selectedProduct, productParam, setValue]);

  const onSubmit: SubmitHandler<BusinessInquiryFormData> = async data => {
    setIsLoading(true);

    try {
      // EmailJS 템플릿 파라미터
      const templateParams = {
        product: data.product,
        inquiry_type: localizedTexts.inquiryOptions[data.type],
        user_email: data.email,
        user_name: data.name,
        user_linkedin: data.linkedin || 'N/A',
        company_name: data.company,
        job_title: data.title,
        message: data.message,
        reply_to: data.name,
      };

      // EmailJS로 이메일 전송
      await emailjs.send(
        'service_by4s8cj',
        'template_h46fvkx',
        templateParams,
        'SJufwR7UXxbYAqkJs',
      );

      // 성공 알림
      setAlert({
        open: true,
        severity: 'success',
        message:
          localizedTexts.alert?.success || '문의가 성공적으로 전송되었습니다!',
      });

      // 폼 리셋
      reset();
    } catch (error) {
      console.error('EmailJS Error:', error);

      // 실패 알림
      setAlert({
        open: true,
        severity: 'error',
        message:
          localizedTexts.alert?.error ||
          '문의 전송에 실패했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mx: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
      noValidate>
      <Title>{localizedTexts.title}</Title>
      {/* Product */}
      <FormControl error={!!errors.product} variant="outlined">
        <Typography variant="subtitle1" gutterBottom>
          {localizedTexts.subtitle.product} *
        </Typography>

        <Controller
          name="product"
          control={control}
          rules={{required: localizedTexts.pleaseEnter.product}}
          render={({field}) => (
            <Select
              {...field}
              input={<OutlinedInput />}
              value={field.value}
              variant="outlined"
              displayEmpty
              MenuProps={{
                disableScrollLock: true,
              }}>
              <MenuItem disabled value="">
                <em>{localizedTexts.placeholder.product}</em>
              </MenuItem>
              {productOptions.map(opt => (
                <MenuItem key={opt} value={opt}>
                  {localizedTexts.productOptions[opt]}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.product?.message}</FormHelperText>
      </FormControl>
      {/* 1. Inquiry Type */}
      {selectedProduct && (
        <FormControl error={!!errors.type} variant="outlined">
          <Typography variant="subtitle1" gutterBottom>
            {localizedTexts.subtitle.type} *
          </Typography>

          <Controller
            name="type"
            control={control}
            rules={{required: localizedTexts.pleaseEnter.type}}
            render={({field}) => (
              <Select
                {...field}
                input={<OutlinedInput />}
                value={field.value}
                variant="outlined"
                displayEmpty
                MenuProps={{
                  disableScrollLock: true,
                }}>
                <MenuItem disabled value="">
                  <em>{localizedTexts.placeholder.type}</em>
                </MenuItem>
                {inquiryOptions[selectedProduct]?.map(opt => (
                  <MenuItem key={opt} value={opt}>
                    {localizedTexts.inquiryOptions[opt]}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.type?.message}</FormHelperText>
        </FormControl>
      )}
      <Typography variant="subtitle1" sx={{marginTop: 2}}>
        {localizedTexts.subtitle.company} *
      </Typography>
      <Controller
        name="company"
        control={control}
        rules={{required: localizedTexts.pleaseEnter.company}}
        render={({field}) => (
          <TextField
            {...field}
            placeholder={localizedTexts.placeholder.company}
            required
            error={!!errors.company}
            helperText={errors.company?.message}
            fullWidth
          />
        )}
      />
      <Typography variant="subtitle1" sx={{marginTop: 2}}>
        {localizedTexts.subtitle.name} *
      </Typography>
      <Controller
        name="name"
        control={control}
        rules={{required: localizedTexts.pleaseEnter.name}}
        render={({field}) => (
          <TextField
            {...field}
            placeholder={localizedTexts.placeholder.name}
            required
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
        )}
      />
      {/* 2. Email */}
      <Typography variant="subtitle1" sx={{marginTop: 2}}>
        {localizedTexts.subtitle.email} *
      </Typography>
      <Controller
        name="email"
        control={control}
        rules={{
          required: localizedTexts.pleaseEnter.email,
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: localizedTexts.invalid.email,
          },
        }}
        render={({field}) => (
          <TextField
            {...field}
            placeholder={localizedTexts.placeholder.email}
            type="email"
            required
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
        )}
      />
      {/* 3. LinkedIn (optional) */}
      <Typography variant="subtitle1" sx={{marginTop: 2}}>
        {localizedTexts.subtitle.linkedin}
      </Typography>
      <Controller
        name="linkedin"
        control={control}
        render={({field}) => (
          <TextField
            {...field}
            placeholder={localizedTexts.placeholder.linkedin}
            fullWidth
          />
        )}
      />
      {/* 4. Company Name */}

      {/* 5. Job Title */}
      <Typography variant="subtitle1" sx={{marginTop: 2}}>
        {localizedTexts.subtitle.job} *
      </Typography>
      <Controller
        name="title"
        control={control}
        rules={{required: localizedTexts.pleaseEnter.job}}
        render={({field}) => (
          <TextField
            {...field}
            placeholder={localizedTexts.placeholder.job}
            required
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
          />
        )}
      />
      {/* 6. Message */}
      <Typography variant="subtitle1" sx={{marginTop: 2}}>
        {localizedTexts.subtitle.message} *
      </Typography>
      <Controller
        name="message"
        control={control}
        rules={{required: localizedTexts.pleaseEnter.message}}
        render={({field}) => (
          <TextField
            {...field}
            required
            placeholder={localizedTexts.placeholder.message}
            error={!!errors.message}
            helperText={errors.message?.message}
            multiline
            rows={6}
            fullWidth
            inputProps={{maxLength: 2000}}
          />
        )}
      />
      {/* Send 버튼 */}
      <Button
        type="submit"
        style={
          isValid && !isLoading
            ? {
                backgroundColor: theme.mainNeon,
                color: 'black',
                opacity: 1,
                marginTop: 10,
              }
            : {
                backgroundColor: theme.gray,
                color: 'white',
                opacity: 0.5,
                marginTop: 10,
              }
        }
        size="large"
        disabled={!isValid || isLoading}
        startIcon={
          isLoading ? <CircularProgress size={20} color="inherit" /> : null
        }>
        {isLoading ? localizedTexts.sending : localizedTexts.send}
      </Button>
      {/* 알림 */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert(a => ({...a, open: false}))}>
        <Alert
          severity={alert.severity}
          onClose={() => setAlert(a => ({...a, open: false}))}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
