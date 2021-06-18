import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native'
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
export default class Transaction extends React.Component{
  constructor(){
    super()
    this.state={
      hasCameraPemissions:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    }
  }
  getCameraPermissions=async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPemissions:status==='granted',
      buttonState:'clicked',
      scanned:false
    })
    
  }
  handleBarCodeScanned=async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:'normal'
    })
  }
    render(){
      const hasCameraPemissions=this.state.hasCameraPemissions
      const scanned=this.state.scanned
      const buttonState=this.state.buttonState
      if (buttonState==='clicked'&& hasCameraPemissions){
        return (
          <BarCodeScanner onBarCodeScanned={scanned? undefined :this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
        )
      }
      else if(buttonState==='normal'){
         return(
            <View style={styles.container}>
                <Text> {hasCameraPemissions===true? this.state.scannedData:'Request Camera Permissions'} </Text>
                <TouchableOpacity onPress={this.getCameraPermissions} style={styles.scanButton}>
                <Text style={styles.buttonText}> Scan QR code </Text></TouchableOpacity>
            </View>
        )
      }
       
    }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  scanButton:{
    backgroundColor:'teal',
    padding:10,
    margin:10
  },
  buttonText:{
    fontSize:25,
    textAlign:'center'
  }
})