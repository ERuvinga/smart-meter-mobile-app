import * as secureStore from "expo-secure-store";

// create class to get and set value secure KeyStore
class keyStore {
    private keyStoreName = "";
    private isSignIn = "IsSignIn";
    private isLogOut = "IsLogout";

    // initiale Class Attributs
    constructor(name: string) {
        this.keyStoreName = name;
    }

    //private Methode
    private SetToken = (datas: {
        newToken: string;
        isSignIn: string;
        isLogOut: string;
    }) => {
        secureStore.setItem(this.keyStoreName, datas.newToken, {}); // create or updating Token Store
        secureStore.setItem(this.isSignIn, datas.isSignIn, {});
        secureStore.setItem(this.isLogOut, datas.isLogOut, {});
    };

    //publics Methodes
    public LogIn = (newToken: string) => {
        this.SetToken({ newToken, isSignIn: "true", isLogOut: "false" });
    };
    public LogOut = () => {
        this.SetToken({
            newToken: "null",
            isSignIn: "false",
            isLogOut: "true",
        });
    };

    public getToken = () => {
        return secureStore.getItem(this.keyStoreName); // get token
    };

    public LogInState = () => {
        //get if user is Login
        const valueReturned = secureStore.getItem(this.isSignIn);
        if (valueReturned) {
            switch (
                valueReturned // parsing strings values to Boolean
            ) {
                case "true":
                    return true;
                case "false":
                    return false;
            }
        } else {
            return false;
        }
    };
    public LogOutState = () => {
        //get if user is LogOut
        const valueReturned = secureStore.getItem(this.isLogOut);
        if (valueReturned) {
            switch (
                valueReturned // parsing strings values to Boolean
            ) {
                case "true":
                    return true;
                case "false":
                    return false;
            }
        } else {
            return false;
        }
    };
}

const useToken = () => {
    return new keyStore("TokenUser");
};

export default useToken;
