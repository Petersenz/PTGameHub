export const formatDate = (dateString: string, language: 'en' | 'th'): string => {
  const date = new Date(dateString)
  
  if (language === 'th') {
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatYear = (dateString: string): number => {
  return new Date(dateString).getFullYear()
}