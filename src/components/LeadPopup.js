import {
  View,
  Text,
  StyleSheet,
  Linking,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';

import { Image } from 'react-native-animatable';

import data, {
  Loandata,
  statuses,
} from '../data';

import SelectDropdown from 'react-native-select-dropdown';

import { GetReq, PutReq } from '../apiCalls/api';

import { createThreeButtonAlert } from './Elements/Alert';

import { useSelector } from 'react-redux';

const CopyButton = ({ value }) => {

  const handleCopy = () => {
    if (!value) return;

    Clipboard.setString(String(value));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.copyButton}
      onPress={handleCopy}
    >
      <Ionicons
        name="copy-outline"
        size={16}
        color="#9298A2"
      />
    </TouchableOpacity>
  );
};



const LeadPopup = (props) => {

  const [plan, setPlan] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [agentUPI, setAgentUPI] = useState('');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const { ads } = useSelector(state => state.reducer);

  const allData = [
    ...data,
    ...Loandata,
    ...ads,
  ];



  const copyToClipboard = (value) => {
    if (!value) return;

    Clipboard.setString(String(value));
  };

  /*
   * ---------------------------------------------------------
   * Update status
   * ---------------------------------------------------------
   */




  const updateStatus = () => {

    if (!selectedStatus) return;


    if (
      selectedStatus === 'Converted' &&
      props.lead.AgentId !== 'Anonymous'
    ) {

      createThreeButtonAlert(
        'Agent Payment done?',
        () =>
          PutReq(
            '/leads',
            {
              Status: selectedStatus,
              LeadId: props.lead.LeadId,
            },
            'Status Updated'
          )
      );

    } else {

      PutReq(
        '/leads',
        {
          Status: selectedStatus,
          LeadId: props.lead.LeadId,
        },
        'Status Updated'
      );

    }

  };


  /*
   * ---------------------------------------------------------
   * UPI
   * ---------------------------------------------------------
   */

  const UPIURL =
    `upi://pay?pa=${agentUPI?.UPIid}` +
    `&pn=Shubhanshu%20Sahu` +
    `&mc=0000` +
    `&mode=02` +
    `&am=1` +
    `&tn=testing` +
    `&purpose=00`;


  const upiOpener = async () => {

    try {

      await Linking.openURL(UPIURL);

    } catch (error) {

      console.log('UPI error:', error);

    }

  };


  /*
   * ---------------------------------------------------------
   * SMS
   * ---------------------------------------------------------
   */

  const opensms = (num) => {

    const msg =
      'Hi, Arvind here\n' +
      'I want to share some Policy details with you, ' +
      'please let me know when can we have a chat.';

    const separator =
      Platform.OS === 'ios'
        ? '&'
        : '?';

    const url =
      `sms:${num}${separator}body=${encodeURIComponent(msg)}`;

    Linking.openURL(url);

  };


  /*
   * ---------------------------------------------------------
   * WhatsApp
   * ---------------------------------------------------------
   */

  const openWhatsapp = (num) => {

    const message =
      'Hi, Arvind here\n' +
      'I want to share some Policy details with you, ' +
      'please let me know when can we have a chat.';

    const url =
      'whatsapp://send?text=' +
      encodeURIComponent(message) +
      '&phone=91' +
      num;

    Linking.openURL(url);

  };


  /*
   * ---------------------------------------------------------
   * Call
   * ---------------------------------------------------------
   */

  const callLead = () => {

    const number =
      Platform.OS === 'ios'
        ? `telprompt:${props.lead.APhone}`
        : `tel:${props.lead.APhone}`;

    Linking.openURL(number);

  };


  /*
   * ---------------------------------------------------------
   * Load plan + UPI
   * ---------------------------------------------------------
   */

  useEffect(() => {

    const selectedPlan =
      allData.filter(
        item => item.id == props.lead.PlanId
      );

    setPlan(selectedPlan);

    getUPI();

  }, []);


  const getUPI = async () => {

    try {

      const temp =
        await GetReq(
          '/upiid?phone=' +
          props.lead.AgentId
        );

      setAgentUPI(
        temp?.data?.[0] || {}
      );

    } catch (error) {

      console.log('UPI fetch error:', error);

    }

  };


  /*
   * ---------------------------------------------------------
   * Plan title
   * ---------------------------------------------------------
   */

  const planTitle =
    plan !== null
      ? plan[0]?.title ||
      props.lead.ApplicantName
      : 'Loading...';

  return (

    <View style={styles.main}>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <View style={styles.header}>

        <View style={styles.headerText}>

          <View style={styles.nameRow}>

            <Text
              style={styles.name}
              numberOfLines={1}
            >
              {props.lead.ApplicantName}
            </Text>

            <CopyButton
              value={props.lead.ApplicantName}
            />

          </View>

          <View style={styles.leadIdRow}>

            <Text style={styles.leadNumber}>
              Lead #{props.lead.LeadId}
            </Text>

            <CopyButton
              value={props.lead.LeadId}
            />

          </View>

        </View>


        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.closeIcon}
          onPress={() =>
            props.setModalVisible(false)
          }
        >

          <Text style={styles.closeIconText}>
            ×
          </Text>

        </TouchableOpacity>

      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ================================================= */}
        {/* PLAN */}
        {/* ================================================= */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            PRODUCT
          </Text>

          <View style={styles.infoCard}>

            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>
                ◈
              </Text>
            </View>

            <View style={styles.infoContent}>

              <Text style={styles.infoLabel}>
                Policy / Loan / Property
              </Text>

              <Text
                style={styles.infoValue}
                numberOfLines={2}
              >
                {planTitle}
              </Text>

            </View>

            <CopyButton
              value={planTitle}
            />

          </View>

        </View>


        {/* ================================================= */}
        {/* CONTACT DETAILS */}
        {/* ================================================= */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            CONTACT
          </Text>


          <View style={styles.detailRow}>

            <View style={styles.detailIcon}>
              <Text style={styles.detailIconText}>
                ☎
              </Text>
            </View>

            <View style={styles.detailTextContainer}>

              <Text style={styles.detailLabel}>
                Phone
              </Text>

              <Text style={styles.detailValue}>
                {props.lead.APhone || '--'}
              </Text>

            </View>

            <CopyButton
              value={props.lead.APhone}
            />

          </View>

          <View style={styles.detailRow}>

            <View style={styles.detailIcon}>

              <Text style={styles.detailIconText}>
                ◉
              </Text>

            </View>

            <View style={styles.detailTextContainer}>

              <Text style={styles.detailLabel}>
                Location
              </Text>

              <Text
                style={styles.detailValue}
                numberOfLines={3}
              >
                {props.lead.ALocation || '--'}
              </Text>

            </View>

            <CopyButton
              value={props.lead.ALocation}
            />

          </View>

        </View>


        {/* ================================================= */}
        {/* AGENT */}
        {/* ================================================= */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            AGENT
          </Text>

          <View style={styles.agentCard}>

            <View style={styles.agentAvatar}>

              <Text style={styles.agentAvatarText}>
                A
              </Text>

            </View>

            <View style={styles.agentContent}>

              <Text style={styles.agentLabel}>
                Agent ID
              </Text>

              <Text style={styles.agentValue}>
                {props.lead.AgentId || 'Anonymous'}
              </Text>

            </View>

          </View>

        </View>


        {/* ================================================= */}
        {/* CONTACT ACTIONS */}
        {/* ================================================= */}

        {props.access === 'admin' && (

          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              QUICK ACTIONS
            </Text>

            <View style={styles.actionRow}>

              {/* CALL */}

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.actionButton}
                onPress={callLead}
              >

                <View style={styles.actionIcon}>

                  <Image
                    style={styles.actionImage}
                    source={require('../../assets/call.png')}
                  />

                </View>

                <Text style={styles.actionText}>
                  Call
                </Text>

              </TouchableOpacity>


              {/* SMS */}

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.actionButton}
                onPress={() =>
                  opensms(props.lead.APhone)
                }
              >

                <View style={styles.actionIcon}>

                  <Image
                    style={styles.actionImage}
                    source={require('../../assets/sms.png')}
                  />

                </View>

                <Text style={styles.actionText}>
                  SMS
                </Text>

              </TouchableOpacity>


              {/* WHATSAPP */}

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.actionButton}
                onPress={() =>
                  openWhatsapp(props.lead.APhone)
                }
              >

                <View style={styles.actionIcon}>

                  <Image
                    style={styles.actionImage}
                    source={require('../../assets/whatsapp.png')}
                  />

                </View>

                <Text style={styles.actionText}>
                  WhatsApp
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        )}


        {/* ================================================= */}
        {/* STATUS */}
        {/* ================================================= */}

        {props.access === 'admin' && (

          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              LEAD STATUS
            </Text>

            {/* Current status */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.statusSelector,
                statusDropdownOpen && styles.statusSelectorOpen,
              ]}
              onPress={() =>
                setStatusDropdownOpen(prev => !prev)
              }
            >

              <Text style={styles.statusSelectorText}>
                {selectedStatus || props.lead.Status || 'Select status'}
              </Text>

              <Ionicons
                name={
                  statusDropdownOpen
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                size={18}
                color="#9298A2"
              />

            </TouchableOpacity>


            {/* Status options */}
            {statusDropdownOpen && (

              <View style={styles.statusOptions}>

                {statuses.map((status, index) => {

                  const isSelected =
                    status ===
                    (selectedStatus || props.lead.Status);

                  return (

                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.7}
                      style={[
                        styles.statusOption,
                        isSelected &&
                        styles.statusOptionSelected,
                      ]}
                      onPress={() => {

                        setSelectedStatus(status);

                        setStatusDropdownOpen(false);

                      }}
                    >

                      <Text
                        style={[
                          styles.statusOptionText,
                          isSelected &&
                          styles.statusOptionTextSelected,
                        ]}
                      >
                        {status}
                      </Text>

                      {isSelected && (

                        <Ionicons
                          name="checkmark"
                          size={18}
                          color="#C8CCD2"
                        />

                      )}

                    </TouchableOpacity>

                  );

                })}

              </View>

            )}


            {/* Update button */}

            {selectedStatus !== '' &&
              selectedStatus !== props.lead.Status && (

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.updateButton}
                  onPress={updateStatus}
                >

                  <Text style={styles.updateButtonText}>
                    Update Status
                  </Text>

                </TouchableOpacity>

              )}

          </View>

        )}


        {/* ================================================= */}
        {/* CLOSE */}
        {/* ================================================= */}

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.closeButton}
          onPress={() =>
            props.setModalVisible(false)
          }
        >

          <Text style={styles.closeButtonText}>
            Close
          </Text>

        </TouchableOpacity>


      </ScrollView>

    </View>

  );

};


