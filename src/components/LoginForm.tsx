'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthData, setError } from '../features/authSlice';
import { RootState } from '@/store/store';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse, JwtDecoded } from '@/types/types';
import { useLocale } from 'next-intl';
import { setCookie } from 'cookies-next';
import { fetchData } from '@/services/apiService';

type LoginFormProps = {
  translations: {
    title: string;
    emailLabel: string;
    passwordLabel: string;
    submitButton: string;
  };
};

export default function LoginForm({ translations }: LoginFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const locale = useLocale();
  const router = useRouter();
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { accessToken, idToken } = await fetchData<AuthResponse>('/api/signIn', undefined, email, password);
      const decodedToken = jwtDecode<JwtDecoded>(idToken.jwtToken);

      setCookie('accessToken', accessToken.jwtToken, { maxAge: 60 * 60 * 24 });
      setCookie('idToken', idToken.jwtToken, { maxAge: 60 * 60 * 24 });

      dispatch(
        setAuthData({
          accessToken: accessToken.jwtToken,
          decodedToken: decodedToken,
        })
      );
      
      router.push(`/${locale}/home`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setError(error.message || 'An unknown error occurred.'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg text-center">
    <h1 className="text-2xl font-bold mb-4">{translations.title}</h1>

    {error && <div className="mb-4 text-red-500"><p>{error}</p></div>}

    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{translations.emailLabel}</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>

    <div className="mb-6">
      <label className="block text-sm font-bold mb-2">{translations.passwordLabel}</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      {translations.submitButton}
    </button>
  </form>
  );
};
