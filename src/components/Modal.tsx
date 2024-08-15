import { ReactNode } from 'react';
import { Modal, StyleSheet } from 'react-native';

import { View, Text, Icon } from '../components/Themed';
import { IconButton } from '../components/Button';

type props = {
  visible?: boolean;
  onToggle?: () => void;
  children?: ReactNode;
  title?: string;
  modal_only?: boolean;
};

export default function CustomModal({
  visible,
  onToggle,
  children,
  title,
  modal_only = true,
}: props) {
  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={visible}
      onRequestClose={onToggle}
      statusBarTranslucent
    >
      <View style={styles.centeredView}>
        <View style={modal_only ? styles.modalView : styles.modalView_dark}>
          {modal_only && (
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
          )}
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
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingHorizontal: 35,
    paddingBottom: 35,
    paddingTop: 20,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView_dark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    paddingBottom: 20,
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
