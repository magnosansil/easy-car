import { Image, ImageBackground, Text, TouchableOpacity } from "react-native";
import icons from "../../utils/icons.js";
import styles from "./home.style.js";

const Home = (props) => {
  const openPassenger = () => {
    props.navigation.navigate("passenger");
  };
  const openRide = () => {
    props.navigation.navigate("ride");
  };

  return (
    <ImageBackground source={icons.bg} resizeMode="cover" style={styles.bg}>
      <Image source={icons.logo} style={styles.logo} />

      <TouchableOpacity style={styles.btn} onPress={openPassenger}>
        <Image source={icons.passenger} style={styles.img} />
        <Text style={styles.title}>Passenger</Text>
        <Text style={styles.text}>Find you a ride</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={openRide}>
        <Image source={icons.driver} style={styles.img} />
        <Text style={styles.title}>Driver</Text>
        <Text style={styles.text}>Offer a ride in your car</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Home;
