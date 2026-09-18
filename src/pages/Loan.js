import React from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { Loandata } from '../data'
import Card from '../components/Card'
import Banners from '../components/Banners'

const Loan = () => {
  return (
    <View style={styles.main}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        // showsVerticalScrollIndicator={false}
      >
        <Banners data={Loandata} />

        <Text style={styles.sectionTitle}>Loans</Text>
        <Text style={styles.sectionSubtitle}>Find the right loan for you</Text>

        <View style={styles.grid}>
          {Loandata.map((item, i) => (
            <Card key={i} title={item.title} img={item.img} id={item.id} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Loan

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
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    marginTop: 10,
  },
})