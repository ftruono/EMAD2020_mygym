import React, { useReducer } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import DietaComponent from "../../component/DietaComponent";
import HeaderComponent from "../../component/HeaderComponent";


const { width, height } = Dimensions.get('screen');

const json =
{
    pasti: [{
        nome: 'Colazione',
        content: 'Latte e 5 Biscotti',
    }, {
        nome: 'Pranzo',
        content: 'Tanta pasta !',
    }]
};

class Dieta extends React.Component {

    

    constructor(props) {
        super(props);
    }

    state = {}
    render() {

        console.log(this.props.isComponent);
        return (

            <SafeAreaView style={styles.home}>

                { this.props.isComponent ? (
                    null
                ) : <HeaderComponent {...this.props} title="Dieta" />}




                <FlatList style={{ margin: 10, flex: 0.8, alignContent: 'center' }}
                    data={json.pasti}
                    scrollEnabled={true}
                    numColumns={1}
                    keyExtractor={(item, index) => item.nome}
                    renderItem={({ item }) => (
                        <DietaComponent {...this.props} item={item} key={item.nome} />
                    )}
                />







            </SafeAreaView>
        );
    }
}

export default Dieta;

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'stretch'
    },

});