import * as secureStore from "expo-secure-store";
import { LocalUserData, STORAGEKEYS } from "../Constants/Types";

// create class to get and set value secure KeyStore
class LocalStorage {
    //private Methode
    public setAllDatas = (datas: {
        email: string;
        fName: string;
        lName: string;
        tel: string;
        isActive: boolean;
        cover: string;
        useRole: string;
        AdminId: string;
        idUser: string;
    }) => {
        secureStore.setItem(STORAGEKEYS.EMAIL, datas.email, {}); //Save Datas of User
        secureStore.setItem(STORAGEKEYS.FIRSTNAME, datas.fName, {});
        secureStore.setItem(STORAGEKEYS.LASTNAME, datas.lName, {});
        secureStore.setItem(STORAGEKEYS.ADMIN_ID, datas.AdminId, {});
        secureStore.setItem(STORAGEKEYS.PHONE, datas.tel, {});
        secureStore.setItem(STORAGEKEYS.COVER, datas.cover, {});
        secureStore.setItem(STORAGEKEYS.ISACTIVE, `${datas.isActive}`, {});
        secureStore.setItem(STORAGEKEYS.USERROLE, datas.useRole, {});
        secureStore.setItem(STORAGEKEYS.IDUSER, datas.idUser, {});
    };

    public deleteAllData = () => {
        secureStore.deleteItemAsync(STORAGEKEYS.EMAIL); // Delete All datas
        secureStore.deleteItemAsync(STORAGEKEYS.FIRSTNAME);
        secureStore.deleteItemAsync(STORAGEKEYS.LASTNAME);
        secureStore.deleteItemAsync(STORAGEKEYS.ADMIN_ID);
        secureStore.deleteItemAsync(STORAGEKEYS.COVER);
        secureStore.deleteItemAsync(STORAGEKEYS.ISACTIVE);
        secureStore.deleteItemAsync(STORAGEKEYS.PHONE);
        secureStore.deleteItemAsync(STORAGEKEYS.USERROLE);
        secureStore.deleteItemAsync(STORAGEKEYS.IDUSER);
    };

    //publics Methodes
    public getName = () => {
        return `${secureStore.getItem(STORAGEKEYS.FIRSTNAME)} ${secureStore.getItem(STORAGEKEYS.LASTNAME)}`; // get names
    };
    public getEmail = () => {
        return secureStore.getItem(STORAGEKEYS.EMAIL); // get email
    };
    public getImage = () => {
        return secureStore.getItem(STORAGEKEYS.COVER); // get ImageUser
    };
    public getPhone = () => {
        return secureStore.getItem(STORAGEKEYS.PHONE); // get Tel
    };
    public getAdminId = () => {
        return secureStore.getItem(STORAGEKEYS.ADMIN_ID); // get IdAdmin
    };
    public getStatus = () => {
        return secureStore.getItem(STORAGEKEYS.ISACTIVE); // get status
    };
    public getUserRole = () => {
        return secureStore.getItem(STORAGEKEYS.USERROLE); // get useRole
    };
    public getIdUser = () => {
        return secureStore.getItem(STORAGEKEYS.IDUSER); // get Id user
    };
    public getAllDatas = () => {
        return {
            cover: secureStore.getItem(STORAGEKEYS.COVER),
            email: secureStore.getItem(STORAGEKEYS.EMAIL),
            fname: secureStore.getItem(STORAGEKEYS.FIRSTNAME),
            isActive:
                secureStore.getItem(STORAGEKEYS.ISACTIVE) == "true"
                    ? true
                    : false,
            lname: secureStore.getItem(STORAGEKEYS.LASTNAME),
            tel: secureStore.getItem(STORAGEKEYS.PHONE),
            useRole: secureStore.getItem(STORAGEKEYS.USERROLE),
            AdminId: secureStore.getItem(STORAGEKEYS.ADMIN_ID),
            _id: secureStore.getItem(STORAGEKEYS.IDUSER),
        } as LocalUserData;
    };
}

const useLocalStorage = () => {
    return new LocalStorage();
};

export default useLocalStorage;
