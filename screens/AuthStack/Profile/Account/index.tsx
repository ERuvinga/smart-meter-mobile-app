//import React tools and style
import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//Customs Hooks
import useColorTheme from "../../../../hooks/useTheme";
import useCustomFont from "../../../../hooks/useCustomFont";
import useLocalStorage from "../../../../hooks/UselocalDatas";

//Atoms Recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DefaultPictures } from "../../../../State/Auth/User";
import { CenterWrapperState } from "../../../../State/Auth/Wrappers";

//Components
import { ArrowLeftStartOnRectangleIcon } from "react-native-heroicons/outline";
import StyleBar from "../../../../components/CommonComponents/statusBar";
import UserItemDatas from "../../../../components/Auth/Cards/ItemsUserDatasProfile";
import LogoutView from "../../../../components/Auth/Wrapper/Views/LogoutView";

//Tools and Styles
import GlobalStyle from "../../../../style/global";
import { UserRole } from "../../../../Constants/Types";

//Constantes
const AppFont = useCustomFont();

const UserAccountDatasScreen = () => {
    //states
    const AppTheme = useColorTheme();
    const Insets = useSafeAreaInsets();
    const LocalStorage = useLocalStorage();
    const DefaultImages = useRecoilValue(DefaultPictures);
    const setCenterWrapper = useSetRecoilState(CenterWrapperState);

    //handles
    const displayWrapper = () => {
        setCenterWrapper({
            hidden: false,
            component: <LogoutView />,
        });
    };

    const TabOfUserDatas = [
        {
            label: "Nom",
            value: LocalStorage.getName().split(" ")[0],
            isUpdated: true,
        },
        {
            label: "Post-Nom",
            value: LocalStorage.getName().split(" ")[1],
            isUpdated: true,
        },
        {
            label: "email",
            value: LocalStorage.getEmail(),
            isUpdated: true,
        },
        {
            label: "Téléphone",
            value: LocalStorage.getPhone(),
            isUpdated: true,
        },
        {
            label: "Type de compte",
            value:
                LocalStorage.getUserRole() == UserRole.ADMIN_PARC
                    ? "Administrateur"
                    : LocalStorage.getUserRole() == UserRole.LOCATOR
                      ? "Client"
                      : "Revendeur",
            isUpdated: true,
        },
    ];

    return (
        <View
            style={[
                GlobalStyle.SafeArea,
                {
                    backgroundColor: AppTheme.background,
                    marginTop: Insets.top,
                    marginBottom: Insets.bottom,
                    marginLeft: Insets.left,
                    marginRight: Insets.right,
                },
            ]}
        >
            <StyleBar
                theme={{
                    barStyle: AppTheme.barStyle,
                    background: AppTheme.background,
                }}
            />
            <View style={[Styles.Container]}>
                <TouchableOpacity
                    hitSlop={10}
                    style={[{ padding: 6, alignItems: "flex-end" }]}
                    onPress={displayWrapper}
                >
                    <ArrowLeftStartOnRectangleIcon
                        color={AppTheme.mainText1}
                        size={25}
                    />
                </TouchableOpacity>

                <View style={[Styles.UserDatasContainer]}>
                    <View
                        style={[
                            { width: 70, height: 70, position: "relative" },
                        ]}
                    >
                        <Image
                            source={
                                LocalStorage.getImage()
                                    ? { uri: LocalStorage.getImage() }
                                    : DefaultImages.User
                            }
                            style={{ width: "100%", height: "100%" }}
                            borderRadius={8}
                        />
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
                            {LocalStorage.getName()}
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
                            {LocalStorage.getEmail()}
                        </Text>
                    </View>
                </View>
                <FlatList
                    contentContainerStyle={{
                        paddingVertical: 15,
                        paddingHorizontal: 15,
                        flexGrow: 1,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: AppTheme.bgColorBlocs,
                        elevation: 4,
                    }}
                    data={TabOfUserDatas}
                    initialNumToRender={200}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `${item.label}_${index}`}
                    renderItem={({ item }) => {
                        return (
                            <UserItemDatas
                                label={item.label}
                                value={item.value}
                                isUpdated={item.isUpdated}
                            />
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default UserAccountDatasScreen;

const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingTop: 10,
    },

    UserDatasContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 5,
        paddingVertical: 10,
    },
    List: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: "6%",
    },
});
