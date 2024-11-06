import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

//atoms AND recoil functions
import { useRecoilState, useSetRecoilState } from "recoil";
import { AlerteState } from "../../../../State/Auth/Wrappers";
import {
    CartList,
    LikedList,
    CartListCount,
} from "../../../../State/Auth/CartLikes";

//customs Hooks
import useColorTheme from "../../../../hooks/useTheme";
import { useCartList, useLikesList } from "../../../../hooks/useCartLoveList";

//Components
import {
    HeartIcon as OutLineHeart,
    ShoppingCartIcon as OutLineBag,
} from "react-native-heroicons/outline";
import {
    HeartIcon as Solidheart,
    ShoppingCartIcon as SolidBag,
} from "react-native-heroicons/solid";

//constants
interface btnDatas {
    tabForActions: "CART" | "LIKED";
    dynamicBakgroundColor: boolean;
    idProduct: string;
    nameProduct: string;
}

const CartLikedButton = (datas: btnDatas) => {
    //Atoms
    const [CartTab, setCartTab] = useRecoilState(CartList);
    const [CountsTab, setCountsTab] = useRecoilState(CartListCount);
    const [LikesTab, setLikes] = useRecoilState(LikedList);
    const setStateOfAlert = useSetRecoilState(AlerteState);

    //states
    const [Loading, setLoading] = useState(true);
    const [CartOrLikes, setCartOrLikes] = useState("CART");
    const AppTheme = useColorTheme();
    const [Icon, setIcon] = useState({
        solid: Solidheart,
        outline: OutLineHeart,
    });

    //initialize Hooks manager Cart and Likes Tabs
    const [useCart, setuseCart] = useState(
        useCartList(CartTab, setCartTab, CountsTab, setCountsTab)
    );
    const [useLikes, setuseLikes] = useState(useLikesList(LikesTab, setLikes));

    useEffect(() => {
        switch (datas.tabForActions) {
            case "CART":
                setCartOrLikes("CART");
                setIcon({
                    solid: SolidBag,
                    outline: OutLineBag,
                });
                setuseCart(
                    useCartList(CartTab, setCartTab, CountsTab, setCountsTab)
                );
                break;
            case "LIKED":
                setCartOrLikes("LIKED");
                setIcon({
                    solid: Solidheart,
                    outline: OutLineHeart,
                });
                setuseLikes(useLikesList(LikesTab, setLikes));
                break;
        }
        setLoading(false);
    }, [CartTab, LikesTab]);

    const LikesClick = () => {
        setLoading(true);
        if (useLikes.isAvailable(datas.idProduct)) {
            console.log("Unliking...");
            // if is available in Tab list , to delete
            setTimeout(() => {
                useLikes.removeItem(datas.idProduct).then((message) => {
                    console.log(message);

                    //after CardDeleted hiddenWrapper
                    setLoading(false);
                });
            }, 0);
        } else {
            console.log("Liking ...");
            //if is not available in Tab list,It's adding
            setTimeout(() => {
                useLikes.addNewItem(datas.idProduct).then((message) => {
                    console.log(message);

                    //after CardDeleted hiddenWrapper
                    setLoading(false);
                });
            }, 0);
        }
    };

    const CartClick = () => {
        setLoading(true);

        if (useCart.isAvailable(datas.idProduct)) {
            console.log("Deleting ...");

            // if is available in Tab list , to delete
            setTimeout(() => {
                useCart.removeItem(datas.idProduct).then((message) => {
                    console.log(message);
                    setStateOfAlert({
                        Product: datas.nameProduct,
                        hidden: false,
                        isSuccess: false,
                        action: "Remove",
                        message: "In Your Cart",
                    });
                    //after CardDeleted hiddenWrapper
                    setLoading(false);
                });
            }, 0);
        } else {
            console.log("Adding ...");

            //if is not available in Tab list,It's adding
            setTimeout(() => {
                useCart.addNewItem(datas.idProduct).then((message) => {
                    console.log(message);
                    setStateOfAlert({
                        Product: datas.nameProduct,
                        hidden: false,
                        isSuccess: true,
                        action: "Add",
                        message: " In Your Cart",
                    });
                    //after CardDeleted hiddenWrapper
                    setLoading(false);
                });
            }, 0);
        }
    };

    return (
        <Animated.View>
            {Loading ? (
                <View
                    style={[
                        {
                            flex: 1,
                            padding: 4,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <ActivityIndicator color={AppTheme.mainText1} size={18} />
                </View>
            ) : (
                <TouchableOpacity
                    hitSlop={2}
                    onPress={CartOrLikes == "CART" ? CartClick : LikesClick}
                    style={[
                        {
                            borderRadius: 20,
                            padding: datas.dynamicBakgroundColor ? 5 : 4,
                            backgroundColor: datas.dynamicBakgroundColor
                                ? AppTheme.background
                                : "#f8f8f8",
                            elevation: datas.dynamicBakgroundColor ? 0 : 6,
                        },
                    ]}
                >
                    {CartOrLikes == "CART" ? (
                        useCart.isAvailable(datas.idProduct) ? (
                            <Icon.solid
                                color={AppTheme.main}
                                size={datas.dynamicBakgroundColor ? 16 : 18}
                            />
                        ) : (
                            <Icon.outline
                                color={
                                    datas.dynamicBakgroundColor
                                        ? AppTheme.mainText1
                                        : "#575759"
                                }
                                size={datas.dynamicBakgroundColor ? 16 : 18}
                            />
                        )
                    ) : useLikes.isAvailable(datas.idProduct) ? (
                        <Icon.solid
                            color={AppTheme.main}
                            size={datas.dynamicBakgroundColor ? 16 : 18}
                        />
                    ) : (
                        <Icon.outline
                            color={
                                datas.dynamicBakgroundColor
                                    ? AppTheme.mainText1
                                    : "#575759"
                            }
                            size={datas.dynamicBakgroundColor ? 16 : 18}
                        />
                    )}
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

export default CartLikedButton;
