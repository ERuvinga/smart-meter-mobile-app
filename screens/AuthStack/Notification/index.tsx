//import React tools and style
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//Hooks and Atoms Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { API } from "../../../State/Global";
import { NotificationsDatas } from "../../../State/Auth/User";
import { MsgServerState } from "../../../State/SignInUpDatas";

// Customs Hooks
import { useCustomQuery } from "../../../hooks/useFetch";
import useCustomFont from "../../../hooks/useCustomFont";
import useColorTheme from "../../../hooks/useTheme";
import useLocalStorage from "../../../hooks/UselocalDatas";

//components
import StyleBar from "../../../components/CommonComponents/statusBar";
import ErrorServerMsgCard from "../../../components/SingInUp/MessageServer";

//Tools and Styles
import GlobalStyle from "../../../style/global";

//Constantes
import { ArrowPathIcon, BellIcon } from "react-native-heroicons/solid";
import { useFocusEffect } from "@react-navigation/native";
import NotificationCard from "../../../components/Auth/Cards/NotificationCard";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import LoadingComponent from "../../../components/Auth/Loading";

const AppFont = useCustomFont();

const NotificationScreen = () => {
    //states
    const [LoadingNotif, setLoadingNotif] = useState(true);
    const [LoadingRefresh, setLoadinRefresh] = useState(false);
    const [ReloadingState, setReloadingState] = useState(false);

    //Atoms
    const [Notifications, setNotifications] =
        useRecoilState(NotificationsDatas);
    const SetServerMessageDisplay = useSetRecoilState(MsgServerState);

    //Atoms
    const AppTheme = useColorTheme();
    const Api = useRecoilValue(API);
    const Insets = useSafeAreaInsets();

    //HANDLES
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFecthingError = (Error: any) => {
        console.log(Error.response);
        SetServerMessageDisplay({
            // Display Message Of Server
            hidden: false,
            message: "Erreur de chargement",
        });
        setLoadingNotif(false);
        setLoadinRefresh(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSuccess = (datas: any) => {
        console.log(datas.AllNotifications);
        setNotifications(datas.AllNotifications);
        setLoadingNotif(false);
        setLoadinRefresh(false);
    };
    //hooks To fetching datas
    const useFeching = useCustomQuery({
        key: `NotificationScreen`,
        link: `${Api.LINK}${Api.GET_NOTIFICATION}/?userId=${useLocalStorage().getIdUser()}`,
        hangleError: handleFecthingError,
        handleSucces: handleSuccess,
    });

    useFocusEffect(
        useCallback(() => {
            console.log("Loding users ...");
            useFeching.refetch();
            return () => {
                console.log("Quit Notification Screen...");
            };
        }, [])
    );

    useEffect(() => {
        setLoadingNotif(true);
        useFeching.refetch();
    }, [ReloadingState]);

    return (
        <View
            style={[
                GlobalStyle.SafeArea,
                {
                    backgroundColor: AppTheme.background,
                    marginTop: Insets.top,
                    marginBottom: Insets.bottom,
                    marginLeft: Insets.left,
                    marginRight: Insets.right,
                },
            ]}
        >
            <ErrorServerMsgCard top={10} timer={6500} />
            <StyleBar
                theme={{
                    barStyle: AppTheme.barStyle,
                    background: AppTheme.background,
                }}
            />
            <View style={[styles.HeaderContainer]}>
                <Text style={[styles.Notifications, { color: AppTheme.main }]}>
                    Notifications
                </Text>
                <TouchableOpacity
                    onPress={() => setReloadingState((lastValue) => !lastValue)}
                    style={{
                        backgroundColor: AppTheme.main,
                        width: 35,
                        height: 35,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ArrowPathIcon size={20} color={AppTheme.mainfade} />
                </TouchableOpacity>
            </View>
            <>
                {LoadingNotif ? (
                    <View
                        style={[
                            {
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                            },
                        ]}
                    >
                        <LoadingComponent />
                    </View>
                ) : (
                    <FlatList
                        contentContainerStyle={[
                            {
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                flexGrow: 1,
                            },
                        ]}
                        refreshControl={
                            <RefreshControl
                                refreshing={LoadingRefresh}
                                onRefresh={() => {
                                    // reloading Notifications
                                    setLoadinRefresh(true);
                                    useFeching.refetch();
                                }}
                            />
                        }
                        ListEmptyComponent={
                            <View style={[styles.Container]}>
                                <BellIcon
                                    size={30}
                                    color={AppTheme.mainText1}
                                />
                                <Text
                                    style={[
                                        styles.NotificationText,
                                        {
                                            color: AppTheme.mainText1,
                                        },
                                    ]}
                                >
                                    Vos notifications s&apos;afficheront ici !
                                </Text>
                            </View>
                        }
                        data={Notifications}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `${item._id}_${index}`}
                        renderItem={({ item }) => {
                            return (
                                <NotificationCard
                                    NotificationDatas={item}
                                    key={`${item._id}`}
                                />
                            );
                        }}
                    />
                )}
            </>
        </View>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 5,
    },
    HeaderContainer: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },

    Notifications: {
        fontFamily: AppFont.Bold,
        fontSize: 18,
    },

    NotificationText: {
        textAlign: "center",
        fontFamily: AppFont.Regular,
        width: "90%",
        fontSize: 13,
    },
});
