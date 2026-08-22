import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { lightTheme } from '../../data'
import { useNavigation } from '@react-navigation/native'
import { Text } from "react-native-animatable"

export default function NumberCard(props) {
  const navigation = useNavigation()

  const navv = (q) => {
    if (props.num == 0 || props.num == '0') {
      alert('No records found!')
      return
    }
    if (props?.access === 'agentRefferal') {
      navigation.navigate('referrals', { quer: `Referedby ='${q}'`, access: 'agentreferrals' })
    } else {
      navigation.navigate('leadview', { quer: q, access: props.access || 'admin' })
    }
  }

  return (
    <TouchableOpacity style={styles.main} onPress={() => navv(props.query)} activeOpacity={0.75}>
      <Text style={styles.header}>{props.title}</Text>
      <Text animation="flipInX" duration={1200} style={styles.num}>
        {props.num === null || props.num === undefined ? '—' : props.num}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '46%',
    margin: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 13,
    color: '#b5b5b5',
    marginBottom: 6,
  },
  num: {
    fontSize: 42,
    fontWeight: '700',
    color: '#fff',
  },
})