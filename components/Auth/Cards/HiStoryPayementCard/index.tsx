import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

//Hooks
import useColorTheme from "../../../../hooks/useTheme";
import useCustomFont from "../../../../hooks/useCustomFont";
import useDate from "../../../../hooks/useDate";

//Atoms and Recoil
import { DefaultPictures } from "../../../../State/Auth/User";
import { useRecoilValue } from "recoil";

//Constants
const AppFont = useCustomFont();

import { HistoryPayementType } from "../../../../Constants/Types";

interface datasVerticalCard {
    payementDatas: HistoryPayementType;
}

const Notificationdatas = {
    cover: require("../../../../assets/adaptive-icon.png"),
    name: "Smart meter App",
};
const HistoryPayementCard = (datas: datasVerticalCard) => {
    //hooks
    const AppTheme = useColorTheme();
    const UseDate = useDate(datas.payementDatas.createAt);
    const validClient = datas.payementDatas.client[0];
    const validImageClient = datas.payementDatas.client[0]
        ? datas.payementDatas.client[0].cover
            ? true
            : false
        : false;
    const validAdmin = datas.payementDatas.Admin[0];
    const DefaultImages = useRecoilValue(DefaultPictures);

    //handles
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const handleFecthingError = (Error: any) => {
    //     console.log(Error.response);
    // };

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const handleFecthingSuccess = (datas: any) => {
    //     console.log(datas);
    //     setCounterDatas(datas);
    // };

    //Hooks Query
    //const useFetchingMutation = useMutate();

    // const DeleteNotification = () => {
    //     console.log("deleNotification");

    //     //sending Datas
    //     useFetchingMutation.mutate({
    //         //Login
    //         methode: "DELETE",
    //         ApiLink: `${Api.LINK}`,
    //         EndPoint: `${Api.GET_NOTIFICATION}`,
    //         dataToSending: { id: datas.NotificationDatas._id },
    //         handleError: handleFecthingError,
    //         handleSuccess: handleFecthingSuccess,
    //     });
    // };

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
            <View
                style={[
                    {
                        width: "100%",
                        flexDirection: "row",
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
                            validClient
                                ? validImageClient
                                    ? {
                                          uri: datas.payementDatas.client[0]
                                              .cover,
                                      }
                                    : DefaultImages.User
                                : Notificationdatas.cover
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

                <View
                    style={[
                        {
                            justifyContent: "center",
                            rowGap: 5,
                            flex: 1,
                        },
                    ]}
                >
                    <View
                        style={[
                            {
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                columnGap: 5,
                                width: "100%",
                            },
                        ]}
                    >
                        <Text
                            numberOfLines={1}
                            style={[
                                {
                                    color: AppTheme.MainTextCards,
                                    textAlignVertical: "center",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                },
                            ]}
                        >
                            {validClient
                                ? `${datas.payementDatas.client[0].fname} ${datas.payementDatas.client[0].lname}`
                                : Notificationdatas.name}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={[
                                {
                                    fontFamily: AppFont.Regular,
                                    color: AppTheme.icon,
                                    textAlignVertical: "center",
                                    width: "auto",
                                    fontSize: 12,
                                },
                            ]}
                        >
                            {`${UseDate.returnAdaptativeValue()}`}
                        </Text>
                    </View>
                    <View style={[{ rowGap: 3 }]}>
                        <View style={{ flexDirection: "row", columnGap: 3 }}>
                            <Text
                                numberOfLines={1}
                                style={[
                                    {
                                        fontFamily: AppFont.Regular,
                                        color: AppTheme.icon,
                                        textAlignVertical: "center",
                                        width: "auto",
                                        fontSize: 12,
                                    },
                                ]}
                            >
                                {`Valeur payee : `}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={[
                                    {
                                        fontFamily: AppFont.Bold,
                                        color: AppTheme.text,
                                        textAlignVertical: "top",
                                        fontSize: 12,
                                    },
                                ]}
                            >
                                {`${datas.payementDatas.valuePayed} m3`}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", columnGap: 3 }}>
                            <Text
                                numberOfLines={1}
                                style={[
                                    {
                                        fontFamily: AppFont.Regular,
                                        color: AppTheme.icon,
                                        textAlignVertical: "center",
                                        width: "auto",
                                        fontSize: 12,
                                    },
                                ]}
                            >
                                {`Administrateur : `}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={[
                                    {
                                        fontFamily: AppFont.Bold,
                                        color: AppTheme.text,
                                        textAlignVertical: "top",
                                        fontSize: 12,
                                    },
                                ]}
                            >
                                {validAdmin
                                    ? `${datas.payementDatas.Admin[0].fname} ${datas.payementDatas.Admin[0].lname}`
                                    : "::Deleted User"}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", columnGap: 3 }}>
                            <Text
                                numberOfLines={1}
                                style={[
                                    {
                                        fontFamily: AppFont.Regular,
                                        color: AppTheme.icon,
                                        textAlignVertical: "center",
                                        width: "auto",
                                        fontSize: 12,
                                    },
                                ]}
                            >
                                {`Client : `}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={[
                                    {
                                        fontFamily: AppFont.Bold,
                                        color: AppTheme.text,
                                        textAlignVertical: "top",
                                        fontSize: 12,
                                    },
                                ]}
                            >
                                {validClient
                                    ? `${datas.payementDatas.client[0].email}`
                                    : "::Deleted user"}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default HistoryPayementCard;
const styles = StyleSheet.create({
    //Vertical card
    PostCard: {
        borderRadius: 6,
        width: "100%",
        paddingBottom: 8,
        marginVertical: 5,
        rowGap: 10,
        elevation: 2,
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
