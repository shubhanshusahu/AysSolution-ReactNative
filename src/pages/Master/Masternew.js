import React, { useState } from 'react';
import { View, Image, Alert, ScrollView, TextInput, StyleSheet, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { lightTheme } from '../../data';
import Button from '../../components/Elements/Button';
import { PostReq } from '../../apiCalls/api';
import { useNavigation } from '@react-navigation/native';
import PropertyList from './PropertyList';

const cloudName = 'dngvh3o0g';

const Masternew = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadedImgsUrls, setuploadedImgsUrls] = useState([]);
    const [disableSumbmit, setdisableSumbmit] = useState(true);
    const [showImgUp, setShowImUp] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [propertyData, SetPropertyData] = useState({
        pName: '',
        pDesc: '',
        pRange: '',
        imgs: ''
    });

    const navigation = useNavigation();

    const pickImage = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            quality: 1,
        });

        if (!result.didCancel && !result.errorCode && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setSelectedImages(prev => [...prev, uri]);
            await uploadImages([uri]);
        }
    };

    const uploadImages = async (images) => {
        const formData = new FormData();
        setUploading(true);
        setdisableSumbmit(true);
        formData.append('file', {
            uri: images[0],
            type: 'image/jpeg',
            name: images[0].split('/').pop(),
        });
        formData.append("upload_preset", "aysmaster");
        formData.append("cloud_name", cloudName);
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setuploadedImgsUrls(prev => [...prev, response.data.url.replace('http://', 'https://')]);
            Alert.alert('Upload Successful', 'Image successfully uploaded!');
            setdisableSumbmit(false);
        } catch (error) {
            Alert.alert('Upload Failed', 'Failed to upload image.');
            setdisableSumbmit(true);
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setSelectedImages([]);
        setuploadedImgsUrls([]);
        SetPropertyData({ pName: '', pDesc: '', pRange: '', imgs: '' });
        setdisableSumbmit(true);
        setShowImUp(false);
    };

    const handleSubmitProperty = async () => {
        try {
            let data = { ...propertyData, imgs: uploadedImgsUrls.join(",") };
            await PostReq('/master', data, 'Property Details Submitted!');
            resetForm();
        } catch (e) {
            alert(e.message);
            console.warn(e);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>Property Management</Text>

            <Button
                text={showImgUp ? "Cancel" : "Add New Property"}
                action={() => setShowImUp(!showImgUp)}
                color={showImgUp ? lightTheme.close : lightTheme.blue}
                txtcolor="#fff"
                mwidth={'100%'}
            />

            {showImgUp && (
                <View style={styles.formCard}>
                    <Text style={styles.formLabel}>Property Details</Text>

                    <TextInput
                        onChangeText={(e) => SetPropertyData({ ...propertyData, pName: e })}
                        value={propertyData.pName}
                        style={styles.input}
                        placeholder='Property Name'
                        placeholderTextColor="#999"
                    />
                    <TextInput
                        onChangeText={(e) => SetPropertyData({ ...propertyData, pDesc: e })}
                        value={propertyData.pDesc}
                        style={styles.input}
                        placeholder='Property Description'
                        placeholderTextColor="#999"
                        multiline
                    />
                    <TextInput
                        onChangeText={(e) => SetPropertyData({ ...propertyData, pRange: e })}
                        value={propertyData.pRange}
                        style={styles.input}
                        placeholder='Property Price Range'
                        placeholderTextColor="#999"
                    />

                    {selectedImages.length > 0 && (
                        <View style={styles.imagePreviewRow}>
                            {selectedImages.map((image, index) => (
                                <Image key={index} source={{ uri: image }} style={styles.previewImg} />
                            ))}
                        </View>
                    )}

                    <Button
                        text={uploading ? "Uploading..." : "Pick Image"}
                        action={pickImage}
                        color={lightTheme.success}
                        txtcolor="#fff"
                        mwidth={'100%'}
                        disabled={uploading}
                    />
                    <Button
                        text="Submit this Property"
                        action={handleSubmitProperty}
                        disabled={selectedImages.length === 0 || disableSumbmit}
                        color={lightTheme.blue}
                        txtcolor="#fff"
                        mwidth={'100%'}
                    />
                </View>
            )}

            <PropertyList />
        </ScrollView>
    );
};

export default Masternew;

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
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    formCard: {
        marginTop: 16,
        padding: 18,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        gap: 10,
    },
    formLabel: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 4,
    },
    input: {
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        color: '#fff',
        fontSize: 15,
    },
    imagePreviewRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginVertical: 8,
    },
    previewImg: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
});