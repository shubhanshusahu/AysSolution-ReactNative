import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { GetReq, DeleteReq } from '../../apiCalls/api';
import { lightTheme } from '../../data';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const fetchProperties = useCallback(async () => {
        try {
            setLoading(true);
            const res = await GetReq('/master');
            setProperties(res?.data || []);
        } catch (e) {
            console.warn('Error fetching properties:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const confirmDelete = (id, name) => {
        Alert.alert(
            'Delete Property',
            `Are you sure you want to delete "${name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete(id) },
            ]
        );
    };

    const handleDelete = async (id) => {
        try {
            setDeletingId(id);
            await DeleteReq(`/master/${id}`, 'Property deleted!');
            setProperties(prev => prev.filter(p => p.idmaster !== id));
        } catch (e) {
            Alert.alert('Delete Failed', 'Could not delete this property.');
            console.warn(e);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color={lightTheme.blue} style={{ marginTop: 30 }} />;
    }

    if (properties.length === 0) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No properties added yet.</Text>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Added Properties</Text>
            {properties.map((item) => {
                const firstImg = item.imgs?.split(',')[0];
                return (
                    <View key={item.idmaster} style={styles.card}>
                        {firstImg ? (
                            <Image source={{ uri: firstImg }} style={styles.cardImg} />
                        ) : (
                            <View style={[styles.cardImg, styles.cardImgPlaceholder]}>
                                <Text style={{ color: '#999' }}>No Image</Text>
                            </View>
                        )}
                        <View style={styles.cardBody}>
                            <Text style={styles.cardTitle} numberOfLines={1}>{item.name || item.pName}</Text>
                            <Text style={styles.cardDesc} numberOfLines={2}>
                                {item.pdesc || item.pDesc}
                            </Text>
                            <Text style={styles.cardRange}>Range: {item.prange || item.pRange}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.deleteBtn}
                            onPress={() => confirmDelete(item.idmaster, item.name || item.pName)}
                            disabled={deletingId === item.idmaster}
                        >
                            {deletingId === item.idmaster ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.deleteBtnText}>Delete</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
};

export default PropertyList;

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 28,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 14,
    },
    emptyState: {
        marginTop: 30,
        alignItems: 'center',
    },
    emptyText: {
        color: '#9a9a9a',
        fontSize: 14,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    cardImg: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 12,
    },
    cardImgPlaceholder: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBody: {
        flex: 1,
    },
    cardTitle: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    cardDesc: {
        color: '#9a9a9a',
        fontSize: 12,
        marginTop: 2,
    },
    cardRange: {
        color: lightTheme.blue,
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
    },
    deleteBtn: {
        backgroundColor: lightTheme.close,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginLeft: 8,
        minWidth: 60,
        alignItems: 'center',
    },
    deleteBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
});