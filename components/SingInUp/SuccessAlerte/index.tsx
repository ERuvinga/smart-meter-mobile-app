import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

//Custom Hooks
import useColorTheme from "../../../hooks/useTheme";
import useCustomFont from "../../../hooks/useCustomFont";

//Recoil and Atoms
import { useRecoilState } from "recoil";
import { SuccessAlerteState } from "../../../State/SignInUpDatas";

//Components
import { CheckCircleIcon } from "react-native-heroicons/solid";

interface AlertDatas {
    top: number;
    timer: number;
}

const SuccessAlerte = (datas: AlertDatas) => {
    //Hooks
    const AppFont = useCustomFont();
    const AppTheme = useColorTheme();

    //state
    const [StateOfMesaage, setStateOfMessage] =
        useRecoilState(SuccessAlerteState);

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
                            zIndex: 20,
                        },
                    ]}
                >
                    <Animated.View
                        entering={FadeInUp.duration(1000)}
                        exiting={FadeOutUp.duration(1000)}
                        style={[
                            {
                                width: "auto",
                                maxWidth: "80%",
                                minHeight: 35,

                                flexDirection: "row",
                                justifyContent: "center",
                                alignContent: "center",
                                columnGap: 4,
                                paddingHorizontal: "5%",
                                backgroundColor: AppTheme.successColor,

                                borderRadius: 5,
                                borderColor: AppTheme.ErrorColor,
                            },
                        ]}
                    >
                        <View
                            style={[
                                {
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                            ]}
                        >
                            <CheckCircleIcon
                                size={20}
                                color={AppTheme.mainfade}
                            />
                        </View>

                        <Text
                            style={[
                                {
                                    paddingVertical: 4,
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    fontFamily: AppFont.Regular,
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

export default SuccessAlerte;
