import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from "react-native-vector-icons/Entypo";
import HeaderComponent from "../../component/HeaderComponent";
import { Firestore,FirebaseAutentication } from "../../config/FirebaseConfig";

class HomePT extends React.Component {

    constructor(props) {
        super(props);
        this.getUser();
    }
    state = {
        noClienti:false,
        noAppuntamenti:false
    }


    getUser = async () => {
        var uid = FirebaseAutentication.currentUser.uid
        const pt = (await Firestore.collection('UTENTI').doc(uid).get()).data();
        if(pt.clienti.length === 0) {
            this.setState({noClienti:true})
        } else {
            //nt.clienti.map((e, i) => {
              //  this.getClienti(e)
            //})
        }

        if(pt.appuntamenti.length === 0) {
            this.setState({noAppuntamenti:true})
        } else {
            //nt.clienti.map((e, i) => {
              //  this.getClienti(e)
            //})
        }

        console.log(pt.clienti);
        
    }
    render() {
        return (
            <SafeAreaView style={styles.home}>
            <HeaderComponent {...this.props} title="Home PT" />
    
            <Text style={styles.titleParagraph}>Clienti a cui aggiornare la scheda:</Text>

            {this.state.noClienti ? (
                    <>
                        <Text style={styles.titleSubParagraph}> Non hai ancora clienti</Text>
                    </>
            ):(
                    <>

                        {/* <FlatList style={{ margin: 10 }}
                            data={this.state.clienti}
                            scrollEnabled={true}
                            keyExtractor={(item) => item.id}
                            refreshing={this._onRefresh}
                            renderItem={this.renderItem}
                        /> */}
                            
                    </>
            )}
            
    
            <Card.Divider />
    
            <Text style={styles.titleParagraph}>Lista di Appuntamenti Odierni:</Text>

            {this.state.noAppuntamenti ? (
                    <>
                        <Text style={styles.titleSubParagraph}> Non hai ancora appuntamenti</Text>
                    </>
            ):(
                    <>

                        {/* <FlatList style={{ margin: 10 }}
                            data={this.state.clienti}
                            scrollEnabled={true}
                            keyExtractor={(item) => item.id}
                            refreshing={this._onRefresh}
                            renderItem={this.renderItem}
                        /> */}
                            
                    </>
            )}
            {/* 
            <View style={styles.action}>
                <Feather name="book-open" color="#05375a" size={20} style={{marginLeft:20}}></Feather>
                <Text style={styles.title}> Vincenzo ore 15</Text>
            </View>
            <View style={styles.action}>
                <Feather name="book-open" color="#05375a" size={20} style={{marginLeft:20}}></Feather>
                <Text style={styles.title}> Nello ore 16</Text>
            </View>
            <View style={styles.action}>
                <Feather name="book-open" color="#05375a" size={20} style={{marginLeft:20}}></Feather>
                <Text style={styles.title}> Massimo ore 17</Text>
            </View>
            <View style={styles.action}>
                <Feather name="book-open" color="#05375a" size={20} style={{marginLeft:20}}></Feather>
                <Text style={styles.title}> Mario ore 18</Text>
            </View> */}
          </SafeAreaView>
        );
    }
}

export default HomePT;

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'stretch'
    },
    titleSubParagraph: {
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:50,
        paddingBottom:35
     },
      titleParagraph: {
          fontSize:20,
          fontWeight:'bold',
          textAlign:'left',
          marginTop:25,
          marginLeft:15
      }

});