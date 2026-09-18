import {
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { View } from 'react-native-animatable';
import LeadPopup from './LeadPopup';

const Lead = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const lead = props.data;

  const selectedLead = () => {
    setModalVisible(true);
  };

  const createdDate = lead?.CreatedDate
    ? lead.CreatedDate.substring(0, 10)
    : '--';

  return (
    <>
      <View
        animation="fadeInUp"
        duration={400}
        style={styles.wrapper}
      >
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.main}
          onPress={selectedLead}
        >
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              style={styles.img}
              source={require('../../assets/user.png')}
            />
          </View>

          {/* Main information */}
          <View style={styles.content}>
            <View style={styles.topRow}>
              <Text
                style={styles.name}
                numberOfLines={1}
              >
                {lead?.ApplicantName || 'Unknown Lead'}
              </Text>

              {/* Status */}
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {lead?.Status || 'Unknown'}
                </Text>
              </View>
            </View>

            <Text style={styles.leadId}>
              Lead #{lead?.LeadId || '--'}
            </Text>

            <View style={styles.bottomRow}>
              <Text style={styles.date}>
                Created {createdDate}
              </Text>

              <Text style={styles.arrow}>›</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Lead Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <LeadPopup
              setModalVisible={setModalVisible}
              lead={lead}
              access={props.access}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Lead;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 12,
    marginVertical: 5,
  },

  main: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#17191D',

    borderRadius: 16,

    padding: 14,

    borderWidth: 1,
    borderColor: '#26292F',
  },

  avatarContainer: {
    width: 48,
    height: 48,

    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#22252B',

    marginRight: 12,
  },

  img: {
    width: 30,
    height: 30,
  },

  content: {
    flex: 1,
    minWidth: 0,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  name: {
    flex: 1,

    color: '#F5F5F5',

    fontSize: 16,
    fontWeight: '600',

    marginRight: 10,
  },

  leadId: {
    color: '#858A93',

    fontSize: 12,

    marginTop: 4,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: 10,
  },

  date: {
    color: '#696E78',

    fontSize: 12,
  },

  arrow: {
    color: '#777D87',

    fontSize: 22,
    fontWeight: '300',

    marginRight: 2,
  },

  /*
   * Keep the status neutral for now.
   * We can add status-specific colors later.
   */
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,

    borderRadius: 20,

    backgroundColor: '#24272D',

    borderWidth: 1,
    borderColor: '#30343B',
  },

  statusText: {
    color: '#AEB3BC',

    fontSize: 11,
    fontWeight: '600',
  },

  /* Modal */

  modalOverlay: {
    flex: 1,

    justifyContent: 'flex-end',

    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  modalView: {
    width: '100%',

    maxHeight: '92%',

    backgroundColor: '#111315',

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    padding: 20,

    borderWidth: 1,
    borderColor: '#272A30',
  },
});