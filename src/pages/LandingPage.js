import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Banners from '../components/Banners';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data, { Loandata } from '../data';
import { useDispatch } from 'react-redux';
import { GetReq } from '../apiCalls/api';

const ADVISOR_NUMBER = '9201100195';

export default function LandingPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [advertisement, setAdvertisement] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);

  const handleLogin = async () => {
    const userStr = await AsyncStorage.getItem("user")
    if (userStr !== null) {
      const parsedUser = JSON.parse(userStr)
      if (parsedUser.Role === 'Admin')
        navigation.navigate('admindashboard', { name: 'Jane' })
      else
        navigation.navigate('Home', { name: 'Jane' })

      dispatch({
        type: 'login',
        data: parsedUser   // ✅ now correctly parsed
      })
    } else {
      navigation.navigate('Login')
    }
  }

  useEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.loginHeaderButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginHeaderButtonText}>
            Login
          </Text>

          <AntDesign
            name="login"
            size={18}
            color="#fff"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      ),
    });

  }, [navigation]);

  const openWhatsapp = (num) => {
    const url =
      'whatsapp://send?text=' + 'Hi AYS Solutions!' + '&phone=91' + num;
    Linking.openURL(url).catch(() =>
      alert('WhatsApp is not installed on this device')
    );
  };

  const callAdvisor = (num) => {
    Linking.openURL(`tel:${num}`).catch(() =>
      alert('Unable to open dialer')
    );
  };

  const getAds = async () => {
    try {
      setLoadingAds(true);
      const ads = await GetReq('/getAds');
      const temp = ads.data.map((ad) => ({ ...ad, img: ad.imgs }));
      dispatch({
        type: 'saveAds',
        data: temp.map((ad) => ({
          id: ad.idmaster,
          title: ad.name,
          img: ad.img,
        })),
      });
      setAdvertisement(temp);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoadingAds(false);
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        // fadingEdgeLength={10}
      >
        {/* Advisor contact card */}
        <View style={styles.advisorCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.advisorTitle}>Talk to our Advisor</Text>
            <Text style={styles.advisorSubtitle}>Get help choosing the right plan</Text>
          </View>
          <View style={styles.advisorButtons}>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => callAdvisor(ADVISOR_NUMBER)}
              activeOpacity={0.8}
            >
              <AntDesign name="phone" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.whatsappIconButton}
              onPress={() => openWhatsapp(ADVISOR_NUMBER)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="whatsapp" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic ads */}
        {loadingAds ? (
          <ActivityIndicator size="large" color="#1f6feb" style={{ marginTop: 30 }} />
        ) : (
          advertisement?.map((ad, i) => {
            const adImages = ad.img
              .split(',')
              .map((link) => ({
                type: 'ad',
                id: ad.idmaster.toString(),
                title: ad.name,
                img: link,
              }));
            return (
              <View key={i} style={styles.card}>
                <Banners data={adImages} />
                <Text style={styles.cardTitle}>{ad.name}</Text>
                <Text style={styles.cardDesc}>
                  {ad.pdesc}  •  Range: {ad.prange}
                </Text>
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.whatsappButton}
                    onPress={() => openWhatsapp(ADVISOR_NUMBER)}
                    activeOpacity={0.8}
                  >
                    <MaterialCommunityIcons name="whatsapp" size={16} color="#fff" />
                    <Text style={styles.actionText}>WhatsApp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.callActionButton}
                    onPress={() => callAdvisor(ADVISOR_NUMBER)}
                    activeOpacity={0.8}
                  >
                    <AntDesign name="phone" size={14} color="#fff" />
                    <Text style={styles.actionText}>Call</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}

        {/* Insurance section */}
        <View style={styles.card}>
          <Banners data={data} />
          <Text style={styles.cardTitle}>Insurance Policies</Text>
          <Text style={styles.cardDesc}>
            Kanyadan Policy · Education Policy · Pension Policy · Mediclaim
            Policy · Personal Accident Policy · Critical Illness Policy · Term
            Policy
          </Text>
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={() => openWhatsapp(ADVISOR_NUMBER)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="whatsapp" size={16} color="#fff" />
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.callActionButton}
              onPress={() => callAdvisor(ADVISOR_NUMBER)}
              activeOpacity={0.8}
            >
              <AntDesign name="phone" size={14} color="#fff" />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Loans section */}
        <View style={styles.card}>
          <Banners data={Loandata} />
          <Text style={styles.cardTitle}>Loans</Text>
          <Text style={styles.cardDesc}>
            Home Loan · Plot Loan · Top-up Loan · Mortgage Loan · Home Loan
            Transfer · Personal Loan · Business Loan · Commercial Loan
          </Text>
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={() => openWhatsapp(ADVISOR_NUMBER)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="whatsapp" size={16} color="#fff" />
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.callActionButton}
              onPress={() => callAdvisor(ADVISOR_NUMBER)}
              activeOpacity={0.8}
            >
              <AntDesign name="phone" size={14} color="#fff" />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f6feb',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  advisorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(31,111,235,0.15)',
    borderRadius: 16,
    marginHorizontal: 14,
    marginTop: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(31,111,235,0.3)',
  },
  advisorTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  advisorSubtitle: {
    color: '#b5b5b5',
    fontSize: 12,
    marginTop: 3,
  },
  advisorButtons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  callButton: {
    backgroundColor: '#1f6feb',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  loginHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#1f6feb',

    paddingVertical: 8,
    paddingHorizontal: 14,

    borderRadius: 14,

    marginRight: 8,
  },

  loginHeaderButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  whatsappIconButton: {
    backgroundColor: '#25D366',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    marginHorizontal: 14,
    marginTop: 14,
    paddingBottom: 14,
    overflow: 'hidden',
  },
  cardTitle: {
    marginLeft: 16,
    marginTop: 12,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardDesc: {
    marginLeft: 16,
    marginTop: 6,
    marginRight: 12,
    color: '#b5b5b5',
    fontSize: 13,
    lineHeight: 19,
  },
  cardActions: {
    flexDirection: 'row',
    marginLeft: 16,
    marginTop: 12,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 10,
  },
  callActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f6feb',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 6,
  },
});