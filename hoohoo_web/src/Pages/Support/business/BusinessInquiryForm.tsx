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
import React, {useState} from 'react';
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

const inquiryOptions = [
  'ticketeer',
  'ecoProduct',
  'ecoService',
  'emCorporate',
  'zigu',
  'earthmeraAd',
  'earthmeraPartnership',
] as const;

type InquiryOption = (typeof inquiryOptions)[number];

interface BusinessInquiryFormData {
  type: InquiryOption;
  email: string;
  linkedin?: string;
  company: string;
  title: string;
  message: string;
}

export const BusinessInquiryForm: React.FC = () => {
  const localizedTexts: any = i18next.t('BusinessInquiryForm', {
    returnObjects: true,
  });
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type') as InquiryOption | null;

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm<BusinessInquiryFormData>({
    mode: 'onChange',
    defaultValues: {
      type: typeParam || ('' as InquiryOption),
      email: '',
      linkedin: '',
      company: '',
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

  const onSubmit: SubmitHandler<BusinessInquiryFormData> = async data => {
    setIsLoading(true);

    try {
      // EmailJS 템플릿 파라미터
      const templateParams = {
        inquiry_type: localizedTexts.inquiryOptions[data.type],
        user_email: data.email,
        user_linkedin: data.linkedin || 'N/A',
        company_name: data.company,
        job_title: data.title,
        message: data.message,
        reply_to: data.email,
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

      {/* 1. Inquiry Type */}
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
              {inquiryOptions.map(opt => (
                <MenuItem key={opt} value={opt}>
                  {localizedTexts.inquiryOptions[opt]}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.type?.message}</FormHelperText>
      </FormControl>

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
