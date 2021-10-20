import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Altas from './Altas';

export default class Cambios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      userFound: null,
      server: 'https://cristianrobles4722.000webhostapp.com/',
    };
  }

  userFound = () => {
    if ( this.state.userFound === null ) {
      return <Text style={style.initialMsg}>Busque el usuario a editar en la barra superior</Text>
    } else if ( parseInt(this.state.userFound) === 0) {
      return <Text style={style.initialMsg}>Usuario no encontrado, ingrese un código válido</Text>
    } else if ( parseInt(this.state.userFound) !== 1 && this.props.type === "cambios" ) {
      console.log("cambios: ", this.state.userFound[0])
      return <Altas userFound={this.state.userFound[0]} />
    } else if ( parseInt(this.state.userFound) !== 1 && this.props.type === "eliminar" ) {
      this.petition("eliminar");
      alert("Usuario eliminado de forma exitosa");
    }
  }
  
  petition = (type) => {
    var xhttp = new XMLHttpRequest();
    let _this = this;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (type === "busqueda")
            _this.setState({ userFound: JSON.parse(xhttp.response) })
        }
    };
    console.log(`url: ${this.state.server}${type}.php?codigo=${this.state.codigo}`)
    xhttp.open("GET", `${this.state.server}${type}.php?codigo=${this.state.codigo}`, true);
    xhttp.send();
  }
 
  render() {
    return (
      <ScrollView style={style.container}>
        <Text style={style.title}>{this.props.type[0].toUpperCase() + this.props.type.slice(1)}</Text>
        <View style={style.searchBar}>
          <TextInput
            onChangeText={codigo => {this.setState({codigo})}}
            style={style.searchInput}
            keyboardType='numeric'
            placeholder='Código a editar'
            placeholderTextColor={colors.text}/>
          <TouchableOpacity
            onPress={() => this.petition("busqueda")}
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
  title: {
    textAlign: 'center',
    fontSize: 36,
    margin: '5%',
    color: colors.text,
  },
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
    marginRight: '1%',
    paddingLeft: '5%',
  },
  searchBar: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  searchBtn: {
    flex: 2,
    marginLeft: '1%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryBg,
  },
  searchBtnTxt: {
    color: colors.text,
  },
})
