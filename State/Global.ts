// globale state for Theme App
import { atom } from "recoil";

export const AgreeConditionState = atom({
    key: "AgreeConditionState",
    default: false,
});

export const API = atom({
    key: "apiDatas",
    default: {
        LAN_LINK: "https://cherubin-restefull-api.onrender.com",
        LINK: "http://192.168.0.220:4002",
        SIGN_IN: "/AppUsers/SignIn",

        REGISTER_VERIFI_CODE: "AppUsers/ActiveAccount/verifyCode",

        // Users
        GET_USERS: "/Users",
        GET_COUNTER: "/Counter",
        CHANGE_COUNTER_STATE: "/Counter/changeState",
        DELETE_USER: "/Users/Delete",
        NEW_APPART: "/Users/NewAppart",
        NEW_RECHARGE: "/Users/NewPayement",
        GET_NOTIFICATION: "/Users/Notifications",

        //aPLLICATION USER
        GET_OTP: "/AppUsers/ActiveAccount/getCode",
        UPDATE_USER: "/AppUsers/ActiveAccount/password",

        //IMAGES
        UPLOAD_IMAGE: "/AppUsers/UploadImage",
        RESET_PWD: "/reset-password",
        LOGOUT: "/Users/logout",
    },
});
