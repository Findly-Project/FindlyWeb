export const useFormatInput = (s: string) =>
  s.replace(/\s+/g, ' ').trim().replaceAll(' ', '+')
