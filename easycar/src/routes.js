import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home/Home";
import Passenger from "./screens/Passenger/Passenger";
import Ride from "./screens/Ride/Ride";
import RideDetail from "./screens/RideDetail/RideDetail";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="passenger"
          component={Passenger}
          options={{
            headerShadowVisible: false,
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="ride"
          component={Ride}
          options={{
            headerTitle: "Available Rides",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="ride-detail"
          component={RideDetail}
          options={{
            headerShadowVisible: false,
            headerTitle: "",
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
