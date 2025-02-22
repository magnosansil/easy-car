import { useState, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./ride.style.js";
import { json_rides } from "../../utils/data.js";
import icons from "../../utils/icons.js";

const Ride = (props) => {
  const userId = 2; // logged user ID, it must be brought from login routine
  const [rides, setRides] = useState("");

  const clickRide = (id) => {
    props.navigation.navigate("ride-detail", { rideId: id, userId });
  };

  const requestRides = async () => {
    setRides(json_rides);
  };

  useEffect(() => {
    requestRides();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        keyExtractor={(ride) => ride.ride_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.ride}
              onPress={() => clickRide(item.ride_id)}
            >
              <View style={styles.nameContainer}>
                <Image source={icons.car} style={styles.car} />
                <Text style={styles.name}>{item.passenger_name}</Text>
              </View>
              <Text style={styles.address}>Origin: {item.pickup_address}</Text>
              <Text style={styles.address}>
                Destination: {item.dropoff_address}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Ride;
