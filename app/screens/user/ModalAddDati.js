import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';






const ModalAddDati = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [misurazione, setMisurazione] = React.useState('');
  const [parteCorpo, setParteCorpo] = React.useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onlyNumber = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
        setMisurazione(newText);
      }else {
        alert("si prega di inserire solo numeri");
      }
    }
    
  }

  return (
    <Provider>
      <Portal styel={{ padding: 20, }}>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={style.modal}>
          <DropDownPicker
            items={[
              {
                label: 'Peso', value: 'peso',
              },
              {
                label: 'braccia Dx', value: 'braccia Dx',
                // hidden: true,
              },
              {
                label: 'braccia Sx', value: 'braccia Sx',
                // hidden: true
              },
              {
                label: 'addome', value: 'addome',
              },
              {
                label: 'vita', value: 'vita',
              },
              {
                label: 'gamba Dx', value: 'gamba Dx',
              },
              {
                label: 'gamba Sx', value: 'gamba Sx',
              },
              {
                label: 'Petto', value: 'Petto',
              },
              {
                label: 'Spalle', value: 'Spalle',
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
            value={misurazione}
            keyboardType='numeric'
            onChangeText={text => onlyNumber(text)}
          />
          <Icon
            raised
            name='check'
            type='font-awesome'
            color='#f50'
            onPress={() => {
              if (parteCorpo == '') {
                alert("seleziona una parte del corpo")
              } else {
                if (misurazione == '') {
                  alert("ineserisci un valore per piacere")
                } else {
                  props.aggiungiValori(parteCorpo, misurazione);
                  // setParteCorpo('');
                  setMisurazione('');
                  hideModal();
                }
              }

            }} />

        </Modal>
      </Portal>
      <TouchableOpacity style={style.button} onPress={showModal}>
        <Text style={style.appButtonText}>+</Text>
      </TouchableOpacity>
    </Provider>
  );
};


const style = StyleSheet.create({
  modal: { backgroundColor: 'transparent', padding: 20, },
  selectStyle: { backgroundColor: '#fafafa', },
  selectdropDownStyle: { backgroundColor: '#fafafa', },
  itemSelectStyle: { justifyContent: 'flex-start', },
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
  },
  appButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})
export default ModalAddDati;