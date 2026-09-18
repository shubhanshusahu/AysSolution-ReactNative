import { Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { View } from 'react-native-animatable'
import { TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { lightTheme } from '../data'
import { useNavigation } from '@react-navigation/native'

const Agent = (props) => {
  const navigation = useNavigation()
  const { user } = useSelector(state => state.reducer)

  const nav = () => {
    navigation.navigate('leadview', { quer: 'AgentId =' + props.data.Phone, access: 'agentlistinadmin' })
  }

  const navforReferal = () => {
    navigation.navigate('referrals', { quer: `Referedby ='${props.data.ReferCode}'`, access: 'agentreferrals' })
  }

  return (
    <View animation="fadeInUp" duration={600} style={styles.card}>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={require('../../assets/user.png')} />

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{props.data.Name}</Text>
          <Text style={styles.detail}>{props.data.Phone}</Text>
          {!!props.data.Address && (
            <Text style={styles.detail} numberOfLines={1}>{props.data.Address}</Text>
          )}
        </View>
      </View>

      {user.Role !== 'Agent' && (
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={navforReferal} activeOpacity={0.8}>
            <Feather name="user-plus" size={18} color={lightTheme.blue} />
            <Text style={styles.actionText}>Referrals</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={nav} activeOpacity={0.8}>
            <FontAwesome name="list-alt" size={18} color={lightTheme.blue} />
            <Text style={styles.actionText}>Leads</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default Agent

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    marginHorizontal: 14,
    marginTop: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  detail: {
    fontSize: 12,
    color: '#9a9a9a',
    marginTop: 2,
  },
  walletPill: {
    backgroundColor: 'rgba(34,197,94,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.3)',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  walletText: {
    color: '#22C55E',
    fontWeight: '700',
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 10,
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 8,
    borderRadius: 12,
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
})