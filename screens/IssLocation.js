import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, StatusBar, SafeAreaView } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
export default class IssLocationScreen extends Component {
    constructor(props){
        super(props);
        this.State = {
            location: {},
        }
    }

    componentDidMount(){
        this.getISSLocation();
    }

    getISSLocation=()=>{
        axios
        .get("https://api.wheretheiss.at/v1/satellites/25544")
        .then(response=>{
            this.setState({
                location: response.data
            })
            .catch(error=>{
                Alert.alert(error.message)
            })
        })
    }


    render() {
        return (
            <View style={styles.container}>
             <SafeAreaView style={styles.droidSafeArea}>

            </SafeAreaView>   
             <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}> 
                <View style={styles.titleContainer}> 
                    <Text style={styles.titleText}> Localización de la EEI </Text> 
                </View>
                <View style={styles.mapContainer}>
                    <MapView style={styles.mapDisplay}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}> 
                        <Marker 
                         coordenate={{atitude: this.state.location.latitude, longitude: this.state.location.longitude}}> 
                            <Image source={require("../assets/iss_icon.png")} style={{height: 50, width: 50}}></Image>
                         </Marker>
                     </MapView>    
                </View> 
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Latitud: {this.state.location.latitude}</Text>
                    <Text style={styles.infoText}>Longitud: {this.state.location.longitude}</Text>
                    <Text style={styles.infoText}>Altitud (KM): {this.state.location.altitude}</Text>
                    <Text style={styles.infoText}>Velocidad (KM/H): {this.state.location.velocity}</Text>
                </View>
            </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight: 0
    },

    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        allignItems: "center"
    },

    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    mapContainer: {
        flex: 0.6
    },

    mapDisplay: {
        width: "100%",
        height: "100%"
    },

    infoContainer: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    }
})