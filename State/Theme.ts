// Theme state for Theme App
import { atom, selector } from "recoil";
import { Colors } from "../Constants/colors";
import { themesValues } from "../Constants/Types";

const DarkLightState = atom({
    key: "DarkLightState",
    default: themesValues.LIGHT,
});

const ColorApp = selector({
    // selector return Dark or Light mode f(DarkLight)
    key: "ColorApp",
    get: ({ get }) => {
        const mode = get(DarkLightState); // default is Light mode
        if (mode == themesValues.LIGHT)
            return Colors.light; // return Light mode Theme if true
        else return Colors.dark; // dark mode
    },
});

export { ColorApp, DarkLightState };
