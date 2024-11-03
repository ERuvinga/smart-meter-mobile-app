// Hooks provider Font using
import { useRecoilValue } from "recoil";
import { ColorApp } from "../State/Theme"; //Atom of Color

const useColorTheme = () => {
    return useRecoilValue(ColorApp);
};

export default useColorTheme;
