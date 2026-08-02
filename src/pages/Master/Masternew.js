import React, { useState } from 'react';
import { View, Image, Alert, ScrollView, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { lightTheme } from '../../data';
import { Text } from 'react-native';
import Button from '../../components/Elements/Button';
import { PostReq } from '../../apiCalls/api';
import { useNavigation } from '@react-navigation/native';

const cloudName = 'dngvh3o0g'; // Your Cloudinary cloud name

const Masternew = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadedImgsUrls,setuploadedImgsUrls] = useState([])
    const [disableSumbmit,setdisableSumbmit] = useState(true)

    const [showImgUp, setShowImUp] = useState(false)
    const [propertyData, SetPropertyData] = useState({
        pName: '',
        pDesc: '',
        pRange: '',
        imgs: ''
    })
    const pickImage = async () => {
        let result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            quality: 1,
        });

        if (!result.didCancel && !result.errorCode && result.assets && result.assets.length > 0) {
            setSelectedImages([...selectedImages, result.assets[0].uri]);
            await uploadImages([result.assets[0].uri])
        }
    };
    const navigation = useNavigation()
    const uploadImages = async (selectedImages = selectedImages) => {
        const formData = new FormData();
        setdisableSumbmit(true)
        formData.append('file', {
            uri: selectedImages[0],
            type: 'image/jpeg',
            name: selectedImages[0].split('/').pop(),
        });
        formData.append("upload_preset", "aysmaster")
        formData.append("cloud_name", "dngvh3o0g")
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dngvh3o0g/image/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Handle successful upload
           
           let tempimgs  = uploadedImgsUrls
            // if(uploadedImgsUrls ==""){
            //       tempimgs =  response.data.url
            // }
            // else{
            //      tempimgs = uploadedImgsUrls + "," + response.data.url
            // }
            tempimgs.push(response.data.url.replace('http://','https://'))
            setuploadedImgsUrls(tempimgs)
            Alert.alert('Upload Successful', 'Images successfully uploaded to Cloudinary!');
            setdisableSumbmit(false)
            // console.log('Cloudinary response:', response.data);
        } catch (error) {
            // Handle error
            Alert.alert('Upload Failed', 'Failed to upload images to Cloudinary.');
            setdisableSumbmit(true)
            console.error('Error uploading images:', error);
        }
    };

    const handleSubmitProperty = async () => {
        try {
            let data = { ...propertyData, imgs: uploadedImgsUrls.join(",") }
            // console.log(data)
            let re =await PostReq('/master',data,'Property Details Submitted!')
            navigation.navigate('admindashboard' )
        }
        catch (e) {
            alert(e.message)
            console.warn(e)
        }
    }
    return (
        <ScrollView>

            <Text style={styles.text} >Upload Images for Property</Text>
            <Button text="Add New Property" action={() => setShowImUp(!showImgUp)} color={lightTheme.Secondary} txtcolor={lightTheme.primary} mwidth={200} />
            {
                showImgUp && <View>
                    <TextInput onChangeText={(e) =>SetPropertyData({ ...propertyData, pName: e })}
                         value={propertyData.pName}
                        style={styles.inpt} placeholder='Enter Property Name..' />

                    <TextInput onChangeText={(e) => {  SetPropertyData({ ...propertyData, pDesc: e })}} style={styles.inpt}
                        value={propertyData.pDesc}
                        placeholder='Enter Property Description..' />

                    <TextInput onChangeText={(e) => SetPropertyData({ ...propertyData, pRange: e })} style={styles.inpt}
                         value={propertyData.pRange}
                        placeholder='Enter Property Price Range..' />



                    {selectedImages.map((image, index) => (
                        <Image key={index} source={{ uri: image }} style={{ width: 300, height: 300, marginBottom: 10, alignSelf: 'center' }} />
                    ))}
                    <Button text="Pick Image" action={pickImage} color={lightTheme.success} txtcolor={lightTheme.primary} mwidth={200} />
                    <Button text="Submit this Property" action={handleSubmitProperty}
                        disabled={selectedImages.length === 0 || disableSumbmit}
                        color={lightTheme.blue} txtcolor={lightTheme.primary} mwidth={200} />
                </View>
            }


            {/* <Button title="Pick Images" onPress={pickImage} />
            <Button title="Upload Images" onPress={uploadImages} disabled={selectedImages.length === 0} /> */}
        </ScrollView>
    );
};

export default Masternew;




const styles = StyleSheet.create({
    container: {
        width: '95%',
        borderRadius: 15,
        //  marginHorizontal:20,
        marginVertical: 10,
        backgroundColor: lightTheme.primary,
        textAlign: 'center',
        padding: 15,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        //  overflow : '',
        flexWrap: 'wrap',
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
        height: 'auto',
        // justifyContent: 'space-between'
    }
    ,
    text: {
        fontSize: 20,
        fontWeight: '400',
        margin: 20,
        // width :'100%'
        alignSelf: 'center'
        // paddingVertical : 20
    },
    inpt: {
        borderBottomColor: lightTheme.Secondary,
        paddingHorizontal: 10,
        margin: 5,
        maxWidth: '90%',
        alignSelf: 'center',
        borderColor: "gray", width: "100%", borderWidth: 1, borderRadius: 10, padding: 10,
    }
    , icon: {
        width: 40,

    }
})