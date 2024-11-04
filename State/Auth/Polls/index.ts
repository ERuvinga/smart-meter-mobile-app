//States of Meetings datas
import { atom } from "recoil";
import { PollDatas } from "../../../Constants/Types";

export const PoollsFetched = atom({
    key: "PoollsFetched",
    default: [] as PollDatas[],
});

export const poolsReloading = atom({
    key: "poolsReloading",
    default: false,
});

//profiles States

export const ProfilePoollsFetched = atom({
    key: "ProfilePoollsFetched",
    default: [] as PollDatas[],
});
