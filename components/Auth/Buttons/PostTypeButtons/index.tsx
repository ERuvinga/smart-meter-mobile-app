import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

//customs Hooks
import useColorTheme from "../../../../hooks/useTheme";
import useCustomFont from "../../../../hooks/useCustomFont";

//constants
interface btnDatas {
    //
    label: string;
    value: string;
    action: () => void;
    Selected: string;
}

const BtnOfPost_selected = (datas: btnDatas) => {
    const AppTheme = useColorTheme();
    const AppFont = useCustomFont();

    //atom
    const isSelected = datas.value == datas.Selected;

    return (
        <View>
            <TouchableOpacity
                onPress={datas.action}
                hitSlop={5}
                style={[
                    {
                        width: "auto",
                        height: 28,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 4,
                        paddingHorizontal: 12,
                        borderColor: isSelected
                            ? AppTheme.main
                            : AppTheme.mainText1,
                        borderWidth: 0.8,
                        elevation: isSelected ? 4 : 0,
                        backgroundColor: isSelected
                            ? AppTheme.main
                            : "transparent",
                    },
                ]}
            >
                <Text
                    style={{
                        color: isSelected
                            ? AppTheme.mainfade
                            : AppTheme.mainText1,
                        fontFamily: isSelected ? AppFont.Bold : AppFont.Regular,
                        fontSize: 12,
                    }}
                >
                    {datas.label}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default BtnOfPost_selected;
