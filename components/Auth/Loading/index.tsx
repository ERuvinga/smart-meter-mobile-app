//React Tools
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

//customs Hooks and Tools
import useCustomFont from "../../../hooks/useCustomFont";
import useColorTheme from "../../../hooks/useTheme";

const LoadingComponent = () => {
    const AppFont = useCustomFont();
    const AppTheme = useColorTheme();

    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
            }}
        >
            <ActivityIndicator color={AppTheme.mainText1} size={18} />
            <Text
                style={{
                    fontFamily: AppFont.Light,
                    color: AppTheme.mainText1,
                    fontSize: 12,
                }}
            >
                Chargement ...
            </Text>
        </View>
    );
};

export default LoadingComponent;
