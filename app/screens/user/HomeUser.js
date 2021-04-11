import React from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import HeaderComponent from "../../component/HeaderComponent";
import WorkoutCard from '../../component/WorkoutCard';
import { Firestore,FirebaseAutentication } from "../../config/FirebaseConfig";
import Dieta from "../nutritionist/Dieta";
import sendEmail from 'react-native-email';



// dimension permette di accedere alle dimensioni della schermata
// su di essa si possono anche implementare dei metodi basta cercarli

const { width, height } = Dimensions.get('screen');

class HomeUser extends React.Component {
    constructor(props) {
        super(props);
        this.getUser()
    }
    state = {
        data:'',
        noWorkoutCard:false,
        userUid:''
    }

    getUser = async () => {

            var uid = FirebaseAutentication.currentUser.uid
            
            const user = (await Firestore.collection('UTENTI').doc(uid).get()).data();
            if(user.schede[0] !== undefined) {
                const scheda = (await Firestore.collection('SCHEDE').doc(user.schede[0]).get()).data();
                this.setState({data:scheda.days});
                const data= Object.keys(this.state.data).map((key) =>this.state.data[key])
                // console.log("scheda1->",data)
                const data1= Object.keys(scheda.days).map((key) =>scheda.days[key])
                // console.log("scheda2->",data1)
            } else {
                this.setState({noWorkoutCard:true})
            }

    }

    render() {

        const handleEmailPT = () => {
            const to = ['liguorinovincenzo0@gmail.com'] // string or array of email addresses
              sendEmail(to, {
                  cc: ['Personal Trainer1', 'Personal Trainer2'], // string or array of email addresses
                  
                  subject: 'Richiesta Affiliazione Personal Trainer',
                  body: 'Ciao sono un nuovo cliente dell applicazione e avrei bisogno di un Personal Trainer che mi segua. Saluti'
      
              }).catch(console.error)
          }
       
        return (

            <SafeAreaView style={styles.home}>
                <HeaderComponent {...this.props} title="Home" />
                <Text style={styles.titleParagraph}>Schede di Allenamento</Text>
                    {this.state.noWorkoutCard ? (
                            <>
                                <Text style={styles.titleSubParagraph}> Non hai ancora schede di allenamento assegnate</Text>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <Text style={styles.titleThParagraph}> Fatti aiutare da un nostro</Text>
                                    <Text style={styles.titleLink} onPress={() => handleEmailPT()}> Personal Trainer</Text>
                                </View>
                            </>
                        ):(
                            <>
                            <FlatList style={{ margin: 10, flex: 0.5 }}
                                data={Object.keys(this.state.data).map((key) =>this.state.data[key])}
                                scrollEnabled={true}
                                numColumns={2}
                                renderItem={({ item }) => (
                                    <WorkoutCard exercise={item} {...this.props} />
                                )}
                            /> 
                            </>
                    )}
                    
                
                <Text style={styles.titleParagraph}>Dieta</Text>
                <Dieta {...this.props} isComponent={true} />
            </SafeAreaView>
        );
    }
}

export default HomeUser;

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'stretch'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '50%' // is 50% of container width
    },

    boxStyle: {
        borderWidth: 1,
        backgroundColor: 'orange',
        marginBottom: 5
    },
    scrollView: {
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginHorizontal: width / 150,
    },
    title: {
        fontSize: 32,
    },
    iconMessagge: {
        paddingBottom:'10',
        textAlign: 'right',
        fontFamily: "Cochin"
    },
    titleParagraph: {
       fontSize:30,
       fontWeight:'bold',
       textAlign:'center',
       marginTop:25
    },
    titleSubParagraph: {
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:50
     },
     titleThParagraph: {
         fontSize:15,
         fontWeight:'bold',
         textAlign:'center',
         marginTop:15
      },
      titleLink:{
        color: 'blue',
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:15,
        textDecorationLine: 'underline'
      }

});