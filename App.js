import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import db from './localdb';
import PhonicsSoundButton from './components/phonicsSoundButton';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      mytext:'',
      chunks:[],
      phonicsSounds:[]
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <Header
      backgroundColor={'#2596be'}
      centerComponent={{text:'Monkey Chunky', style: {fontSize: 20, color: '#80ff00'}}}
      />
     <Image
     style={styles.imageicon}
     source={{
       uri:"https://i.pinimg.com/originals/97/91/ca/9791caec14400e0f08eded55f2e5e984.png"
     }}
     />
     <TextInput
      style={styles.inputbox}
      onChangeText={text => {
         this.setState({
           mytext:text
         }
         );
        }
      }
      />

    <TouchableOpacity style = {styles.buttonGo} 
          onPress={() => {
          console.log(this.state.mytext)
          var myWord =this.state.mytext.toLowerCase().trim()
         db[myWord] ? (
         this.setState({
          chunks:db[myWord].chunks
         }
         ),
          this.setState({
          phonicsSounds:db[myWord].phonemes
         }
         )
         ):Alert.alert("This word is not in our database");
          
          

        }
          }
        >
    <Text style = {styles.buttonText}>
    Go
    </Text>
    </TouchableOpacity>

      <View>
      {this.state.chunks.map((item, index)=>{
        return (
          <PhonicsSoundButton
          wordChunk={this.state.chunks[index]}
          soundChunk={this.state.phonicsSounds[index]}
          buttonIndex={index}         
          />
        );
      })}
      </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#f50a0a',
  },
  inputbox: {
    borderWidth: 3,
    width: '75%',
    height: 35,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10
  },
  buttonText:{
    textAlign: 'center',
   fontSize: 30,
   fontWeight: 'bold'
    },
  buttonGo:{
 alignSelf: 'center',
    width: '100%',
    height: 50,
  },

imageicon:{ width: 300, height: 300, marginLeft:0 }
});
