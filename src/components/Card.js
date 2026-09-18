import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FastImage from '@d11/react-native-fast-image'

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

      {typeof props.img === 'string' ? (
        <FastImage
          style={styles.img}
          source={{
            uri: props.img,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <Image
          style={styles.img}
          source={props.img}
          resizeMode="cover"
        />
      )}
      <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    width: '45%',
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
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