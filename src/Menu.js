import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Altas from './Altas';
import Listas from './Listas';
import Busqueda from './Busqueda';

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <NavigationContainer
      theme={barTheme}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Altas') {
              iconName = focused
                ? 'person-add'
                : 'person-add-outline';
            } else if (route.name === 'Listas') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Cambios') {
              iconName = focused ? 'create' : 'create-outline';
            } else if (route.name === 'Eliminar') {
              iconName = focused ? 'trash' : 'trash-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Altas" component={Altas} />
        <Tab.Screen name="Listas" component={Listas} />
        <Tab.Screen name="Cambios">
          {() => <Busqueda type="cambios"/>}
        </Tab.Screen>
        <Tab.Screen name="Eliminar">
          {() => <Busqueda type="eliminar"/>}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const barTheme = {
  colors: {
    primary: 'rgb(231, 237, 239)',
    background: 'rgb(8, 25, 35)',
    card: 'rgb(17, 33, 44)',
    text: 'rgb(231, 237, 239)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  }
}
