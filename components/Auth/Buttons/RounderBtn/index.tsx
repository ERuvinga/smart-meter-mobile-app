//Librairies
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

//Customs Hooks
import useColorTheme from "../../../../hooks/useTheme";
import useCustomFont from "../../../../hooks/useCustomFont";
import { LinearGradient } from "expo-linear-gradient";

interface BtnDatas {
    label: string | number;
    action: () => void;
    disabled: boolean;
    isLoading: boolean;
}

const RounderBtn = (datas: BtnDatas) => {
    const AppTheme = useColorTheme();
    const AppFont = useCustomFont();
    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.75, y: 0 }}
                colors={[AppTheme.main, AppTheme.blueMarine]}
                style={[
                    {
                        alignContent: "center",
                        justifyContent: "center",
                        paddingVertical: 10,
                        minHeight: 40,
                        borderRadius: 20,
                        opacity: datas.disabled ? 0.5 : 1,
                    },
                ]}
            >
                <TouchableOpacity
                    onPress={datas.action}
                    disabled={datas.disabled}
                    style={[
                        {
                            width: "100%",
                            columnGap: 2,
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center",
                        },
                    ]}
                >
                    {datas.isLoading && (
                        <View
                            style={{
                                alignItems: "center",
                                rowGap: 4,
                            }}
                        >
                            <ActivityIndicator
                                color={AppTheme.mainfade}
                                size={16}
                            />
                        </View>
                    )}
                    <Text
                        style={[
                            {
                                textAlignVertical: "center",
                                textAlign: "center",
                                fontFamily: AppFont.Regular,
                                color: AppTheme.mainfade,
                            },
                        ]}
                    >
                        {datas.label}
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

export default RounderBtn;
