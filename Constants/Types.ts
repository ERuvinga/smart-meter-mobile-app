//Customs types

//1.Theme
export enum themesValues {
    LIGHT = "LIGHT",
    DARK = "DARK",
}

//POSTS
//1. POST WITH COMMENTS
export interface PostWithCommentsDatas {
    _id: string;
    userId: UserDataInPosts;
    title: string;
    body: string;
    comments: string[];
    likedBy: string[];
    date: string;
}

export interface CommentDatas {
    _id: string;
    parentComment: null | string;
    author: UserDataInPosts;
    text: string;
    likedBy: string[];
    Comments: number;
    date: string;
    post: string;
}

export interface PollLabelDatas {
    index: number;
    label: string;
}

export interface PollVotesDatas {
    choice: string;
    votes: {
        firstName: string;
        imageProfile: string;
        lastName: string;
        AccountType: string;
        userId: string;
        voteId: string;
    }[];
}

export interface UserDataInPosts {
    _id: string;
    firstName: string;
    imageProfile: string;
    lastName: string;
    AccountType: string;
}

export interface PollDatas {
    sondage: {
        id: string;
        createdBy: UserDataInPosts;
        title: string;
        choices: string[];
        createdAt: string;
    };
    voteDetails: PollVotesDatas[];
}

export interface AppointmentDatas {
    _id: string;
    userId: UserDataInPosts;
    title: string;
    image: string;
    date: string;
    time: string;
    regulation: string;
    description: string;
    updatedAt: string;
    interests: InterestingAppointmentDatas[];
}

export interface InterestingAppointmentDatas {
    _id: string;
    userId: UserDataInPosts;
    meetingId: string;
    createdAt: string;
    updatedAt: string;
}

export interface AppointmentParticipateDatas {
    id: string;
    idUser: string;
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
    CITIZEN: "citizen", //CITIZEN
    AUTHORITY: "authority", //AUTHORITY
    ROOT: "ROOT",
    ADMIN: "admin", //ADMIN
};

//TYPES OF DROPDOWN IN CONFIG FORM
export enum DropdownType {
    PROVINCE = "PROVINCE",
    CITY = "CITY",
    GENDER = "GENDER",
    ACCOUNTTYPE = " ACCOUNTTYPE",
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

export const FILTERSPOSTS = {
    POSTS: "POSTS",
    DEBATES: "DEBATES",
    POLL: "POLL",
    MEETINGS: "MEETINGS",
};

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
    HOME_POST = "HOME_POST",
    SEARCH_POST = "SEARCH_POST",
    SEARCH_DEBATES = "SEARCH_DEBATES",
    SEARCH_POLLS = "SEARCH_POLLS",
    SEARCH_MEETINGS = "SEARCH_MEETINGS",
    PROFILE_POST = "PROFILE_POST",
    PROFILE_DEBATES = "PROFILE_DEBATES",
    PROFILE_POLLS = "PROFILE_POLLS",
    PROFILE_MEETS = "PROFILE_MEETS",
    HOME_POLLS = "HOME_POLLS",
    GET_MEETINS = "GET_MEETINS",
    GET_ONE_POST = "GET_ONE_POST",
    GET_ONE_MEETINS = "GET_ONE_MEETINS",
    GET_POOLS = "GET_POOLS",
    GET_CHOICES_POOLS = "GET_CHOICES_POOLS",
    GET_POSTS_WITHOUT_LIKES = "GET_POSTS_WITHOUT_LIKES",
    GET_POST_IN_SPACE = "GET_POST_IN_SPACE",

    GET_COMMENTS = "GET_COMMENTS",
    GET_SUB_COMMENTS = "GET_SUB_COMMENTS",

    // gET rEQYESTS
    ACTIVATE_ACCOUNT = "ACTIVATE_ACCOUNT",
}
