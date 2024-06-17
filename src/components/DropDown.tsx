import { useState } from 'react';
import { TouchableOpacity, StyleSheet, FlatList, StyleProp, ViewStyle } from 'react-native';

import { Text } from './Themed';
import Modal from './Modal';

type Option = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  options?: Option[];
  label: string;
  onSelect?: (option: Option) => void;
  value?: string | number
};

type DropdownItemProps = { 
  selected?: boolean;
  onSelect: () => void;
  label: string | number
};

function DropdownItem({
  selected,
  onSelect,
  label
}: DropdownItemProps) {
  let style: StyleProp<ViewStyle> = styles.option;
  if(selected) {
    style = {
      ...style,
      backgroundColor: '#CEE6F8',
    }
  }
  return <TouchableOpacity onPress={onSelect} style={style}>
  <Text>{label}</Text>
</TouchableOpacity>
}

export default function Dropdown({ options = [], label, onSelect = () => {}, value='' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [_value, setValue] = useState<string | number>(value);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const onSelectHandler = (option: Option) => {
    onSelect(option);
    toggleIsOpen();
    setValue(option.value)
  };

  return (
    <>
      <TouchableOpacity onPress={toggleIsOpen}>
        <Text style={styles.toggle}>{_value || label}</Text>
      </TouchableOpacity>
      <Modal title={label} onToggle={toggleIsOpen} visible={isOpen}>
        <FlatList
          style={styles.container}
          data={options}
          renderItem={({ item: option }) => <DropdownItem selected={option.value === _value} onSelect={() => onSelectHandler(option)} label={option.label} />}
          keyExtractor={(item) => `${item.value}`}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
    paddingVertical: 10
  }
});