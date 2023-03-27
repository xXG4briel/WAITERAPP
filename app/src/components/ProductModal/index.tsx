import { Modal, FlatList } from "react-native";
import { Product } from "../../types/Product";
import { Close } from "../Icons/Close";
import { Text } from "../Text";

import {
    Image,
    CloseButton,
    Header,
    ModalBody,
    IngredientsContainer,
    Ingredient,
    FooterContainer,
    Footer,
    PriceContainer,
} from "./styles";

import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";

interface ProductModalProps {
    visible: boolean;
    onClose: () => void;
    product: null | Product;
    onAddToCart: (product: Product) => void
}

export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps) {

    function handleAddToCart() {
        onAddToCart(product!);
        onClose();
    }

    if (!product) {
        return null;
    }
    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <Image source={{ uri: product?.imagePath }}>
                <CloseButton onPress={onClose}>
                    <Close />
                </CloseButton>
            </Image>

            <ModalBody>
                <Header>
                    <Text size={24} weight="600">
                        {product?.name}
                    </Text>
                    <Text color="#666" style={{ marginTop: 8 }}>
                        {product?.description}
                    </Text>
                </Header>
                { product.ingredients.length > 0 && (
                    <IngredientsContainer>
                        <Text weight="600" color="#666">
                            Ingredientes
                        </Text>

                        <FlatList
                            style={{ marginTop: 16 }}
                            data={product?.ingredients}
                            keyExtractor={(ingredient) => ingredient._id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item: ingredient }) => (
                                <Ingredient>
                                    <Text>{ingredient.icon}</Text>
                                    <Text
                                        size={14}
                                        color="#666"
                                        style={{ marginLeft: 20 }}
                                    >
                                        {ingredient.name}
                                    </Text>
                                </Ingredient>
                            )}
                        />
                    </IngredientsContainer>
                )}
            </ModalBody>

            <Footer>
                <FooterContainer>
                    <PriceContainer>
                        <Text color="#666">Preço</Text>
                        <Text size={20} weight="600">
                            {formatCurrency(product?.price)}
                        </Text>
                    </PriceContainer>
                    <Button onPress={handleAddToCart}>Adcionar ao pedido</Button>
                </FooterContainer>
            </Footer>
        </Modal>
    );
}
