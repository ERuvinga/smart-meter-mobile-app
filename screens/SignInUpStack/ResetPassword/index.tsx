//import React tools and style
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImagePickerAsset } from "expo-image-picker";
import mime from "mime";

//custom Hooks
import usePickerImage from "../../../hooks/usePicImage";
import useColorTheme from "../../../hooks/useTheme";
import { useMutate } from "../../../hooks/useFetch";

//Atoms Recoil and states
import { CenterWrapperState } from "../../../State/Auth/Wrappers";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
    errorLogRegisterForm,
    ActivateAccountDatas,
    MsgServerState,
} from "../../../State/SignInUpDatas";
import { API } from "../../../State/Global";

//Components
import SingInUpInput from "../../../components/SingInUp/SingInUpInput";
import SingInUpBtn from "../../../components/SingInUp/SingInUpBtn";
import StyleBar from "../../../components/CommonComponents/statusBar";
import { PlusIcon } from "react-native-heroicons/solid";
import ErrorServerMsgCard from "../../../components/SingInUp/MessageServer";
import SelectUploadImageModeView from "../../../components/Auth/Wrapper/Views/UploadImageMode";

//Tools and Styles
import SignInUpStyle from "../../../style/screens/SignIUpStyle";
import { RootStackParamList, Routes } from "../../../hooks/useNavigation";
import { ResetTabValues } from "../../../Constants/tabLists";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Constantes
type navigationProps = NativeStackScreenProps<RootStackParamList>;

const ConfigureAccountScreen = ({ navigation }: navigationProps) => {
    //states
    const AppTheme = useColorTheme();
    const Activedatas = useRecoilValue(ActivateAccountDatas);
    const ErrorDatas = useRecoilValue(errorLogRegisterForm);
    const Api = useRecoilValue(API);

    // images States
    const [imageUserCahed, setimageUserCahed] = useState(
        {} as ImagePickerAsset
    );
    const [Loading, setLoading] = useState(false);
    const setCenterWrapper = useSetRecoilState(CenterWrapperState);
    const useGalery = usePickerImage("Gallery", setimageUserCahed);
    const useCamera = usePickerImage("Camera", setimageUserCahed);

    //server messages
    const SetServerMessageDisplay = useSetRecoilState(MsgServerState);

    const SetResetForgotDatas = useResetRecoilState(ActivateAccountDatas);
    const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);
    //hooks To fetching datas
    const useFetchToResetPassword = useMutate();

    const ResetAllState = () => {
        // Resets All States
        SetResetForgotDatas();
        SetResetMsgOfServerStates();
    };

    //HANDLES
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
    // UPLOAD IMAGE handles
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
        setLoading(false);
        return datas;
    };

    const CreateImageUser = async () => {
        console.log(imageUserCahed);
        if (imageUserCahed.uri) {
            setLoading(true);

            const imageUser: { Url: string; secureUrl: string } =
                await uploadImage({
                    name: imageUserCahed.fileName,
                    uri: imageUserCahed.uri,
                    type: mime.getType(imageUserCahed.uri),
                });

            console.log("user datas");
            console.log(imageUser);
            // save Image Profile
            SendeDatas(imageUser.Url, imageUser.secureUrl);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFecthingError = (errorServer: any) => {
        console.log(errorServer.response.data);
        SetServerMessageDisplay({
            hidden: false,
            message: errorServer.response.data.msg,
        });
    };

    const handleFecthingSuccess = () => {
        //Reset datas
        ResetAllState();
        //display message to use, go to Login
        navigation.replace(Routes.SIGNIN);
    };

    // send Data function
    const SendeDatas = (cover: string, secureCover: string) => {
        console.log(Activedatas);
        useFetchToResetPassword.mutate({
            methode: "PUT",
            ApiLink: `${Api.LINK}`,
            EndPoint: `${Api.UPDATE_USER}`,
            dataToSending: {
                Token: Activedatas.code,
                email: Activedatas.email,
                password: Activedatas.newPassword,
                cover: cover,
                secureCover: secureCover,
            },
            handleError: handleFecthingError,
            handleSuccess: handleFecthingSuccess,
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: AppTheme.background }}>
            <ErrorServerMsgCard top={10} timer={6500} />
            <KeyboardAwareScrollView
                contentContainerStyle={[
                    SignInUpStyle.Container,
                    {
                        backgroundColor: AppTheme.background,
                        width: "100%",
                        alignItems: "center",
                        paddingHorizontal: "6%",
                        justifyContent: "center",
                        rowGap: 10,
                    },
                ]}
                enableOnAndroid={true}
            >
                <StyleBar
                    theme={{
                        barStyle: AppTheme.barStyle,
                        background: AppTheme.background,
                    }}
                />
                <View style={[{ width: 80, height: 80 }]}>
                    <Image
                        source={
                            imageUserCahed.uri
                                ? { uri: imageUserCahed.uri }
                                : require("../../../assets/images/Placeholders/profile.png")
                        }
                        style={{
                            width: "100%",
                            height: "100%",
                            borderWidth: 2,
                            borderColor: AppTheme.bgColorBlocs,
                        }}
                        borderRadius={40}
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

                <View style={[SignInUpStyle.FormInput]}>
                    {ResetTabValues.map((item, indexTab) => (
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
                </View>
                <View style={SignInUpStyle.SendForgotBtn}>
                    <SingInUpBtn
                        value="Envoyer"
                        isLoading={useFetchToResetPassword.isLoading || Loading}
                        handleFunction={() => {
                            if (imageUserCahed.uri) {
                                CreateImageUser();
                            } else {
                                SetServerMessageDisplay({
                                    // Display Message Of Server
                                    hidden: false,
                                    message: "Complétez l'image de profile",
                                });
                            }
                        }}
                        disabled={
                            ErrorDatas.pswdAndCofirmResetPswd ||
                            ErrorDatas.RegisterInvalidStrongPswd ||
                            Activedatas.newPassword == "" ||
                            Activedatas.confirmPassWord == ""
                        }
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default ConfigureAccountScreen;
