import { Modal } from 'react-native';
import { Container, OkButton } from './styles';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';

interface IOrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({ visible, onOk }: IOrderConfirmedModalProps) {
  return (
    <Modal
      visible={visible}
      animationType='fade'
    >
      <Container>
        <CheckCircle />
        <Text size={20} weight='600' color='#FFFFFF' style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color='#FFFFFF' opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>
        <OkButton onPress={onOk}>
          <Text color='#FFFFFF' weight='600'>OK</Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
