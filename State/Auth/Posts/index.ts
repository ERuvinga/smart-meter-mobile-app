//States of Posts datas
import { atom } from "recoil";
import { PostWithCommentsDatas } from "../../../Constants/Types";

//Home Datas
export const PostsFetching = atom({
    key: "PostsFetching",
    default: [] as PostWithCommentsDatas[],
});

export const PostsFetchingWithoutLikes = atom({
    key: "PostsFetchingWithoutLikes",
    default: [] as PostWithCommentsDatas[],
});

//Reloading Home Posts
export const PostsDatasReloading = atom({
    key: "PostsDatasReloading",
    default: false,
});

//Spaces Datas
export const DebateSpacePostsFetching = atom({
    key: "DebateSpacePostsFetching",
    default: [] as PostWithCommentsDatas[],
});

//Profile Fetching
export const ProfilePostFetching = atom({
    key: "ProfilePostFetching",
    default: [] as PostWithCommentsDatas[],
});

export const DebatesProfilePostFetching = atom({
    key: "DebatesProfilePostFetching",
    default: [] as PostWithCommentsDatas[],
});
