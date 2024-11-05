/*
file content :
constantes, methodes, class and variable used in navigation stack for App 
*/
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export enum Routes {
    HOME = "Home",
    SIGNIN = "Login",
    FORGOTPWD = "ForgotPwd",
    OTP = "OTP",
    USERDATASUPDATE = "Update_userDatas",
    NEWPASSWORD = "NewPassword",

    //AUTH
    HOME_AUTH = "Auth_Home",
    NEW_USER = "NEW_USER",
    NOTIFICATION = "Notification",
    PROFILE_USER = "PROFILE_USER",

    // Navigators
    START = "Start",
    ADMIN_NAVIGATOR = "ADMIN_NAVIGATOR",
    MAIN_NAVIGATORE = "MAIN_NAVIGATORE",
}

export type RootStackParamList = {
    [Routes.HOME]: undefined;
    [Routes.SIGNIN]: undefined;
    [Routes.FORGOTPWD]: undefined;
    [Routes.OTP]: undefined;
    [Routes.USERDATASUPDATE]: undefined;
    [Routes.NEWPASSWORD]: undefined;

    //AUTH
    [Routes.HOME_AUTH]: undefined;
    [Routes.NOTIFICATION]: undefined;
    [Routes.NEW_USER]: undefined;
    [Routes.PROFILE_USER]: undefined;

    //NAVIGATORS
    [Routes.START]: undefined;
    [Routes.ADMIN_NAVIGATOR]: undefined;
    [Routes.MAIN_NAVIGATORE]: undefined;
};

export const MainStack = createNativeStackNavigator<RootStackParamList>();
