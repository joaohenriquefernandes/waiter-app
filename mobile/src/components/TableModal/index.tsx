import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Form, Header, Input, ModalBody, Overlay } from './styles';
import { Close } from '../Icons/Close';
import { Button } from '../Button';
import { useState } from 'react';

interface ITableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({visible, onClose, onSave }: ITableModalProps) {
  const [table, setTable] = useState('0');
  const isAndroid = Platform.OS === 'android';
  function handleSave() {
    setTable('');
    onSave(table);
    onClose();
  }
  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight='600'>Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color='#666666'/>
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              value={table}
              placeholder='Número da mesa'
              placeholderTextColor='#666666'
              keyboardType='number-pad'
              onChangeText={setTable}
            />
            <Button
              onPress={handleSave}
              disabled={table.length === 0}
            >
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
