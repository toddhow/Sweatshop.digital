import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { store, persistor } from '@redux';
import { PersistGate } from 'redux-persist/integration/react';
import type { AppProps } from 'next/app';

const lightTheme = createTheme({
    type: 'light',
});

const darkTheme = createTheme({
    type: 'dark',
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        // 2. Use at the root of your app
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NextThemesProvider
                    defaultTheme="system"
                    attribute="class"
                    value={{
                        light: lightTheme.className,
                        dark: darkTheme.className,
                    }}
                >
                    <NextUIProvider>
                        <Component {...pageProps} />
                    </NextUIProvider>
                </NextThemesProvider>
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
