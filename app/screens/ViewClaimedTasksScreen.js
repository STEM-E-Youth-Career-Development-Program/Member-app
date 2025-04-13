import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Screen from '../components/Screen';


function ViewClaimedTasksScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>View Claimed Tasks</Text>
    </Screen>
  );
}

export default ViewClaimedTasksScreen;

const styles = StyleSheet.create({
    screen: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    container: {
      alignItems: 'center',
      width: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'white',
    },
    button: {
      backgroundColor: '#6200ee',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    infoContainer: {
      width: '100%',
      padding: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 10,
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
    },
    value: {
      fontSize: 16,
      color: 'white',
      marginBottom: 10,
    },
    message: {
      marginTop: 20,
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
    },
  });
