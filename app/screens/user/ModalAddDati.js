import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const ModalAddDati = () => {
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');
  const [parteCorpo, setParteCorpo] = React.useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  return (
    <Provider>
      <Portal styel={{padding: 20,}}>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={style.modal}>
          <DropDownPicker
            items={[
              {
                label: 'braccia Dx', value: 'usa',
                icon: () => <Icon name="arms" size={18} color="#900" />,
                hidden: true,
              },
              {
                label: 'braccia Sx', value: 'usa',
                icon: () => <Icon name="arms" size={18} color="#900" />,
                hidden: true
              },
              {
                label: 'addome', value: 'uk',
                icon: () => <Icon name="arms" size={18} color="#900" />
              },
              {
                label: 'vita', value: 'uk',
                icon: () => <Icon name="arms" size={18} color="#900" />
              },
              {
                label: 'gamba Dx', value: 'uk',
                icon: () => <Icon name="arms" size={18} color="#900" />
              },
              {
                label: 'gamba Sx', value: 'uk',
                icon: () => <Icon name="arms" size={18} color="#900" />
              },
              {
                label: 'Petto', value: 'france',
                icon: () => <Icon name="flag" size={18} color="#900" />
              },
              {
                label: 'Spalle', value: 'france',
                icon: () => <Icon name="flag" size={18} color="#900" />
              },
            ]}
            placeholder="Seleziona una parte del corpo"
            defaultValue={parteCorpo}
            containerStyle={{ height: 40 }}
            style={style.selectStyle}
            itemStyle={style.selectStyle}
            dropDownStyle={style.selectdropDownStyle}
            onChangeItem={item => setParteCorpo(item.value)}
          />

          <TextInput
            label="Inserisci la misurazione"
            value={text}
            style={style.textInputSyle}
            onChangeText={text => setText(text)}
          />
        </Modal>
      </Portal>
      <Button style={style.button} onPress={showModal}>
        +
      </Button>
    </Provider>
  );
};


const style = StyleSheet.create({
  modal: { backgroundColor: 'transparent', padding: 20, },
  selectStyle: { backgroundColor: '#fafafa', },
  selectdropDownStyle: { backgroundColor: '#fafafa', },
  itemSelectStyle: { justifyContent: 'flex-start', },
  textInputSyle: { backgroundColor: '#fafafa', },
  button: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#ff6c16',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  }
})
export default ModalAddDati;