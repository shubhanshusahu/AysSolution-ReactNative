// components/ImgBackground.js
import { ImageBackground, StyleSheet, View } from 'react-native'
import React from 'react'

export default function ImgBackground(props) {
  return (
    <ImageBackground
      source={typeof props.imguri === 'string' ? { uri: props.imguri } : props.imguri}
      resizeMode="cover"
      blurRadius={4}
      style={styles.img}
    >
      <View style={styles.overlay}>{props.children}</View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    width: '100%',
  },
})