//States of Meetings datas
import { atom } from "recoil";
import { AppointmentDatas } from "../../../Constants/Types";
import { componentType } from "../../../components/Auth/Wrapper/Type";

export const MeetingsFetched = atom({
    key: "MeetingsFetched",
    default: [] as AppointmentDatas[],
});

export const MeetingsReloading = atom({
    key: "MeetingsReloading",
    default: false,
});

//Profile Meetings
export const ProfileMeetingsFetched = atom({
    key: "ProfileMeetingsFetched",
    default: [] as AppointmentDatas[],
});

//Wrapper State
//Center Wrapper
export const InterstListWrapperState = atom({
    key: "InterstListWrapperState",
    default: {
        hidden: true,
        component: componentType,
    },
});
