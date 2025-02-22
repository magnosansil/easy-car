import { useEffect, useState } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import MyButton from "../../components/MyButton/MyButton.jsx";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import styles from "./passenger.style.js";
import icons from "../../utils/icons";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";

const Passenger = (props) => {
  const userId = 1; // logged user ID, it must be brought from login routine
  const [myLocation, setMyLocation] = useState({});
  const [title, setTitle] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [status, setStatus] = useState("");
  const [rideId, setRideId] = useState(0);
  const [driverName, setDriverName] = useState("");

  const requestRideFromUser = async () => {
    // const response = {
    //   ride_id: 1,
    //   passenger_user_id: 1,
    //   passenger_name: "Heber Stein Mazutti",
    //   passenger_phone: "(11) 99999-9999",
    //   pickup_address: "Av. Paulista, 1500 - Jardim Paulista",
    //   pickup_date: "2025-02-17",
    //   pickup_latitude: "-23.543132",
    //   pickup_longitude: "-46.665389",
    //   dropoff_address: "Shopping Center Norte",
    //   status: "P",
    //   driver_user_id: null,
    //   driver_name: null,
    //   driver_phone: null,
    // };
    const response = {
      ride_id: 1,
      passenger_user_id: 1,
      passenger_name: "Heber Stein Mazutti",
      passenger_phone: "(11) 99999-9999",
      pickup_address: "Av. Paulista, 1500 - Jardim Paulista",
      pickup_date: "2025-02-17",
      pickup_latitude: "-23.543132",
      pickup_longitude: "-46.665389",
      dropoff_address: "Shopping Center Norte",
      status: "A",
      driver_user_id: 2,
      driver_name: "João Martins",
      driver_phone: "(77) 5555-5555",
    };

    return response;
  };

  const requestPermissionAndGetLocation = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();

      if (currentPosition.coords) {
        return currentPosition.coords;
      } else {
        return {};
      }
    } else {
      return {};
    }
  };

  const requestAddressName = async (latitude, longitude) => {
    const response = await reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });

    if (
      response[0].street &&
      response[0].streetNumber &&
      response[0].district
    ) {
      setPickupAddress(
        `${response[0].street}, ${response[0].streetNumber}, ${response[0].district}`
      );
    }
  };

  const loadScreen = async () => {
    const response = await requestRideFromUser();

    if (!response.ride_id) {
      const location = await requestPermissionAndGetLocation();

      if (location.latitude) {
        setTitle("Find your ride");
        setMyLocation(location);
        requestAddressName(location.latitude, location.longitude);
      } else {
        Alert.alert("Unable to get your location");
      }
    } else {
      setTitle(
        response.status == "P" ? "Waiting for a ride..." : "Ride confirmed"
      );
      setMyLocation({
        latitude: Number(response.pickup_latitude),
        longitude: Number(response.pickup_longitude),
      });
      setPickupAddress(response.pickup_address);
      setDropoffAddress(response.dropoff_address);
      setStatus(response.status);
      setRideId(response.ride_id);
      setDriverName(`${response.driver_name} - ${response.driver_phone}`);
    }
  };

  const askForRide = () => {
    const json = {
      passenger_id: userId,
      prickup_address: pickupAddress,
      dropoff_address: dropoffAddress,
      pickup_latitude: myLocation.latitude,
      pickup_longitude: myLocation.longitude,
    };

    console.log("Asking", json);

    props.navigation.goBack();
  };

  const cancelRide = () => {
    const json = {
      passenger_user_id: userId,
      ride_id: rideId,
    };

    console.log("Canceling", json);
    props.navigation.goBack();
  };

  const finishRide = () => {
    const json = {
      passenger_user_id: userId,
      ride_id: rideId,
    };

    props.navigation.goBack();
  };

  useEffect(() => {
    loadScreen();
  }, []);

  return (
    <View style={styles.container}>
      {myLocation ? (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={{
              latitude: myLocation.latitude,
              longitude: myLocation.longitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }}
          >
            <Marker
              coordinate={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
              }}
              title="Passenger Name"
              descripton={myLocation}
              image={icons.location}
            />
          </MapView>
          <View style={styles.footer}>
            <View style={styles.footerText}>
              <Text>{title}</Text>
            </View>
            <View style={styles.footerFields}>
              <Text>Origin</Text>
              <TextInput
                style={styles.input}
                value={pickupAddress}
                onChangeText={(text) => setPickupAddress(text)}
                editable={status == "" ? true : false}
              />
            </View>
            <View style={styles.footerFields}>
              <Text>Destination</Text>
              <TextInput
                style={styles.input}
                value={dropoffAddress}
                onChangeText={(text) => setDropoffAddress(text)}
                editable={status == "" ? true : false}
              />
            </View>
            {status == "A" && (
              <View style={styles.footerFields}>
                <Text>Driver</Text>
                <TextInput
                  style={styles.input}
                  value={driverName}
                  editable={false}
                />
              </View>
            )}
          </View>
          {status == "" && (
            <MyButton label="CONFIRM" theme="default" onClick={askForRide} />
          )}
          {status == "P" && (
            <MyButton label="Cancel" theme="red" onClick={cancelRide} />
          )}
          {status == "A" && (
            <MyButton label="Finish Ride" theme="red" onClick={finishRide} />
          )}
        </>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default Passenger;
