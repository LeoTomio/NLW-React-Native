import { Button } from "@/components/button";
import { PRODUCTS } from "@/utils/data/products";
import { FormatCurrency } from "@/utils/functions/format-currency";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons"
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";

export default function Product() {
    const cartStore = useCartStore();
    const navigation = useNavigation();
    const { id } = useLocalSearchParams()

    const product = PRODUCTS.filter((item) => item.id === id)[0]

    function handleAddToCart() { 
        cartStore.add(product)
        navigation.goBack()
    }


    return (
        <View className="flex-1">
            <Image
                source={product.cover}
                className="w-full h-52"
                resizeMode="cover" />

            <View className="p-5 mt-8 flex-1">
                <Text className="text-lime-400 text-2xl font-heading my-2">
                    {FormatCurrency(product.price)}
                </Text>
                <Text className="text-slate-400 font-body text-base leading-6 mb-6">
                    {product.description}
                </Text>
                {product.ingredients.map((ingredient) => (
                    <Text key={ingredient} className="text-slate-400 font-body text-base leading-6">
                        {"\u2022"}  {ingredient}
                    </Text>
                ))}

                <View className="p-5 pb-8 gap-5">
                    <Button onPress={handleAddToCart}>
                        <Button.Icon>
                            <Feather name="plus-circle" size={20} />
                        </Button.Icon>
                        <Button.Text>Adicionar ao pedido</Button.Text>
                    </Button>
                    <LinkButton title="Voltar ao cardápio" href="/" />
                </View>

            </View>
        </View>
    )

}