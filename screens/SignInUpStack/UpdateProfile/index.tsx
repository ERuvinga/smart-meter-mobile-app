//import React tools and style
import React, { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ImagePickerAsset } from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import mime from "mime";

//Customs Hooks
import usePickerImage from "../../../hooks/usePicImage";
import useColorTheme from "../../../hooks/useTheme";
import useCustomFont from "../../../hooks/useCustomFont";
import useLocalStorage from "../../../hooks/UselocalDatas";
import useToken from "../../../hooks/useToken";
import { useMutateWithToken } from "../../../hooks/useFetch";

//Atoms Recoil
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";
import { DatasOfUserLogin, StateUser } from "../../../State/Auth/TabBar/users";
import {
    CompleteRegisterDataStore,
    errorLogRegisterForm,
    MsgServerState,
} from "../../../State/SignInUpDatas";
import { CenterWrapperState } from "../../../State/Auth/Wrappers";
import { API } from "../../../State/Global";

//Components
import StyleBar from "../../../components/CommonComponents/statusBar";
import SelectUploadImageModeView from "../../../components/Auth/Wrapper/Views/UploadImageMode";
import SingInUpInput from "../../../components/SingInUp/SingInUpInput";
import SingInUpBtn from "../../../components/SingInUp/SingInUpBtn";
import ErrorServerMsgCard from "../../../components/SingInUp/MessageServer";
import ConfigurationsSelectDatas from "../../../components/Auth/DropDown/ConfigurationAccountDatas";

//Tools and Styles
import { CloudArrowUpIcon, PlusIcon } from "react-native-heroicons/solid";
import { ConfigurationAccountTaabValue } from "../../../Constants/tabLists";
import { DropdownType, UserData, UserRole } from "../../../Constants/Types";
import { useFocusEffect } from "@react-navigation/native";

const AppFont = useCustomFont();

