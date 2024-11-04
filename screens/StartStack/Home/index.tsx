//import React tools and
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Components
import PresentationView from "../../../components/PresentationView";
import StyleBar from "../../../components/CommonComponents/statusBar";

//Constant && hooks
import { RootStackParamList, Routes } from "../../../hooks/useNavigation";
import useColorTheme from "../../../hooks/useTheme";

//Types of navigation  props
type navigationProps = NativeStackScreenProps<RootStackParamList>;

//App
const HomeScreen = ({ navigation }: navigationProps) => {
    // 1.Start page datas
    const StartPageDatas = {
        mainText: "Gérez facilement votre eau.",
        descriptionText:
            " Utiliser des technologies intelligentes pour contrôler et optimiser votre consommation d'eau, que ce soit à la maison, au travail ou en déplacement.",
        image: require("../../../assets/images/Starting.png"),
    };

    //states
    const AppTheme = useColorTheme(); // theme of App
    const Insets = useSafeAreaInsets();

    return (
        <View
            style={[
                {
                    backgroundColor: AppTheme.background,
                    marginTop: Insets.top,
                    marginBottom: Insets.bottom,
                    marginLeft: Insets.left,
                    marginRight: Insets.right,
                    flex: 1,
                },
            ]}
        >
            <StyleBar
                theme={{
                    barStyle: AppTheme.barStyle,
                    background: AppTheme.background,
                }}
            />
            <View style={{ width: "100%", flex: 1 }}>
                <PresentationView
                    goTo={() => navigation.navigate(Routes.SIGNIN)}
                    mainText={StartPageDatas.mainText}
                    descriptionText={StartPageDatas.descriptionText}
                    linkToimage={StartPageDatas.image}
                />
            </View>
        </View>
    );
};

export default HomeScreen;
