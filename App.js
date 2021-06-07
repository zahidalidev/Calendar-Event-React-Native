import React, { Component } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Permissions from 'expo-permissions';
import Home from './screens/Home';
import CreateTask from './screens/CreateTask';
import TodoStore from './data/TodoStore';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const Stack = createDrawerNavigator();

export default class App extends Component {
  async UNSAFE_componentWillMount() {
    await this._askForCalendarPermissions();
    await this._askForReminderPermissions();
  }

  _askForCalendarPermissions = async () => {
    await Permissions.askAsync(Permissions.CALENDAR);
  };

  _askForReminderPermissions = async () => {
    if (Platform.OS === 'android') {
      return true;
    }

    await Permissions.askAsync(Permissions.REMINDERS);
  };

  render() {
    return (
      <TodoStore>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home"
            drawerType={"front"}
            overlayColor="transparent"
            edgeWidth={100}
            drawerStyle={{
              backgroundColor: "white",
              width: 0
            }}

          >
            <Stack.Screen initialParams={{ updateCurrentTask: "", currentDate: new Date(), createNewCalendar: '' }} name="Home">{(props) => <Home {...props} />}</Stack.Screen>
            <Stack.Screen initialParams={{ updateCurrentTask: "", currentDate: new Date(), createNewCalendar: '' }} name="CreateTask">{(props) => <CreateTask {...props} />}</Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </TodoStore>
    );
  }
}
