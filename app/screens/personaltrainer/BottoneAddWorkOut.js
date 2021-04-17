import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';


const BottoneAddWorkOut = (props) => {
    const [state, setState] = React.useState({ open: false });
  
    const onStateChange = ({ open }) => setState({ open });
  
    const { open } = state;
  
    return (
      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? 'plus' : 'plus'}
            actions={[
              {
                icon: 'email',
                label: 'esercizio',
                onPress: () => props.exitDay!=null? props.addEsercizio() : alert("aggiungi un giorno") ,
              },
              {
                icon: 'bell',
                label: 'day',
                onPress: () =>props.atletaSelezionato != '' ? props.addDay() : alert("Devi prima selezionare un'atleta"),
                
              },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
      </Provider>
    );
  };
  
  export default BottoneAddWorkOut;

  