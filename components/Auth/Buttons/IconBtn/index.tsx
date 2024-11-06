import React from "react";
import { TouchableOpacity, View } from "react-native";

//customs Hooks
import useColorTheme from "../../../../hooks/useTheme";

//constants
interface btnDatas {
    dynamicBakgroundColor: boolean;
    //
    Icone: React.JSX.Element;
    action: () => void;
}

const IconBtn = (datas: btnDatas) => {
    const AppTheme = useColorTheme();
    return (
        <View>
            <TouchableOpacity
                onPress={datas.action}
                hitSlop={5}
                style={[
                    {
                        borderRadius: 20,
                        padding: 4,
                        backgroundColor: datas.dynamicBakgroundColor
                            ? AppTheme.background
                            : "#f8f8f8",
                        elevation: datas.dynamicBakgroundColor ? 0 : 6,
                    },
                ]}
            >
                {datas.Icone}
            </TouchableOpacity>
        </View>
    );
};

export default IconBtn;
