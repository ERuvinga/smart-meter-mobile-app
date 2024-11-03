// Hooks provider Font using
const AllFonts = {
    //imported and named fonts => (./App.tsx) file
    Bold: "pop-Bold",
    Medium: "pop-Medium",
    Regular: "pop-Regular",
    Light: "pop-Light",
};

const useCustomFont = () => {
    return AllFonts; // return objet of all fonts
};

export default useCustomFont;
