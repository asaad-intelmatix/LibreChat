import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Turnstile } from '@marsidev/react-turnstile';
import { ThemeContext, Spinner, isDark } from '@librechat/client';
import { useRecoilValue } from 'recoil';
import type { TLoginUser, TStartupConfig } from 'librechat-data-provider';
import type { TAuthContext } from '~/common';
import { useResendVerificationEmail, useGetStartupConfig } from '~/data-provider';
import { useLocalize } from '~/hooks';
import store from '~/store';

type TLoginFormProps = {
  onSubmit: (data: TLoginUser) => void;
  startupConfig: TStartupConfig;
  error: Pick<TAuthContext, 'error'>['error'];
  setError: Pick<TAuthContext, 'setError'>['setError'];
};

const LoginForm: React.FC<TLoginFormProps> = ({ onSubmit, startupConfig, error, setError }) => {
  const localize = useLocalize();
  const { theme } = useContext(ThemeContext);
  const langcode = useRecoilValue(store.lang);
  const isArabic = langcode === 'ar' || langcode?.startsWith('ar');
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginUser>();
  const [showResendLink, setShowResendLink] = useState<boolean>(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const { data: config } = useGetStartupConfig();
  const useUsernameLogin = config?.ldap?.username;
  const validTheme = isDark(theme) ? 'dark' : 'light';
  const requireCaptcha = Boolean(startupConfig.turnstile?.siteKey);

  useEffect(() => {
    if (error && error.includes('422') && !showResendLink) {
      setShowResendLink(true);
    }
  }, [error, showResendLink]);

  const resendLinkMutation = useResendVerificationEmail({
    onMutate: () => {
      setError(undefined);
      setShowResendLink(false);
    },
  });
  if (!startupConfig) {
    return null;
  }

  const renderError = (fieldName: string) => {
    const errorMessage = errors[fieldName]?.message;
    return errorMessage ? (
      <span role="alert" className="mt-1 text-sm text-red-500 dark:text-red-900">
        {String(errorMessage)}
      </span>
    ) : null;
  };

  const handleResendEmail = () => {
    const email = getValues('email');
    if (!email) {
      return setShowResendLink(false);
    }
    resendLinkMutation.mutate({ email });
  };

  return (
    <>
      {showResendLink && (
        <div className="mt-2 rounded-md border border-green-500 bg-green-500/10 px-3 py-2 text-sm text-gray-600 dark:text-gray-200">
          {localize('com_auth_email_verification_resend_prompt')}
          <button
            type="button"
            className="ml-2 text-blue-600 hover:underline"
            onClick={handleResendEmail}
            disabled={resendLinkMutation.isLoading}
          >
            {localize('com_auth_email_resend_link')}
          </button>
        </div>
      )}
      <form
        className="flex w-full max-w-[348px] flex-col gap-4"
        aria-label="Login form"
        method="POST"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        {/* Header */}
        <div className="flex flex-col items-start pb-6">
          <h2 className="w-full text-center text-2xl font-semibold leading-[32px] tracking-[-0.144px] text-foreground">
            {localize('com_auth_welcome_back')}
          </h2>
          <p
            className="mt-2 w-full text-center text-sm font-normal leading-5 text-muted-foreground"
            dir="auto"
          >
            {isArabic
              ? 'الرجاء إدخال البريد الإلكتروني وكلمة المرور'
              : 'Please enter your email and password'}
          </p>
        </div>

        {/* Email Input */}
        <div className="flex flex-col items-end gap-2">
          <label
            htmlFor="email"
            className="w-full text-right text-sm font-medium leading-[14px] text-foreground"
          >
            {useUsernameLogin
              ? localize('com_auth_username').replace(/ \(.*$/, '')
              : localize('com_auth_email_address')}
          </label>
          <input
            type="text"
            id="email"
            autoComplete={useUsernameLogin ? 'username' : 'email'}
            aria-label={localize('com_auth_email')}
            {...register('email', {
              required: localize('com_auth_email_required'),
              maxLength: { value: 120, message: localize('com_auth_email_max_length') },
              pattern: {
                value: useUsernameLogin ? /\S+/ : /\S+@\S+\.\S+/,
                message: localize('com_auth_email_pattern'),
              },
            })}
            aria-invalid={!!errors.email}
            className="h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm leading-5 text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none"
            placeholder="m@example.com"
          />
          {renderError('email')}
        </div>

        {/* Password Input */}
        <div className="flex flex-col items-start gap-1.5">
          <div className="flex w-full flex-col gap-1.5">
            <label
              htmlFor="password"
              className="w-full text-right text-sm font-medium leading-[14px] text-foreground"
            >
              {localize('com_auth_password')}
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              aria-label={localize('com_auth_password')}
              {...register('password', {
                required: localize('com_auth_password_required'),
                minLength: {
                  value: startupConfig?.minPasswordLength || 8,
                  message: localize('com_auth_password_min_length'),
                },
                maxLength: { value: 128, message: localize('com_auth_password_max_length') },
              })}
              aria-invalid={!!errors.password}
              className="h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm leading-5 text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none"
              placeholder=" "
            />
          </div>
          {renderError('password')}
          {startupConfig.passwordResetEnabled && (
            <a
              href="/forgot-password"
              className="mt-2 self-end text-right text-sm font-normal leading-5 text-card-foreground"
            >
              {localize('com_auth_password_forgot')}
            </a>
          )}
        </div>

        {/* Captcha */}
        {requireCaptcha && (
          <div className="my-4 flex justify-center">
            <Turnstile
              siteKey={startupConfig.turnstile!.siteKey}
              options={{
                ...startupConfig.turnstile!.options,
                theme: validTheme,
              }}
              onSuccess={setTurnstileToken}
              onError={() => setTurnstileToken(null)}
              onExpire={() => setTurnstileToken(null)}
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={(requireCaptcha && !turnstileToken) || isSubmitting}
          className="h-10 w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-normal leading-5 text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={localize('com_auth_login')}
          data-testid="login-button"
        >
          {isSubmitting ? <Spinner /> : localize('com_auth_login')}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
