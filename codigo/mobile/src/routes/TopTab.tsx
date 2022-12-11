import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AllRooms from '../pages/Rooms/AllRooms';
import MemberRooms from '../pages/Rooms/MemberRooms';
import MyRooms from '../pages/Rooms/MyRooms';


const Tab = createMaterialTopTabNavigator();

function TopTab() {
  return (
    <Tab.Navigator screenOptions={{ 
                  tabBarActiveTintColor: "#8257E5",
                  tabBarInactiveTintColor: "#969CB2",
                  tabBarLabelStyle: {
                      fontWeight: 'bold',
                      fontSize: 14,
                    },
                  tabBarStyle: {
                      height: 80,
                      paddingTop: 30
                    },
                  tabBarIconStyle:{
                      display: 'none',
                    },
                    }}>
      <Tab.Screen name="Todas" component={AllRooms} />
      <Tab.Screen name="Membro" component={MemberRooms} />
      <Tab.Screen name="Minhas" component={MyRooms} />
    </Tab.Navigator>
  )
}

export default TopTab;
