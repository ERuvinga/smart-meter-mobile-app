import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

//Stores and Recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CenterWrapperState } from "../../../../State/Auth/Wrappers";
import { StateUser } from "../../../../State/Auth/TabBar/users";
import { API } from "../../../../State/Global";
import { DefaultPictures } from "../../../../State/Auth/User";

//Custom Hooks
import useColorTheme from "../../../../hooks/useTheme";
import useCustomFont from "../../../../hooks/useCustomFont";
import useToken from "../../../../hooks/useToken";
import useLocalStorage from "../../../../hooks/UselocalDatas";

//Components displya in Remove View
const LogoutView = () => {
    //states
    const AppTheme = useColorTheme();
    const AppFont = useCustomFont();
    const setCenterWrapper = useSetRecoilState(CenterWrapperState);
    const Api = useRecoilValue(API);
    const [loading, setLoading] = useState(false);
    const LocalStorage = useLocalStorage();

    //Logout States
    const Token = useToken();
    const setStateUser = useSetRecoilState(StateUser);

    //Atoms
    // const OwnerUserDatas = ;
    const Defaultsimages = useRecoilValue(DefaultPictures);

    //Handles
    //1.handle manager Bottom Wrapper used to remove Product in CartList
    const hiddenWrapper = () => {
        setCenterWrapper({
            hidden: true,
            component: <></>,
        });
    };

    const Logout = async () => {
        setLoading(true);
        const datasLogout = await fetch(`${Api.LINK}${Api.LOGOUT}`, {
            method: "POST",
            headers: {
                //header of methode
                Accept: "application/json",
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ id: LocalStorage.getIdUser() }),
        });

        datasLogout
            .json()
            .then((datas) => console.log(datas))
            .catch((error) => console.log(error));

        setLoading(false);
        // delete Local datas
        LocalStorage.deleteAllData();

        Token.LogOut(); // clear in Secure store an user token
        hiddenWrapper(); //hiden Wrapper
        setStateUser({
            // updating User State and Change Navigator Routes
            isLogIn: Token.LogInState() ? true : false,
            isLogOut: Token.LogOutState() ? true : false,
        });
    };

    return (
        <View
            style={[
                {
                    width: "100%",
                    rowGap: 8,
                    alignItems: "center",
                    paddingVertical: 10,
                },
            ]}
        >
            <>
                {loading ? (
                    <View>
                        <ActivityIndicator
                            color={AppTheme.mainText1}
                            size={16}
                        />
                    </View>
                ) : (
                    <Text
                        style={[
                            {
                                fontFamily: AppFont.Bold,
                                color: AppTheme.MainTextCards,
                                fontSize: 15,
                                textAlignVertical: "center",
                            },
                        ]}
                    >
                        Déconnexion
                    </Text>
                )}
            </>

            <View style={[{ width: 50, height: 50 }]}>
                <Image
                    source={
                        LocalStorage.getImage()
                            ? { uri: LocalStorage.getImage() }
                            : Defaultsimages.User
                    }
                    style={{ width: "100%", height: "100%" }}
                    borderRadius={25}
                />
            </View>
            <Text
                style={[
                    {
                        fontFamily: AppFont.Regular,
                        color: AppTheme.mainText1,
                        textAlignVertical: "center",
                        textAlign: "center",
                    },
                ]}
            >
                Etes-vous sûr de vouloir vous déconnectez ?
            </Text>
            <View
                style={[
                    {
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        paddingVertical: 6,
                        columnGap: 10,
                    },
                ]}
            >
                <TouchableOpacity
                    onPress={hiddenWrapper}
                    style={[
                        {
                            flex: 1,
                            minHeight: 33,
                            paddingHorizontal: 4,
                            borderRadius: 20,
                            borderWidth: 0.5,
                            borderColor: AppTheme.mainText1,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <Text
                        numberOfLines={1}
                        style={[
                            {
                                fontFamily: AppFont.Bold,
                                color: AppTheme.mainText1,
                                textAlignVertical: "center",
                            },
                        ]}
                    >
                        Annuler
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={Logout}
                    style={[
                        {
                            flex: 1,
                            minHeight: 33,
                            paddingHorizontal: 8,
                            borderRadius: 20,
                            backgroundColor: AppTheme.main,
                            elevation: 2,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <Text
                        numberOfLines={1}
                        style={[
                            {
                                fontFamily: AppFont.Bold,
                                color: AppTheme.mainfade,
                                textAlignVertical: "center",
                            },
                        ]}
                    >
                        Oui
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LogoutView;
