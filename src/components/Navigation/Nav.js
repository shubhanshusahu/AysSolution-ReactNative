import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../pages/Login';
import TabViewExample from '../../pages/Home';
import LeadGenerate from '../../pages/LeadGenerate';
import LeadsView from '../../pages/LeadsView';
import AdminHome from '../../pages/AdminHome';
import AgentView from '../../pages/AgentsView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import AgentProfile from '../../pages/AgentProfile';
import { useSelector } from 'react-redux';
import Referrals from '../../pages/Referrals';
import LandingPage from '../../pages/LandingPage';
import Refer from '../../pages/Refer';
import Masternew from '../../pages/Master/Masternew';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const THEME = {
  headerBg: '#121212',
  accent: '#1f6feb',
  text: '#fff',
  subtext: '#9a9a9a',
};

function LogoTitle({ title }) {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logoImg}
        source={require('../../../assets/iconnew.png')}
      />
      <View>
        <Text style={styles.logoTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.logoSubtitle}>Property · Finance · Insurance</Text>
      </View>
    </View>
  );
}

const Logout = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('landingpage');
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.headerAction} activeOpacity={0.7}>
      <AntDesign name="logout" size={16} color={THEME.text} />
      <Text style={styles.headerActionText}>Logout</Text>
    </TouchableOpacity>
  );
};

const Prof = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('agentprofile')}
      style={styles.headerAction}
      activeOpacity={0.7}
    >
      <FontAwesome5 name="user-cog" size={16} color={THEME.text} />
      <Text style={styles.headerActionText}>Profile</Text>
    </TouchableOpacity>
  );
};

const HeaderRight = ({ children }) => (
  <View style={styles.headerRightRow}>{children}</View>
);

const MyStack = () => {
  const { user } = useSelector((state) => state.reducer);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.headerStyle,
          headerTintColor: THEME.text,
          headerTitleAlign: 'left',
          headerShadowVisible: true,
        }}
      >
        <Stack.Screen
          name="landingpage"
          component={LandingPage}
          options={{
            headerTitle: () => <LogoTitle title="AYS Solutions" />,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'AYS Solutions', animation: 'flip' }}
        />
        <Stack.Screen
          name="Home"
          component={TabViewExample}
          options={{
            headerTitle: () => <LogoTitle title="AYS Solutions" />,
            headerRight: () => (
              <HeaderRight>
                <Prof />
                <Logout />
              </HeaderRight>
            ),
          }}
        />
        <Stack.Screen
          name="Lead"
          component={LeadGenerate}
          options={{ headerTitle: () => <LogoTitle title="Form" /> }}
        />
        <Stack.Screen
          name="leadview"
          component={LeadsView}
          options={{ headerTitle: () => <LogoTitle title="Leads" /> }}
        />
        <Stack.Screen
          name="referrals"
          component={Referrals}
          options={{ headerTitle: () => <LogoTitle title="Referrals" /> }}
        />
        <Stack.Screen
          name="admindashboard"
          component={AdminHome}
          options={{
            headerTitle: () => <LogoTitle title="Dashboard" />,
            headerRight: () => (
              <HeaderRight>
                <Logout />
              </HeaderRight>
            ),
          }}
        />
        <Stack.Screen
          name="agentview"
          component={AgentView}
          options={{ headerTitle: () => <LogoTitle title="All Partners" /> }}
        />
        <Stack.Screen
          name="agentprofile"
          component={AgentProfile}
          options={{ headerTitle: () => <LogoTitle title={user?.Name || 'Profile'} /> }}
        />
        <Stack.Screen
          name="refer"
          component={Refer}
          options={{ headerTitle: () => <LogoTitle title="Refer to Earn" /> }}
        />
        <Stack.Screen
          name="master"
          component={Masternew}
          options={{ headerTitle: () => <LogoTitle title="Admin Master" /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: THEME.headerBg,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  loginHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: THEME.accent,

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 10,

    marginRight: 8,
  },

  loginHeaderText: {
    color: '#fff',

    fontSize: 13,
    fontWeight: '600',

    marginLeft: 7,
  },
  logoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.text,
    maxWidth: 180,
  },
  logoSubtitle: {
    fontSize: 10,
    color: THEME.subtext,
    marginTop: 1,
  },
  headerRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginRight: 8,
  },
  headerAction: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActionText: {
    fontSize: 10,
    color: THEME.text,
    marginTop: 2,
  },
});