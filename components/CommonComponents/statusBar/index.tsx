import React from "react";
import { StatusBar, StatusBarStyle } from "react-native";

interface Theme {
    theme: {
        barStyle: StatusBarStyle | null | undefined;
        background: string;
    };
    hidden?: boolean;
}

const StyleBar = (datas: Theme) => {
    return (
        <StatusBar
            barStyle={datas.theme.barStyle}
            animated={true}
            backgroundColor={datas.theme.background}
            hidden={datas.hidden}
        />
    );
};

export default StyleBar;
