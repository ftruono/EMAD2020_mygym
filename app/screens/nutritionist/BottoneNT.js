import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';


const BottoneNt = (props) => {
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
              icon: 'calendar',
              label: 'appuntamento',
              onPress: () => props.addCliente(),
            },
            {
              icon: 'USERbell',
              label: 'cliente',
              onPress: () => props.addValori(),

            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

export default BottoneNt;

