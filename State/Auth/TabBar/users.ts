//States of Navigation
import { atom } from "recoil";
import { IconesValues } from "../../../Constants/Types";

//LoginUser
export const StateUser = atom({
    key: "StateUser",
    default: {
        isLogIn: true,
        isLogOut: false,
    },
});

export const DatasOfUserLogin = atom({
    key: "DatasOfUserLogin",
    default: {
        email: "",
        name: "",
        image: "",
        token: "",
    },
});

// Tab Bar State
export const NavBarState = atom({
    key: "NavBarState",
    default: [
        {
            Icon: IconesValues.HOME,
            label: "Accueil",
            BadgeText: false,
            badgeValue: 0,
        },
        {
            Icon: IconesValues.SEARCH,
            label: "Recherche",
            BadgeText: true,
            badgeValue: 0,
        },

        {
            Icon: IconesValues.PLUS,
            label: "New",
            BadgeText: false,
            badgeValue: 0,
        },

        {
            Icon: IconesValues.NOTIFICATION,
            label: "Notifications",
            BadgeText: true,
            badgeValue: 2,
        },

        {
            Icon: IconesValues.PROFILE,
            label: "Profil",
            BadgeText: false,
            badgeValue: 0,
        },
    ],
});
