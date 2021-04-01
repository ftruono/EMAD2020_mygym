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
            this.getUser()
        }
    
        state = {
            diete:[],
            pasti:[]
        }
    
        getUser = async () => {
            const user = (await Firestore.collection('UTENTI').doc('3hVSFBjPhuUUD9RWuNckZKVxpuz1').get()).data();
            this.setState({diete:user.diete})
            //const pasti =(await Firestore.collection('DIETE').doc(this.state.diete[0]).get()).data();
            for (let i = 0; i < this.state.diete.length; i++) {
                Firestore.collection('DIETE').doc(this.state.diete[i]).get()
                    .then((dieta) => {
                        this.state.pasti.push(dieta.data().pasti)
                        var support = this.state.pasti;
                        this.setState({ pasti: support})
                    });
            }
            console.log(this.state.pasti.length)
        }
    
        
        render() {
    
            var pastiArray=[];
            var contentArray=[];
            if(this.state.pasti.length == 0 || this.state.pasti.length == 1) {
                return null
            } else{
                 for(let i = 0; i < this.state.pasti.length; i++){
                     for(let j = 1 ; j<this.state.pasti[i].length; j++) {
                        contentArray.push(this.state.pasti[i][j])
                     }
                     pastiArray.push({nome:this.state.pasti[i][0],contenuto: contentArray})
                     contentArray=[]
                }
                console.log(pastiArray)
            }
        return (

            <SafeAreaView style={styles.home}>

                { this.props.isComponent ? (
                    null
                ) : <HeaderComponent {...this.props} title="Dieta"/>}




                <FlatList style={{ margin: 10, flex: 0.8, alignContent: 'center' }}
                    data={pastiArray}
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