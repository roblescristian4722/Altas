import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Image, Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';

export default class Altas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUri: this.props.userFound ? this.props.userFound.Imagen : '',
      nombre: '',
      password: '',
      codigo: this.props.userFound ? this.props.userFound.Codigo : '',
      campus: this.props.userFound ? this.props.userFound.Centro : '',
      rutai: this.props.userFound ? this.props.userFound.Imagen : '',
      updated: false,
      server: "https://cristianrobles4722.000webhostapp.com/",
      inputData: {
        nombre: {
          placeholder: this.props.userFound ? this.props.userFound.Nombre : "Nombre",
          onChangeText: (nombre) => this.setState({nombre: nombre, init: false}),
          icon: "user",
          secure: false,
        },
        codigo: {
          placeholder: "Código",
          onChangeText: (codigo) => this.setState({codigo: codigo, init: false}),
          icon: 'keyboard-o',
          secure: false,
        },
        password: {
          placeholder: "Contraseña",
          onChangeText: (password) => this.setState({password: password, init: false}),
          icon: 'lock',
          secure: true,
        },
      },
      btnMsg: this.props.userFound ? " Guardar cambios" : " Dar de alta"
    };
  }

  createInput = (type) => {
    let inputData
    if (type === "nombre")
      inputData = this.state.inputData.nombre
    else if (type === "codigo"){
      inputData = this.state.inputData.codigo
      if (this.props.userFound)
        return null;
    }
    else if (type === "password")
      inputData = this.state.inputData.password
    return (
      <Input
      style={style.input}
      placeholder={inputData.placeholder}
      onChangeText={inputData.onChangeText}
      leftIcon={
        <Icon
        name={inputData.icon}
        size={24}
            color={colors.text}
          />
        }
        secureTextEntry={inputData.secure}
      />
    )
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={{width: 100, height: 100}}/>
    } else {
      return (
        <Image source={require('../img/user.png')} style={{width: 100, height: 100}}/>
      )
    }
  }

  uploadImageToServer = async () => {
    const response = await fetch(this.state.fileUri);
    const blob = await response.blob();
    var reader = new FileReader();
    reader.onload = () => {
      var InsertAPI = 'http://cristianrobles4722.000webhostapp.com/upload.php';
      console.log(reader.result);
      var Data={img:reader.result};
      var headers={
        'Accept':'application/json',
        'Content-Type':'application.json'
      }
      fetch(InsertAPI,{
        method:'POST',
        headers:headers,
        body:JSON.stringify(Data),
      })
      .then((response)=>response.json())
      .then((response)=>{
        console.log("server "+response)
        this.setState({rutai: "http://cristianrobles4722.000webhostapp.com/" + response})
      })
      .catch(err=>{
        console.log(err);
      })
    }
    reader.readAsDataURL(blob);
  }

  altaDatos = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
        }
    };

    let url = `&pass=${this.state.password}&codigo=${this.state.codigo}` +
    `&centro=${this.state.campus}&imagen=${this.state.rutai}`;
    let msg;
    if (this.props.userFound) {
      url = `${this.state.server}modificar.php?${url}` +
      `&nom=${this.state.nombre === '' ? this.props.userFound.Nombre : this.state.nombre}`;
      msg = "Usuario modificado exitosamente";
    } else {
      url = `${this.state.server}auth.php?${url}&nom=${this.state.nombre}`;
      msg = "Usuario añadido exitosamente";
    }
    console.log("url: ", url);
    xhttp.open("GET", url, true);
    alert(msg);
    xhttp.send();
  };

  accesoFotos = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        console.log(response);
        var source = response;
        var array = Object.keys(source).map(function (key) {
          return source[key];
        });
        var finalArray = array[0][0];
        if (finalArray != undefined) {
          this.setState({fileUri: finalArray.uri}, () => {
            this.uploadImageToServer();
          });
        }
      }
    );
  };

  render() {
    return (
      <ScrollView style={style.container}>
        { this.props.userFound ? null : <Text style={style.title}>Altas</Text> }
        <View style={style.dataInputContainer}>
          {this.createInput("nombre")}
          {this.createInput("codigo")}
          {this.createInput("password")}
        </View>

        <View style={style.dataBelow}>
          <View style={style.pickerContainer}>
            <Text style={style.subtitle}>Campus</Text> 
            <Picker selectedValue={this.state.campus}
              mode='dropdown'
              style={style.picker}
              onValueChange={(itemValue, _) =>
                this.setState({ selectedValue: itemValue} )
              }
              onValueChange={(campus)=>this.setState({campus})}
            >
              <Picker.Item label="CUCSH" value="CUCSH" />
              <Picker.Item label="CUCEI" value="CUCEI" />
              <Picker.Item label="CUCEA" value="CUCEA" />
              <Picker.Item label="CUTLAJO" value="CUTLAJO" />
              <Picker.Item label="CUTONALA" value="CUTONALA" />
            </Picker>
          </View>

          <View style={style.imgContainer}>
            <Text style={style.subtitle}>Avatar</Text> 
            <TouchableOpacity onPress={this.accesoFotos}>
              {this.renderFileUri()}
            </TouchableOpacity>
          </View>
        </View>

        <View style={style.altaContainer}>
          <Button
            onPress={this.altaDatos}
            icon={
              <Icon
                name="user-plus"
                size={15}
                color={colors.text}
              />
            }
            title={this.state.btnMsg}
          />
        </View>
      </ScrollView>
    )
  }
};

const colors = {
  text: '#E7EDEF',
  secondaryBg: "#11476A",
}

const style = StyleSheet.create({
  input: {
    color: colors.text,
    paddingLeft: 5,
  },
  dataBelow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: '2%',
    marginLeft: '10%',
    width: '80%',
  },
  container: {
    width: '100%',
    height: '100%',
    marginBottom: '5%',
  },
  subtitle: {
    color: colors.text,
    fontSize: 20,
    marginBottom: '5%',
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    margin: '5%',
    color: colors.text,
  },
  dataInputContainer: {
    width: '80%',
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    color: colors.text,
    backgroundColor: colors.secondaryBg,
    height: '10%',
    width: '100%',
    marginTop: '10%',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  altaContainer: {
    marginTop: '10%',
    width: '40%',
    marginLeft: '30%',
  },
});
