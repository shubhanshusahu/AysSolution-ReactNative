import React, { useState } from 'react';
import { Button, Image, View, PermissionsAndroid, Platform, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { PostReq } from '../../apiCalls/api';
import { UploadImage } from '../../data';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  // 🔐 Permission (Android only)
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission required', 'Please allow gallery access');
        return false;
      }
    }
    return true;
  };

  // 🖼️ Pick Image
  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    });

    if (result.didCancel) {
      console.log('User cancelled');
    } else if (result.errorCode) {
      console.log('Error:', result.errorMessage);
    } else {
      const asset = result.assets[0];
      setImage(asset); // store full object (better than just uri)
    }
  };

  // 🚀 Upload Image
  const uploadImage = async () => {
    if (!image) return;

    try {
      let localUri = image.uri;
      let filename = image.fileName || localUri.split('/').pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();

      // Optional: your custom upload helper
      const link = await UploadImage(localUri);

      formData.append('file', {
        uri: localUri,
        name: filename,
        type: type,
      });

      formData.append(
        'data',
        JSON.stringify({ name: 'new', desc: 'desc1' })
      );

      const response = await PostReq('/master', {
        name: 'new',
        desc: 'desc1',
      });

      console.log(response, 'saved response!!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from gallery" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}

      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}