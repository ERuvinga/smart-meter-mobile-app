//import React tools and style
import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";

//Hooks and Atoms Recoil
import useColorTheme from "../../../hooks/useTheme";
import useCustomFont from "../../../hooks/useCustomFont";
import { useMutate } from "../../../hooks/useFetch";
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";
import {
    ActiveAccountDatas,
    ActivateAccountDatas,
    MsgServerState,
    SuccessAlerteState,
} from "../../../State/SignInUpDatas";
import { API } from "../../../State/Global";

//Components
import ErrorServerMsgCard from "../../../components/SingInUp/MessageServer";
import SuccessAlerte from "../../../components/SingInUp/SuccessAlerte";
import SingInUpBtn from "../../../components/SingInUp/SingInUpBtn";
import BackButton from "../../../components/Auth/Buttons/BtnBack";
import StyleBar from "../../../components/CommonComponents/statusBar";

//Tools and Styles
import SignInUpStyle from "../../../style/screens/SignIUpStyle";
import { RootStackParamList, Routes } from "../../../hooks/useNavigation";
const AppFont = useCustomFont();

//Constantes
type navigationProps = NativeStackScreenProps<RootStackParamList>;

const OTPScreen = ({ navigation }: navigationProps) => {
    //states
    const [loading, setLoading] = useState(false);
    const [ResendCodeLoading, setResendCodeLoading] = useState(false);
    const [NewPwdData, setNewPwdData] = useRecoilState(ActivateAccountDatas);
    const Api = useRecoilValue(API);
    const Insets = useSafeAreaInsets();
    const AppTheme = useColorTheme();

    //Server Response State
    const SetServerMessageDisplay = useSetRecoilState(MsgServerState);
    const SetSuccessAlerteDisplay = useSetRecoilState(SuccessAlerteState);

    //Reset States
    const SetResetActivateDatas = useResetRecoilState(ActiveAccountDatas);
    const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);

    // Get new Code Querry Hooks
    const useForgotFetchingQuerryResendCode = useMutate();
    const useSendCode = useMutate();

    const ResetForgotDatasStates = () => {
        // Resets All States
        SetResetActivateDatas();
        SetResetMsgOfServerStates();
        setNewPwdData({ ...NewPwdData, code: "" });
    };

    const handleBackBtn = () => {
        // back button press manager Function
        ResetForgotDatasStates(); // Reset Datas and Go Back
        navigation.goBack();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleErrorFeching = (errorDatas: any) => {
        //Manage Erros
        console.log(errorDatas.response);
        setLoading(false);
        SetServerMessageDisplay({
            hidden: false,
            message: "Activation Echouée, code invalide",
        });
    };

    const handleSuccess = () => {
        setLoading(false);
        //Reset States
        SetResetMsgOfServerStates();
        // go to Config page
        navigation.replace(Routes.NEWPASSWORD);
    };

    const handleSuccessGettingNewCode = () => {
        setResendCodeLoading(false);
        //Succefully Action
        SetSuccessAlerteDisplay({
            hidden: false,
            message: `Code renvoyé avec Succès`,
        });
    };

    // send Data function
    const handleClik = () => {
        setLoading(true);
        console.log(NewPwdData);

        // send datas  of datas
        useSendCode.mutate({
            ApiLink: `${Api.LINK}`,
            EndPoint: `${Api.REGISTER_VERIFI_CODE}`,
            methode: "POST",
            dataToSending: { Token: NewPwdData.code, email: NewPwdData.email },
            handleError: handleErrorFeching,
            handleSuccess: handleSuccess,
        });
    };

    // handle get new code
    const GetNewCode = () => {
        setResendCodeLoading(true); //Display Loader

        console.log(NewPwdData);
        useForgotFetchingQuerryResendCode.mutate({
            ApiLink: `${Api.LINK}`,
            EndPoint: `${Api.GET_OTP}`,
            methode: "POST",
            dataToSending: { email: NewPwdData.email },
            handleError: (error) => console.log(error),
            handleSuccess: handleSuccessGettingNewCode,
        });
    };

    const handleOTPValue = (valueChanged: string) => {
        console.log(valueChanged);
        setNewPwdData({
            ...NewPwdData,
            code: valueChanged,
        });
    };

    return (
        <View style={[{ flex: 1, backgroundColor: AppTheme.background }]}>
            <View
                style={[
                    {
                        marginVertical: 15,
                        marginHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                    },
                ]}
            >
                <BackButton setNavigation={handleBackBtn} />
            </View>
            <ErrorServerMsgCard top={10} timer={6500} />
            <SuccessAlerte top={10} timer={6000} />

            <KeyboardAwareScrollView
                contentContainerStyle={[
                    SignInUpStyle.Container,
                    {
                        backgroundColor: AppTheme.background,
                        marginTop: Insets.top,
                        marginBottom: Insets.bottom,
                        rowGap: 20,
                    },
                ]}
                enableOnAndroid={true}
            >
                <StyleBar
                    theme={{
                        barStyle: AppTheme.barStyle,
                        background: AppTheme.background,
                    }}
                />

                <View style={SignInUpStyle.HeadView}>
                    <Animated.View
                        entering={FadeIn.duration(500)}
                        style={{ alignItems: "center" }}
                    >
                        <Text
                            style={{
                                color: AppTheme.MainTextCards,
                                fontFamily: AppFont.Light,
                                textAlign: "center",
                                textAlignVertical: "center",
                                fontSize: 11,
                            }}
                        >
                            tapez le code disponible dans votre boite mail!
                        </Text>
                    </Animated.View>
                </View>

                <OtpInput
                    numberOfDigits={6}
                    textInputProps={{ inputMode: "text" }}
                    onTextChange={(value) => handleOTPValue(value)}
                    theme={{
                        pinCodeTextStyle: {
                            fontFamily: AppFont.Medium,
                            color: AppTheme.main,
                            fontSize: 14,
                        },
                        pinCodeContainerStyle: {
                            borderColor: AppTheme.mainText1,
                            borderRadius: 8,
                            borderWidth: 1,
                            height: 50,
                        },
                        filledPinCodeContainerStyle: {
                            borderColor: AppTheme.main,
                        },
                        focusStickStyle: {
                            backgroundColor: AppTheme.mainText1,
                            height: 15,
                            width: 2,
                        },
                        focusedPinCodeContainerStyle: {
                            borderColor: AppTheme.main,
                        },
                    }}
                />
                <View style={styles.ResendBloc}>
                    <Text
                        style={{
                            color: AppTheme.mainText1,
                            fontFamily: AppFont.Regular,
                            fontSize: 11,
                        }}
                    >
                        je n&apos;ai pas reçu le code
                    </Text>
                    <>
                        {ResendCodeLoading ? (
                            <ActivityIndicator
                                color={AppTheme.mainText1}
                                size={14}
                            />
                        ) : (
                            <TouchableOpacity
                                onPress={GetNewCode}
                                hitSlop={{ left: 10, top: 15, right: 10 }}
                            >
                                <Text
                                    style={{
                                        color: AppTheme.main,
                                        fontFamily: AppFont.Light,
                                        textDecorationLine: "underline",
                                        fontSize: 13,
                                    }}
                                >
                                    Renvoyez
                                </Text>
                            </TouchableOpacity>
                        )}
                    </>
                </View>
                <View style={SignInUpStyle.SendForgotBtn}>
                    <SingInUpBtn
                        value="Envoyer"
                        isLoading={loading}
                        handleFunction={handleClik}
                        disabled={
                            NewPwdData.code == "" || NewPwdData.code.length < 6
                        }
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default OTPScreen;

const styles = StyleSheet.create({
    ResendBloc: {
        columnGap: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    textInputStyle: {
        width: "15%",
        padding: 0,
        margin: 0,

        borderWidth: 1,
        borderRadius: 6,
        borderBottomWidth: 1,
    },
});
