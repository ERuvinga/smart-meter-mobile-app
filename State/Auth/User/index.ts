//States of User datas
import { atom } from "recoil";
import {
    AppointmentDatas,
    CommentDatas,
    FILTERSPOSTS,
    PostWithCommentsDatas,
    UserRole,
} from "../../../Constants/Types";
import useLocalStorage from "../../../hooks/UselocalDatas";

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
    default: FILTERSPOSTS.POSTS,
});

export const ProfileFilterSelected = atom({
    key: "ProfileFilterSelected",
    default:
        useLocalStorage().getAccountType() == UserRole.CITIZEN
            ? FILTERSPOSTS.DEBATES
            : FILTERSPOSTS.POSTS,
});

// Select Datas
export const PostSelected = atom({
    key: "PostSelected",
    default: {} as PostWithCommentsDatas,
});

export const PostWithoutLikesSelected = atom({
    key: "PostWithoutLikesSelected",
    default: {} as PostWithCommentsDatas,
});

export const CommentSelected = atom({
    key: "CommentSelected",
    default: {} as CommentDatas,
});

//Meeting States
export const MeetingSelected = atom({
    key: "MeetingSelected",
    default: {} as AppointmentDatas,
});

// Loader Home Pages datas
export const ForumsLoader = atom({
    key: "ForumsLoader",
    default: true,
});

export const DebatesLoader = atom({
    key: "DebatesLoader",
    default: true,
});
export const PollsLoader = atom({
    key: "PollsLoader",
    default: true,
});
export const MeetingLoader = atom({
    key: "MeetingLoader",
    default: true,
});
