import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import React from 'react';

import EventsPage from '../pages/Events';
import TopTab from './TopTab';

const { Navigator, Screen } = createBottomTabNavigator();

type DataResponse = {
  userId: number
  userName: string
}

function Tabs() {

  const route = useRoute();
  const param: DataResponse = route.params

  return (
    <Navigator screenOptions={{
      tabBarActiveTintColor: "#8257E5",
      tabBarInactiveTintColor: "#969CB2",
      tabBarActiveBackgroundColor: "#FFFFFF",
      tabBarInactiveBackgroundColor: "#FFFFFF",
      headerShown: false,
      tabBarLabelStyle: {
        fontWeight: 'bold',
        fontSize: 14,
        height: '50%',
        width: '100%',
      },
      tabBarStyle: {
        width: '100%',
        height: 80,
      },
      tabBarIconStyle: {
        display: 'none',
      },

    }}>
      <Screen name='Eventos' component={EventsPage} initialParams={{ userId: param.userId, userName: param.userName }} />
      <Screen name='Salas' component={TopTab} />
    </Navigator>
  )
}

export default Tabs;
