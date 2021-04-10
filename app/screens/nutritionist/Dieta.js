import React, { useReducer } from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import DietaComponent from "../../component/DietaComponent";
import HeaderComponent from "../../component/HeaderComponent";
import { Firestore } from "../../config/FirebaseConfig";


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
            this.getUserAndDiete()
        }
    
        state = {
            diete:[],
            pasti:[]
        }
    
        getUserAndDiete = async () => {
            const user = (await Firestore.collection('UTENTI').doc('3hVSFBjPhuUUD9RWuNckZKVxpuz1').get()).data();
            this.setState({diete:user.dieta})
            const pastiData =(await Firestore.collection('DIETE').doc(this.state.diete[0]).get()).data();
            this.state.pasti.push(pastiData);
            var support = this.state.pasti;
            this.setState({ pasti: support });
            console.log(this.state.pasti)
        }
    
        
        render() {
        
            var pastiArray=[];
            var contentArray=[];
            this.state.pasti.map((item,i) => {
                console.log(item)
                pastiArray.push(item.valori)
            })
            if(this.state.pasti.length == 0) {
                return null
            } else{
                console.log("Sono qui")
                pastiArray = (Object.values(pastiArray))

                pastiArray.map((lista,i) => {
                    lista.map((element,i) => {
                        contentArray.push({nome: element.tipo, contenuto:element.valore});
                    })
                })
                console.log(contentArray)
                console.log(pastiArray)
            }
        return (

            <SafeAreaView style={styles.home}>

                { this.props.isComponent ? (
                    null
                ) : <HeaderComponent {...this.props} title="Dieta"/>}




                <FlatList style={{ margin: 10, flex: 0.8, alignContent: 'center' }}
                    data={contentArray}
                    scrollEnabled={true}
                    numColumns={2}
                    keyExtractor={(item) => item.nome}
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