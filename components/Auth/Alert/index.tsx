import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

//Atoms and Recoil
import { useRecoilState } from "recoil";
import { AlerteState } from "../../../State/Auth/Wrappers";

//Hooks
import useColorTheme from "../../../hooks/useTheme";
import useCustomFont from "../../../hooks/useCustomFont";

//Icons
import { InformationCircleIcon } from "react-native-heroicons/outline";

//Alert Component
interface AlertDatas {
    top: number;
    timer: number;
}

const AppAlert = (datas: AlertDatas) => {
    //states
    const [StateOfAlert, setStateOfAlert] = useRecoilState(AlerteState);
    const AppTheme = useColorTheme();
    const AppFont = useCustomFont();

    useEffect(() => {
        if (!StateOfAlert.hidden) {
            setTimeout(() => {
                setStateOfAlert({
                    Product: "Nothing",
                    message: "Nothing",
                    hidden: true,
                    isSuccess: true,
                    action: "",
                });
            }, datas.timer);
        }
    }, [StateOfAlert]);
    return (
        <>
            {StateOfAlert.hidden ? null : (
                <Animated.View
                    entering={FadeInUp.duration(600)}
                    exiting={FadeOutUp.duration(1000).delay(200)}
                    style={[
                        {
                            position: "absolute",
                            top: datas.top,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 2,
                        },
                    ]}
                >
                    <View
                        style={[
                            {
                                flexDirection: "row",
                                columnGap: 3,
                                paddingVertical: 5,
                                paddingHorizontal: 8,
                                backgroundColor: AppTheme.bgColorBlocs,

                                borderRadius: 3,

                                marginVertical: 5,
                                borderColor: AppTheme.mainText1,
                                borderWidth: 0.5,
                                elevation: 4,
                            },
                        ]}
                    >
                        <InformationCircleIcon
                            size={18}
                            color={
                                StateOfAlert.isSuccess
                                    ? AppTheme.successColor
                                    : AppTheme.ErrorColor
                            }
                        />

                        <View
                            style={[
                                {
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    columnGap: 3,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    {
                                        textAlignVertical: "center",
                                        fontFamily: AppFont.Bold,
                                        color: StateOfAlert.isSuccess
                                            ? AppTheme.successColor
                                            : AppTheme.ErrorColor,
                                        fontSize: 11,
                                    },
                                ]}
                            >
                                {StateOfAlert.action}
                            </Text>
                            <Text
                                style={[
                                    {
                                        textAlignVertical: "center",
                                        fontFamily: AppFont.Bold,
                                        color: AppTheme.MainTextCards,
                                        fontSize: 11,
                                    },
                                ]}
                            >
                                {StateOfAlert.Product}
                            </Text>
                            <Text
                                style={[
                                    {
                                        textAlignVertical: "center",
                                        fontFamily: AppFont.Regular,
                                        color: AppTheme.mainText1,
                                        fontSize: 11,
                                    },
                                ]}
                            >
                                {StateOfAlert.message}
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            )}
        </>
    );
};

export default AppAlert;
