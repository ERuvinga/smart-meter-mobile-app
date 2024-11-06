// using icon font format , this component return a Icone designed

import React from "react";
import { Text } from "react-native";
import { decode } from "html-entities";
import useCustomFont from "../../hooks/useCustomFont";

interface PaintingIcons {
    color: string;
    value: string;
    size: number;
}

// const Datas
const AppFont = useCustomFont();
const EncodeIcon = (codeCar: string) => `&#x${codeCar}`; // adding first caracters to icone

const Icon = (datas: PaintingIcons) => {
    const Htmlentitie = decode(EncodeIcon(datas.value)); // create Entities

    return (
        <Text
            style={[
                {
                    fontFamily: AppFont.Icons,
                    fontSize: datas.size,
                    color: datas.color,
                    textAlign: "center",
                    verticalAlign: "middle",
                    width: "auto",
                },
            ]}
        >
            {Htmlentitie}
        </Text>
    );
};

export default Icon;
