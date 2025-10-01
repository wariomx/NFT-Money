// Theme utility classes for light/dark mode - Web3 Professional Design
// Color palette:
// #1A1A19 - Dark background
// #31511E - Dark green accent (high contrast)
// #859F3D - Medium green
// #F6FCDF - Light cream

export const themeClasses = {
  // Cards with responsive padding
  card: 'bg-white dark:bg-[#1A1A19]/95 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border-2 border-[#859F3D]/30 dark:border-[#859F3D]/40',

  // Typography with better contrast
  heading: 'text-[#1A1A19] dark:text-[#F6FCDF] font-bold',
  text: 'text-[#1A1A19]/90 dark:text-[#F6FCDF]/90',
  textMuted: 'text-[#1A1A19]/60 dark:text-[#F6FCDF]/60',

  // Labels with strong contrast
  label: 'text-[#31511E] dark:text-[#859F3D] font-semibold text-sm',

  // Inputs with proper contrast and responsive sizing
  input: 'w-full bg-white dark:bg-[#31511E]/30 border-2 border-[#859F3D]/40 dark:border-[#859F3D]/50 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-[#1A1A19] dark:text-[#F6FCDF] placeholder-[#1A1A19]/40 dark:placeholder-[#F6FCDF]/40 focus:outline-none focus:ring-2 focus:ring-[#859F3D] focus:border-[#859F3D] transition-all text-sm md:text-base',

  // Select inputs
  select: 'w-full bg-white dark:bg-[#31511E]/30 border-2 border-[#859F3D]/40 dark:border-[#859F3D]/50 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-[#1A1A19] dark:text-[#F6FCDF] focus:outline-none focus:ring-2 focus:ring-[#859F3D] focus:border-[#859F3D] transition-all text-sm md:text-base',

  // Primary button with responsive sizing
  button: 'bg-gradient-to-r from-[#31511E] to-[#859F3D] hover:from-[#31511E]/90 hover:to-[#859F3D]/90 active:scale-95 text-white font-bold py-2.5 px-5 md:py-3 md:px-6 rounded-lg md:rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm md:text-base',

  // Secondary button with better contrast
  buttonSecondary: 'bg-[#859F3D]/30 dark:bg-[#859F3D]/30 hover:bg-[#859F3D]/40 dark:hover:bg-[#859F3D]/40 active:scale-95 text-[#1A1A19] dark:text-[#F6FCDF] font-semibold py-2 px-4 md:py-2.5 md:px-5 rounded-lg transition-all duration-200 border-2 border-[#859F3D]/50 text-sm md:text-base',

  // Status messages
  success: 'bg-green-50 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-600 text-green-900 dark:text-green-100 rounded-lg p-3 md:p-4',
  error: 'bg-red-50 dark:bg-red-900/30 border-2 border-red-500 dark:border-red-600 text-red-900 dark:text-red-100 rounded-lg p-3 md:p-4',
  warning: 'bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-500 dark:border-yellow-600 text-yellow-900 dark:text-yellow-100 rounded-lg p-3 md:p-4',
  info: 'bg-blue-50 dark:bg-[#31511E]/40 border-2 border-blue-400 dark:border-[#859F3D]/60 text-blue-900 dark:text-[#F6FCDF]/90 rounded-lg p-3 md:p-4',

  // Badge/Tag
  badge: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#859F3D]/20 dark:bg-[#859F3D]/30 text-[#31511E] dark:text-[#F6FCDF] border border-[#859F3D]/40',

  // Divider
  divider: 'border-t border-[#859F3D]/20 dark:border-[#859F3D]/30',
};