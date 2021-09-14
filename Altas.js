import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Image, Button } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

export default class Altas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: ""
    };
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Text style={styles.titulo}>Altas</Text>
          <View style={styles.Alta}>
            <Input
              placeholder='Nombre'
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color='black'
                />
                }
            />
            <Input
              placeholder='Codigo'
              leftIcon={
                <Icon
                  name='keyboard-o'
                  size={24}
                  color='black'
                />
                }
            />
            <Input
              placeholder='Password'
              leftIcon={
                <Icon
                  name='lock'
                  size={24}
                  color='black'
                />
                }
              secureTextEntry={true}
            />
          </View>
          <View>
            <Text style={{fontSize: 20, marginLeft: 20, marginTop: 20}}>Campus</Text> 

            <Picker selectedValue={this.state.selectedValue}
              style={{backgroundColor: 'red', height: 50, width: 150, marginLeft: 20}}
              onValueChange={(itemValue, _) =>
                this.setState({ selectedValue: itemValue} )
              }
            >
            <Picker.Item label="CUCSH" value="CUCSH" />
            <Picker.Item label="CUCEI" value="CUCEI" />
            <Picker.Item label="CUCEA" value="CUCEA" />
            <Picker.Item label="CUTLAJO" value="CUTLAJO" />
            <Picker.Item label="CUTONALA" value="CUTONALA" />
            </Picker>
          </View>
          <View style={{marginLeft: 20, marginTop: 20}}>
            <Text>Imagen Avatar</Text>
            <Image
              source={require('./img/user.png')}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View style={{marginTop: 50, width: 100, marginLeft: 150}}>
            <Button
              icon={
                <Icon
                  name="user-plus"
                  size={15}
                  color="white"
                />
              }
              title=" Altas"
            />
          </View>
        </ScrollView>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    textAlign: 'center'
  },
  Alta: {
    width: 250,
    marginTop: 30,
    marginLeft: 20,
  },
});
