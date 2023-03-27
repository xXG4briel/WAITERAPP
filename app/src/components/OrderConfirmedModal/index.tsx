import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";

import { Container, OkButton } from "./styles"

import { Text } from "../Text";

interface OrderConfirmedModalProps {
    visible: boolean
    onOk: () => void
}

export function OrderConfirmedModal({visible, onOk}: OrderConfirmedModalProps){
    return (
        <Modal
            visible={visible}
            animationType="fade"
        >
            <Container>
                <CheckCircle/>
                <Text size={20} weight="600" color="#FFF" style={{ marginTop: 12 }}>
                    Pedido Confirmado
                </Text>
                <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
                    O pedido já entrou na lista de produção !
                </Text>

                <OkButton onPress={onOk}>
                    <Text color="#d73035" weight="600">
                        Ok
                    </Text>
                </OkButton>
            </Container>
        </Modal>
    );
}
