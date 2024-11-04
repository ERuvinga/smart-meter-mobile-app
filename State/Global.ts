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
        SIGN_UP: "/signup",

        REGISTER_VERIFI_CODE: "AppUsers/ActiveAccount/verifyCode",

        // Users
        GET_USERS: "/Users",
        GET_OTP: "/AppUsers/ActiveAccount/getCode",
        UPDATE_USER: "/AppUsers/ActiveAccount/password",

        //IMAGES
        UPLOAD_IMAGE: "/AppUsers/UploadImage",
        RESET_PWD: "/reset-password",
        LOGOUT: "/logout",

        // POSTS
        POSTS: "/posts",
        DEBAT_POSTS: "/postsDebate",
        DEBAT_FILTER: "/debate/filter",
        DEBATs_POSTS: "/postDebate",
        LIKES_POSTS: "/posts/like",
        UNLIKES_POSTS: "/posts/unlike",
        POLLS: "/polls",
        VOTES_POLLS: "/polls/vote",
        MEETINGS: "/meetings",
        INTEREST: "/interests",
    },
});
