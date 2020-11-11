import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import {StyleSheet} from 'react-native';

const ButtonCircleFlottante = () => {
    const [state, setState] = React.useState({ open: false });
  
    const onStateChange = ({ open }) => setState({ open });
  
    const { open } = state;
  
    return (
      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? 'calendar-today' : 'plus'}
            actions={[
            //   { icon: 'plus', onPress: () => console.log('Pressed add') },
            //   {
            //     icon: 'star',
            //     label: 'Star',
            //     onPress: () => console.log('Pressed star'),
            //   },
              {
                icon: 'email',
                label: 'esercizio',
                onPress: () => console.log('Pressed email'),
              },
              {
                icon: 'bell',
                label: 'Day',
                onPress: () => console.log('Pressed notifications'),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    );
  };
  
  export default ButtonCircleFlottante;

  