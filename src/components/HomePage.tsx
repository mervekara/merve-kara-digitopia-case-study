'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

const HomePage = () => {
  const locale = useLocale();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)
  const t = useTranslations('Home')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-500 mb-4">
            {t('greeting', { name: userInfo?.name || 'User' })}
        </h1>
        <Link className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600" href={`/${locale}/chart`}> {t('goToChart')}</Link>
      </div>
    </div>
  )
}

export default HomePage
