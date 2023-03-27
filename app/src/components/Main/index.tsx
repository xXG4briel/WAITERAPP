import { Header } from "../Header/index";

import {
    Container,
    CategoriesContainer,
    MenuContainer,
    Footer,
    FooterContainer,
    CenteredContainer,
} from "./styles";

import { useState } from "react";
import { ActivityIndicator } from "react-native";

import { Categories } from "../Categories";
import { Menu } from "../Menu";
import { TableModal } from "../TableModal";
import { Button } from "../Button";
import { Cart } from "../Cart";
import { Text } from "../Text";

import { Empty } from "../Icons/Empty";

import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";

import { products as MockProducts } from "../../mocks/products";

export function Main() {
    const [isLoading] = useState(false);
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState("");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products] = useState<Product[]>(MockProducts);

    function handleSaveTable(table: string) {
        setSelectedTable(table);
        setIsTableModalVisible(false);
    }
    function handleResetOrder() {
        setSelectedTable("");
        setCartItems([]);
    }
    function handleAddToCart(product: Product) {
        if (!selectedTable) {
            setIsTableModalVisible(true);
        }
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItem) => cartItem.product._id === product._id
            );
            if (itemIndex < 0) {
                return prevState.concat({ quantity: 1, product });
            }

            const newCartItems = [...prevState];
            const item = newCartItems[itemIndex];
            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity + 1,
            };

            return newCartItems;
        });
    }
    function handleDecrementToCart(product: Product) {
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItem) => cartItem.product._id === product._id
            );
            const newCartItems = [...prevState];
            const item = newCartItems[itemIndex];

            if (item.quantity == 1) {
                newCartItems.splice(itemIndex, 1);
                return newCartItems;
            }

            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity - 1,
            };

            return newCartItems;
        });
    }

    return (
        <>
            <Container>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleResetOrder}
                />

                {isLoading && (
                    <CenteredContainer>
                        <ActivityIndicator color="#D73035" size={"large"} />
                    </CenteredContainer>
                )}

                {!isLoading && (
                    <>
                        <CategoriesContainer>
                            <Categories></Categories>
                        </CategoriesContainer>

                        {products.length === 0
                        ? (
                            <MenuContainer>
                                <Menu
                                    onAddToCart={handleAddToCart}
                                    products={products}
                                />
                            </MenuContainer>
                        )
                        : (
                            <CenteredContainer>
                                <Empty/>
                                <Text color="#666" style={{ marginTop: 24 }}>Nenhum pedido foi encontrado</Text>
                            </CenteredContainer>
                        )
                        }
                    </>
                )}
            </Container>
            <Footer>
                <FooterContainer>
                    {!selectedTable && (
                        <Button
                            onPress={() => setIsTableModalVisible(true)}
                            disabled={isLoading}
                        >
                            Novo Pedido
                        </Button>
                    )}
                    {selectedTable && (
                        <Cart
                            cartItems={cartItems}
                            onAdd={handleAddToCart}
                            onDecrement={handleDecrementToCart}
                            onConfirmOrder={handleResetOrder}
                        />
                    )}
                </FooterContainer>
            </Footer>
            <TableModal
                visible={isTableModalVisible}
                onSave={handleSaveTable}
                onclose={() => setIsTableModalVisible(false)}
            />
        </>
    );
}
