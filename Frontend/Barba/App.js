import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { FONTS } from './constants/fonts';
import AppNavigation from './navigations/AppNavigation';
import { LogBox } from 'react-native';
import { SalonProvider } from './components/SalonContext'; // import your context

LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts(FONTS);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SalonProvider> {/* Wrap everything in SalonProvider */}
            <SafeAreaProvider onLayout={onLayoutRootView}>
                <AppNavigation />
            </SafeAreaProvider>
        </SalonProvider>
    );
}
