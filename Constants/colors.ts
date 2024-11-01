// Constants Manager themes and Colors in App
import { StatusBarStyle } from "react-native";

const StyleBarLight: StatusBarStyle | null | undefined = "dark-content";
const StyleBarDark: StatusBarStyle | null | undefined = "light-content";

export const Colors = {
    light: {
        main: "#227ABD",
        mainfade: "#EEF6FC",
        mainText1: "#9ba1a6",
        blueMarine: "#00bff3",
        secondText: "#0077a1",
        border: "#b6b5bc",
        text: "#11181C",
        background: "#f4f4f5",
        icon: "#687076",
        barStyle: StyleBarLight,
        indicator: "#9ba1a6",
        bgColorBlocs: "#f8f8f8",
        MainTextCards: "#11181C",
        successColor: "#00cc00",
        ErrorColor: "#cc0000",
    },
    dark: {
        main: "#227ABD",
        mainfade: "#ffebf5",
        mainText1: "#9ba1a6",
        blueMarine: "#00bff3",
        secondText: "#f4f4f5",
        border: "#9ba1a6",
        background: "#1c1f21",
        text: "#ffebf5",
        icon: "#9ba1a6",
        barStyle: StyleBarDark,
        indicator: "#ff2293",
        bgColorBlocs: "#262a2c",
        MainTextCards: "#b6b5bc",
        successColor: "#33ff33",
        ErrorColor: "#ff3333",
    },
};
