//Customs types

//1.Theme
export enum themesValues {
    LIGHT = "LIGHT",
    DARK = "DARK",
}

export interface UserDataInPosts {
    _id: string;
    firstName: string;
    imageProfile: string;
    lastName: string;
    AccountType: string;
}

export interface NotificationsType {
    _id: string;
    receiverId: string;
    message: string;
    userId: string;
    idCounter: number;
    Dealer: MobileUserDatas[];
    createAt: string;
}

export interface HistoryPayementType {
    _id: string;
    clientId: string;
    AdminId: string;
    DealerId: string;
    createAt: string;
    idCounter: number;
    valuePayed: number;
    client: MobileUserDatas[];
    Admin: MobileUserDatas[];
}

//1. Users
export interface MobileUserDatas {
    cover: string;
    email: string;
    fname: string;
    isActive: boolean;
    lname: string;
    tel: string;
    useRole: string;
    AdminId: string;
    _id: string;
}

// Counter datas
export interface CounterDatasType {
    id: string;
    isActive: string;
    counterValue: number;
    speedCounter: number;
}

//User Datas
export interface UserData {
    AccountType: string;
    Province: string;
    Sexe: string;
    Telephone: string;
    Ville: string;
    _id: string;
    birthYear: string;
    email: string;
    firstName: string;
    imageProfile: string;
    lastName: string;
    status: string;
    document: string;
    authTokens: [{ _id: string; authToken: string }];
}

export interface LocalUserData {
    cover: string | null;
    email: string | null;
    fname: string | null;
    isActive: boolean | null;
    lname: string | null;
    tel: string | null;
    useRole: string | null;
    AdminId: string | null;
    _id: string | null;
}

// TYPE FOR PROFILES lINK SCREENS
export const ProfileNavigation = {
    ACCOUNT: "ACCOUNT",
    PAYEMENT: "PAYEMENT",
    ORDERS: "ORDERS",
    SETTINGS: "SETTINGS",
    HELP: "HELP",
    SPACE_FORUM: "SPACE_FORUM",
    SPACE_DEBAT: "SPACE_DEBAT",
    SPACE_SONDAGE: "SPACE_SONDAGE",
    SPACE_MEETING: "SPACE_MEETING",

    PROFILE_ACCOUNT: "PROFILE_ACCOUNT",
    PROFILE_SECURITY: "PROFILE_SECURITY",
    PROFILE_HELP: "PROFILE_HELP",
    PROFILE_POLICY: "PROFILE_POLICY",
    NONE: "NONE",
};

//Icones datas
export enum SettingsIcons {
    User = "user",
    Login = "login",
    Help = "help",
    Privacy = "Privacy",
    none = "none",
}

// ERRORS TYPES
export enum ValidatesDatasErrors {
    LOGEMAIL = "LEmail",
    REGEMAIL = "REmail",
    FORGOTEMAIL = "FEmail",
    NAME = "FullName",
    CONFIRMPWD = "ConfirmPassword",
    CONFIRMRESETPWD = "ConfirmResetPassword",
    STRONGPASSWORD = "strongPassword",
    PHONE = "invalidPhoneNumber",
    BIRTHYEAR = "invalidBirthyear",
    NONE = "none",
}

//TYPES rOLES OF ACCOUNTS
export const UserRole = {
    ROOT: "ROOT", //Root user
    ADMIN_PARC: "ADMIN_PARC", //Admin parcelle
    LOCATOR: "LOCATOR", //Locator
    DEALER: "DEALER", //Dealer
};

export const FILTERACCOUNTS = {
    ACTIVE: "ACTIVE",
    DESACTIVE: "DESACTIVE",
    ALL: "ALL",
};
//Message server Type
export enum MessageServerType {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}

//TYPES OF DROPDOWN IN CONFIG FORM
export enum STORAGEKEYS {
    ISACTIVE = "ISACTIVE",
    PHONE = "PHONE",
    ADMIN_ID = "ADMIN_ID",
    USERROLE = "USERROLE",
    EMAIL = "EMAIL",
    COVER = "COVER",
    FIRSTNAME = "FIRSTNAME",
    LASTNAME = "LASTNAME",
    IDUSER = "IDUSER",
}

// Icones Values
export enum IconesValues {
    HOME = "home",
    SEARCH = "search",
    PLUS = "plus",
    NOTIFICATION = "notification",
    PROFILE = "profile",
    NONE = "none",
}
//Options value
export enum OPTIONS_VALUES {
    DELETE = "DELETE",
    EDIT = "EDIT",
    SHARED = "SHARED",
}

// Request Keys Datas
export enum REQUEST_KEYS {
    //tO DELETE
    HOME_CLIENTS = "HOME_CLIENTS",
    NOTIFICATIONS = "SEARCH",

    // gET rEQYESTS
    ACTIVATE_ACCOUNT = "ACTIVATE_ACCOUNT",
    GET_COUNTER_DATAS = "GET_COUNTER_DATAS",
}