const UpdateUserDatas = () => {
    //states
    const LocalStorage = useLocalStorage();
    const UseToken = useToken();
    const AppTheme = useColorTheme();
    const UserDatas = useRecoilValue(DatasOfUserLogin);
    const SetServerMessageDisplay = useSetRecoilState(MsgServerState);
    const [ConfigurationAccountDatas, setConfigurationAccountDatas] =
        useRecoilState(CompleteRegisterDataStore);
    const ResetConfigDatas = useResetRecoilState(CompleteRegisterDataStore);
    const Api = useRecoilValue(API);
    const ErrorDatas = useRecoilValue(errorLogRegisterForm);
    const [Loading, setLoading] = useState(false);
    const [imageUserCahed, setimageUserCahed] = useState(
        {} as ImagePickerAsset
    );
    const [imageFileAuthorityCahed, setImageFileAuthorityCahed] = useState(
        {} as ImagePickerAsset
    );
    // Datas For Image
    const setAuthStateUser = useSetRecoilState(StateUser);
    const setCenterWrapper = useSetRecoilState(CenterWrapperState);
    const useGalery = usePickerImage("Gallery", setimageUserCahed);
    const useCamera = usePickerImage("Camera", setimageUserCahed);

    //Querries
    //hooks To fetching datas
    const useFetchingMutation = useMutateWithToken();

    //Datas For Authority doc File
    const useGaleryForDocFile = usePickerImage(
        "Gallery",
        setImageFileAuthorityCahed
    );
    const useCameraForDocFile = usePickerImage(
        "Camera",
        setImageFileAuthorityCahed
    );

    //Tab datas
    // 1. Province
    const ProvincesTab = [
        {
            label: "Nord-Kivu",
            value: "Nord-Kivu",
        },
    ];

    // 2. city
    const CitiesTab = [
        {
            label: "Goma",
            value: "Goma",
        },
    ];

    // 3. gender
    const GendersTab = [
        {
            label: "Homme",
            value: "M",
        },
        {
            label: "Femme",
            value: "F",
        },
    ];

    // 4. Account Tab
    const AccountTab = [
        {
            label: "Citoyen",
            value: UserRole.CITIZEN,
        },
        {
            label: "Autorité",
            value: UserRole.AUTHORITY,
        },
    ];

    // 5. DropDown Tab
    const DropDownTab = [
        {
            //Provinces
            label: "Provinces",
            placeholder: "Nord-Kivu",
            Form: DropdownType.PROVINCE,
            Tab: ProvincesTab,
            selected: ConfigurationAccountDatas.Province,
            setValue: (NewProvince: string) =>
                setConfigurationAccountDatas({
                    ...ConfigurationAccountDatas,
                    Province: NewProvince,
                }),
        },
        {
            //City
            label: "Ville",
            placeholder: "Goma",
            Form: DropdownType.CITY,
            Tab: CitiesTab,
            selected: ConfigurationAccountDatas.Ville,
            setValue: (NewCity: string) =>
                setConfigurationAccountDatas({
                    ...ConfigurationAccountDatas,
                    Ville: NewCity,
                }),
        },
        {
            //Gender
            label: "Genre",
            placeholder: "~",
            Form: DropdownType.GENDER,
            Tab: GendersTab,
            selected: ConfigurationAccountDatas.Sexe,
            setValue: (GenderSelected: string) =>
                setConfigurationAccountDatas({
                    ...ConfigurationAccountDatas,
                    Sexe: GenderSelected,
                }),
        },
        {
            //Account Type
            label: "Type de compte",
            placeholder: "Citoyen",
            Form: DropdownType.ACCOUNTTYPE,
            Tab: AccountTab,
            selected: ConfigurationAccountDatas.AccountType,
            setValue: (AccountSelected: string) =>
                setConfigurationAccountDatas({
                    ...ConfigurationAccountDatas,
                    AccountType: AccountSelected,
                }),
        },
    ];
    // send Data function
    const ResetDatas = () => {
        ResetConfigDatas();
    };

    const Login = (OwnerUser: UserData, NewToken: string) => {
        LocalStorage.setAllDatas({
            email: OwnerUser.email,
            fName: OwnerUser.firstName,
            lName: OwnerUser.lastName,
            Province: OwnerUser.Province,
            City: OwnerUser.Ville,
            Gender: OwnerUser.Sexe,
            Phone: OwnerUser.Telephone,
            Status: OwnerUser.status,
            ImageProfile: OwnerUser.imageProfile,
            DocumentAuthority: OwnerUser.document ? OwnerUser.document : "",
            BirthYear: OwnerUser.birthYear,
            AccountType: OwnerUser.AccountType,
            idUser: OwnerUser._id,
        });

        UseToken.LogIn(NewToken); // save in Secure store a new User token
        setAuthStateUser({
            // updating User State and Change Navigator Routes
            isLogIn: UseToken.LogInState() ? true : false,
            isLogOut: UseToken.LogOutState() ? true : false,
        });
    };

    //Querries Functions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFecthingSuccess = (successDatas: any) => {
        setLoading(false);
        console.log("datas Success");
        console.log(successDatas);

        const OwnerUser: UserData = successDatas.user;

        //Login
        Login(OwnerUser, UserDatas.token);
    };
    const SendDatas = (profileImage: string, documentFile: null | string) => {
        const DatasToUpdated = {
            imageProfile: profileImage,
            Province: ConfigurationAccountDatas.Province,
            Sexe: ConfigurationAccountDatas.Sexe,
            birthYear: ConfigurationAccountDatas.birthYear,
            AccountType: ConfigurationAccountDatas.AccountType,
            Ville: ConfigurationAccountDatas.Ville,
            Telephone: ConfigurationAccountDatas.Telephone,
            document: documentFile,
        };

        useFetchingMutation.mutate({
            //Login
            methode: "PATCH",
            ApiLink: `${Api.LINK}`,
            EndPoint: `${Api.UPDATE_USER}`,
            dataToSending: DatasToUpdated,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handleError: (error: any) => console.log(error.response),
            handleSuccess: handleFecthingSuccess,
            Authorization: UserDatas.token,
        });
    };

    // iMAGE fUNCTIONS
    const PictureHandle = () => {
        setCenterWrapper({
            hidden: false,
            component: (
                <SelectUploadImageModeView
                    Camera={() => useCamera.LauchImage()} //useCamera
                    Gallery={() => useGalery.LauchImage()} //use Galery
                />
            ),
        });
    };

    const PictureHandleAuthorityFile = () => {
        setCenterWrapper({
            hidden: false,
            component: (
                <SelectUploadImageModeView
                    Camera={() => useCameraForDocFile.LauchImage()} //useCamera
                    Gallery={() => useGaleryForDocFile.LauchImage()} //use Galery
                />
            ),
        });
    };
    const uploadImage = async (Picture: {
        name: string | null | undefined;
        uri: string;
        type: string | null;
    }) => {
        const ImageForm = new FormData();

        ImageForm.append("image", {
            name: Picture.name,
            uri: Picture.uri,
            type: Picture.type,
        } as unknown as File);

        //Fetch Image
        const Result = await fetch(`${Api.LINK}${Api.UPLOAD_IMAGE}`, {
            method: "POST",
            body: ImageForm,
        });

        const datas = await Result.json();
        return datas.imageUrl;
    };

    const CreateImageUser = async () => {
        if (imageUserCahed.uri) {
            setLoading(true);
            const imageUser = await uploadImage({
                name: imageUserCahed.fileName,
                uri: imageUserCahed.uri,
                type: mime.getType(imageUserCahed.uri),
            });
            console.log("user datas");
            console.log(imageUser);
            // save Image Profile
            setConfigurationAccountDatas({
                ...ConfigurationAccountDatas,
                imageProfile: imageUser,
            });

            // upload Image of Document
            if (ConfigurationAccountDatas.AccountType == UserRole.AUTHORITY) {
                CreateImageAuthorityDoc(imageUser);
            } else {
                // else Sending datas
                SendDatas(imageUser, null);
            }
        }
    };

    const CreateImageAuthorityDoc = async (profileImage: string) => {
        if (imageFileAuthorityCahed.uri) {
            const imageDoc = await uploadImage({
                name: imageFileAuthorityCahed.fileName,
                uri: imageFileAuthorityCahed.uri,
                type: mime.getType(imageFileAuthorityCahed.uri),
            });
            console.log("Document datas");
            console.log(imageDoc);
            setConfigurationAccountDatas({
                ...ConfigurationAccountDatas,
                document: imageDoc,
            });

            // sending datas
            SendDatas(profileImage, imageDoc);
        }
    };

    useFocusEffect(
        useCallback(() => {
            return ResetDatas;
        }, [])
    );

    return (
        <View
            style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
            }}
        >
            <StyleBar
                theme={{
                    barStyle: AppTheme.barStyle,
                    background: AppTheme.background,
                }}
            />
            <ErrorServerMsgCard top={10} timer={6500} />
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                contentContainerStyle={{
                    width: "100%",
                    alignItems: "center",
                    paddingHorizontal: "6%",
                    justifyContent: "center",
                    rowGap: 10,
                }}
            >
                <Text
                    style={[
                        {
                            fontFamily: AppFont.Bold,
                            fontSize: 17,
                            color: AppTheme.main,
                            textAlign: "center",
                            textAlignVertical: "center",
                            width: "80%",
                            marginTop: 25,
                        },
                    ]}
                >
                    Terminer la configuration du compte
                </Text>
                <View style={[{ width: 90, height: 90 }]}>
                    <Image
                        source={
                            imageUserCahed.uri
                                ? { uri: imageUserCahed.uri }
                                : require("../../../assets/images/user.png")
                        }
                        style={{
                            width: "100%",
                            height: "100%",
                            borderWidth: 2,
                            borderColor: AppTheme.bgColorBlocs,
                        }}
                        borderRadius={imageUserCahed.uri ? 30 : 45}
                    />
                    <TouchableOpacity
                        onPress={PictureHandle}
                        style={[
                            {
                                position: "absolute",
                                backgroundColor: AppTheme.main,
                                padding: 1,
                                borderRadius: 20,
                                borderWidth: 2,
                                borderColor: AppTheme.background,
                                bottom: -2,
                                right: -2,
                            },
                        ]}
                    >
                        <PlusIcon color={AppTheme.mainfade} size={20} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text
                        style={[
                            {
                                fontFamily: AppFont.Bold,
                                fontSize: 15,
                                color: AppTheme.MainTextCards,
                                textAlign: "center",
                                textAlignVertical: "center",
                            },
                        ]}
                    >
                        {UserDatas.name}
                    </Text>
                    <Text
                        style={[
                            {
                                fontFamily: AppFont.Regular,
                                fontSize: 12,
                                color: AppTheme.mainText1,
                                textAlign: "center",
                                textAlignVertical: "center",
                                textDecorationLine: "underline",
                            },
                        ]}
                    >
                        {UserDatas.email}
                    </Text>
                </View>
                <View style={{ width: "100%", rowGap: 6 }}>
                    <>
                        {ConfigurationAccountTaabValue.map((item, indexTab) => (
                            <SingInUpInput
                                key={`${indexTab}_${item.label}`}
                                label={item.label}
                                placehold={item.placeholder}
                                _id={item.id}
                                _from={item.from}
                                secure={item.secure}
                                globalFormErrorState={false}
                                checked={item.checked}
                                ErrorType={item.errorType}
                            />
                        ))}
                    </>

                    <>
                        {DropDownTab.map((item, indexTab) => (
                            <ConfigurationsSelectDatas
                                Tab={item.Tab}
                                PlaceHolder={item.placeholder}
                                label={item.label}
                                selected={item.selected}
                                OnchangeValue={item.setValue}
                                from={item.Form}
                                key={`${indexTab}_${item.Form}`}
                            />
                        ))}
                    </>
                </View>
                <View style={{ width: "100%" }}>
                    {ConfigurationAccountDatas.AccountType ==
                    UserRole.AUTHORITY ? (
                        <TouchableOpacity
                            onPress={PictureHandleAuthorityFile}
                            style={[{ flexDirection: "row", columnGap: 5 }]}
                        >
                            <CloudArrowUpIcon
                                color={AppTheme.mainText1}
                                size={25}
                            />
                            <View>
                                <Text
                                    style={[
                                        {
                                            fontFamily: AppFont.Light,
                                            fontSize: 11,
                                            color: AppTheme.mainText1,
                                            textAlignVertical: "center",
                                            textDecorationLine: "underline",
                                        },
                                    ]}
                                >
                                    Ajoutez un document prouvant votre status
                                </Text>

                                <>
                                    {imageFileAuthorityCahed.uri ? (
                                        <Text
                                            numberOfLines={1}
                                            style={[
                                                {
                                                    fontFamily: AppFont.Bold,
                                                    fontSize: 11,
                                                    color: AppTheme.MainTextCards,
                                                    textAlignVertical: "center",
                                                },
                                            ]}
                                        >
                                            {imageFileAuthorityCahed.fileName}
                                        </Text>
                                    ) : null}
                                </>
                            </View>
                        </TouchableOpacity>
                    ) : null}
                </View>
                <View style={{ width: "100%", marginBottom: 25 }}>
                    <SingInUpBtn
                        value="Envoyer"
                        handleFunction={() => {
                            if (imageUserCahed.uri) {
                                CreateImageUser();
                            } else {
                                SetServerMessageDisplay({
                                    // Display Message Of Server
                                    hidden: false,
                                    message: "Complétez l'image de profil",
                                });
                            }
                        }}
                        isLoading={Loading}
                        disabled={
                            !ConfigurationAccountDatas.Telephone.length ||
                            ErrorDatas.invalidPhoneNumber ||
                            ErrorDatas.invalidBirthDay ||
                            ConfigurationAccountDatas.birthYear == "" ||
                            ConfigurationAccountDatas.Province == "" ||
                            ConfigurationAccountDatas.Ville == "" ||
                            ConfigurationAccountDatas.Sexe == "" ||
                            ConfigurationAccountDatas.AccountType == "" ||
                            (ConfigurationAccountDatas.AccountType ==
                                UserRole.AUTHORITY &&
                                !imageFileAuthorityCahed.uri) ||
                            Loading
                        }
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default UpdateUserDatas;
