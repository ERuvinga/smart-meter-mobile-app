// Components
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//ALL AUTH SCREENS
import AuthHome from "../../../screens/AuthStack/Home";
import ClientHome from "../../../screens/AuthStack/HomeClient";
import NotificationsScreen from "../../../screens/AuthStack/Notification";
import ProfileScreen from "../../../screens/AuthStack/Profile/Account";
import NewUserScreen from "../../../screens/AuthStack/NewUser";
import NewPayementScreen from "../../../screens/AuthStack/NewPayement";

//LocalStorage user and user define datas
import useLocalStorage from "../../../hooks/UselocalDatas";
import { UserRole } from "../../../Constants/Types";

//Constatnts and Create navigation Stack and QueryClient
import { Routes } from "../../../hooks/useNavigation";

//NavBars
import AdminNavbar from "../../Auth/NavBars/Admin";
import ClientNavbar from "../../Auth/NavBars/Client";
import DealersNavbar from "../../Auth/NavBars/Dealers";

import { View } from "react-native";
const AppStackNavigation = createNativeStackNavigator(); // Navigation Stacke Create
const Tab = createMaterialTopTabNavigator();

//Auth Navigation
const AdminTabNavigation = () => {
    return (
        <View style={{ flex: 1 }} collapsable={false}>
            <Tab.Navigator
                screenOptions={{
                    lazy: false,
                    swipeEnabled: false,
                }}
                tabBar={(props) => AdminNavbar(props)}
                tabBarPosition="bottom"
                initialRouteName={Routes.HOME_AUTH}
            >
                <Tab.Screen name={Routes.HOME_AUTH} component={AuthHome} />
                <Tab.Screen name={Routes.NEW_USER} component={NewUserScreen} />

                <Tab.Screen
                    name={Routes.NOTIFICATION}
                    component={NotificationsScreen}
                />
                <Tab.Screen
                    name={Routes.PROFILE_USER}
                    component={ProfileScreen}
                />
            </Tab.Navigator>
        </View>
    );
};
const ClientTabNavigation = () => {
    return (
        <View style={{ flex: 1 }} collapsable={false}>
            <Tab.Navigator
                screenOptions={{
                    lazy: false,
                    swipeEnabled: false,
                }}
                tabBar={(props) => ClientNavbar(props)}
                tabBarPosition="bottom"
                initialRouteName={Routes.HOME_AUTH}
            >
                <Tab.Screen name={Routes.HOME_AUTH} component={ClientHome} />

                <Tab.Screen
                    name={Routes.NOTIFICATION}
                    component={NotificationsScreen}
                />
                <Tab.Screen
                    name={Routes.PROFILE_USER}
                    component={ProfileScreen}
                />
            </Tab.Navigator>
        </View>
    );
};
const DealerTabNavigation = () => {
    return (
        <View style={{ flex: 1 }} collapsable={false}>
            <Tab.Navigator
                screenOptions={{
                    lazy: false,
                    swipeEnabled: false,
                }}
                tabBar={(props) => DealersNavbar(props)}
                tabBarPosition="bottom"
                initialRouteName={Routes.NEW_USER}
            >
                <Tab.Screen
                    name={Routes.NEW_USER}
                    component={NewPayementScreen}
                />

                <Tab.Screen
                    name={Routes.PROFILE_USER}
                    component={ProfileScreen}
                />
            </Tab.Navigator>
        </View>
    );
};

//Auth Navigation
function AuthNavigation() {
    const roleOfUser = useLocalStorage().getUserRole();
    console.log(roleOfUser);

    return (
        <AppStackNavigation.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={Routes.MAIN_NAVIGATORE}
        >
            <>
                {roleOfUser == UserRole.ADMIN_PARC && (
                    <AppStackNavigation.Screen
                        name={Routes.MAIN_NAVIGATORE}
                        component={AdminTabNavigation}
                        options={{ headerShown: false }}
                    />
                )}
            </>
            <>
                {roleOfUser == UserRole.LOCATOR && (
                    <AppStackNavigation.Screen
                        name={Routes.MAIN_NAVIGATORE}
                        component={ClientTabNavigation}
                        options={{ headerShown: false }}
                    />
                )}
            </>
            <>
                {roleOfUser == UserRole.DEALER && (
                    <AppStackNavigation.Screen
                        name={Routes.MAIN_NAVIGATORE}
                        component={DealerTabNavigation}
                        options={{ headerShown: false }}
                    />
                )}
            </>
        </AppStackNavigation.Navigator>
    );
}

export default AuthNavigation;
