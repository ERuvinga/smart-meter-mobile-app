//States of User datas
import { atom } from "recoil";
import {
    FILTERACCOUNTS,
    MobileUserDatas,
    NotificationsType,
} from "../../../Constants/Types";

//DefaultPictures
export const DefaultPictures = atom({
    key: "DefaultPictures",
    default: {
        User: require("../../../assets/images/Placeholders/profile.png"),
        Image: require("../../../assets/images/Placeholders/camera.png"),
    },
});

//Filter datas
export const HomeFilterSelected = atom({
    key: "HomeFilterSelected",
    default: FILTERACCOUNTS.ALL,
});

// Client Datas
export const ClientUsers = atom({
    key: "ClientUsers",
    default: [] as MobileUserDatas[],
});

export const NotificationsDatas = atom({
    key: "NotificationsDatas",
    default: [] as NotificationsType[],
});
