import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import data from '../data'
import Card from '../components/Card'
import Banners from '../components/Banners'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native-animatable'

const Policy = ({ navigation }) => {
  const policydata = data
  const { user } = useSelector(state => state.reducer)

  return (
    <View style={styles.main} animation="fadeInUp" duration={800}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Banners data={policydata} />

        <Text style={styles.sectionTitle}>Insurance Policies</Text>
        <Text style={styles.sectionSubtitle}>Choose a plan that fits your needs</Text>

        <View style={styles.grid}>
          {policydata.map((item, i) => (
            <Card key={i} title={item.title} img={item.img} id={item.id} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Policy

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
    marginTop: 18,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#9a9a9a',
    marginLeft: 16,
    marginTop: 4,
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 10,
  },
})