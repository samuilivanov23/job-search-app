import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    //Load fonts
    const [fontsLoaded] = useFonts({
        DMBold : require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium : require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular : require('../assets/fonts/DMSans-Regular.ttf')
    })

    //Show home page only after fonts are loaded
    //onLaoyoutRootView requires dependancy array of fonts => fontsLoaded, as useEffect
    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded){
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if(!fontsLoaded) { return null; }

    return <Stack onLayout={onLayoutRootView}/>;
}

export default Layout;