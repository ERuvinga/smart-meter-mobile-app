import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

//Hooks
import useCustomFont from "../../../hooks/useCustomFont";
import useColorTheme from "../../../hooks/useTheme";
//import GlobalStyle from "../../../style/global";

//Icons
import {
    HomeIcon as OutlineHome,
    BellIcon as OutlineBell,
    UserCircleIcon as OutlineProfile,
    SquaresPlusIcon as OutlinePlus,
} from "react-native-heroicons/outline";
import {
    HomeIcon as SolidHome,
    BellIcon as SolidBell,
    UserCircleIcon as SolidProfile,
    SquaresPlusIcon as SolidPlus,
} from "react-native-heroicons/solid";

import { IconesValues } from "../../../Constants/Types";

// Icons In App With Notification
interface BadgeIconeDatas {
    withNumber: boolean;
    badgeNumber: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    iconValues: any;
    handleClick: () => void;
}

export const IconeWithBadge = (datas: BadgeIconeDatas) => {
    const AppFont = useCustomFont();
    const AppTheme = useColorTheme();
    const validNumber = datas.badgeNumber > 0;

    return (
        <TouchableOpacity
            onPress={datas.handleClick}
            style={styles.containerIconeAndBadge}
        >
            <>{datas.iconValues}</>
            <>
                {validNumber && (
                    <Animated.View
                        entering={FadeIn.delay(100).duration(1000)}
                        exiting={FadeIn.delay(100).duration(1000)}
                        style={[
                            { backgroundColor: AppTheme.main },
                            styles.BagdeIconWithText,
                        ]}
                    >
                        <Text
                            style={[
                                {
                                    color: AppTheme.bgColorBlocs,
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    fontFamily: AppFont.Bold,
                                    fontSize: 10,
                                },
                            ]}
                        >
                            {datas.badgeNumber}
                        </Text>
                    </Animated.View>
                )}
            </>
        </TouchableOpacity>
    );
};

//Badge for bottom TabBar
interface NotificationDatas {
    withNumber: boolean;
    badgeNumber: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    iconValues: string;
    isFocused: boolean;
}
export const BottomTabBarBadge = (datas: NotificationDatas) => {
    const AppTheme = useColorTheme();

    let IconeValue = <OutlineHome size={25} color={AppTheme.mainText1} />;

    switch (datas.iconValues) {
        case IconesValues.HOME: {
            IconeValue = datas.isFocused ? (
                <SolidHome size={22} color={AppTheme.main} />
            ) : (
                <OutlineHome size={22} color={AppTheme.mainText1} />
            );

            break;
        }
        case IconesValues.PLUS: {
            IconeValue = datas.isFocused ? (
                <SolidPlus size={22} color={AppTheme.main} />
            ) : (
                <OutlinePlus size={22} color={AppTheme.mainText1} />
            );

            break;
        }
        case IconesValues.NOTIFICATION: {
            IconeValue = datas.isFocused ? (
                <SolidBell size={22} color={AppTheme.main} />
            ) : (
                <OutlineBell size={22} color={AppTheme.mainText1} />
            );

            break;
        }

        case IconesValues.PROFILE: {
            IconeValue = datas.isFocused ? (
                <SolidProfile size={22} color={AppTheme.main} />
            ) : (
                <OutlineProfile size={22} color={AppTheme.mainText1} />
            );

            break;
        }
    }

    return (
        <View style={styles.containerNaverIconandBadge}>
            <>{IconeValue}</>
        </View>
    );
};

const styles = StyleSheet.create({
    containerIconeAndBadge: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        height: 33,
        width: 26,
    },
    BagdeIconWithText: {
        width: 14,
        height: 14,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -1,
        right: -1,
    },

    BadgeIconWithoutText: {
        width: 10,
        height: 10,
        borderRadius: 5,
        position: "absolute",
        top: 2,
        right: 2,
    },

    containerNaverIconandBadge: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },

    BagdeWithText: {
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -9,
        left: 10,
    },

    BadgeWithoutText: {
        width: 10,
        height: 10,
        borderRadius: 5,
        position: "absolute",
        top: -5,
        left: 12,
    },
});
