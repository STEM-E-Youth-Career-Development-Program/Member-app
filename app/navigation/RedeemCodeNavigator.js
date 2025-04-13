import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RedeemCodeScreen from '../screens/RedeemCodeScreen';
import ViewAllTasksScreen from '../screens/ViewAllTasksScreen';
import ViewClaimedTasksScreen from '../screens/ViewClaimedTasksScreen';

const Stack = createNativeStackNavigator();

const RedeemCodeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
        options={{
            headerShown: false,
        }}
        name="RedeemCodeScreen"
        component={RedeemCodeScreen}
    />
    <Stack.Screen
        options={{
            headerShown: false,
        }}
        name="ViewClaimedTasksScreen"
        component={ViewClaimedTasksScreen}
    />
        <Stack.Screen
        options={{
            headerShown: false,
        }}
        name="ViewAllTasksScreen"
        component={ViewAllTasksScreen}
    />
    </Stack.Navigator>
    );

export default RedeemCodeNavigator;