//import React tools, Hooks and style
import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { FadeInRight } from "react-native-reanimated";

//Hooks and RecoilAtoms
import useColorTheme from "../../../hooks/useTheme";
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";
import {
    ActiveAccountDatas,
    errorLogRegisterForm,
    MsgServerState,
    OTPFromScreen,
    RegisterDataStore,
} from "../../../State/SignInUpDatas";
import { API } from "../../../State/Global";
import { useMutate } from "../../../hooks/useFetch";

//Components
import SingInUpInput from "../../../components/SingInUp/SingInUpInput";
import ErrorServerMsgCard from "../../../components/SingInUp/MessageServer";
import SingInUpBtn from "../../../components/SingInUp/SingInUpBtn";
import SingInUpFooter from "../../../components/SingInUp/SingInUpFoot";
import StyleBar from "../../../components/CommonComponents/statusBar";
import SignInUpHead from "../../../components/SingInUp/SignInUpHead";

//Tools and Styles
import SignInUpStyle from "../../../style/screens/SignIUpStyle";
import { RootStackParamList, Routes } from "../../../hooks/useNavigation";

//Types of navigation  props
type navigationProps = NativeStackScreenProps<RootStackParamList>;

//Constantes
import { RegTabValue } from "../../../Constants/tabLists";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RegisterScreen = ({ navigation }: navigationProps) => {
    //states
    const AppTheme = useColorTheme();
    const RegisterDatas = useRecoilValue(RegisterDataStore);
    const FromScreen = useSetRecoilState(OTPFromScreen);
    const Api = useRecoilValue(API);
    const Insets = useSafeAreaInsets();
    const [AccountDatas, setAccountDatas] = useRecoilState(ActiveAccountDatas);
    const valideDatasStates = useRecoilValue(errorLogRegisterForm);

    //Errors servers
    const SetServerMessageDisplay = useSetRecoilState(MsgServerState);
    const [GlobalError, setGlobalError] = useState(false);

    //Reset States
    const SetResetErrosField = useResetRecoilState(errorLogRegisterForm);
    const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);

    //hooks To fetching datas
    const useFetchingMutation = useMutate();

    //handle manage response after request to Api
    const ResetAllState = () => {
        // Resets All States
        SetResetErrosField();
        SetResetMsgOfServerStates();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFecthingError = (Error: any) => {
        //Error Global State Chaged to True
        setGlobalError(true);
        console.log(Error.response);
        SetServerMessageDisplay({
            // Display Message Of Server
            hidden: false,
            message: Error.response.data.message,
        });

        //After 5s, desactivated Global Error In Formular
        setTimeout(() => {
            setGlobalError(false);
        }, 15000);
        console.log(Error.response.data);
    };

    const handleFecthingSuccess = () => {
        console.log("Requette reussie");

        ResetAllState(); // Reset All States
        //verification Code sending to mail and switch to register datas in Otp page
        setAccountDatas({
            ...AccountDatas,
            email: RegisterDatas.email,
        });
        FromScreen("SignUp");
        navigation.navigate(Routes.OTP);
    };

    // send Data function
    const handleRegister = () => {
        console.log(RegisterDatas);

        useFetchingMutation.mutate({
            // Regiter
            methode: "POST",
            ApiLink: `${Api.LINK}`,
            EndPoint: `${Api.SIGN_UP}`,
            dataToSending: {
                firstName: RegisterDatas.fName,
                lastName: RegisterDatas.lName,
                email: RegisterDatas.email,
                password: RegisterDatas.password,
            },
            handleError: handleFecthingError,
            handleSuccess: handleFecthingSuccess,
        });
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: AppTheme.background,
            }}
        >
            <ErrorServerMsgCard top={10} timer={6500} />
            <KeyboardAwareScrollView
                contentContainerStyle={[
                    SignInUpStyle.Container,
                    {
                        backgroundColor: AppTheme.background,
                        marginTop: Insets.top,
                        marginBottom: Insets.bottom,
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
                <SignInUpHead />
                <View style={[SignInUpStyle.HeadView]}>
                    <Animated.Text
                        entering={FadeInRight.duration(100)}
                        style={[
                            SignInUpStyle.TitleText,

                            { color: AppTheme.main },
                        ]}
                    >
                        Création Compte
                    </Animated.Text>
                </View>

                <View style={[SignInUpStyle.FormInput]}>
                    {RegTabValue.map((item, indexTab) => (
                        <SingInUpInput
                            key={`${indexTab}_${item.label}`}
                            label={item.label}
                            placehold={item.placeholder}
                            _id={indexTab}
                            _from={item.from}
                            secure={item.secure}
                            globalFormErrorState={GlobalError}
                            checked={item.checked}
                            ErrorType={item.errorType}
                        />
                    ))}
                </View>
                <View style={SignInUpStyle.SendAgreeTermsBtn}>
                    <SingInUpBtn
                        value="Créer un Compte"
                        handleFunction={handleRegister}
                        isLoading={useFetchingMutation.isLoading}
                        disabled={
                            RegisterDatas.email == "" ||
                            RegisterDatas.password == "" ||
                            RegisterDatas.fName == "" ||
                            RegisterDatas.lName == "~" ||
                            valideDatasStates.pswdAndCofirmPswd ||
                            valideDatasStates.RegisterInvalidEmail ||
                            useFetchingMutation.isLoading
                        }
                        from="Register"
                    />
                    <View
                        style={[
                            SignInUpStyle.BtnsContainer,
                            { marginBottom: 20, marginTop: 10 },
                        ]}
                    >
                        <SingInUpFooter
                            MessageText="Déjà inscrit(e)?"
                            LabelLink="Connexion"
                            goToLink="Login"
                            setNavigation={navigation.replace}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default RegisterScreen;
