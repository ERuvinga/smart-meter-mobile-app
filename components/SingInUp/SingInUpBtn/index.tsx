import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    View,
} from "react-native";

//Hooks
import useCustomFont from "../../../hooks/useCustomFont"; // custom fonts
import useColorTheme from "../../../hooks/useTheme"; // color Theme

interface btnDatas {
    value: string;
    handleFunction: () => void;
    isLoading: boolean;
    disabled: boolean;
    from?: string;
}

// constants
const FontApp = useCustomFont();

const SingInUpBtn = (datas: btnDatas) => {
    // states
    const AppTheme = useColorTheme();

    return (
        <View>
            <TouchableOpacity
                disabled={datas.disabled}
                style={[
                    {
                        backgroundColor: AppTheme.main,
                        alignContent: "center",
                        justifyContent: "center",
                        opacity: datas.disabled ? 0.5 : 1,
                    },
                    styles.Button,
                ]}
                onPress={datas.handleFunction}
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
                <Text style={[styles.TextButton, { color: AppTheme.mainfade }]}>
                    {datas.value}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerBtn: {
        fontFamily: FontApp.Regular,
    },

    Button: {
        paddingVertical: 10,
        minHeight: 40,
        borderRadius: 4,
        width: "100%",
        columnGap: 2,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },

    TextButton: {
        width: "auto",
        fontSize: 13,
        fontFamily: FontApp.Bold,
        textAlign: "center",
        textAlignVertical: "center",
    },

    indicator: {
        color: "#ff2293",
    },
});

export default SingInUpBtn;
