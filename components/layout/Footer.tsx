'use client'

import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'

export function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="py-12 border-t border-gray-100 dark:border-dark-800 bg-white dark:bg-dark-950">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-10 h-10 mb-2">
                        <Image
                            src="/logo.png"
                            alt="PTGameHub Logo"
                            fill
                            className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                    <div className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white leading-none uppercase italic">
                        PT<span className="text-primary-500">GAME</span>HUB
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} {t('brandName')}. {t('copyright')} {t('brandSlogan')}
                    </p>
                </div>
            </div>
        </footer>
    )
}
