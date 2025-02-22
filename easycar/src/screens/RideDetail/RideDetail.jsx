import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import styles from "./ridedetail.style.js";
import icons from "../../utils/icons.js";
import MyButton from "../../components/MyButton/MyButton.jsx";

const RideDetail = (props) => {
  const rideId = props.route.params.rideId;
  const userId = props.route.params.userId;
  const [title, setTitle] = useState("");
  const [ride, setRide] = useState("");

  const requestRideDetail = () => {
    // const response = {
    //   ride_id: 1,
    //   passenger_user_id: 1,
    //   passenger_name: "Heber Stein Mazutti",
    //   passenger_phone: "(11) 99999-9999",
    //   pickup_address: "Praça Charles Miller - Jardim Paulista",
    //   pickup_date: "2025-02-97",
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
      pickup_address: "Praça Charles Miller - Jardim Paulista",
      pickup_date: "2025-02-97",
      pickup_latitude: "-23.543132",
      pickup_longitude: "-46.665389",
      dropoff_address: "Shopping Center Norte",
      status: "A",
      driver_user_id: null,
      driver_name: null,
      driver_phone: null,
    };
    if (response.passenger_name) {
      setTitle(`${response.passenger_name} - ${response.passenger_phone}`);
      setRide(response);
    }
  };

  const acceptRide = async () => {
    const json = {
      driver_user_id: userId,
      ride_id: rideId,
    };

    console.log("Accepting", json);

    props.navigation.goBack();
  };

  const cancelRide = async () => {
    const json = {
      driver_user_id: userId,
      ride_id: rideId,
    };

    console.log("Canceling", json);

    props.navigation.goBack();
  };

  useEffect(() => {
    requestRideDetail();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: Number(ride.pickup_latitude),
          longitude: Number(ride.pickup_longitude),
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
      >
        <Marker
          coordinate={{
            latitude: Number(ride.pickup_latitude),
            longitude: Number(ride.pickup_longitude),
          }}
          title={ride.passenger_name}
          descripton={ride.pickup_address}
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
            value={ride.pickup_address}
            editable={false}
          />
        </View>
        <View style={styles.footerFields}>
          <Text>Destination</Text>
          <TextInput
            style={styles.input}
            value={ride.dropoff_address}
            editable={false}
          />
        </View>
      </View>
      {ride.status == "P" && (
        <MyButton label="Accept" theme="default" onClick={acceptRide} />
      )}
      {ride.status == "A" && (
        <MyButton label="Cancel" theme="red" onClick={cancelRide} />
      )}
    </View>
  );
};

export default RideDetail;
