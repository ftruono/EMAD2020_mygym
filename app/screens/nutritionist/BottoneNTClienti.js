import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
//import AddAppuntamenti from './AddAppuntamenti';


const BottoneNtClienti = (props) => {
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
              icon: 'account-plus',
              label: 'Nuovo cliente',
              onPress: () => props.addCliente(),
            }/* ,
            {
              icon: 'calendar-plus',
              label: 'appuntamento',
              onPress: () => props.addAppuntamenti(),
              
            }, */
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

export default BottoneNtClienti;

