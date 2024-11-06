import React from "react";
//Bottom Wrapper notification
import Animated, {
    FadeIn,
    FadeInDown,
    FadeOut,
    FadeOutDown,
} from "react-native-reanimated";

//Components, Recoil atoms
import { View } from "react-native";
import { useRecoilValue } from "recoil";
import { BottomState } from "../../../State/Auth/Wrappers";

//Hooks
import useColorTheme from "../../../hooks/useTheme";

const BottomWrapper = () => {
    const AppTheme = useColorTheme();
    const BottomsDatas = useRecoilValue(BottomState);

    return BottomsDatas.hidden ? null : (
        <View
            style={[
                {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                },
            ]}
        >
            <View
                style={[
                    {
                        backgroundColor: "rgba(17, 24, 28, .5)",
                        width: "100%",
                        height: "100%",
                        opacity: 0.4,
                    },
                ]}
            >
                <Animated.View
                    entering={FadeIn.duration(800)}
                    exiting={FadeOut.duration(300)}
                    style={[
                        {
                            backgroundColor: AppTheme.background,
                            width: "100%",
                            height: "100%",
                        },
                    ]}
                ></Animated.View>
            </View>
            <Animated.View
                entering={FadeInDown.duration(250)}
                exiting={FadeOutDown.duration(250).delay(50)}
                style={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: AppTheme.bgColorBlocs,

                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    paddingHorizontal: 20,
                    alignItems: "center",

                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    elevation: 5,
                }}
            >
                <View
                    style={{
                        borderWidth: 1,
                        paddingVertical: 1,
                        borderColor: AppTheme.mainText1,
                        borderRadius: 15,
                        width: 80,
                        marginVertical: 4,
                        opacity: 0.3,
                    }}
                ></View>
                <>{BottomsDatas.component}</>
            </Animated.View>
        </View>
    );
};

export default BottomWrapper;
