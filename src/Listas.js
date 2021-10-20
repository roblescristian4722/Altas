import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, Image, StyleSheet, RefreshControl } from 'react-native';

export default class Listas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      datos: []
    };
  }

  getData = () => {
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

  componentDidMount() {
    this.getData()
  }

  onRefresh = () => {
    this.getData()
    this.setState({refreshing: true});
    setTimeout(() => this.setState({refreshing: false}), 1000);
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.title}>Listas</Text>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          data={this.state.datos}
          renderItem={({item}) => (
            <View style={style.usrContainer}>
              <Image
                style={style.usrImg}
                source={{uri: item.Imagen}}
              />
              <View style={style.usrNameContainer}>
                <Text style={style.usrName}>
                  {item.Nombre}
                </Text>
                <Text style={style.usrSubTitle}>
                  {item.Codigo + " | " + item.Centro}
                </Text>
              </View>
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
    color: colors.text,
    fontSize: 18,
  },
  usrNameContainer: {
    borderWidth: 1.5,
    borderColor: colors.text,
    flex: 10,
    marginLeft: '4%',
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '4%',
    paddingRight: '4%',
    borderRadius: 100,
    backgroundColor: colors.secondaryBg,
  },
  usrSubTitle: {
    color: colors.text,
    fontSize: 14,
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
