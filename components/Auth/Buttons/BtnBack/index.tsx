import React from "react";
import { TouchableOpacity, View } from "react-native";

//Hooks
import useColorTheme from "../../../../hooks/useTheme"; // color Theme
import { ArrowLeftIcon } from "react-native-heroicons/outline";

// constants
interface GoBackDatas {
    setNavigation: () => void;
}

const BackButton = (datas: GoBackDatas) => {
    // states
    const AppTheme = useColorTheme();
    return (
        <View style={[{ position: "absolute", left: "4%" }]}>
            <TouchableOpacity hitSlop={20} onPress={datas.setNavigation}>
                <ArrowLeftIcon size={16} color={AppTheme.MainTextCards} />
            </TouchableOpacity>
        </View>
    );
};

export default BackButton;
