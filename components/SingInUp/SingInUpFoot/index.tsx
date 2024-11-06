import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface btnDatas {
    MessageText: string;
    LabelLink: string;
    goToLink: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setNavigation: any;
}
// hooks

import useCustomFont from "../../../hooks/useCustomFont";
import useColorTheme from "../../../hooks/useTheme";

// constants
const FontApp = useCustomFont();

const SingInUpFooter = (datas: btnDatas) => {
    //states
    const ThemeApp = useColorTheme();
    return (
        <Animated.View
            style={styles.Container}
            entering={FadeInDown.delay(200).duration(1000)}
        >
            <Text style={[styles.Message, { color: ThemeApp.MainTextCards }]}>
                {datas.MessageText}
            </Text>
            <TouchableOpacity
                hitSlop={5}
                onPress={() => datas.setNavigation(datas.goToLink)}
            >
                <Text style={[styles.TextButton, { color: ThemeApp.main }]}>
                    {datas.LabelLink}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 5,
    },

    Message: {
        fontFamily: FontApp.Light,
        fontSize: 11,
        textAlignVertical: "center",
    },

    TextButton: {
        width: "auto",
        fontSize: 11,
        fontFamily: FontApp.Bold,
        textAlign: "center",
        verticalAlign: "middle",
    },
});

export default SingInUpFooter;
