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
export const AdminNavBarState = atom({
    key: "NavBarState",
    default: [
        {
            Icon: IconesValues.HOME,
            label: "Home",
            BadgeText: false,
            badgeValue: 0,
        },

        {
            Icon: IconesValues.PLUS,
            label: "Créer",
            BadgeText: false,
            badgeValue: 0,
        },

        {
            Icon: IconesValues.NOTIFICATION,
            label: "Cloche",
            BadgeText: false,
            badgeValue: 0,
        },

        {
            Icon: IconesValues.PROFILE,
            label: "Profile",
            BadgeText: false,
            badgeValue: 0,
        },
    ],
});

// Tab Bar State
export const ClientsNavBarState = atom({
    key: "ClientsNavBarState",
    default: [
        {
            Icon: IconesValues.HOME,
            label: "Home",
            BadgeText: false,
            badgeValue: 0,
        },

        {
            Icon: IconesValues.NOTIFICATION,
            label: "Cloche",
            BadgeText: false,
            badgeValue: 0,
        },

        {
            Icon: IconesValues.PROFILE,
            label: "Profile",
            BadgeText: false,
            badgeValue: 0,
        },
    ],
});

// Dealer Bar State
export const DealerNavBarState = atom({
    key: "DealerNavBarState",
    default: [
        {
            Icon: IconesValues.HOME,
            label: "Home",
            BadgeText: false,
            badgeValue: 0,
        },

        {
            Icon: IconesValues.PROFILE,
            label: "Profile",
            BadgeText: false,
            badgeValue: 0,
        },
    ],
});
