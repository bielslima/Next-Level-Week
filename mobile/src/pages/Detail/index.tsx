/*
    O SafeAreaView ele faz automaticamente o espaço(padding) da parte de baixo(footer) e do StatusBar.

*/

import React, { useEffect, useState} from 'react';
import {Feather as Icon, FontAwesome } from '@expo/vector-icons'; // está renomeando o pacote Feather para Icon e importando também o pacote FontAwesome.
import { useNavigation, useRoute } from '@react-navigation/native';
import {View, StyleSheet, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'; //importar o botão retangular.
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer'; //para o botão de email.


interface Params{
  point_id: number;
}

// formato do detalhe de um ponto de coleta.
interface Data{
  point:{
      image: string;
      name: string;
      email: string;
      whatsapp: string;
      city: string;
      uf: string;     
  };
  items:{
      title: string;
  }[];
}



const Detail = () =>{


const [data, setData] = useState <Data> ({} as Data);


const navigation = useNavigation();

const route = useRoute();

const routeParams = route.params as Params; //com isso o typeScript vai entender que o route.params tem exatamente o formato da interface Params.


useEffect( () =>{ 
    api.get(`points/${routeParams.point_id}`).then(response => {
        setData(response.data);
    });

},[]);


// volta a tela anterior.
function handleNavigateBack(){
    navigation.goBack(); 
}

// para o botão de email.
function handleComposeMail(){
  MailComposer.composeAsync({

    subject: 'sjs ',  // assundo do email.
     //para quem o email sera enviado.
  })
}


if(!data.point){
  return('nao encontrado');
}

    return (

        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.container}>
                    <TouchableOpacity>
                           <Icon name="arrow-left" size={25} color="#34cb79" onPress={handleNavigateBack} />
                    </TouchableOpacity>

                    <Image style={styles.pointImage} source={ { uri: data.point.image }}  />
                    <Text style={styles.pointName}> { data.point.name } </Text>

                    <Text style={styles.pointItems}> 
                          {data.items.map(item => item.title).join(', ')}
                    </Text>

                    <View style={styles.address}> 
                        <Text style={styles.addressTitle}> Endereço</Text>
                        <Text style={styles.addressContent}> {data.point.city} / {data.point.uf} </Text>      
                    </View>
            </View>


            <View style={styles.footer}> 
                <RectButton style={styles.button} onPress={ ()=> {} }> 
                    <FontAwesome name="whatsapp" size={20} color="#FFF"  />
                    <Text style={styles.buttonText}> Whatsapp </Text>
                </RectButton>

                <RectButton style={styles.button} onPress={ ()=> {} }> 
                    <Icon name="mail" size={20} color="#FFF"  />
                    <Text style={styles.buttonText}> E-mail </Text>
                </RectButton>
            </View>
        </SafeAreaView>
    ); 
};

// estilos/css da página de detalhes que são chamadas a cima.
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 50,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
    },
  });

export default Detail;