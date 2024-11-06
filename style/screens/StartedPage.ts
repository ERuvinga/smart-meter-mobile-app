import { StyleSheet } from "react-native";
import useCustomFont from "../../hooks/useCustomFont";

// Font in App
const AppFont = useCustomFont();

const StartPageStyles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        paddingTop: "25%",
        alignItems: "center",
        rowGap: 15,
    },

    HeadText: {
        fontFamily: AppFont.Bold,
        fontSize: 32,
        marginHorizontal: 20,
    },

    DescriptionText: {
        fontFamily: AppFont.Regular,
        fontSize: 16,
        marginHorizontal: 20,
    },

    ContainerTimeLine: {
        width: "100%",
        minHeight: "100%",
        flex: 1,
    },

    line: {
        width: 0.5,
        height: 120,
        left: 20,
        zIndex: 0,
    },

    blocConfig: {
        width: "60%",
        height: 100,
        borderRadius: 4,
        borderWidth: 0.5,
        left: 50,
    },

    // Footer navigation
    ContainerFooterBtns: {
        width: "95%",
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        bottom: 10,
    },

    FooterBtns: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 5,
    },
    FooterBtnsText: {
        fontFamily: AppFont.Bold,
    },
});

export default StartPageStyles;
