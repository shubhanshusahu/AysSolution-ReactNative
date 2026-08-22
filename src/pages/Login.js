import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View as ViewAN, Text, Image } from "react-native-animatable";
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SignUp from "../components/SignUp";
import { PostReq } from "../apiCalls/api";
import { useNavigation } from "@react-navigation/native";
import KeyboardAvoidingWrapper from "../components/wrappers/KeyboardAvoidingView";

export default function Login() {
  const [dataa, setdata] = useState({
    Phone: '',
    Password: '',
  });
  const [loading, setloading] = useState(false);
  const [signupVisible, setsignupVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const nav = async (data) => {
    dispatch({ type: 'login', data: data[0] });
    await AsyncStorage.setItem('user', JSON.stringify(data[0]));
    setloading(false);
    if (data[0].Role === 'Admin')
      navigation.navigate('admindashboard', { name: 'Jane' });
    else
      navigation.navigate('Home', { name: 'Jane' });
  };

  const Login = async () => {
    try {
      setloading(true);
      let user = await PostReq('/login', dataa, '', nav);
      if (user?.data?.length == 0) {
        alert('Wrong Username or Password!');
        setloading(false);
        return;
      }
    } catch (e) {
      console.warn(e);
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingWrapper>
        <Image
          style={styles.img}
          animation="zoomInDown"
          easing="ease-in"
          duration={1500}
          source={require('../../assets/BANNERLOGO.jpg')}
        />

        {!signupVisible ? (
          <ViewAN style={styles.container2} animation="slideInUp" duration={800}>
            <Text style={styles.title2}>Login</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Phone"
              placeholderTextColor="#999"
              keyboardType="numeric"
              defaultValue={dataa.Phone}
              onChangeText={(e) => setdata({ ...dataa, Phone: e })}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              defaultValue={dataa.Password}
              onChangeText={(e) => setdata({ ...dataa, Password: e })}
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={Login}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Sign in</Text>
              {!loading ? (
                <AntDesign name="login" size={22} color="#fff" />
              ) : (
                <ActivityIndicator size={22} color="#fff" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => setsignupVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </ViewAN>
        ) : (
          <SignUp setsignupVisible={setsignupVisible} />
        )}
      </KeyboardAvoidingWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  img: {
    width: '55%',
    height: undefined,
    aspectRatio: 1.8,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 60,
    marginBottom: 10,
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
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 20,
    padding: 28,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  textInput: {
    fontSize: 16,
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    color: '#fff',
  },
  title2: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row-reverse',
    backgroundColor: '#1f6feb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 14,
    borderRadius: 16,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});