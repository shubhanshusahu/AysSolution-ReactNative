import { StyleSheet, TextInput, Modal, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, Image } from "react-native-animatable";
import { useNavigation } from '@react-navigation/native';
import ImgBackground from '../components/ImgBackground';
import { LoanInfo, PolicyInfo, adNote, lightTheme } from '../data';
import { PostReq } from '../apiCalls/api';
import moment from 'moment';
import Button from '../components/Elements/Button';
import KeyboardAvoidingWrapper from '../components/wrappers/KeyboardAvoidingView';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LeadGenerate = ({ route }) => {

  const navigation = useNavigation();
  const { userroute, dataroute } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const { user } = useSelector(state => state.reducer);

  const [data, setdata] = useState({
    PlanId: dataroute.id,
    AgentId: userroute == 'Anonymous' ? 'Anonymous' : user.Phone,
    ApplicantName: '',
    APhone: '',
    ALocation: '',
    CreatedDate: moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss')
  })

  const imageSource = typeof dataroute.img === 'string' ? { uri: dataroute.img } : dataroute.img;

  const Submit = async () => {
    if (data.ALocation != "" && data.APhone !== "" && data.ApplicantName != "") {
      await PostReq('/leads', data, 'Application Submitted!')
      navigation.pop()
    }
    else
      alert('Please enter the details!')
  }

  return (
    <View style={{ flex: 1 }}>
      <ImgBackground imguri={dataroute.img}>
        <KeyboardAvoidingWrapper>
          <View style={styles.wrapper}>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {setImageViewerVisible(true)}}
            >
              <View animation="fadeInDown" duration={800} style={styles.imageCard}>
                <Image
                  style={styles.headerImg}
                  resizeMode="contain"
                  source={imageSource}
                />
              </View>
            </TouchableOpacity>

            <Text animation="zoomInDown" duration={900} style={styles.title} numberOfLines={2}>
              {dataroute.title}
            </Text>

            <View animation="slideInUp" duration={1000} style={styles.curve}>
              <Text animation="slideInRight" duration={1000} style={styles.subtitle}>
                Application Form
              </Text>

              <View style={styles.fieldGroup}>
                <TextInput
                  style={styles.input}
                  placeholder='Name'
                  placeholderTextColor="#999"
                  defaultValue={data.ApplicantName}
                  onChangeText={(e) => setdata({ ...data, ApplicantName: e })}
                />
                <TextInput
                  keyboardType='numeric'
                  style={styles.input}
                  placeholder='Phone'
                  placeholderTextColor="#999"
                  maxLength={10}
                  defaultValue={data.APhone}
                  onChangeText={(e) => setdata({ ...data, APhone: e })}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Location'
                  placeholderTextColor="#999"
                  defaultValue={data.ALocation}
                  onChangeText={(e) => setdata({ ...data, ALocation: e })}
                />
              </View>

              <Button text="Submit Application" color={lightTheme.success} action={() => Submit()} mwidth="100%" />

              <View style={styles.secondaryRow}>
                <Button text="Info" color={lightTheme.Secondary} action={() => setModalVisible(true)} mwidth={140} />
                <Button text="Back" color={lightTheme.close} action={() => navigation.pop()} mwidth={140} />
              </View>
            </View>
          </View>
        </KeyboardAvoidingWrapper>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Note</Text>
              <Text
                style={styles.info}
              >{dataroute?.type ? adNote : dataroute.id.includes('L') ? LoanInfo : PolicyInfo}
              </Text>
              <Button text="Close" color={lightTheme.close} action={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </ImgBackground>

      {/* Zoomable full-screen image viewer — built-in ScrollView zoom, no library */}
      <Modal
        visible={imageViewerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageViewerVisible(false)}
      >
        <View style={styles.zoomBackdrop}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setImageViewerVisible(false)}
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>

          <ScrollView
            style={styles.zoomScroll}
            contentContainerStyle={styles.zoomScrollContent}
            minimumZoomScale={1}
            maximumZoomScale={4}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={imageSource}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

export default LeadGenerate

const styles = StyleSheet.create({
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  imageCard: {
    alignSelf: 'center',
    width: '80%',
    height: 300,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginBottom: 14,
  },
  headerImg: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  curve: {
    paddingHorizontal: 18,
    paddingVertical: 26,
    borderRadius: 20,
    backgroundColor: 'rgba(43, 37, 37, 0.722)',
    borderWidth: 1,
    borderColor: 'rgba(40, 37, 37, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 12,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  info: {
    color: lightTheme.primary,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    margin: 20,
    width: '85%',
    backgroundColor: '#2f2f2f',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalTitle: {
    color: '#f2f2f2',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: "#f2f2f2",
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 16,
    height: 42,
    color: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    marginVertical: 6,
  },
  secondaryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10,
  },
  zoomBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
  },
  zoomScroll: {
    flex: 1,
  },
  zoomScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: screenWidth,
    height: screenHeight * 0.8,
  },
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})