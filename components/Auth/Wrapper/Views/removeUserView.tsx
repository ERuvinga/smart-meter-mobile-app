import React, { Dispatch, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

//Stores and Recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BottomState } from "../../../../State/Auth/Wrappers";

//Custom Hooks
import useColorTheme from "../../../../hooks/useTheme";
import useCustomFont from "../../../../hooks/useCustomFont";
import { DefaultPictures } from "../../../../State/Auth/User";
import { useMutate } from "../../../../hooks/useFetch";
import { API } from "../../../../State/Global";

//Privates Components
interface DeleteCardDatas {
    userDatas: {
        _id: string;
        name: string;
        email: string;
        img: string;
        successDeleteAction: Dispatch<React.SetStateAction<boolean>>;
    };
}

//Components displya in Remove View
const RemoveItemView = (datas: DeleteCardDatas) => {
    //states
    const [loading, setLoading] = useState(false);

    //Atoms
    const DefaultImages = useRecoilValue(DefaultPictures);
    const setBottomWrapper = useSetRecoilState(BottomState);
    const Api = useRecoilValue(API);

    // customs Hooks
    const useFetchingMutation = useMutate();
    const AppTheme = useColorTheme();
    const AppFont = useCustomFont();

    //Handles
    //handle manager Bottom Wrapper
    const hiddenWrapper = () => {
        setBottomWrapper({
            hidden: true,
            component: <></>,
        });
    };

    const succeFetching = () => {
        setLoading(false);
        hiddenWrapper();
        datas.userDatas.successDeleteAction(true);
    };

    const handleSuccess = () => {
        setLoading(true);
        useFetchingMutation.mutate({
            // Regiter
            methode: "DELETE",
            ApiLink: `${Api.LINK}`,
            EndPoint: `${Api.DELETE_USER}/${datas.userDatas._id}`,
            dataToSending: {},
            handleError: (error) => {
                setLoading(false);
                console.log(error.response);
            },
            handleSuccess: succeFetching,
        });
    };

    return (
        <View
            style={[
                {
                    width: "100%",
                    rowGap: 12,
                    alignItems: "center",
                    paddingBottom: 10,
                },
            ]}
        >
            <>
                {loading ? (
                    <ActivityIndicator color={AppTheme.mainText1} size={16} />
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
                        Effacer l&apos;utilisateur?
                    </Text>
                )}
            </>

            <Animated.View
                entering={FadeIn.duration(800).delay(120)}
                style={{ elevation: 2 }}
            >
                <View
                    style={[
                        {
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        },
                    ]}
                >
                    <View
                        style={[
                            {
                                flex: 1,
                                columnGap: 5,
                                alignItems: "center",
                                justifyContent: "center",
                            },
                        ]}
                    >
                        <View
                            style={{
                                width: 40,
                                height: 40,
                            }}
                        >
                            <Image
                                source={
                                    datas.userDatas.img
                                        ? { uri: datas.userDatas.img }
                                        : DefaultImages.User
                                }
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                resizeMode="cover"
                                borderRadius={20}
                            />
                        </View>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                numberOfLines={1}
                                style={[
                                    {
                                        fontFamily: AppFont.Bold,
                                        color: AppTheme.MainTextCards,
                                        fontSize: 12,
                                        textAlignVertical: "center",
                                        textAlign: "center",
                                    },
                                ]}
                            >
                                {datas.userDatas.name}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={[
                                    {
                                        fontFamily: AppFont.Regular,
                                        color: AppTheme.mainText1,
                                        fontSize: 10,
                                        textAlignVertical: "center",
                                        textAlign: "center",
                                    },
                                ]}
                            >
                                {datas.userDatas.email}
                            </Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
            <View
                style={[
                    {
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                        columnGap: 12,
                    },
                ]}
            >
                <TouchableOpacity
                    onPress={hiddenWrapper}
                    style={[
                        {
                            paddingVertical: 8,
                            paddingHorizontal: "10%",
                            borderRadius: 20,
                            borderWidth: 0.5,
                            borderColor: AppTheme.mainText1,
                        },
                    ]}
                >
                    <Text
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
                    onPress={handleSuccess}
                    style={[
                        {
                            paddingVertical: 8,
                            paddingHorizontal: "10%",
                            borderRadius: 20,
                            backgroundColor: AppTheme.main,
                            elevation: 2,
                        },
                    ]}
                >
                    <Text
                        style={[
                            {
                                fontFamily: AppFont.Bold,
                                color: AppTheme.mainfade,
                                textAlignVertical: "center",
                            },
                        ]}
                    >
                        Oui, Effacer
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RemoveItemView;
