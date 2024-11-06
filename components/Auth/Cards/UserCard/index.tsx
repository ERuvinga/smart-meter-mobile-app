import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

//componens
import RemoveItemView from "../../Wrapper/Views/removeUserView";

//Recoil hooks and Atoms
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DefaultPictures } from "../../../../State/Auth/User";
import { API } from "../../../../State/Global";

//Hooks
import useColorTheme from "../../../../hooks/useTheme";
import useCustomFont from "../../../../hooks/useCustomFont";
import { useFocusEffect } from "@react-navigation/native";
import useLocalStorage from "../../../../hooks/UselocalDatas";
import { useCustomQuery, useMutate } from "../../../../hooks/useFetch";

//Constants
const AppFont = useCustomFont();
import {
    CounterDatasType,
    MobileUserDatas,
    REQUEST_KEYS,
    UserRole,
} from "../../../../Constants/Types";
import {
    TrashIcon,
    LockClosedIcon,
    LockOpenIcon,
} from "react-native-heroicons/solid";
import { BottomState } from "../../../../State/Auth/Wrappers";

interface datasVerticalCard {
    UserDatas: MobileUserDatas;
    reloadingList: React.Dispatch<React.SetStateAction<boolean>>;
    indexUser: number;
}
const ClientsCard = (datas: datasVerticalCard) => {
    //states
    const AppTheme = useColorTheme();
    const Api = useRecoilValue(API);
    const DefaultsImages = useRecoilValue(DefaultPictures);
    const setCenterWrapper = useSetRecoilState(BottomState);
    const [CounterDatas, setCounterDatas] = useState({} as CounterDatasType);

    const isAdmin = UserRole.ADMIN_PARC == useLocalStorage().getUserRole();

    //handles
    const displayWrapper = () => {
        setCenterWrapper({
            hidden: false,
            component: (
                <RemoveItemView
                    userDatas={{
                        email: datas.UserDatas.email,
                        name: `${datas.UserDatas.fname} ${datas.UserDatas.lname}`,
                        _id: datas.UserDatas._id,
                        img: datas.UserDatas.cover,
                        successDeleteAction: datas.reloadingList,
                    }}
                />
            ),
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFecthingError = (Error: any) => {
        console.log(Error.response);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFecthingSuccess = (datas: any) => {
        console.log(datas);
        setCounterDatas(datas);
    };

    //Hooks Query
    const useFetchingMutation = useMutate();
    const useFeching = useCustomQuery({
        key: `${REQUEST_KEYS.GET_COUNTER_DATAS}_${datas.indexUser}`,
        link: `${Api.LINK}${Api.GET_COUNTER}/?userId=${datas.UserDatas._id}`,
        hangleError: handleFecthingError,
        handleSucces: handleFecthingSuccess,
    });

    const ActiveCounter = () => {
        console.log("Activation querry");

        //sending Datas
        useFetchingMutation.mutate({
            //Login
            methode: "POST",
            ApiLink: `${Api.LINK}`,
            EndPoint: `${Api.CHANGE_COUNTER_STATE}`,
            dataToSending: { idUser: datas.UserDatas._id, isActive: true },
            handleError: handleFecthingError,
            handleSuccess: handleFecthingSuccess,
        });
    };

    const DesactiveCounter = () => {
        console.log("Deasctivation querry");

        //sending Datas
        useFetchingMutation.mutate({
            //Login
            methode: "POST",
            ApiLink: `${Api.LINK}`,
            EndPoint: `${Api.CHANGE_COUNTER_STATE}`,
            dataToSending: { idUser: datas.UserDatas._id, isActive: false },
            handleError: handleFecthingError,
            handleSuccess: handleFecthingSuccess,
        });
    };

    useFocusEffect(
        useCallback(() => {
            console.log("Loding users ...");
            const idSetintreval = setInterval(() => {
                console.log("sending Request");
                useFeching.refetch();
            }, 3000);

            return () => {
                console.log("Quit component and delete idSetintreval...");
                console.log(idSetintreval);
                clearInterval(idSetintreval);
            };
        }, [])
    );

    useEffect(() => {
        console.log(CounterDatas.isActive);
    }, [CounterDatas]);

    return (
        <View
            style={[
                styles.PostCard,
                {
                    backgroundColor: AppTheme.bgColorBlocs,
                    borderColor: AppTheme.secondText,
                },
            ]}
        >
            <TouchableOpacity
                onPress={() => null}
                style={[
                    {
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 5,
                    },
                ]}
            >
                <View
                    style={{
                        width: 35,
                        height: 35,
                    }}
                >
                    <Image
                        source={
                            datas.UserDatas.cover
                                ? { uri: datas.UserDatas.cover }
                                : DefaultsImages.User
                        }
                        style={{
                            borderWidth: 0,
                            borderColor: AppTheme.main,
                            width: "100%",
                            height: "100%",
                        }}
                        borderRadius={20}
                    />
                </View>

                <View style={[{ justifyContent: "center" }]}>
                    <Text
                        numberOfLines={1}
                        style={[
                            {
                                color: AppTheme.MainTextCards,
                                textAlignVertical: "bottom",
                                fontSize: 14,
                                fontWeight: "bold",
                            },
                        ]}
                    >
                        {`${datas.UserDatas.fname} ${datas.UserDatas.lname}`}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={[
                            {
                                flex: 1,
                                fontFamily: AppFont.Regular,
                                color: AppTheme.icon,
                                textAlignVertical: "top",
                                width: "100%",
                                fontSize: 12,
                            },
                        ]}
                    >
                        {datas.UserDatas.email}
                    </Text>
                </View>
            </TouchableOpacity>

            <View
                style={[
                    {
                        width: 180,
                        height: 180,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                ]}
            >
                <View
                    style={{
                        columnGap: 6,
                        borderWidth: 2,
                        borderColor: AppTheme.main,
                        width: "100%",
                        height: "100%",
                        borderRadius: 120,
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={[
                            {
                                fontFamily: AppFont.Bold,
                                color: AppTheme.main,
                                textAlignVertical: "center",
                                textAlign: "center",
                                fontSize: 22,
                            },
                        ]}
                    >
                        {CounterDatas.counterValue
                            ? `${CounterDatas.counterValue} m3/h`
                            : "-- m3/h"}
                    </Text>
                </View>
            </View>
            <View
                style={[
                    {
                        marginTop: 5,
                        flexDirection: "row",
                        columnGap: 10,
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "center",
                    },
                ]}
            >
                <TouchableOpacity
                    disabled={
                        !CounterDatas.counterValue ||
                        CounterDatas.counterValue <= 0
                    }
                    onPress={() =>
                        CounterDatas.isActive == "true"
                            ? DesactiveCounter()
                            : ActiveCounter()
                    }
                    style={[
                        {
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            columnGap: 4,
                            borderRadius: 4,
                            height: 35,
                            paddingHorizontal: 10,
                            backgroundColor: AppTheme.successColor,
                            opacity:
                                !CounterDatas.counterValue ||
                                CounterDatas.counterValue <= 0
                                    ? 0.5
                                    : 1,
                        },
                    ]}
                >
                    {CounterDatas.counterValue ||
                    CounterDatas.counterValue <= 0 ? (
                        <>
                            <>
                                {CounterDatas.isActive == "true" ? (
                                    <LockClosedIcon
                                        size={19}
                                        color={AppTheme.mainfade}
                                    />
                                ) : (
                                    <LockOpenIcon
                                        size={19}
                                        color={AppTheme.mainfade}
                                    />
                                )}
                            </>

                            <Text
                                numberOfLines={1}
                                style={[
                                    {
                                        fontFamily: AppFont.Bold,
                                        color: AppTheme.mainfade,
                                        textAlignVertical: "center",
                                        textAlign: "center",
                                        width: "auto",
                                        fontSize: 12,
                                    },
                                ]}
                            >
                                {CounterDatas.isActive == "true"
                                    ? "Bloquer"
                                    : "Debloquer"}
                            </Text>
                        </>
                    ) : (
                        <Text
                            style={[
                                {
                                    fontFamily: AppFont.Bold,
                                    color: AppTheme.mainfade,
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    width: "auto",
                                    fontSize: 12,
                                },
                            ]}
                        >
                            -- -- -- --
                        </Text>
                    )}
                </TouchableOpacity>
                <>
                    {isAdmin && (
                        <TouchableOpacity
                            onPress={displayWrapper}
                            style={[
                                {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    columnGap: 4,
                                    borderRadius: 4,
                                    height: 35,
                                    paddingHorizontal: 10,
                                    backgroundColor: AppTheme.ErrorColor,
                                },
                            ]}
                        >
                            <TrashIcon size={19} color={AppTheme.mainfade} />
                            <Text
                                numberOfLines={1}
                                style={[
                                    {
                                        fontFamily: AppFont.Medium,
                                        color: AppTheme.mainfade,
                                        textAlignVertical: "center",
                                        textAlign: "center",
                                        width: "auto",
                                        fontSize: 12,
                                    },
                                ]}
                            >
                                {"Supprimer"}
                            </Text>
                        </TouchableOpacity>
                    )}
                </>
            </View>
        </View>
    );
};

export default ClientsCard;
const styles = StyleSheet.create({
    //Vertical card
    PostCard: {
        borderRadius: 6,
        width: "100%",
        paddingBottom: 8,
        marginVertical: 5,
        rowGap: 10,
        elevation: 3,
        paddingVertical: 8,
        paddingHorizontal: 10,
        alignItems: "center",
    },

    ImagePost: {
        borderWidth: 1,
        borderColor: "#000",
        width: "100%",
        height: "100%",
    },
});
