import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

//Custom Hooks
import useColorTheme from "../../../hooks/useTheme";
import useCustomFont from "../../../hooks/useCustomFont";

//Recoil and Atoms
import { useRecoilState } from "recoil";
import { MsgServerState } from "../../../State/SignInUpDatas";

//Components

interface AlertDatas {
    top: number;
    timer: number;
}

const ErrorServerMsgCard = (datas: AlertDatas) => {
    //Hooks
    const AppFont = useCustomFont();
    const AppTheme = useColorTheme();

    //state
    const [StateOfMesaage, setStateOfMessage] = useRecoilState(MsgServerState);

    useEffect(() => {
        if (!StateOfMesaage.hidden) {
            setTimeout(() => {
                setStateOfMessage({
                    message: "Nothing",
                    hidden: true,
                });
            }, datas.timer);
        }
    }, [StateOfMesaage]);
    return (
        <>
            {StateOfMesaage.hidden ? null : (
                <View
                    style={[
                        {
                            flexDirection: "row",
                            position: "absolute",
                            top: datas.top,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 200,
                        },
                    ]}
                >
                    <Animated.View
                        entering={FadeInUp.duration(1000)}
                        exiting={FadeOutUp.duration(700)}
                        style={[
                            {
                                width: "auto",
                                minHeight: 35,
                                flexDirection: "row",
                                justifyContent: "center",
                                columnGap: 4,
                                paddingVertical: 5,
                                paddingHorizontal: 20,
                                backgroundColor: AppTheme.ErrorColor,

                                borderRadius: 4,

                                marginVertical: 5,
                                borderColor: AppTheme.ErrorColor,
                                elevation: 2,
                                maxWidth: "95%",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                {
                                    paddingVertical: 4,
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    fontFamily: AppFont.Light,
                                    color: AppTheme.mainfade,
                                    fontSize: 11,
                                },
                            ]}
                        >
                            {StateOfMesaage.message}
                        </Text>
                    </Animated.View>
                </View>
            )}
        </>
    );
};

export default ErrorServerMsgCard;
