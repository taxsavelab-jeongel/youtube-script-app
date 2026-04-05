'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">문제가 발생했습니다</h2>
            <p className="text-sm text-gray-500 mb-4">페이지를 새로고침해주세요</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              다시 시도
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
