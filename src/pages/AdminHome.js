import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native'
import { lightTheme } from '../data'
import NumberCard from '../components/Elements/NumberCard'
import { GetReq } from '../apiCalls/api'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Elements/Button'

const AdminHome = () => {
  const [dashCard, setdashCard] = useState({
    t: 0,
    inp: 0,
    pend: 0,
    san: 0,
    conv: 0,
    clos: 0,
  })

  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const { dashboard, user } = useSelector(state => state.reducer)
  const navigation = useNavigation()

  const fetching = async () => {
    let inp = 0, t = 0, pend = 0, san = 0, conv = 0, clos = 0
    const d = await GetReq('/admindashboard')
    d.data.forEach(e => {
      t += e.Total
      if (e.Status === "In Progress") inp += e.Total
      if (e.Status === "Not Reachable" || e.Status === "Call not picked" || e.Status === "Applied") pend += e.Total
      if (e.Status === "Converted") conv += e.Total
      if (e.Status === "Sanctioned") san += e.Total
      if (e.Status === "Closed" || e.Status === "Property not approved" || e.Status === "Profile not matched") clos += e.Total
    })
    return { inp, t, pend, san, conv, clos }
  }

  const loadDashboard = async () => {
    const tmp = await fetching()
    setdashCard(tmp)
    dispatch({ type: 'setDashboardAdmin', data: tmp })
    setLoading(false)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    loadDashboard().finally(() => setRefreshing(false))
  }, [])

  useEffect(() => {
    if (dashboard != null) {
      setdashCard(dashboard)
      setLoading(false)
    } else {
      loadDashboard()
    }
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
      }
    >
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.adminName}>{user?.Name || 'Admin'}</Text>
        </View>
        <View style={styles.adminPill}>
          <Text style={styles.adminPillText}>Admin</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Quick Actions</Text>
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('leadview', { quer: "/", access: 'admin' })}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="database-eye-outline" size={24} color="#fff" />
          <Text style={styles.tabText}>Show Leads</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('agentview')}
          activeOpacity={0.8}
        >
          <Feather name="users" size={24} color="#fff" />
          <Text style={styles.tabText}>Show Agents</Text>
        </TouchableOpacity>
      </View>

      <Button
        text="Advertisements"
        color={lightTheme.Secondary}
        mwidth={'100%'}
        action={() => navigation.navigate('master')}
      >
        <MaterialCommunityIcons name="home-city-outline" size={22} color="#fff" />
      </Button>

      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Overview</Text>
      <View style={styles.grid}>
        <NumberCard title="Total Leads" num={dashCard.t} query={'/'} />
        <NumberCard title="In Progress" num={dashCard.inp} query={'Status = "In Progress"'} />
        <NumberCard title="Pending" num={dashCard.pend}
          query={'Status = "Not Reachable" or Status = "Call not picked" or Status = "Applied"'} />
        <NumberCard title="Sanctioned" num={dashCard.san} query={'Status = "Sanctioned"'} />
        <NumberCard title="Converted" num={dashCard.conv} query={'Status = "Converted"'} />
        <NumberCard title="Closed" num={dashCard.clos}
          query={'Status = "Closed" or Status = "Profile not matched" or Status = "Property not approved"'}
        />
      </View>
    </ScrollView>
  )
}

export default AdminHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    color: '#9a9a9a',
    fontSize: 13,
  },
  adminName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  adminPill: {
    backgroundColor: 'rgba(31,111,235,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(31,111,235,0.3)',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  adminPillText: {
    color: lightTheme.blue,
    fontWeight: '700',
    fontSize: 13,
  },
  sectionLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
})