import React from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

//Recoil and Atoms

//Customs Hooks
import useCustomFont from "../../../../hooks/useCustomFont";
import useColorTheme from "../../../../hooks/useTheme";

//Constants
const AppFont = useCustomFont();

import { CheckCircleIcon } from "react-native-heroicons/solid";

//Components
interface itemDatas {
    label: string;
    selected: boolean | undefined;
    AppTheme: {
        MaintextCard: string;
        main: string;
        bgColor: string;
    };
}
const renderItemComponent = (item: itemDatas) => {
    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: item.selected
                        ? item.AppTheme.bgColor
                        : "transparent",
                    columnGap: 8,
                },
            ]}
        >
            <Text
                numberOfLines={1}
                style={[
                    {
                        flex: 1,
                        fontFamily: AppFont.Regular,
                        color: item.AppTheme.MaintextCard,
                        fontSize: 12,
                    },
                ]}
            >
                {item.label}
            </Text>
            <View style={[{ minWidth: 20, minHeight: 20 }]}>
                {item.selected ? (
                    <CheckCircleIcon color={item.AppTheme.main} size={20} />
                ) : null}
            </View>
        </View>
    );
};

interface selecteDatas {
    Tab: { label: string; value: number }[];
    PlaceHolder: string;
    OnchangeValue: (newValue: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selected: any;
    label: string;
}
const ConfigurationsSelectDatas = (datas: selecteDatas) => {
    // Atoms
    const AppTheme = useColorTheme();

    // return function
    return (
        <View style={{ rowGap: 4 }}>
            <View>
                <Text
                    style={[
                        {
                            color: AppTheme.mainText1,
                            fontFamily: AppFont.Regular,
                            fontSize: 11,
                        },
                    ]}
                >
                    {datas.label}
                </Text>
            </View>
            <Dropdown
                style={[
                    {
                        paddingHorizontal: 8,
                        paddingVertical: 5,
                        borderColor: AppTheme.mainText1,
                        borderWidth: 1,
                        borderRadius: 4,
                        width: "100%",
                        minHeight: 40,
                    },
                ]}
                showsVerticalScrollIndicator={false}
                fontFamily={AppFont.Regular}
                dropdownPosition="top"
                placeholderStyle={[{ color: AppTheme.mainText1, fontSize: 11 }]}
                selectedTextStyle={[
                    {
                        color: AppTheme.MainTextCards,
                        fontSize: 11,
                    },
                ]}
                containerStyle={[
                    {
                        backgroundColor: AppTheme.bgColorBlocs,
                        borderRadius: 4,
                        marginBottom: 6,
                    },
                ]}
                itemTextStyle={[
                    {
                        color: AppTheme.main,
                        fontSize: 13,
                    },
                ]}
                activeColor={AppTheme.background}
                renderItem={(item, selected) =>
                    renderItemComponent({
                        label: item.label,
                        selected: selected,
                        AppTheme: {
                            MaintextCard: AppTheme.MainTextCards,
                            main: AppTheme.main,
                            bgColor: AppTheme.background,
                        },
                    })
                }
                data={datas.Tab ? datas.Tab : []}
                confirmSelectItem={true}
                labelField="label"
                valueField="value"
                placeholder={datas.PlaceHolder}
                value={datas.selected}
                onChange={(item) => {
                    datas.OnchangeValue(item.value);
                }}
            />
        </View>
    );
};

export default ConfigurationsSelectDatas;
