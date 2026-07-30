export function generate(params: any): string {
	return `<?xml version='1.0' encoding='utf-8'?>
<widget id="com.example.myapp" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>My App</name>
    <description>A Cordova application</description>
    <author email="dev@example.com" href="https://example.com">Developer</author>
    
    <content src="index.html" />
    
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    
    <access origin="*" />
    
    <preference name="Orientation" value="default" />
    <preference name="Fullscreen" value="false" />
    <preference name="StatusBarOverlaysWebView" value="false" />
    <preference name="StatusBarBackgroundColor" value="#000000" />
    
    <platform name="android">
        <preference name="android-minSdkVersion" value="22" />
        <preference name="android-targetSdkVersion" value="33" />
        <icon density="ldpi" src="res/icon/android/ldpi.png" />
        <icon density="mdpi" src="res/icon/android/mdpi.png" />
        <icon density="hdpi" src="res/icon/android/hdpi.png" />
        <icon density="xhdpi" src="res/icon/android/xhdpi.png" />
    </platform>
    
    <platform name="ios">
        <preference name="deployment-target" value="13.0" />
        <icon height="180" src="res/icon/ios/icon-60@3x.png" width="180" />
    </platform>
</widget>`;
}
