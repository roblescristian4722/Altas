import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, Image, StyleSheet } from 'react-native';

export default class Listas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: []
    };
  }

  componentDidMount() {
    let _this = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        var temp = JSON.parse(xhttp.responseText);
        _this.setState({ datos: temp });
      }
    };
    xhttp.open('GET', 'https://cristianrobles4722.000webhostapp.com/mostrar.php', true);
    xhttp.send();
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.title}>Listas</Text>
        <FlatList
          data={this.state.datos}
          renderItem={({item}) => (
            <View style={style.usrContainer}>
              <Image
                style={style.usrImg}
                source={{uri: item.Imagen}}
              />
              <Text style={style.usrName}>
              {item.Nombre}
              </Text>
            </View>
          )}
          keyExtractor={item => item.Codigo}
        />
      </View>
    )
  }
};

const colors = {
  text: "#E7EDEF",
  secondaryBg: "#11476A"
}

const style = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 36,
    margin: '5%',
    color: colors.text,
  },
  usrImg: {
    borderWidth: 1.5,
    borderColor: colors.text,
    flex: 2,
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
    borderRadius: 50,
  },
  usrName: {
    borderWidth: 1.5,
    borderColor: colors.text,
    flex: 10,
    color: colors.text,
    marginLeft: '4%',
    fontSize: 18,
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '4%',
    paddingRight: '4%',
    borderRadius: 100,
    backgroundColor: colors.secondaryBg,
  },
  usrContainer: {
    padding: 10,
    height: Dimensions.get('window').height * 0.12,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginBottom: '20%',
  },
})