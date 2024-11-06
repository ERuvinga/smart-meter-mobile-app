// Components
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

//Recoils Root and Hooks
import { useRecoilValue } from "recoil";
import { StateUser } from "../../../State/Auth/TabBar/users";
import useToken from "../../../hooks/useToken";

//Components
import BottomWrapper from "../../../components/Auth/Wrapper/BottomWrapper";
import CenterWrapper from "../../../components/Auth/Wrapper/CenterWrapper";

//Navigations Screens
import StartNavigation from "../../../components/Navigations/StartNavigation";
import AuthNavigation from "../../../components/Navigations/AuthNavigation";
import { MainStack } from "../../../hooks/useNavigation";
import { Routes } from "../../../hooks/useNavigation";

interface onLoadingFunction {
    onRead: () => Promise<void>;
}
//Main function
const MainNavigation = (datas: onLoadingFunction) => {
    const Token = useToken();
    const stateUser = useRecoilValue(StateUser);

    console.log(stateUser);

    // //Read old state of user (isLogin or isLout)
    const StorageData = {
        isLogIn: Token.LogInState() ? true : false,
    };

    console.log(Token.getToken());

    return (
        <NavigationContainer independent={true} onReady={datas.onRead}>
            <MainStack.Navigator>
                {StorageData.isLogIn && stateUser.isLogIn ? (
                    <MainStack.Screen
                        name={Routes.ADMIN_NAVIGATOR}
                        options={{ headerShown: false }}
                        component={AuthNavigation}
                    />
                ) : (
                    <MainStack.Screen
                        name={Routes.START}
                        options={{ headerShown: false }}
                        component={StartNavigation}
                    />
                )}
            </MainStack.Navigator>
            <BottomWrapper />
            <CenterWrapper />
        </NavigationContainer>
    );
};

export default MainNavigation;
