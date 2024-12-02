import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

//Hooks and States
import useColorTheme from "../../../../hooks/useTheme";
import useCustomFont from "../../../../hooks/useCustomFont";
import useDate from "../../../../hooks/useDate";
import { DefaultPictures } from "../../../../State/Auth/User";

//Constants
const AppFont = useCustomFont();
const Notificationdatas = {
    cover: require("../../../../assets/adaptive-icon.png"),
    name: "Smart meter App",
};
import { NotificationsType } from "../../../../Constants/Types";
import { useRecoilValue } from "recoil";

interface datasVerticalCard {
    NotificationDatas: NotificationsType;
}
const NotificationCard = (datas: datasVerticalCard) => {
    //hooks
    const AppTheme = useColorTheme();
    const UseDate = useDate(datas.NotificationDatas.createAt);
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
                            datas.NotificationDatas.Dealer[0]
                                ? datas.NotificationDatas.Dealer[0].cover
                                    ? {
                                          uri: datas.NotificationDatas.Dealer[0]
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
                            flex: 1,
                            justifyContent: "center",
                            rowGap: 4,
                        },
                    ]}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            columnGap: 10,
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={[
                                {
                                    color: AppTheme.MainTextCards,
                                    textAlignVertical: "bottom",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    width: "auto",
                                },
                            ]}
                        >
                            {datas.NotificationDatas.Dealer[0]
                                ? `${datas.NotificationDatas.Dealer[0].fname} ${datas.NotificationDatas.Dealer[0].lname}`
                                : `${Notificationdatas.name}`}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={[
                                {
                                    fontFamily: AppFont.Regular,
                                    color: AppTheme.text,
                                    textAlign: "right",
                                    textAlignVertical: "bottom",
                                    fontSize: 11,
                                },
                            ]}
                        >
                            {UseDate.returnAdaptativeValue()}
                        </Text>
                    </View>

                    <Text
                        numberOfLines={3}
                        style={[
                            {
                                fontFamily: AppFont.Regular,
                                color: AppTheme.icon,
                                textAlignVertical: "top",
                                fontSize: 12,
                            },
                        ]}
                    >
                        {datas.NotificationDatas.message}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default NotificationCard;
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
