import { View as ViewAN, Text } from "react-native-animatable";
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PostReq } from "../apiCalls/api";

const SignUp = (props) => {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Password: '',
    Address: '',
    UPIid: '',
    Referedby: '',
    ReferCode: ''
  });

  const Register = async () => {
    if (data.Name !== "" && data.Phone !== "" && data.Password !== "") {
      setloading(true);
      data.ReferCode = data.Name.toLowerCase().slice(0, 3) + data.Phone.slice(2, 5);
      await PostReq('/agent', data, 'Account created!');
      setloading(false);
      // props.setsignupVisible(false)
    } else {
      alert('Please enter the details!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ViewAN style={styles.container2} animation="slideInUp" duration={800}>
            <Text style={styles.title2}>Sign up</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Name*"
              placeholderTextColor="#999"
              defaultValue={data.Name}
              onChangeText={(e) => setdata({ ...data, Name: e })}
            />

            <TextInput
              style={[styles.textInput, styles.referralcode]}
              placeholder="Referral code - optional"
              placeholderTextColor="#999"
              defaultValue={data.Referedby}
              onChangeText={(e) => setdata({ ...data, Referedby: e })}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Phone*"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={10}
              defaultValue={data.Phone}
              onChangeText={(e) => setdata({ ...data, Phone: e })}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Email*"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              defaultValue={data.Email}
              onChangeText={(e) => setdata({ ...data, Email: e })}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Address"
              placeholderTextColor="#999"
              defaultValue={data.Address}
              onChangeText={(e) => setdata({ ...data, Address: e })}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Password*"
              placeholderTextColor="#999"
              secureTextEntry
              defaultValue={data.Password}
              onChangeText={(e) => setdata({ ...data, Password: e })}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Re-enter Password"
              placeholderTextColor="#999"
              secureTextEntry
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={Register}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Register</Text>
              {!loading ? (
                <MaterialCommunityIcons name="account-plus-outline" size={22} color="#fff" />
              ) : (
                <ActivityIndicator size={22} color="#fff" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => props.setsignupVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Already have an account</Text>
              <Ionicons name="arrow-back-circle-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </ViewAN>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
  },
  buttonText: {
    marginLeft: 12,
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  container2: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: 'rgba(9, 9, 9, 0.25)',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  textInput: {
    fontSize: 16,
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(255,255,255,0.4)',
    color: '#fff',
  },
  referralcode: {
    borderBottomColor: 'lightgreen',
  },
  title2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row-reverse',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 14,
    borderRadius: 16,
  },
  secondaryButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});