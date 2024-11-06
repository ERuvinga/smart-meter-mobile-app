// navigation bar
import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Keyboard,
} from "react-native";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

//components and Hooks
import useColorTheme from "../../../../hooks/useTheme";
import useCustomFont from "../../../../hooks/useCustomFont";
import { BottomTabBarBadge } from "../../NotificationBadge";

//Recoil Atoms and functions
import { useRecoilValue } from "recoil";
import { DealerNavBarState } from "../../../../State/Auth/TabBar/users";

const NavBar = (TabBarDatas: MaterialTopTabBarProps) => {
    //hooks
    const AppTheme = useColorTheme();
    const AppFont = useCustomFont();
    const [DisplayKeyWord, setDisplayKeyWord] = useState(false);
    //states
    const navBarTabValues = useRecoilValue(DealerNavBarState);
    useEffect(() => {
        //keyBoard Follow events
        const SubscriptionShowKeyBoard = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setDisplayKeyWord(true);
            }
        );

        const SubscriptionHideKeyBoard = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setDisplayKeyWord(false);
            }
        );

        return () => {
            SubscriptionShowKeyBoard.remove();
            SubscriptionHideKeyBoard.remove();
        };
    }, []);

    return (
        <>
            {DisplayKeyWord ? null : (
                <View
                    style={[
                        Styles.container,
                        {
                            borderTopColor: AppTheme.border,
                            backgroundColor: AppTheme.bgColorBlocs,
                        },
                    ]}
                >
                    {TabBarDatas.state.routes.map((route, index) => {
                        //constants
                        const item = navBarTabValues[index];
                        const isFocused = TabBarDatas.state.index == index;

                        const handleBtnClick = () => {
                            const event = TabBarDatas.navigation.emit({
                                type: "tabPress",
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                TabBarDatas.navigation.navigate(route.name);
                            }
                        };

                        return (
                            <View key={`${item.label}_${index}`}>
                                <TouchableOpacity
                                    onPress={handleBtnClick}
                                    style={{
                                        alignItems: "center",
                                        rowGap: 1,
                                        justifyContent: "center",
                                    }}
                                >
                                    <View>
                                        <>
                                            <BottomTabBarBadge
                                                iconValues={item.Icon}
                                                badgeNumber={0}
                                                withNumber={item.BadgeText}
                                                isFocused={isFocused}
                                            />
                                        </>
                                    </View>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontFamily: AppFont.Regular,
                                            fontSize: 11,
                                            color: isFocused
                                                ? AppTheme.main
                                                : AppTheme.mainText1,
                                            textAlign: "center",
                                            textAlignVertical: "center",
                                        }}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            )}
        </>
    );
};

export default NavBar;

const Styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        paddingHorizontal: 60,
        paddingVertical: 4,
        justifyContent: "space-between",
        alignContent: "center",
        elevation: 22,
    },

    IconContainer: {
        position: "relative",
    },
});
