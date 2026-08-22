import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Card = (props) => {
  const navigation = useNavigation()

  const LeadGen = (data) => {
    navigation.navigate('Lead', { userroute: 'Logged in', dataroute: data })
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => LeadGen(props)}
    >
      <Image
        style={styles.img}
        source={typeof props.img === 'string' ? { uri: props.img } : props.img}
      />
      <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    width: '46%',
    borderRadius: 16,
    alignItems: 'center',
    margin: 7,
    paddingBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: 110,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    paddingHorizontal: 6,
    textAlign: 'center',
  },
})