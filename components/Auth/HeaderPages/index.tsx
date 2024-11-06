//import React tools and style
import React from "react";
import { View, Text } from "react-native";

// Components and Hooks
import BackButton from "../../../components/Auth/Buttons/BtnBack";
import useColorTheme from "../../../hooks/useTheme";
import useCustomFont from "../../../hooks/useCustomFont";

//Constantes

interface HeaderDatas {
    TitleScreen: string;
    HiddenTitle: boolean;
    goBack: () => void;
}
const HeaderScreens = (datas: HeaderDatas) => {
    //states
    const AppTheme = useColorTheme();
    const AppFont = useCustomFont();

    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: datas.HiddenTitle ? "flex-start" : "center",
                    paddingVertical: 20,
                    paddingHorizontal: "4%",
                },
            ]}
        >
            <View
                style={{
                    position: datas.HiddenTitle ? "relative" : "absolute",
                    left: "4%",
                }}
            >
                <BackButton setNavigation={datas.goBack} />
            </View>
            <>
                {datas.HiddenTitle ? null : (
                    <Text
                        style={[
                            {
                                fontFamily: AppFont.Bold,
                                fontSize: 16,
                                color: AppTheme.mainText,
                            },
                        ]}
                    >
                        {datas.TitleScreen}
                    </Text>
                )}
            </>
        </View>
    );
};

export default HeaderScreens;

// const Styles = StyleSheet.create({
//     Container: {
//         flex: 1,
//     },
// });
