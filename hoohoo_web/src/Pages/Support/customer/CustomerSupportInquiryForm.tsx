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

const supportInquiryOptions = [
  'compensation',
  'account',
  'bugReport',
  'featureFeedback',
  'other',
] as const;
type SupportInquiryOption = (typeof supportInquiryOptions)[number];

const serviceOptions = ['zigu', 'ticketeer', 'earthmeraApp'] as const;
type ServiceOption = (typeof serviceOptions)[number];

interface CustomerSupportInquiryFormData {
  type: SupportInquiryOption;
  service: ServiceOption;
  email: string;
  message: string;
}

export const CustomerSupportInquiryForm: React.FC = () => {
  const localized = i18next.t('CustomerSupportInquiryForm', {
    returnObjects: true,
  }) as any;
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type') as SupportInquiryOption | null;
  const serviceParam = searchParams.get('service') as ServiceOption | null;
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm<CustomerSupportInquiryFormData>({
    mode: 'onChange',
    defaultValues: {
      type: '' as SupportInquiryOption,
      service: '' as ServiceOption,
      email: '',
      message: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({open: false, severity: 'success', message: ''});

  const onSubmit: SubmitHandler<
    CustomerSupportInquiryFormData
  > = async data => {
    setIsLoading(true);

    try {
      const templateParams = {
        inquiry_type: localized.options.type[data.type],
        service: localized.options.service[data.service],
        user_email: data.email,
        message: data.message,
        reply_to: data.email,
      };

      await emailjs.send(
        'service_by4s8cj',
        'template_k6q3sin',
        templateParams,
        'SJufwR7UXxbYAqkJs',
      );

      setAlert({
        open: true,
        severity: 'success',
        message: localized.alert.success,
      });
      reset();
    } catch (err) {
      console.error('EmailJS Error:', err);
      setAlert({
        open: true,
        severity: 'error',
        message: localized.alert.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{mx: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2}}
      noValidate>
      <Title>{localized.title}</Title>

      {/* 1. 세부 항목 */}
      <FormControl error={!!errors.type} variant="outlined">
        <Typography variant="subtitle1" gutterBottom>
          {localized.subtitle.type} *
        </Typography>
        <Controller
          name="type"
          control={control}
          rules={{required: localized.errors.type}}
          render={({field}) => (
            <Select
              {...field}
              input={<OutlinedInput />}
              displayEmpty
              MenuProps={{
                disableScrollLock: true,
              }}>
              <MenuItem disabled value="">
                <em>{localized.placeholder.type}</em>
              </MenuItem>
              {supportInquiryOptions.map(opt => (
                <MenuItem key={opt} value={opt}>
                  {localized.options.type[opt]}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.type?.message}</FormHelperText>
      </FormControl>

      {/* 2. 서비스 */}
      <FormControl error={!!errors.service} variant="outlined">
        <Typography variant="subtitle1" gutterBottom>
          {localized.subtitle.service} *
        </Typography>
        <Controller
          name="service"
          control={control}
          rules={{required: localized.errors.service}}
          render={({field}) => (
            <Select
              {...field}
              input={<OutlinedInput />}
              displayEmpty
              MenuProps={{
                disableScrollLock: true,
              }}>
              <MenuItem disabled value="">
                <em>{localized.placeholder.service}</em>
              </MenuItem>
              {serviceOptions.map(opt => (
                <MenuItem key={opt} value={opt}>
                  {localized.options.service[opt]}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.service?.message}</FormHelperText>
      </FormControl>

      {/* 3. 이메일 */}
      <Typography variant="subtitle1" gutterBottom>
        {localized.subtitle.email} *
      </Typography>
      <Controller
        name="email"
        control={control}
        rules={{
          required: localized.errors.email,
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: localized.errors.invalidEmail,
          },
        }}
        render={({field}) => (
          <TextField
            {...field}
            placeholder={localized.placeholder.email}
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      {/* 4. 설명 */}
      <Typography variant="subtitle1" gutterBottom>
        {localized.subtitle.message} *
      </Typography>
      <Controller
        name="message"
        control={control}
        rules={{required: localized.errors.message}}
        render={({field}) => (
          <TextField
            {...field}
            placeholder={localized.placeholder.message}
            multiline
            rows={6}
            fullWidth
            error={!!errors.message}
            helperText={errors.message?.message}
          />
        )}
      />

      {/* Send 버튼 */}
      <Button
        type="submit"
        disabled={!isValid || isLoading}
        style={
          isValid && !isLoading
            ? {backgroundColor: theme.mainNeon, color: 'black', opacity: 1}
            : {backgroundColor: theme.gray, color: 'white', opacity: 0.5}
        }
        startIcon={
          isLoading ? <CircularProgress size={20} color="inherit" /> : null
        }>
        {isLoading ? localized.sending : localized.send}
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
