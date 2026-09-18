import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetReq } from '../apiCalls/api'
import Agent from '../components/Agent'

const AgentView = () => {
  const [data, setdata] = useState(null)

  useEffect(() => {
    async function fetching() {
      const d = await GetReq('/agents')
      setdata(d?.data || [])
    }
    fetching()
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {data === null ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1f6feb" />
        </View>
      ) : data.length === 0 ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.emptyText}>No agents registered yet.</Text>
        </View>
      ) : (
        <>
          <Text style={styles.heading}>{data.length} Registered Agents</Text>
          {data.map((item, i) => (
            <Agent key={i} data={item} />
          ))}
        </>
      )}
    </ScrollView>
  )
}

export default AgentView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 18,
    marginBottom: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#9a9a9a',
    fontSize: 14,
  },
})