export default LeadPopup;


/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  /*
   * Main
   */

  main: {
    width: '100%',

    backgroundColor: '#111315',

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  nameRow: {
    flexDirection: 'row',
  },

  leadIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  copyButton: {
    width: 32,
    height: 32,
    borderRadius: 9,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#202329',

    borderWidth: 1,
    borderColor: '#2B2F35',

    marginLeft: 8,
  },

  copyIcon: {
    color: '#9298A2',
    fontSize: 16,
  },

  /*
   * Header
   */

  header: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingBottom: 18,

    borderBottomWidth: 1,

    borderBottomColor: '#25282E',
  },

  headerText: {
    flex: 1,

    marginRight: 15,
  },

  name: {
    color: '#F3F4F6',

    fontSize: 22,

    fontWeight: '700',

    letterSpacing: -0.3,
  },

  leadNumber: {
    color: '#747A85',

    fontSize: 12,

    marginTop: 4,
  },

  closeIcon: {
    width: 36,

    height: 36,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#202329',

    borderWidth: 1,

    borderColor: '#2B2F35',
  },

  closeIconText: {
    color: '#AEB3BB',

    fontSize: 23,

    fontWeight: '300',

    lineHeight: 25,
  },


  /*
   * Scroll
   */

  scrollContent: {
    paddingTop: 20,

    paddingBottom: 10,
  },


  /*
   * Sections
   */

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    color: '#666D77',

    fontSize: 10,

    fontWeight: '700',

    letterSpacing: 1.2,

    marginBottom: 9,
  },


  /*
   * Product
   */

  infoCard: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#181B20',

    borderRadius: 14,

    padding: 13,

    borderWidth: 1,

    borderColor: '#292C32',
  },

  statusSelector: {
    width: '100%',
    minHeight: 50,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 15,

    borderRadius: 13,

    backgroundColor: '#181B20',

    borderWidth: 1,
    borderColor: '#292C32',
  },

  statusSelectorOpen: {
    borderColor: '#444952',

    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  statusSelectorText: {
    flex: 1,

    color: '#D5D8DD',

    fontSize: 14,
    fontWeight: '500',
  },

  statusOptions: {
    width: '100%',

    backgroundColor: '#181B20',

    borderWidth: 1,
    borderTopWidth: 0,

    borderColor: '#444952',

    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,

    overflow: 'hidden',
  },

  statusOption: {
    minHeight: 46,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 15,

    borderBottomWidth: 1,
    borderBottomColor: '#25282E',
  },

  statusOptionSelected: {
    backgroundColor: '#22252B',
  },

  statusOptionText: {
    color: '#AEB3BC',

    fontSize: 13,
  },

  statusOptionTextSelected: {
    color: '#F1F2F4',

    fontWeight: '600',
  },
  infoIcon: {
    width: 40,

    height: 40,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#22252B',

    marginRight: 12,
  },

  infoIconText: {
    color: '#A7ADB7',

    fontSize: 19,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: '#686E78',

    fontSize: 11,

    marginBottom: 3,
  },

  infoValue: {
    color: '#DDE0E4',

    fontSize: 14,

    fontWeight: '600',
  },


  /*
   * Details
   */

  detailRow: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical: 8,
  },

  detailIcon: {
    width: 38,

    height: 38,

    borderRadius: 11,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#181B20',

    borderWidth: 1,

    borderColor: '#292C32',

    marginRight: 12,
  },

  detailIconText: {
    color: '#9298A2',

    fontSize: 15,
  },

  detailTextContainer: {
    flex: 1,
  },

  detailLabel: {
    color: '#676E78',

    fontSize: 11,

    marginBottom: 2,
  },

  detailValue: {
    color: '#D5D8DD',

    fontSize: 14,

    fontWeight: '500',
  },


  /*
   * Agent
   */

  agentCard: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#181B20',

    borderRadius: 14,

    padding: 12,

    borderWidth: 1,

    borderColor: '#292C32',
  },

  agentAvatar: {
    width: 40,

    height: 40,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#24272D',

    marginRight: 11,
  },

  agentAvatarText: {
    color: '#B6BBC4',

    fontSize: 15,

    fontWeight: '700',
  },

  agentContent: {
    flex: 1,
  },

  agentLabel: {
    color: '#676E78',

    fontSize: 10,

    marginBottom: 2,
  },

  agentValue: {
    color: '#D5D8DD',

    fontSize: 13,

    fontWeight: '500',
  },


  /*
   * Actions
   */

  actionRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },

  actionButton: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

    paddingVertical: 10,

    marginHorizontal: 3,

    borderRadius: 14,

    backgroundColor: '#181B20',

    borderWidth: 1,

    borderColor: '#292C32',
  },

  actionIcon: {
    width: 40,

    height: 40,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#22252B',

    marginBottom: 6,
  },

  actionImage: {
    width: 22,

    height: 22,
  },

  actionText: {
    color: '#AEB3BC',

    fontSize: 11,

    fontWeight: '600',
  },


  /*
   * Dropdown
   */

  dropdown: {
    width: '100%',

    height: 48,

    borderRadius: 13,

    backgroundColor: '#181B20',

    borderWidth: 1,

    borderColor: '#292C32',

    paddingHorizontal: 14,
  },

  dropdownText: {
    color: '#D5D8DD',

    fontSize: 13,

    textAlign: 'left',
  },

  dropdownMenu: {
    backgroundColor: '#181B20',

    borderRadius: 13,

    borderWidth: 1,

    borderColor: '#292C32',
  },

  dropdownRow: {
    backgroundColor: '#181B20',

    borderBottomWidth: 1,

    borderBottomColor: '#25282E',

    height: 45,
  },

  dropdownRowText: {
    color: '#C8CCD2',

    fontSize: 13,

    textAlign: 'left',

    paddingHorizontal: 12,
  },

  dropdownArrow: {
    color: '#858B95',

    fontSize: 18,
  },

  dropdownArrowOpen: {
    color: '#C8CCD2',
  },


  /*
   * Update button
   */

  updateButton: {
    height: 48,

    borderRadius: 13,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#E7E9EC',

    marginTop: 10,
  },

  updateButtonText: {
    color: '#141619',

    fontSize: 13,

    fontWeight: '700',
  },


  /*
   * Close
   */

  closeButton: {
    height: 46,

    borderRadius: 13,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#1A1D21',

    borderWidth: 1,

    borderColor: '#2A2D33',

    marginTop: 2,
  },

  closeButtonText: {
    color: '#AEB3BC',

    fontSize: 13,

    fontWeight: '600',
  },

});