import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, TouchableOpacity} from 'react-native';

export default class Cambios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
    };
  }

  render() {
    const buscar = () => {
      var xhttp = new XMLHttpRequest();
      let _this = this;
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText)
          }
      };
      xhttp.open("GET", `https://cristianrobles4722.000webhostapp.com/busqueda.php?Codigo=${this.state.codigo}`, true);
      xhttp.send();
    }

    console.log(this.state.codigo)
    return (
      <View>
        <TextInput onChangeText={codigo => {this.setState({codigo})}}></TextInput>
        <Button title="Buscar" onPress={buscar}/>
      </View>
    );
  }
}
