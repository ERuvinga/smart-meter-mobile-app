/*
file content :
constantes, methodes, class and variable used in navigation stack for App 
*/
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export enum Routes {
    HOME = "Home",
    START = "Start",
    SIGNIN = "Login",
    SIGNUP = "Register",
    FORGOTPWD = "ForgotPwd",
    OTP = "OTP",
    SUCCESSACTIONS = "SuccessActions",
    USERDATASUPDATE = "Update_userDatas",
    NEWPASSWORD = "NewPassword",

    //AUTH
    HOME_AUTH = "Auth_Home",
    SEARCH = "Search",
    EXPLOREPUB = "ExplorePub",
    NOTIFICATION = "Notification",
    AUTH_NAVIGATION = "Auth_navigator",

    //posts
    PROFILE_POST = "Profile_post",
    PROFILE_POST_WITHOUT_LIKES = "Profile_post_withoutlikes",
    PROFILE_MEETING = "Profile_Meeting",
    REPLY_COMMENT = "Reply_Comment",

    //spaces
    SPACE_FORUM = "space_forum",
    SPACE_DEBAT_CITOYENS = "space_Debat",
    SPACE_SONDES = "space_sondes",
    SPACE_MEETING = "space_meeting",

    //nEW POSTS
    NEW_FORUM_POST = "new_forum_post",
    NEW_DEBAT_POST = "new_debat_post",
    NEW_SONDAGE = "new_sondage",
    NEW_MEETING = "new_meeting",

    //Profile
    PROFILE = "Profile",
    SETTINGS = "Settings",
    P_ACCOUNT = "userAccount",
    P_UPDATEPASSWORD = "userUpdatePassword",
    P_HELPCENTER = "HelpeCenter",
    P_POLICEPRIVACY = "PoliceAndPrivacy",

    //Navigators
    MAIN_NAVIGATORE = "Auth_nav",
    STORE_NAVIGATORE = "Store_nav",
}

export type RootStackParamList = {
    [Routes.HOME]: undefined;
    [Routes.START]: undefined;
    [Routes.SIGNIN]: undefined;
    [Routes.SIGNUP]: undefined;
    [Routes.FORGOTPWD]: undefined;
    [Routes.OTP]: undefined;
    [Routes.USERDATASUPDATE]: undefined;
    [Routes.SUCCESSACTIONS]: undefined;
    [Routes.NEWPASSWORD]: undefined;
    [Routes.HOME_AUTH]: undefined;

    //Posts
    [Routes.SEARCH]: undefined;
    [Routes.PROFILE_POST]: undefined;
    [Routes.PROFILE_POST_WITHOUT_LIKES]: undefined;
    [Routes.PROFILE_MEETING]: undefined;
    [Routes.REPLY_COMMENT]: undefined;

    //Space
    [Routes.SPACE_FORUM]: undefined;
    [Routes.SPACE_DEBAT_CITOYENS]: undefined;
    [Routes.NOTIFICATION]: undefined;
    [Routes.SPACE_SONDES]: undefined;
    [Routes.SPACE_MEETING]: undefined;

    //New Posts
    [Routes.NEW_FORUM_POST]: undefined;
    [Routes.NEW_DEBAT_POST]: undefined;
    [Routes.NEW_SONDAGE]: undefined;
    [Routes.NEW_MEETING]: undefined;

    //Navigatores
    [Routes.MAIN_NAVIGATORE]: undefined;
    [Routes.AUTH_NAVIGATION]: undefined;

    //ProfileUser
    [Routes.P_ACCOUNT]: undefined;
    [Routes.SETTINGS]: undefined;
    [Routes.P_UPDATEPASSWORD]: undefined;
    [Routes.P_POLICEPRIVACY]: undefined;
    [Routes.P_HELPCENTER]: undefined;
};

export const MainStack = createNativeStackNavigator<RootStackParamList>();
