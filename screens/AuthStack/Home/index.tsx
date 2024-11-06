//import React tools and style
import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    FlatList,
} from "react-native";

//Customs Hooks
import useColorTheme from "../../../hooks/useTheme";
import useCustomFont from "../../../hooks/useCustomFont";
import useLocalStorage from "../../../hooks/UselocalDatas";
import { useCustomQuery } from "../../../hooks/useFetch";

//Atoms Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
    ClientUsers,
    DefaultPictures,
    HomeFilterSelected,
} from "../../../State/Auth/User";
import { API } from "../../../State/Global";
import { MsgServerState } from "../../../State/SignInUpDatas";

//components
import StyleBar from "../../../components/CommonComponents/statusBar";
import BtnOfPost_selected from "../../../components/Auth/Buttons/PostTypeButtons";

//Tools and Styles
import GlobalStyle from "../../../style/global";
import {
    FILTERACCOUNTS,
    REQUEST_KEYS,
    UserRole,
} from "../../../Constants/Types";

//Constantes
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import LoadingComponent from "../../../components/Auth/Loading";
import { RefreshControl } from "react-native-gesture-handler";
import { UserGroupIcon } from "react-native-heroicons/solid";
import UserCard from "../../../components/Auth/Cards/UserCard";

//Screen
const AuthHome = () => {
    //states
    const Insets = useSafeAreaInsets();
    const LocalStorage = useLocalStorage();
    const AppFont = useCustomFont();
    const [LoadingUsers, setLoadingUser] = useState(true);
    const [LoadingRefresh, setLoadinRefresh] = useState(false);

    //atoms
    const Api = useRecoilValue(API);
    const DefaultsImages = useRecoilValue(DefaultPictures);
    const SetServerMessageDisplay = useSetRecoilState(MsgServerState);
    const [Users, setUser] = useRecoilState(ClientUsers);

    //hooks
    const AppTheme = useColorTheme();

    //Filter datas
    const [FilterPost, setFilterPost] = useRecoilState(HomeFilterSelected);
    const FiltersTab = [
        {
            label: "Tout",
            value: FILTERACCOUNTS.ALL,
        },
        {
            label: "Active",
            value: FILTERACCOUNTS.ACTIVE,
        },
        {
            label: "Desactive",
            value: FILTERACCOUNTS.DESACTIVE,
        },
    ];

    //handles
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFecthingError = (Error: any) => {
        console.log(Error.response);
        SetServerMessageDisplay({
            // Display Message Of Server
            hidden: false,
            message: "Erreur de chargement",
        });
        setLoadingUser(false);
        setLoadinRefresh(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFecthingSuccess = (datas: any) => {
        console.log(datas.AllUsers);
        setUser(datas.AllUsers);
        setLoadingUser(false);
        setLoadinRefresh(false);
    };

    const useFeching = useCustomQuery({
        key: REQUEST_KEYS.HOME_CLIENTS,
        link: `${Api.LINK}${Api.GET_USERS}/locators?useRole=${UserRole.LOCATOR}&status=${FilterPost}&adminId=${LocalStorage.getIdUser()}`,
        hangleError: handleFecthingError,
        handleSucces: handleFecthingSuccess,
    });

    useFocusEffect(
        useCallback(() => {
            console.log("Loding users ...");
            useFeching.refetch();
        }, [LoadingRefresh])
    );

    useEffect(() => {
        console.log("Filter users ...");
        setLoadingUser(true);
        useFeching.refetch();
    }, [FilterPost]);

    return (
        <View
            style={[
                GlobalStyle.SafeArea,
                {
                    backgroundColor: AppTheme.background,
                    marginBottom: Insets.bottom,
                    marginLeft: Insets.left,
                    marginRight: Insets.right,
                },
            ]}
        >
            <StyleBar
                theme={{
                    barStyle: AppTheme.barStyle,
                    background: AppTheme.bgColorBlocs,
                }}
            />
            <View
                style={[
                    styles.HeaderContainer,
                    {
                        borderColor: AppTheme.secondText,
                    },
                ]}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: "4%",
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            fontFamily: AppFont.Bold,
                            color: AppTheme.MainTextCards,
                            fontSize: 15,
                            flex: 1,
                        }}
                    >
                        {LocalStorage.getName()}
                    </Text>
                    <View style={styles.ProfileUser}>
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                                borderWidth: 2,
                                borderColor: AppTheme.main,
                            }}
                            borderRadius={8}
                            source={
                                LocalStorage.getImage()
                                    ? { uri: LocalStorage.getImage() }
                                    : DefaultsImages.User
                            }
                        />
                    </View>
                </View>
            </View>
            <View
                style={[
                    {
                        rowGap: 10,
                        paddingHorizontal: 10,
                        zIndex: 20,
                        paddingVertical: 11,
                    },
                ]}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[
                        {
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: 5,
                        },
                    ]}
                >
                    {FiltersTab.map((item, index) => (
                        <BtnOfPost_selected
                            value={item.value}
                            label={item.label}
                            action={() => setFilterPost(item.value)}
                            key={`${item.label}_${index}`}
                            Selected={FilterPost}
                        />
                    ))}
                </ScrollView>
            </View>
            <>
                {LoadingUsers ? (
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
                                    setLoadinRefresh(true);
                                }}
                            />
                        }
                        ListEmptyComponent={
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <UserGroupIcon
                                    size={30}
                                    color={AppTheme.mainText1}
                                />
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: AppFont.Bold,
                                        color: AppTheme.mainText1,
                                    }}
                                >
                                    Aucun utilisateur trouvé
                                </Text>
                            </View>
                        }
                        data={Users}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `${item._id}_${index}`}
                        renderItem={({ item, index }) => {
                            return (
                                <UserCard
                                    UserDatas={item}
                                    key={`${item._id}`}
                                    reloadingList={setLoadinRefresh}
                                    indexUser={index}
                                />
                            );
                        }}
                    />
                )}
            </>
        </View>
    );
};

export default AuthHome;

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        flexGrow: 1,
        rowGap: 10,
        paddingTop: 10,
    },
    HeaderContainer: {
        width: "100%",
        paddingVertical: 5,
        zIndex: 3,
    },

    ProfileUser: {
        width: 32,
        height: 32,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 10,
    },
});
