//import React tools, Hooks and style
import React, { useCallback, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";

//Hooks and RecoilAtoms
import useColorTheme from "../../../hooks/useTheme";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { MsgServerState } from "../../../State/SignInUpDatas";
import { API } from "../../../State/Global";

// customs Hooks
import { useMutate } from "../../../hooks/useFetch";
import useLocalStorage from "../../../hooks/UselocalDatas";
import useCustomFont from "../../../hooks/useCustomFont";

//Components
import ErrorServerMsgCard from "../../../components/SingInUp/MessageServer";
import SingInUpBtn from "../../../components/SingInUp/SingInUpBtn";
import StyleBar from "../../../components/CommonComponents/statusBar";

//Tools and Styles
import SignInUpStyle from "../../../style/screens/SignIUpStyle";

//Constantes
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Routes } from "../../../hooks/useNavigation";
const AppFont = useCustomFont();

//Types of navigation  props
type navigationProps = NativeStackScreenProps<RootStackParamList>;

const NewUserScreen = ({ navigation }: navigationProps) => {
    //states
    const [ErroFieldState, setErroFieldState] = useState({
        idCompteur: false,
        value: false,
    });
    const [NewpayementValues, setNewpayementValues] = useState({
        idCounter: 0,
        payedValue: 0,
    });
    //Hooks
    const AppTheme = useColorTheme();

    //Atoms
    const Api = useRecoilValue(API);
    const Insets = useSafeAreaInsets();

    //Errors servers
    const SetServerMessageDisplay = useSetRecoilState(MsgServerState);

    //Reset States
    const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);

    //hooks To fetching datas
    const useFetchingMutation = useMutate();

    //Constants
    const idErrorMsg = "Valeur saisie incorecte";
    const ErrorMsg = "Valeur saisie incorecte ou insuffisante";
    const ConvertValue = 100000; // 1000fc => 1m3

    //handle manage response after request to Api
    const ResetAllState = () => {
        // Resets All States
        SetResetMsgOfServerStates();
        setNewpayementValues({
            payedValue: 0,
            idCounter: 0,
        });
        setErroFieldState({
            idCompteur: false,
            value: false,
        });
    };

    const HandleIdChangeValue = (valueChanged: string) => {
        const ValidExpression = /^[1-9]$/;

        const toNumber = parseInt(valueChanged);
        console.log(toNumber);
        setNewpayementValues((lastValue) => ({
            ...lastValue,
            idCounter: toNumber,
        }));

        if (ValidExpression.test(valueChanged)) {
            setErroFieldState((lastValue) => ({
                ...lastValue,
                idCompteur: false,
            }));
        } else {
            setErroFieldState((lastValue) => ({
                ...lastValue,
                idCompteur: true,
            }));
        }
    };

    const HandleValueChangeValue = (valueChanged: string) => {
        const ValidExpression = /^[1-9][0-9]{2,}$/;

        const toNumber = parseInt(valueChanged);
        console.log(toNumber);
        console.log(toNumber / ConvertValue);
        setNewpayementValues((lastValue) => ({
            ...lastValue,
            payedValue: toNumber,
        }));

        if (ValidExpression.test(valueChanged)) {
            setErroFieldState((lastValue) => ({
                ...lastValue,
                value: false,
            }));
        } else {
            setErroFieldState((lastValue) => ({
                ...lastValue,
                value: true,
            }));
        }
    };

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
    const sendDatas = () => {
        console.log(NewpayementValues);

        useFetchingMutation.mutate({
            // Regiter
            methode: "POST",
            ApiLink: `${Api.LINK}`,
            EndPoint: `${Api.NEW_RECHARGE}`,
            dataToSending: {
                idCounter: NewpayementValues.idCounter,
                valuePayed: NewpayementValues.payedValue / ConvertValue,
                idDealer: useLocalStorage().getIdUser(),
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
                        Nouveau payement
                    </Animated.Text>
                </View>

                <View style={[SignInUpStyle.FormInput]}>
                    <Animated.View
                        style={styles.container}
                        entering={FadeInRight.duration(100)}
                    >
                        <View>
                            <Text
                                style={[
                                    styles.label,
                                    {
                                        color: AppTheme.mainText1,
                                    },
                                ]}
                            >
                                id compteur
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.inPutIconContainer,
                                {
                                    borderWidth: 1.5,
                                    borderColor: AppTheme.border,
                                },
                            ]}
                        >
                            <TextInput
                                placeholderTextColor={AppTheme.mainText1}
                                style={[
                                    styles.inputField,
                                    {
                                        color: AppTheme.icon,
                                    },
                                ]}
                                onChangeText={(newValue: string) =>
                                    HandleIdChangeValue(newValue)
                                }
                                placeholder={"0"}
                            />
                        </View>
                        <>
                            {ErroFieldState.idCompteur && (
                                <Animated.Text
                                    entering={FadeIn.duration(1200)}
                                    style={{
                                        fontFamily: AppFont.Regular,
                                        color: AppTheme.ErrorColor,
                                        fontSize: 10.5,
                                    }}
                                >
                                    {idErrorMsg}
                                </Animated.Text>
                            )}
                        </>
                    </Animated.View>
                    <Animated.View
                        style={styles.container}
                        entering={FadeInRight.duration(100)}
                    >
                        <View>
                            <Text
                                style={[
                                    styles.label,
                                    {
                                        color: AppTheme.mainText1,
                                    },
                                ]}
                            >
                                {`montant(fc)`}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.inPutIconContainer,
                                {
                                    borderWidth: 1.5,
                                    borderColor: AppTheme.border,
                                },
                            ]}
                        >
                            <TextInput
                                placeholderTextColor={AppTheme.mainText1}
                                style={[
                                    styles.inputField,
                                    {
                                        color: AppTheme.icon,
                                    },
                                ]}
                                onChangeText={(newValue: string) =>
                                    HandleValueChangeValue(newValue)
                                }
                                placeholder={"0"}
                            />
                        </View>
                        <>
                            {ErroFieldState.value && (
                                <Animated.Text
                                    entering={FadeIn.duration(1200)}
                                    style={{
                                        fontFamily: AppFont.Regular,
                                        color: AppTheme.ErrorColor,
                                        fontSize: 10.5,
                                    }}
                                >
                                    {ErrorMsg}
                                </Animated.Text>
                            )}
                        </>
                    </Animated.View>
                </View>
                <View style={SignInUpStyle.SendAgreeTermsBtn}>
                    <SingInUpBtn
                        value="Payer"
                        handleFunction={sendDatas}
                        isLoading={useFetchingMutation.isLoading}
                        disabled={
                            NewpayementValues.idCounter == 0 ||
                            NewpayementValues.payedValue == 0 ||
                            ErroFieldState.idCompteur ||
                            ErroFieldState.value
                        }
                        from=""
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default NewUserScreen;

const styles = StyleSheet.create({
    container: {
        rowGap: 4,
    },
    label: {
        fontFamily: AppFont.Regular,
        fontSize: 11,
    },
    inPutIconContainer: {
        minHeight: 40,
        width: "100%",
        flexDirection: "row",
        borderRadius: 4,
        paddingHorizontal: 8,
    },

    inputField: {
        flex: 1,
        fontFamily: AppFont.Regular,
        fontSize: 13,
        paddingVertical: 4,
    },

    iconContainer: {
        width: "auto",
        alignContent: "center",
        justifyContent: "center",
        paddingHorizontal: 2,
    },
});
