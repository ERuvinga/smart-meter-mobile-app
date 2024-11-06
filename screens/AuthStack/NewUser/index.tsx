//import React tools, Hooks and style
import React, { useCallback } from "react";
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
    errorLogRegisterForm,
    MsgServerState,
    RegisterDataStore,
} from "../../../State/SignInUpDatas";
import { API } from "../../../State/Global";

// customs Hooks
import { useMutate } from "../../../hooks/useFetch";
import useCustomFont from "../../../hooks/useCustomFont";
import useLocalStorage from "../../../hooks/UselocalDatas";

//Components
import SingInUpInput from "../../../components/SingInUp/SingInUpInput";
import ErrorServerMsgCard from "../../../components/SingInUp/MessageServer";
import SingInUpBtn from "../../../components/SingInUp/SingInUpBtn";
import StyleBar from "../../../components/CommonComponents/statusBar";

//Tools and Styles
import SignInUpStyle from "../../../style/screens/SignIUpStyle";
import { RootStackParamList, Routes } from "../../../hooks/useNavigation";

//Types of navigation  props
type navigationProps = NativeStackScreenProps<RootStackParamList>;

//Constantes
import { RegTabValue } from "../../../Constants/tabLists";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserRole } from "../../../Constants/Types";
import ConfigurationsSelectDatas from "../../../components/Auth/DropDown/ConfigurationAccountDatas";
import { useFocusEffect } from "@react-navigation/native";

const NewUserScreen = ({ navigation }: navigationProps) => {
    //states
    const AppTheme = useColorTheme();
    const AppFont = useCustomFont();
    const LocalStorage = useLocalStorage();

    const [RegisterDatas, setRegisterDatas] = useRecoilState(RegisterDataStore);
    const Api = useRecoilValue(API);
    const Insets = useSafeAreaInsets();
    const valideDatasStates = useRecoilValue(errorLogRegisterForm);

    //Errors servers
    const SetServerMessageDisplay = useSetRecoilState(MsgServerState);

    //Reset States
    const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);
    const SetResetNewUserDatas = useResetRecoilState(RegisterDataStore);

    //hooks To fetching datas
    const useFetchingMutation = useMutate();

    //handle manage response after request to Api
    const ResetAllState = () => {
        // Resets All States
        SetResetNewUserDatas();
        SetResetMsgOfServerStates();
    };
    // 4. Account Tab
    const CountersIds = [
        {
            label: "2",
            value: 2,
        },
        {
            label: "1",
            value: 1,
        },
        {
            label: "0",
            value: 0,
        },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFecthingError = (Error: any) => {
        console.log(Error.response);
        SetServerMessageDisplay({
            // Display Message Of Server
            hidden: false,
            message: Error.response.data.msg,
        });
    };

    const handleFecthingSuccess = () => {
        console.log("Requette reussie");

        ResetAllState(); // Reset All States
        // back to Home page
        navigation.navigate(Routes.HOME_AUTH);
    };

    // send Data function
    const handleRegister = () => {
        console.log(RegisterDatas);

        useFetchingMutation.mutate({
            // Regiter
            methode: "POST",
            ApiLink: `${Api.LINK}`,
            EndPoint: `${Api.NEW_APPART}`,
            dataToSending: {
                fname: RegisterDatas.fName,
                lname: RegisterDatas.lName,
                email: RegisterDatas.email,
                tel: RegisterDatas.tel,
                useRole: UserRole.LOCATOR,
                idCounter: RegisterDatas.idCounter,
                adminID: LocalStorage.getIdUser(),
            },
            handleError: handleFecthingError,
            handleSuccess: handleFecthingSuccess,
        });
    };

    useFocusEffect(
        useCallback(() => {
            ResetAllState();
        }, [])
    );

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
                <View style={[SignInUpStyle.HeadView]}>
                    <Animated.Text
                        entering={FadeInRight.duration(100)}
                        style={[
                            {
                                color: AppTheme.main,
                                fontFamily: AppFont.Bold,
                                fontSize: 15,
                            },
                        ]}
                    >
                        Créer un nouvel appartement
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
                            globalFormErrorState={false}
                            checked={item.checked}
                            ErrorType={item.errorType}
                        />
                    ))}
                    <>
                        <ConfigurationsSelectDatas
                            Tab={CountersIds}
                            PlaceHolder={"Id"}
                            label={"Numero compteur"}
                            selected={RegisterDatas.idCounter}
                            OnchangeValue={(idCounter: number) =>
                                setRegisterDatas({
                                    ...RegisterDatas,
                                    idCounter: idCounter,
                                })
                            }
                        />
                    </>
                </View>
                <View style={SignInUpStyle.SendAgreeTermsBtn}>
                    <SingInUpBtn
                        value="Créer"
                        handleFunction={handleRegister}
                        isLoading={useFetchingMutation.isLoading}
                        disabled={
                            RegisterDatas.email == "" ||
                            RegisterDatas.fName == "" ||
                            RegisterDatas.lName == "~" ||
                            RegisterDatas.tel == "" ||
                            RegisterDatas.idCounter == 0 ||
                            valideDatasStates.invalidPhoneNumber ||
                            valideDatasStates.RegisterInvalidEmail ||
                            useFetchingMutation.isLoading
                        }
                        from="Register"
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default NewUserScreen;
