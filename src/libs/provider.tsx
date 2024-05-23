'use client'

import NavigationEvents from '@/layouts/navigation-event'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import React from 'react'
import { RecoilRoot } from 'recoil'
import AppQueryProvider from './query-provider'
import AppSnackbarProvider from './snackbar-provider'
import AppThemeProvider from './theme-provider'

function Providers({ children }: React.PropsWithChildren) {
  return (
    <RecoilRoot>
      <AppRouterCacheProvider>
        <AppThemeProvider>
          <AppQueryProvider>
            <NavigationEvents>
              <AppSnackbarProvider>{children}</AppSnackbarProvider>
            </NavigationEvents>
          </AppQueryProvider>
        </AppThemeProvider>
      </AppRouterCacheProvider>
    </RecoilRoot>
  )
}

export default Providers
