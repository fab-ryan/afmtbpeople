import { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Text } from './Themed';
import Modal from './Modal';
import { lightTheme } from '@constants/Colors';

type Option = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  options?: Option[];
  label: string;
  onSelect?: (option: Option) => void;
  value?: string | number | null;
};

type DropdownItemProps = {
  selected?: boolean;
  onSelect: () => void;
  label: string | number;
};

function DropdownItem({ selected, onSelect, label }: DropdownItemProps) {
  let style: StyleProp<ViewStyle> = styles.option;
  if (selected) {
    style = {
      ...style,
      backgroundColor: '#CEE6F8',
    };
  }
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={style}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

export default function Dropdown({
  options = [],
  label,
  onSelect = () => {},
  value = null,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [_value, setValue] = useState<{
    label: string | number;
    value: string | number;
  } | null>();

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSelectHandler = (option: Option) => {
    onSelect(option);
    toggleIsOpen();
    setValue(option);
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleIsOpen}
        style={styles.optionsContainer}
      >
        <Text style={styles.toggle}>{_value?.label || label}</Text>
      </TouchableOpacity>
      <Modal
        title={label}
        onToggle={toggleIsOpen}
        visible={isOpen}
      >
        <FlatList
          style={styles.container}
          data={options}
          renderItem={({ item: option }) => (
            <DropdownItem
              selected={option.value === _value?.value}
              onSelect={() => onSelectHandler(option)}
              label={option.label}
            />
          )}
          keyExtractor={(item) => `${item.value}`}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: lightTheme.text,
  },
  option: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: 20,
  },
  toggle: {
    paddingVertical: 10,
    fontSize: 16,
    color: 'gray',
  },
});
