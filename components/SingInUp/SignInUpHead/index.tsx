import React from "react";
import { View, Image } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const SignInUpHead = () => {
    return (
        <Animated.View
            entering={FadeIn.delay(100).duration(400)}
            style={[
                {
                    alignItems: "center",
                },
            ]}
        >
            <View style={[{ width: 130, height: 110 }]}>
                <Image
                    style={{ width: "100%", height: "100%" }}
                    source={require("../../../assets/images/logo.png")}
                />
            </View>
        </Animated.View>
    );
};

export default SignInUpHead;
