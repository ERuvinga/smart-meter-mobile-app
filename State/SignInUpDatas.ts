// file content principals states of App
import { atom } from "recoil";

export const LoginDataStore = atom({
    key: "loginDataState",
    default: {
        email: "",
        password: "",
    },
});

export const RegisterDataStore = atom({
    key: "registerDataState",
    default: {
        fName: "",
        lName: "",
        email: "",
        tel: "",
        idCounter: 0,
    },
});

export const CompleteRegisterDataStore = atom({
    key: "CompleteRegisterDataStore",
    default: {
        imageProfile: "",
        Province: "",
        Sexe: "",
        birthYear: "",
        AccountType: "",
        Ville: "",
        Telephone: "",
        document: "",
    },
});

export const ActivateAccountDatas = atom({
    key: "ActivateAccountDatas",
    default: {
        email: "",
        code: "",
        newPassword: "",
        confirmPassWord: "",
        cover: "",
    },
});

export const ActiveAccountDatas = atom({
    key: "ActiveAccountDatas",
    default: {
        email: "",
        code: "",
    },
});

export const messageOfServer = atom({
    key: "messageOfServer",
    default: {
        content: "No Message Content",
        stateMsg: false,
    },
});

export const errorLogRegisterForm = atom({
    key: "errorLogRegisterForm",
    default: {
        LoginInvalidEmail: false,
        RegisterInvalidEmail: false,
        RegisterInvalidStrongPswd: false,
        ForgotInvalidEmail: false,
        InvalidName: false,
        pswdAndCofirmPswd: false,
        valideDatasStates: false,
        pswdAndCofirmResetPswd: false,
        invalidPhoneNumber: false,
        invalidBirthDay: false,
    },
});

//Message Server State
export const MsgServerState = atom({
    key: "MsgServerState",
    default: {
        hidden: true,
        message: "Nothing",
    },
});

//Message Server State
export const SuccessAlerteState = atom({
    key: "SuccessAlerteState",
    default: {
        hidden: true,
        message: "Nothing",
    },
});
