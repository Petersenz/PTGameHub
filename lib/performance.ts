// Performance monitoring utilities

export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
  } else {
    fn()
  }
}

export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(metric)
  }
  
  // In production, you might want to send this to an analytics service
  // Example: analytics.track('Web Vital', metric)
}

// Lazy loading helper
export const lazyLoad = (importFn: () => Promise<any>) => {
  return importFn()
}