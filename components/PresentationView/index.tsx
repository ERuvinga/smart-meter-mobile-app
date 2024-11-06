// components and styles
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageProps,
} from "react-native";

import Animated, { FadeInRight } from "react-native-reanimated";
import { Dimensions } from "react-native";
// Hooks
import useColorTheme from "../../hooks/useTheme";
import useCustomFont from "../../hooks/useCustomFont";

// datas in App
const AppFont = useCustomFont();
interface dataOfCard {
    linkToimage: ImageProps;
    mainText: string;
    descriptionText: string;
    goTo: () => void;
}

const { width } = Dimensions.get("screen");

const PresentationView = (datas: dataOfCard) => {
    //states and RNAnimated value
    const AppTheme = useColorTheme(); // theme of App

    return (
        <View style={[styles.ContainerCard]}>
            <View style={[styles.ContainerIllustration]}>
                <Animated.Image
                    entering={FadeInRight.duration(1200)}
                    source={datas.linkToimage}
                    resizeMode="center"
                    style={[styles.Illustration]}
                />
            </View>
            <View style={[styles.ContainerText]}>
                <Animated.Text
                    entering={FadeInRight.duration(1200).delay(200)}
                    style={[
                        {
                            color: AppTheme.main,
                            fontFamily: AppFont.Bold,
                            fontSize: 23,
                            textAlignVertical: "center",
                        },
                    ]}
                >
                    {datas.mainText}
                </Animated.Text>
                <Animated.Text
                    entering={FadeInRight.duration(1200).delay(400)}
                    style={[
                        {
                            color: AppTheme.mainText1,
                            fontFamily: AppFont.Light,
                            textAlignVertical: "center",
                            fontSize: 12,
                        },
                    ]}
                >
                    {datas.descriptionText}
                </Animated.Text>
                <Animated.View entering={FadeInRight.duration(1200).delay(600)}>
                    <TouchableOpacity
                        style={[
                            {
                                alignContent: "center",
                                justifyContent: "center",
                                paddingVertical: 10,
                                marginTop: 10,
                                borderRadius: 20,
                                backgroundColor: AppTheme.main,
                            },
                        ]}
                        onPress={datas.goTo}
                    >
                        <Text
                            style={[
                                {
                                    color: AppTheme.mainfade,
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    fontFamily: AppFont.Regular,
                                },
                            ]}
                        >
                            Commencez
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ContainerCard: {
        width,
        height: "100%",
        flex: 1,
    },

    ContainerIllustration: {
        width: "100%",
        maxHeight: "70%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },

    Illustration: {
        width: "90%",
        height: "85%",
    },

    ContainerText: {
        rowGap: 8,
        paddingHorizontal: "5%",
        paddingBottom: 30,
    },

    MainTextColor: {
        color: "#ff2293",
    },

    //started Page

    StartedIllustration: {
        width: "90%",
        height: "80%",
    },
});
export default PresentationView;
