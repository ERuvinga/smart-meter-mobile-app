import React from "react";
import { Text, TouchableOpacity } from "react-native";

//Customs Hooks
import useCustomFont from "../../../../hooks/useCustomFont";
import useColorTheme from "../../../../hooks/useTheme";

interface itemDatas {
    label: string;
    //navigation: () => void;
    isUpdated: boolean;
    value: string | null;
}

const UserItemDatas = (datas: itemDatas) => {
    //states
    const AppTheme = useColorTheme();
    const AppFont = useCustomFont();

    return (
        <TouchableOpacity
            onPress={() => null}
            style={[
                {
                    width: "100%",
                    paddingVertical: 3,
                    rowGap: 2,
                    borderColor: AppTheme.background,
                    borderBottomWidth: 0.4,
                },
            ]}
        >
            <Text
                numberOfLines={1}
                style={[
                    {
                        flex: 1,
                        fontFamily: AppFont.Bold,
                        color: AppTheme.MainTextCards,
                        textAlignVertical: "center",
                    },
                ]}
            >
                {datas.label}
            </Text>

            <Text
                numberOfLines={2}
                style={[
                    {
                        fontFamily: AppFont.Light,
                        color: AppTheme.icon,
                        textAlignVertical: "center",
                        fontSize: 12,
                    },
                ]}
            >
                {datas.value}
            </Text>
        </TouchableOpacity>
    );
};

export default UserItemDatas;
