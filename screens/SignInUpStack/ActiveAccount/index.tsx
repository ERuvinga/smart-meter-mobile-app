//import React tools and style
import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Hooks and Atoms Recoil
import useColorTheme from "../../../hooks/useTheme";
import useEmail from "../../../hooks/useEmail";
import { useMutate } from "../../../hooks/useFetch";
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";
import {
    errorLogRegisterForm,
    ActivateAccountDatas,
    MsgServerState,
} from "../../../State/SignInUpDatas";
import { API } from "../../../State/Global";

//Components
import ErrorServerMsgCard from "../../../components/SingInUp/MessageServer";
import SingInUpInput from "../../../components/SingInUp/SingInUpInput";
import SingInUpBtn from "../../../components/SingInUp/SingInUpBtn";
import BackButton from "../../../components/Auth/Buttons/BtnBack";
import StyleBar from "../../../components/CommonComponents/statusBar";

//Tools and Styles
import SignInUpStyle from "../../../style/screens/SignIUpStyle";
import { ValidatesDatasErrors } from "../../../Constants/Types";
import { RootStackParamList, Routes } from "../../../hooks/useNavigation";

//Constantes
type navigationProps = NativeStackScreenProps<RootStackParamList>;

const ActiveAccountScreen = ({ navigation }: navigationProps) => {
    //states
    const AppTheme = useColorTheme();
    const ActiveAccountDatas = useRecoilValue(ActivateAccountDatas);
    const Api = useRecoilValue(API);
    const Insets = useSafeAreaInsets();
    const [isLoading, setLoading] = useState(false);
    const [valideDatasStates, setvalideDatasStates] =
        useRecoilState(errorLogRegisterForm);

    //Errors datas
    const SetServerMessageDisplay = useSetRecoilState(MsgServerState);
    const [GlobalError, setGlobalError] = useState(false);

    //Reset States
    const SetResetForgotDatas = useResetRecoilState(ActivateAccountDatas);
    const SetResetErrosField = useResetRecoilState(errorLogRegisterForm);
    const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);
    // Handles, fetching => to send code via Email
    const ResetAllState = () => {
        // Resets All States
        SetResetForgotDatas();
        SetResetErrosField();
        SetResetMsgOfServerStates();
    };

    const ResetForgotStates = () => {
        SetResetMsgOfServerStates();
        SetResetErrosField();
    };

    const handleBackBtn = () => {
        // back button press manager Function
        ResetAllState(); // Reset Datas and Go Back
        navigation.goBack();
    };
    const CheckingEmail = (email: string) => {
        const useMail = useEmail(email);
        return useMail.isValid(); // return Boolean, true if email is valid and False if email is not valide
    };

    //HANDLES FOR RESPONSE API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleErrorFeching = (error: any) => {
        setLoading(false);
        setGlobalError(true);
        SetServerMessageDisplay({
            hidden: false,
            message: error.response.data.msg,
        });
    };

    const handleSuccess = () => {
        ResetForgotStates(); // Reset Errors Field
        setLoading(false);

        // go to otp screen
        console.log("success");
        navigation.replace(Routes.OTP);
    };

    //hooks To fetching datas
    const useFetchingMutation = useMutate();

    // send Data function
    const SendEmail = () => {
        if (CheckingEmail(ActiveAccountDatas.email)) {
            // if emai, user is Valid ,
            SetResetErrosField();
            setLoading(true);

            //Seding Email
            useFetchingMutation.mutate({
                //Login
                methode: "POST",
                ApiLink: `${Api.LINK}`,
                EndPoint: `${Api.GET_OTP}`,
                dataToSending: { email: ActiveAccountDatas.email },
                handleError: handleErrorFeching,
                handleSuccess: handleSuccess,
            });
        } else {
            setvalideDatasStates({
                ...valideDatasStates,
                ForgotInvalidEmail: true,
            });
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: AppTheme.background }}>
            <ErrorServerMsgCard top={10} timer={6500} />
            <KeyboardAwareScrollView
                contentContainerStyle={[
                    SignInUpStyle.Container,
                    {
                        backgroundColor: AppTheme.background,
                        marginTop: Insets.top,
                        marginBottom: Insets.bottom,
                        paddingVertical: "25%",
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
                <View style={[{ position: "absolute", top: 15, left: 15 }]}>
                    <BackButton setNavigation={handleBackBtn} />
                </View>
                <View style={{ width: "100%" }}>
                    <Animated.Text
                        entering={FadeIn.delay(300).duration(600)}
                        style={[
                            SignInUpStyle.GreetText,
                            { color: AppTheme.mainText1 },
                        ]}
                    >
                        Saisissez votre adresse email
                    </Animated.Text>
                </View>

                <View style={[SignInUpStyle.FormInput]}>
                    <SingInUpInput
                        label={"email"}
                        placehold={"cherubin@gmail.com"}
                        _id={2}
                        _from={"ForgotPwd"}
                        secure={false}
                        globalFormErrorState={GlobalError}
                        checked={true}
                        ErrorType={ValidatesDatasErrors.FORGOTEMAIL}
                    />
                </View>
                <View
                    style={[
                        {
                            marginBottom: 10,
                        },
                    ]}
                >
                    <SingInUpBtn
                        value="Envoyer"
                        isLoading={isLoading}
                        handleFunction={SendEmail}
                        disabled={ActiveAccountDatas.email == ""}
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default ActiveAccountScreen;
