# AysSolutionClean2 — Setup & Run

## What was fixed in this drop
- `Masternew.js`: replaced Expo-style `ImagePicker.launchImageLibraryAsync` with the correct `react-native-image-picker` `launchImageLibrary` API.
- `babel.config.js`: plugin changed from `react-native-reanimated/plugin` → `react-native-worklets/plugin` (required for Reanimated v4).
- `package.json`: added missing `react-native-pager-view` (required peer dep of `react-native-tab-view`).
- `index.js`: added `import 'react-native-gesture-handler'` as the very first line.
- `App.tsx`: wrapped app in `GestureHandlerRootView` + `SafeAreaProvider`.
- `tsconfig.json`: added (was missing).
- `android/app/build.gradle`: added the `react-native-vector-icons` fonts.gradle block so icon fonts actually get bundled into the APK (previously all icons would have rendered as blank boxes).
- `ios/.../Info.plist`: added `UIAppFonts` (same reason, for iOS) and `NSPhotoLibraryUsageDescription` (required by `react-native-image-picker`'s gallery picker — without this the app **crashes** on iOS when you try to pick an image).
- Removed stale local build caches (`.cxx`, `.gradle`, `.kotlin`, `android/local.properties`, `android/app/build`) that were specific to your machine and would conflict with a fresh install.
- `chmod +x android/gradlew`.

## Run it

```bash
# 1. Install JS deps
npm install
# or: yarn install

# 2. Android
npx react-native run-android
# (make sure an emulator is running or a device is connected)

# 3. iOS (Mac only)
cd ios && pod install && cd ..
npx react-native run-ios
```

If Metro complains about a stale cache after all these changes:
```bash
npx react-native start --reset-cache
```

## Known non-blocking risks to watch for
- `@pembajak/react-native-image-slider-banner` (used in `Banners.js`) is a small, less-maintained fork. If it errors on New Architecture (Fabric, which is enabled — `newArchEnabled=true` in `android/gradle.properties`), you may need to disable new arch for that one library or swap the component.
- `data.js` → `UploadImage()` has a pre-existing bug unrelated to the Expo migration: `let type = match ? img / match[1] : img;` divides a string by a string (should be building a mime type string like `image/${match[1]}`). Left as-is since you said logic bugs are fine, but flagging it because it affects real image uploads to Cloudinary.
- No permission is requested before `react-native-image-picker` opens the gallery on Android 13+ in `Masternew.js` (unlike `Master.js`, which does request it). The library requests it internally in most cases, but if you see a picker failure on newer Android, add the same `PermissionsAndroid` check there.
