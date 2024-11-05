//import React tools and style
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { FadeIn } from "react-native-reanimated";

//Hooks and Atoms Recoil
import useColorTheme from "../../../hooks/useTheme";
import { useMutate } from "../../../hooks/useFetch";
import useLocalStorage from "../../../hooks/UselocalDatas";
import { StateUser } from "../../../State/Auth/TabBar/users";
import useToken from "../../../hooks/useToken";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
    LoginDataStore,
    MsgServerState,
    errorLogRegisterForm,
} from "../../../State/SignInUpDatas";
import { API } from "../../../State/Global";

//Components
import SingInUpInput from "../../../components/SingInUp/SingInUpInput";
import SingInUpBtn from "../../../components/SingInUp/SingInUpBtn";
import SingInUpFooter from "../../../components/SingInUp/SingInUpFoot";
import StyleBar from "../../../components/CommonComponents/statusBar";
import SignInUpHead from "../../../components/SingInUp/SignInUpHead";
import ErrorServerMsgCard from "../../../components/SingInUp/MessageServer";

//Tools and Styles
import SignInUpStyle from "../../../style/screens/SignIUpStyle";
import { RootStackParamList, Routes } from "../../../hooks/useNavigation";

//Constantes
import { LogTabValue } from "../../../Constants/tabLists";
import { MobileUserDatas } from "../../../Constants/Types";
type navigationProps = NativeStackScreenProps<RootStackParamList>;

const LoginScreen = ({ navigation }: navigationProps) => {
    //states
    const AppTheme = useColorTheme();
    const UseToken = useToken();
    const LoginDatas = useRecoilValue(LoginDataStore);
    const Api = useRecoilValue(API);
    const Insets = useSafeAreaInsets();
    const valideDatasStates = useRecoilValue(errorLogRegisterForm);
    const setAuthStateUser = useSetRecoilState(StateUser);

    //States Errors Servers
    const SetServerMessageDisplay = useSetRecoilState(MsgServerState);
    const [GlobalError, setGlobalError] = useState(false);
    const LocalStorage = useLocalStorage();

    //Reset States
    const SetResetLogDatas = useResetRecoilState(LoginDataStore);
    const SetResetErrosField = useResetRecoilState(errorLogRegisterForm);
    const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);

    //hooks To fetching datas
    const useFetchingMutation = useMutate();

    //handle manage response after request to Api
    const ResetAllState = () => {
        // Resets All States
        SetResetLogDatas();
        SetResetErrosField();
        SetResetMsgOfServerStates();
    };

    const Login = (NewToken: string) => {
        // update token
        UseToken.LogIn(NewToken); // save in Secure store a new User token
        setAuthStateUser({
            // updating User State and Change Navigator Routes
            isLogIn: UseToken.LogInState() ? true : false,
            isLogOut: UseToken.LogOutState() ? true : false,
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFecthingError = (ErrorDatas: any) => {
        //Error Global State Chaged to True
        console.log(ErrorDatas);
        setGlobalError(true);
        SetServerMessageDisplay({
            // Display Message Of Server
            hidden: false,
            message: ErrorDatas.response.data.msg,
        });
        console.log(ErrorDatas.response.data);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFecthingSuccess = (successDatas: any) => {
        const OwnerUser: MobileUserDatas = successDatas.DataUser;
        const TokenUser = successDatas.Token;

        // Reset States in App
        console.log(successDatas.DataUser);
        ResetAllState();

        console.log("save localy datas");
        LocalStorage.setAllDatas({
            email: OwnerUser.email,
            fName: OwnerUser.fname,
            lName: OwnerUser.lname,
            useRole: OwnerUser.useRole,
            tel: OwnerUser.tel,
            AdminId: OwnerUser.AdminId ? OwnerUser.AdminId : "",
            cover: OwnerUser.cover ? OwnerUser.cover : "",
            isActive: OwnerUser.isActive,
            idUser: OwnerUser._id,
        });

        console.log("Login ...");
        Login(TokenUser);
    };

    useEffect(() => {
        ResetAllState();
        console.log(LocalStorage.getAllDatas());
    }, []);
    // send Data function
    const SingInClick = () => {
        console.log(LoginDatas);

        //sending Datas
        useFetchingMutation.mutate({
            //Login
            methode: "POST",
            ApiLink: `${Api.LINK}`,
            EndPoint: `${Api.SIGN_IN}`,
            dataToSending: LoginDatas,
            handleError: handleFecthingError,
            handleSuccess: handleFecthingSuccess,
        });
    };

    return (
        <View
            style={[
                {
                    flex: 1,
                    backgroundColor: AppTheme.background,
                },
            ]}
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
                        entering={FadeIn.duration(100)}
                        style={[
                            SignInUpStyle.TitleText,

                            { color: AppTheme.main },
                        ]}
                    >
                        SMART METER
                    </Animated.Text>
                </View>

                <View style={[SignInUpStyle.FormInput]}>
                    {LogTabValue.map((item, indexTab) => (
                        <SingInUpInput
                            key={`${indexTab}_${item.label}`}
                            label={item.label}
                            placehold={item.placeholder}
                            _id={item.id}
                            _from={item.from}
                            secure={item.secure}
                            globalFormErrorState={GlobalError}
                            checked={item.checked}
                            ErrorType={item.errorType}
                        />
                    ))}
                </View>
                <View style={SignInUpStyle.SendForgotBtn}>
                    <SingInUpBtn
                        value="Connexion"
                        handleFunction={SingInClick}
                        isLoading={useFetchingMutation.isLoading}
                        disabled={
                            LoginDatas.password == "" ||
                            LoginDatas.email == "" ||
                            valideDatasStates.LoginInvalidEmail ||
                            useFetchingMutation.isLoading
                        }
                    />
                </View>
                <View style={{ rowGap: 8, marginTop: 5 }}>
                    <View style={[SignInUpStyle.BtnsContainer]}>
                        <SingInUpFooter
                            MessageText="Compte non active ?"
                            LabelLink="Activer votre compte"
                            goToLink={`${Routes.FORGOTPWD}`}
                            setNavigation={navigation.replace}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default LoginScreen;
