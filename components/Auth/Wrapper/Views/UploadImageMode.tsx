import React, { ReactElement } from "react";
import { PhotoIcon, CameraIcon } from "react-native-heroicons/outline";
import { Text, TouchableOpacity, View } from "react-native";

//Stores and Recoil
import { useSetRecoilState } from "recoil";
import { CenterWrapperState } from "../../../../State/Auth/Wrappers";
//import { OwnerUser } from "../../../../State/Auth/Users";

//Custom Hooks
import useColorTheme from "../../../../hooks/useTheme";
import useCustomFont from "../../../../hooks/useCustomFont";
const AppFont = useCustomFont();

interface datasOfBtn {
    icon: ReactElement;
    label: string;
    action: () => void;
    index: number;
}

// component Button
const BtnActions = (datas: datasOfBtn) => {
    const AppTheme = useColorTheme();
    return (
        <TouchableOpacity
            onPress={datas.action}
            style={[
                {
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 5,
                    paddingVertical: 3,
                },
            ]}
        >
            <>{datas.icon}</>
            <Text
                style={[
                    {
                        fontFamily: AppFont.Regular,
                        color: AppTheme.mainText1,
                        textAlignVertical: "bottom",
                        fontSize: 13,
                    },
                ]}
            >
                {datas.label}
            </Text>
        </TouchableOpacity>
    );
};

interface SelectModeActions {
    Gallery: () => void;
    Camera: () => void;
}
//Components displya in Remove View
const SelectModeImageView = (ActinonsDatas: SelectModeActions) => {
    //states
    const AppTheme = useColorTheme();
    const setCenterWrapper = useSetRecoilState(CenterWrapperState);

    //Handles
    //handle manager Bottom Wrapper used to remove Product in CartList
    const hiddenWrapper = () => {
        setCenterWrapper({
            hidden: true,
            component: <></>,
        });
    };
    const TabItems = [
        {
            label: "Prendre une Photo",
            icon: <CameraIcon size={20} color={AppTheme.mainText1} />,
            actionBtn: ActinonsDatas.Camera,
        },
        {
            label: "Ouvrir la Gallerie",
            icon: <PhotoIcon size={20} color={AppTheme.mainText1} />,
            actionBtn: ActinonsDatas.Gallery,
        },
    ] as { label: string; icon: ReactElement; actionBtn: () => void }[];

    return (
        <View
            style={[
                {
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 18,
                },
            ]}
        >
            <View
                style={[
                    {
                        width: "100%",
                        rowGap: 12,
                        paddingVertical: 5,
                    },
                ]}
            >
                {TabItems.map((item, index) => (
                    <BtnActions
                        key={`${item.label}_${index}`}
                        icon={item.icon}
                        action={() => {
                            hiddenWrapper();
                            item.actionBtn();
                        }}
                        label={item.label}
                        index={index}
                    />
                ))}
            </View>
        </View>
    );
};

export default SelectModeImageView;
