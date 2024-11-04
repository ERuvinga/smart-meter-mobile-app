//States of Wrappers and notifications
import { atom } from "recoil";
import { componentType } from "../../../components/Auth/Wrapper/Type";

//Bottom Wrapper
export const BottomState = atom({
    key: "BottomState",
    default: {
        hidden: true,
        component: componentType,
    },
});

//Center Wrapper
export const CenterWrapperState = atom({
    key: "CenterWrapperState",
    default: {
        hidden: true,
        component: componentType,
    },
});

//Alert Wrapper
export const AlerteState = atom({
    key: "AlerteWrapper",
    default: {
        Product: "Nothing",
        hidden: true,
        isSuccess: true,
        message: "Nothing",
        action: "",
    },
});
