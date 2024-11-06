//style for SignIn-Up, Forgot, Otp, ResetPassword and Success Page

import { StyleSheet } from "react-native";
import useCustomFont from "../../hooks/useCustomFont";

// config App
const AppFont = useCustomFont();

const SignInUpStyle = StyleSheet.create({
    Container: {
        width: "100%",
        paddingHorizontal: 20,
        rowGap: 15,
        justifyContent: "center",
        flexGrow: 1,
    },

    HeadView: {
        width: "100%",
        rowGap: 5,
    },

    TitleText: {
        fontFamily: AppFont.Bold,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 25,
    },

    GreetText: {
        fontFamily: AppFont.Regular,
        textAlign: "center",
        textAlignVertical: "center",
    },

    FormInput: {
        marginHorizontal: "auto",
        width: "100%",
        rowGap: 10,
    },

    SendForgotBtn: {
        width: "100%",
        rowGap: 15,
    },

    SendAgreeTermsBtn: {
        width: "100%",
        rowGap: 15,
    },

    BtnsContainer: {
        width: "100%",
        alignItems: "center",
    },

    ForgotPassWord: {
        fontFamily: AppFont.Bold,
        textAlign: "center",
        textAlignVertical: "center",
        width: "auto",
        fontSize: 11,
        textDecorationLine: "underline",
    },
});
export default SignInUpStyle;
