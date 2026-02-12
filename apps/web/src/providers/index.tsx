import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from './query/query-provider'
import { ThemeProvider } from './theme/theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  )
}
