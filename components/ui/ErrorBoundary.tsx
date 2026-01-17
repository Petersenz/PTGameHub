'use client'

import { Component, ReactNode } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  t: (key: any) => string
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    const { t } = this.props
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('error')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('errorRendering')}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="btn-primary"
          >
            {t('tryAgain')}
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export function ErrorBoundary({ children, fallback }: { children: ReactNode, fallback?: ReactNode }) {
  const { t } = useTranslation()
  return (
    <ErrorBoundaryClass t={t} fallback={fallback}>
      {children}
    </ErrorBoundaryClass>
  )
}