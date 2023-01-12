import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Audio} from 'expo-av';


export default class PhonicsSoundButton extends React.Component{
  constructor(props){
    super(props);
    this.state={
      pressedButtonIndex:""
    };
  }

playSound = async (soundChunk) => {
  var soundLink = 'https://s3-whitehatjrcontent.whjr.online/phones/' + soundChunk + '.mp3';
  await Audio.Sound.createAsync(
    {uri: soundLink}, {shouldPlay: true}
  );
};

  render(){
    return(
      <TouchableOpacity 
      style={
        (this.props.buttonIndex===this.state.pressedButtonIndex) ? 
      [styles.chunkButton, {backgroundColor: 'white'}] :
      [styles.chunkButton, {backgroundColor: 'red'}]
      }
      onPress={()=>{
        this.setState({pressedButtonIndex:this.props.buttonIndex});
        this.playSound(this.props.soundChunk);
      }}>
      <Text style={
        (this.props.buttonIndex===this.state.pressedButtonIndex) ? 
      [styles.buttonText, {color: 'red'}] :
      [styles.buttonText, {color: 'white'}]
      }>
      {this.props.wordChunk}
      </Text>
      </TouchableOpacity>
    );
  }
}
  const styles = StyleSheet.create({
     buttonText:{
    textAlign: 'center',
   fontSize: 30,
   fontWeight: 'bold',
   color: 'white'
    },
    chunkButton: {
      width:'60%',
      height:50,
      alignItems: 'centre',
      alignSelf: 'centre',
      justifyContent: 'centre',
      borderRadius: 10,
      backgroundColor: 'red',
      margin: 5
    }
  });