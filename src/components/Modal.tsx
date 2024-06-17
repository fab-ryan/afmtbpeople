import { ReactNode } from 'react';
import { Modal, StyleSheet } from 'react-native';

import { View, Text, Icon } from '../components/Themed';
import { IconButton } from '../components/Button';

type props = {
  visible?: boolean;
  onToggle?: () => void;
  children?: ReactNode;
  title?: string;
};

export default function CustomModal({
  visible,
  onToggle,
  children,
  title,
}: props) {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onToggle}
      statusBarTranslucent
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <IconButton
              style={styles.closeBtn}
              title='Close'
              onPress={onToggle as () => void}
            >
              <Icon
                name='close'
                size={30}
                color='black'
              />
            </IconButton>
            <Text style={styles.modalTitle}>{title}</Text>
            <View />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingHorizontal: 35,
    paddingBottom: 35,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: '600',
    fontSize: 18,
    alignSelf: 'center',
  },
  closeBtn: {
    marginRight: -17.5,
  },
});
