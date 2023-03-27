import { Modal } from "react-native"

import { Button } from "../Button";
import { Text } from "../Text";

import { Platform } from "react-native";

import { Overlay, ModalBody,Header, Form, Input } from "./styles"
import { useState } from "react";


interface TableModalProps {
    visible: boolean
    onSave: (table: string) => void
    onclose: () => void
}

export function TableModal({visible, onSave, onclose}: TableModalProps) {
    const isAndroid = Platform.OS == 'android';

    const [table, setTable] = useState('');


    function handleSave() {
        setTable('');
        onSave(table);
        onclose();
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <Overlay behavior={isAndroid ? 'height' : "padding"}>
                <ModalBody>
                    <Header>
                        <Text weight="600" size={16}>Informe a mesa</Text>
                    </Header>
                    <Form>
                        <Input
                            value={table}
                            placeholder="Número da mesa"
                            placeholderTextColor={"#666"}
                            keyboardType={"number-pad"}
                            onChangeText={setTable}
                        />
                        <Button onPress={handleSave} disabled={table.length === 0}>
                            Salvar
                        </Button>
                    </Form>
                </ModalBody>
            </Overlay>
        </Modal>
    );
}
