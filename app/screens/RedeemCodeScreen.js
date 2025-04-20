import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import Screen from '../components/Screen';
import * as Yup from 'yup';
import { collection, doc, getDoc, setDoc, getFirestore, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { tasks } from 'firebase-functions';
import { CurrentRenderContext } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  code: Yup.string().required().label('Code'),
});




function RedeemCodeScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [redeemedData, setRedeemedData] = useState(null); // Store redeemed information
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('Guest');

  const db = getFirestore();


  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
      setUserName(currentUser.displayName || "Guest");
    } else {
      console.log("No user is signed in.");
    }
  }, []);

  async function addTask(userId, redeemedInfo) {
    console.log("Adding task for user:", userId, redeemedInfo);
  
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);
  
    // Step 1: Create the user document if it doesn't exist
    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        name: userName,
      });
    }
  
    // Step 2: Reference the "Events" subcollection and task document
    const tasksCollectionRef = collection(userRef, "Tasks");
    const taskDocRef = doc(tasksCollectionRef, redeemedInfo.taskName);
    const taskDocSnapshot = await getDoc(taskDocRef);
  
    // Step 3: Only add the task if it doesn’t already exist
  //  if (!taskDocSnapshot.exists()) {
      await setDoc(taskDocRef, {
        ...redeemedInfo,
      });
      console.log("Task added successfully.");
      updateUserPoints(userId); // Update user points after adding the task
 //   } else {
  //    console.log("Task already exists. Skipping.");
   // }
  }

  async function updateUserPoints(userId) {
    const userRef = doc(db, "users", userId);
    const eventsCollectionRef = collection(userRef, "Events");
    const tasksCollectionRef = collection(userRef, "Tasks");

    const eventSnapshot = await getDocs(eventsCollectionRef);
    const taskSnapshot = await getDocs(tasksCollectionRef);
    let totalPoints = 0;

    eventSnapshot.forEach((doc) => {
      const eventData = doc.data();
      totalPoints += parseInt(eventData.points, 10) || 0;
    });

    taskSnapshot.forEach((doc) => {
      const taskData = doc.data();
      totalPoints += parseInt(taskData.points, 10) || 0;
    });

    await setDoc(userRef, { points: totalPoints }, { merge: true });
  }

  const handleRedeem = ({ code }) => {

    console.log("Verifying code...");

    if (code === "INVALID") {
      setMessage("This code is invalid. Please try again.");
      setRedeemedData(null); // Clear any previous data
    } else {
      
      setMessage("Success! The code is valid.");

      // Example data for a valid code
      const redeemedInfo = {
        taskName: "Get Nominated for Intern of the Month",
        points: 20,
        dateAwarded: "April 12th, 2025",
        dateClaimed: "April 13th, 2025",
        timesRedeemed: 1,
        notes: "20 points first time, 10 points each time after that.",
      };

      addTask(userId, redeemedInfo)

      setRedeemedData(redeemedInfo); // Set the redeemed data
    }
  };

  let codeValue = '';

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>Redeem a Code</Text>

      {redeemedData ? (
        // If redeemed data is available, display the detailed info
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Event Redeemed successfully!</Text>
          <View style={{ height: 10 }} />  

          <Text style={styles.label}>Task Name:</Text>
          <Text style={styles.value}>{redeemedData.taskName}</Text>

          <Text style={styles.label}>Points Claimed:</Text>
          <Text style={styles.value}>{redeemedData.points}</Text>

          <Text style={styles.label}>Date Awarded:</Text>
          <Text style={styles.value}>{redeemedData.dateAwarded}</Text>

          <Text style={styles.label}>Date Claimed:</Text>
          <Text style={styles.value}>{redeemedData.dateClaimed}</Text>

          <Text style={styles.label}>Times Redeemed before (including this time):</Text>
          <Text style={styles.value}>{redeemedData.timesRedeemed}</Text>

          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.value}>{redeemedData.notes}</Text>

          <TouchableOpacity
            onPress={() => {
                setRedeemedData(null); // Clears redeemed info
                setMessage(''); // Optional: also clear the message
            }}
            style={styles.button}
            >
            <Text style={styles.buttonText}>Enter Another Code</Text>
            </TouchableOpacity>
        </View>
      ) : (
        // If no data is redeemed, show the redemption form
        <View style={styles.container}>
          <AppForm
            initialValues={{ code: '' }}
            onSubmit={handleRedeem}
            validationSchema={validationSchema}
          >
            
            <AppFormField
              name="code"
              placeholder="Enter code"
              autoCapitalize="characters"
              autoCorrect={false}
              width="80%"
              onChangeText={(text) => {
                codeValue = text;
              }}   
            />

          </AppForm>
          <TouchableOpacity
            onPress={() => handleRedeem({ code: codeValue })}
            style={styles.buttonredeem}
          >
            <Text style={styles.buttonredeemText}>Redeem Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ViewClaimedTasksScreen')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>View Claimed Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ViewAllTasksScreen')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>View All Tasks</Text>
          </TouchableOpacity>

          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      )}
    </Screen>
  );
}

export default RedeemCodeScreen;

const styles = StyleSheet.create({
  screen: {
    height: '90%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:"white"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 20,
    height: 33,
    width: 180,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonredeem: {
    backgroundColor: '#6200ee',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 50,
    height: 35,
    width: 250,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonredeemText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
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
