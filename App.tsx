// Components
import React, { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

//Configuration
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

//Gestes and Navigation
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainNavigation from "./components/Navigations/GlobalNavigation";

//Querries
import { QueryClient, QueryClientProvider } from "react-query";

//Recoils Root and Hooks
import { RecoilRoot } from "recoil";

//Create navigation Stack and QueryClient
const queryClient = new QueryClient();

// keep  splash screen
SplashScreen.preventAutoHideAsync();

//Main function
const App = () => {
    const [isLoaded] = useFonts({
        // add Font in projet
        "pop-Regular": require("./assets/fonts/PoppinsRegular.ttf"),
        "pop-Medium": require("./assets/fonts/PoppinsMedium.ttf"),
        "pop-Bold": require("./assets/fonts/PoppinsBold.ttf"),
        "pop-Light": require("./assets/fonts/PoppinsLight.ttf"),
    });

    // display Screen Slpash if Font as not DownLoaded
    const onLayoutRootView = useCallback(async () => {
        if (isLoaded) {
            console.log("App Ready");
            // hide Screen Splash an Return App pop-Light
            SplashScreen.hideAsync();
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return null;
    }

    //SecureStorage.getItem();
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider>
                    <GestureHandlerRootView
                        style={{
                            flex: 1,
                        }}
                    >
                        <MainNavigation onRead={onLayoutRootView} />
                    </GestureHandlerRootView>
                </SafeAreaProvider>
            </QueryClientProvider>
        </RecoilRoot>
    );
};

export default App;
