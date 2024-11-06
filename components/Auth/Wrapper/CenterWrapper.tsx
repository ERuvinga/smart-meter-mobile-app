import React from "react";
//Bottom Wrapper notification
import Animated, {
    FadeIn,
    FadeInUp,
    FadeOut,
    FadeOutUp,
} from "react-native-reanimated";

//Components, Recoil atoms
import { Modal, TouchableOpacity, View } from "react-native";
import StyleBar from "../../CommonComponents/statusBar";
import { useRecoilState } from "recoil";
import { CenterWrapperState } from "../../../State/Auth/Wrappers";

//Hooks
import useColorTheme from "../../../hooks/useTheme";

const CenterWrapper = () => {
    const AppTheme = useColorTheme();
    const [centerWrapperState, setCenterWrapper] =
        useRecoilState(CenterWrapperState);

    const HiddenModal = () => {
        setCenterWrapper({
            hidden: true,
            component: <></>,
        });
    };

    return (
        <>
            {centerWrapperState.hidden ? (
                <StyleBar
                    theme={{
                        barStyle: AppTheme.barStyle,
                        background: AppTheme.bgColorBlocs,
                    }}
                />
            ) : (
                <StyleBar
                    theme={{
                        barStyle: AppTheme.barStyle,
                        background: "rgba(17, 24, 28, .8)",
                    }}
                />
            )}

            <Modal transparent visible={!centerWrapperState.hidden}>
                <TouchableOpacity
                    onPress={HiddenModal}
                    style={[
                        {
                            width: "100%",
                            opacity: 0.6,
                        },
                    ]}
                >
                    <Animated.View
                        entering={FadeIn.duration(1000)}
                        exiting={FadeOut.duration(500)}
                        style={[
                            {
                                backgroundColor: "#11181C",
                                width: "100%",
                                height: "100%",
                            },
                        ]}
                    ></Animated.View>
                </TouchableOpacity>
                <View
                    style={[
                        {
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: 15,
                            position: "absolute",
                            top: 0,
                        },
                    ]}
                >
                    <Animated.View
                        entering={FadeInUp.duration(650).delay(500)}
                        exiting={FadeOutUp.duration(850)}
                        style={{
                            width: "100%",
                            backgroundColor: AppTheme.bgColorBlocs,

                            paddingHorizontal: 20,
                            alignItems: "center",
                            position: "absolute",

                            borderRadius: 10,
                            elevation: 5,
                        }}
                    >
                        <>{centerWrapperState.component}</>
                    </Animated.View>
                </View>
            </Modal>
        </>
    );
};

export default CenterWrapper;
