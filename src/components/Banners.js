import { View, Text, Image } from "react-native-animatable";
import { Image as RNImage } from 'react-native';
import React from 'react'
import { ImageSlider } from '@pembajak/react-native-image-slider-banner'
import { StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
// import { ImageSlider } from "react-native-image-slider-banner";
export default function Banners(props) {
  const navigation = useNavigation()
  const navtoApply = (e) => {
    // console.log(e,'console line 11')
    navigation.navigate('Lead', { dataroute: e, userroute: 'Anonymous' })
  }
  // The image slider library expects every item's image to be a URI string.
  // Loandata/policy data can contain local require()'d images (numbers), so
  // resolve those to a real URI string before handing the data to the slider.
  const sliderData = (props.data || []).map(item => ({
    ...item,
    img: typeof item.img === 'string' ? item.img : RNImage.resolveAssetSource(item.img).uri,
  }))
  return (
    <View animation="flipInX" duration={1000}>
      <ImageSlider
        data={sliderData}
        autoPlay={false}
        onClick={(e) => navtoApply(e)}
        preview={false}
        caroselImageStyle={{ resizeMode: "cover", height: 230 }}
        closeIconColor="#fff"
        style={styles.img}
        showHeader={true}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  img: {
    width: "100%",
    borderRadius: 16,
    // marginTop:'25%',
    // height : 90,
    // maxHeight:95,
    WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
  },
})