// React libs
import React, { useEffect, useState } from "react";
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";

//Hooks and components
import useCustomFont from "../../../hooks/useCustomFont";
import useColorTheme from "../../../hooks/useTheme";
import useEmail from "../../../hooks/useEmail";
import usePassWord from "../../../hooks/usePassWord";

import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";

//store and Recoil
import { useRecoilState } from "recoil";
import {
    LoginDataStore,
    RegisterDataStore,
    ActivateAccountDatas,
    errorLogRegisterForm,
} from "../../../State/SignInUpDatas";

//Type and Datas
import { ValidatesDatasErrors } from "../../../Constants/Types";
import { SystemMessages } from "../../../Constants/tabLists";

interface InputDatas {
    // type of datas in Input Component
    label: string;
    placehold: string;
    _id: number;
    _from: string;
    secure: boolean;
    globalFormErrorState: boolean;
    checked: boolean;
    ErrorType: ValidatesDatasErrors;
}

//customFont Hook
const FontApp = useCustomFont();

const SingInUpInput = (datas: InputDatas) => {
    //states
    const AppTheme = useColorTheme();
    const AppFont = useCustomFont();
    const [secureValue, setSecureValue] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    //Recoil States
    const [LoginData, setLoginData] = useRecoilState(LoginDataStore);
    const [RegisterData, setRegisterData] = useRecoilState(RegisterDataStore);
    const [NewPwdData, setNewPwdData] = useRecoilState(ActivateAccountDatas);

    //Errors States
    const [ErrorsValues, setErrorValues] = useRecoilState(errorLogRegisterForm);
    const [MessageError, setMessageError] = useState("");
    const [ErroFieldState, setErrorFieldState] = useState(false);

    // checking if email is Valid
    const CheckingEmail = (email: string) => {
        const useMail = useEmail(email);
        return useMail.isValid(); // return Boolean, true if email is valid and False if email is not valide
    };
    useEffect(() => {
        if (datas.ErrorType !== ValidatesDatasErrors.NONE) {
            switch (datas.ErrorType) {
                case ValidatesDatasErrors.LOGEMAIL:
                    setMessageError(SystemMessages.Errors.invalidEmail);
                    setErrorFieldState(ErrorsValues.LoginInvalidEmail);
                    break;
                case ValidatesDatasErrors.REGEMAIL:
                    setMessageError(SystemMessages.Errors.invalidEmail);
                    setErrorFieldState(ErrorsValues.RegisterInvalidEmail);
                    break;
                case ValidatesDatasErrors.FORGOTEMAIL:
                    setMessageError(SystemMessages.Errors.invalidEmail);
                    setErrorFieldState(ErrorsValues.ForgotInvalidEmail);
                    break;
                case ValidatesDatasErrors.NAME:
                    setMessageError(SystemMessages.Errors.invalidName);
                    setErrorFieldState(ErrorsValues.InvalidName);
                    break;
                case ValidatesDatasErrors.CONFIRMPWD:
                    setMessageError(SystemMessages.Errors.inValidPassword);
                    setErrorFieldState(ErrorsValues.pswdAndCofirmPswd);
                    break;
                case ValidatesDatasErrors.STRONGPASSWORD:
                    setMessageError(
                        SystemMessages.Errors.InvalidStrongPassword
                    );
                    setErrorFieldState(ErrorsValues.RegisterInvalidStrongPswd);
                    break;
                case ValidatesDatasErrors.CONFIRMRESETPWD:
                    setMessageError(SystemMessages.Errors.inValidPassword);
                    setErrorFieldState(ErrorsValues.pswdAndCofirmResetPswd);
                    break;

                case ValidatesDatasErrors.PHONE:
                    setMessageError(SystemMessages.Errors.inValidPhoneNumber);
                    setErrorFieldState(ErrorsValues.invalidPhoneNumber);
                    break;
                case ValidatesDatasErrors.BIRTHYEAR:
                    setMessageError(SystemMessages.Errors.invalidBirthDay);
                    setErrorFieldState(ErrorsValues.invalidBirthDay);
                    break;
            }
        }
    }, [ErrorsValues]);

    //Handles
    const UpdateLoginDatas = (newValue: string) => {
        switch (datas._id) {
            case 0:
                {
                    // email
                    setLoginData({
                        ...LoginData,
                        email: newValue,
                    });
                    if (CheckingEmail(newValue)) {
                        // if datas is Valid?
                        setErrorValues({
                            ...ErrorsValues,
                            LoginInvalidEmail: false,
                        });
                    } else {
                        setErrorValues({
                            ...ErrorsValues,
                            LoginInvalidEmail: true,
                        });
                    }
                }
                break;
            case 1:
                {
                    setLoginData({
                        ...LoginData,
                        password: newValue,
                    });
                }
                break;
        }
    };

    const UpdateRegisterDatas = (newValue: string) => {
        switch (datas._id) {
            case 0:
                {
                    if (newValue.length) {
                        // fullName
                        const names = newValue.split(" ");
                        const firstName = names[0];
                        const secondName = names[1] ? names[1] : "~";

                        setRegisterData({
                            ...RegisterData,
                            fName: firstName,
                            lName: secondName,
                        });
                    } else {
                        setRegisterData({
                            ...RegisterData,
                            fName: "",
                        });
                    }

                    // Validation name Value
                    if (newValue.split(" ")[1]) {
                        setErrorValues({
                            ...ErrorsValues,
                            InvalidName: false,
                        });
                    } else {
                        setErrorValues({
                            ...ErrorsValues,
                            InvalidName: true,
                        });
                    }
                }
                break;
            case 1:
                {
                    // email
                    setRegisterData({
                        ...RegisterData,
                        email: newValue,
                    });

                    if (CheckingEmail(newValue)) {
                        // if datas is Valid?
                        setErrorValues({
                            ...ErrorsValues,
                            RegisterInvalidEmail: false,
                        });
                    } else {
                        setErrorValues({
                            ...ErrorsValues,
                            RegisterInvalidEmail: true,
                        });
                    }
                }
                break;

            case 2:
                {
                    //const PhoneNumberExpressionBeginer = //;
                    const PhoneNumberExpressionContent = /^[+243][0-9]{12}$/;
                    setRegisterData((lastValue) => ({
                        ...lastValue,
                        tel: newValue,
                    }));
                    //Check if Phone Number is Valid
                    if (PhoneNumberExpressionContent.test(newValue)) {
                        setErrorValues({
                            ...ErrorsValues,
                            invalidPhoneNumber: false,
                        });
                    } else {
                        setErrorValues({
                            ...ErrorsValues,
                            invalidPhoneNumber: true,
                        });
                    }
                }
                break;
        }
    };

    const UpdateNewPassWordDatas = (newValue: string) => {
        switch (datas._id) {
            case 0:
                {
                    const isValidPassWord = usePassWord(newValue).isValid();
                    // password
                    setNewPwdData({
                        ...NewPwdData,
                        newPassword: newValue,
                    });

                    if (NewPwdData.confirmPassWord != "") {
                        if (newValue != NewPwdData.confirmPassWord) {
                            setErrorValues({
                                ...ErrorsValues,
                                pswdAndCofirmResetPswd: true,
                                RegisterInvalidStrongPswd: !isValidPassWord,
                            });
                        } else {
                            setErrorValues({
                                ...ErrorsValues,
                                pswdAndCofirmResetPswd: false,
                                RegisterInvalidStrongPswd: !isValidPassWord,
                            });
                        }
                    } else {
                        setErrorValues({
                            ...ErrorsValues,
                            RegisterInvalidStrongPswd: !isValidPassWord,
                        });
                    }
                }
                break;
            case 1:
                {
                    // Confirme passWord
                    setNewPwdData({
                        ...NewPwdData,
                        confirmPassWord: newValue,
                    });
                    if (newValue != NewPwdData.newPassword) {
                        setErrorValues({
                            ...ErrorsValues,
                            pswdAndCofirmResetPswd: true,
                        });
                    } else {
                        setErrorValues({
                            ...ErrorsValues,
                            pswdAndCofirmResetPswd: false,
                        });
                    }
                }
                break;
        }
    };
    const HandleChangeValue = (valueChanged: string) => {
        switch (datas._from) {
            case "Login":
                UpdateLoginDatas(valueChanged);
                break;
            case "Register":
                UpdateRegisterDatas(valueChanged);
                break;

            case "ForgotPwd": {
                setNewPwdData({
                    ...NewPwdData,
                    email: valueChanged,
                });
                break;
            }
            case "Reset": {
                UpdateNewPassWordDatas(valueChanged);
                break;
            }
        }
    };

    return (
        <Animated.View
            style={styles.container}
            entering={FadeInRight.duration(100)}
        >
            <View>
                <Text
                    style={[
                        styles.label,
                        {
                            color: isFocused
                                ? AppTheme.main
                                : AppTheme.mainText1,
                        },
                    ]}
                >
                    {datas.label}
                </Text>
            </View>
            <View
                style={[
                    styles.inPutIconContainer,
                    {
                        borderWidth: 1.5,
                        borderColor: isFocused
                            ? AppTheme.main
                            : AppTheme.border,
                    },
                ]}
            >
                <TextInput
                    secureTextEntry={
                        datas.secure
                            ? datas.secure && secureValue
                            : datas.secure
                    }
                    placeholderTextColor={AppTheme.mainText1}
                    style={[
                        styles.inputField,
                        {
                            color: AppTheme.icon,
                            textAlign: datas._from == "OTP" ? "center" : "left",
                        },
                    ]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={(newValue: string) =>
                        HandleChangeValue(newValue)
                    }
                    placeholder={datas.placehold}
                />
                {datas.secure && (
                    <TouchableOpacity
                        onPress={() => setSecureValue(!secureValue)}
                        style={styles.iconContainer}
                    >
                        {secureValue ? (
                            <EyeSlashIcon height={20} color={AppTheme.border} />
                        ) : (
                            <EyeIcon height={20} color={AppTheme.border} />
                        )}
                    </TouchableOpacity>
                )}
            </View>
            <>
                {datas.checked ? (
                    <>
                        {ErroFieldState ? (
                            <Animated.Text
                                entering={FadeIn.duration(1200)}
                                style={{
                                    fontFamily: AppFont.Regular,
                                    color: AppTheme.ErrorColor,
                                    fontSize: 10.5,
                                }}
                            >
                                {MessageError}
                            </Animated.Text>
                        ) : null}
                    </>
                ) : null}
            </>
        </Animated.View>
    );
};

export default SingInUpInput;

const styles = StyleSheet.create({
    container: {
        rowGap: 4,
    },
    label: {
        fontFamily: FontApp.Regular,
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
        fontFamily: FontApp.Regular,
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
