import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';

export default class Cambios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      userFound: null,
    };
  }

  userFound = () => {
    if ( this.state.userFound === null ) {
      return <Text style={style.initialMsg}>Busque el usuario a editar en la barra superior</Text>
    } else if ( parseInt(this.state.userFound) === 0) {
      return <Text style={style.initialMsg}>Usuario no encontrado, ingrese un código válido</Text>
    } else {
      // TODO: Return a component similar to Altas.js
    }
  }

  render() {
    const buscar = () => {
      var xhttp = new XMLHttpRequest();
      let _this = this;
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            _this.setState({ userFound: xhttp.responseText })
          }
      };
      xhttp.open("GET", `https://cristianrobles4722.000webhostapp.com/busqueda.php?Codigo=${this.state.codigo}`, true);
      xhttp.send();
    }

    return (
      <ScrollView style={style.container}>
        <View style={style.searchBar}>
          <TextInput
            onChangeText={codigo => {this.setState({codigo})}}
            style={style.searchInput}/>
          <TouchableOpacity
            onPress={buscar}
            style={style.searchBtn}>
            <Text style={style.searchBtnTxt}>Buscar</Text>
          </TouchableOpacity>
        </View>
        {this.userFound()}
      </ScrollView>
    );
  }
}

const colors = {
  text: '#E7EDEF',
  secondaryBg: "#11476A",
}

const style = StyleSheet.create({
  container: {
  },
  initialMsg: {
    textAlign: "center",
    color: colors.text,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 5,
    color: colors.text,
  },
  searchBar: {
    flexDirection: 'row',
  },
  searchBtn: {
    flex: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryBg,
  },
  searchBtnTxt: {
    color: colors.text,
  },
})
