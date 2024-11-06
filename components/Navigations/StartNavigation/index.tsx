// Components
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import HomeScreen from "../../../screens/StartStack/Home";
import LoginScreen from "../../../screens/SignInUpStack/Login";
import ActiveAccountScreen from "../../../screens/SignInUpStack/ActiveAccount";
import OTPScreen from "../../../screens/SignInUpStack/OTP";
import ConfigUserScreen from "../../../screens/SignInUpStack/ResetPassword";
import { Routes } from "../../../hooks/useNavigation";

//Create navigation Stack and QueryClient
const AppStackNavigation = createNativeStackNavigator(); // Navigation Stacke Create

//Main function
function StartNavigation() {
    return (
        <AppStackNavigation.Navigator
            initialRouteName={Routes.HOME}
            screenOptions={{ headerShown: false }}
        >
            <AppStackNavigation.Screen
                name={Routes.HOME}
                component={HomeScreen}
            />
            <AppStackNavigation.Screen
                name={Routes.SIGNIN}
                component={LoginScreen}
            />
            <AppStackNavigation.Screen
                name={Routes.FORGOTPWD}
                component={ActiveAccountScreen}
            />
            <AppStackNavigation.Screen
                name={Routes.NEWPASSWORD}
                component={ConfigUserScreen}
            />
            <AppStackNavigation.Screen
                name={Routes.OTP}
                component={OTPScreen}
            />
        </AppStackNavigation.Navigator>
    );
}

export default StartNavigation;
