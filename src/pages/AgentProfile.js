import { Image, Modal, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import NumberCard from '../components/Elements/NumberCard'
import { ScrollView } from 'react-native'
import { GetReq } from '../apiCalls/api'
import { useSelector } from 'react-redux'
import Refer from './Refer'

const AgentProfile = () => {
  const [dashCard, setdashCard] = useState({
    t: 0,
    inp: 0,
    pend: 0,
    san: 0,
    conv: 0,
    clos: 0,
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [refcount, setrefcount] = useState(null)
  const { user } = useSelector(state => state.reducer)

  const fetchMyReferralcount = async () => {
    const d = await GetReq(`/getrefferedcount?quer= Referedby ='${user.ReferCode}'`)
    setrefcount(d[0]?.refferals)
  }

  const fetching = async () => {
    let inp = 0, t = 0, pend = 0, san = 0, conv = 0, clos = 0
    const d = await GetReq('/agentdashboard?agentPhone=' + user.Phone)
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
    await fetchMyReferralcount()
    setdashCard(tmp)
    setLoading(false)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    loadDashboard().finally(() => setRefreshing(false))
  }, [])

  useEffect(() => {
    loadDashboard()
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      fadingEdgeLength={50}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
      }
    >
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.Name || 'Agent'}</Text>
        </View>
        <View style={styles.referralPill}>
          <Text style={styles.referralPillText}>{user?.ReferCode || '—'}</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Overview</Text>

      <View style={styles.grid}>
        <NumberCard title="Total Leads" num={dashCard.t} query={'/'} access="agent" />
        <NumberCard title="In Progress" num={dashCard.inp} query={'Status = "In Progress" and AgentId =' + user.Phone} access="agent" />
        <NumberCard title="Pending" num={dashCard.pend}
          query={'(Status = "Not Reachable" or Status = "Call not picked" or Status = "Applied") and AgentId = ' + user.Phone} access="agent" />
        <NumberCard title="Sanctioned" num={dashCard.san} query={'Status = "Sanctioned" and AgentId = ' + user.Phone} access="agent" />
        <NumberCard title="Converted" num={dashCard.conv} query={'Status = "Converted" and AgentId = ' + user.Phone} access="agent" />
        <NumberCard title="Closed" num={dashCard.clos}
          query={'(Status = "Closed" or Status = "Profile not matched" or Status = "Property not approved" ) and AgentId = ' + user.Phone}
          access="agent" />
        <NumberCard title="My Referrals" num={refcount} query={user.ReferCode} access="agentRefferal" />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Refer setModalVisible={setModalVisible} ReferCode={user.ReferCode} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default AgentProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
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
  userName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  referralPill: {
    backgroundColor: 'rgba(31,111,235,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(31,111,235,0.3)',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  referralPillText: {
    color: '#1f6feb',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    width: '85%',
    backgroundColor: '#2f2f2f',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
})