import { Text, TouchableOpacity } from "react-native";
import styles from "./mybutton.style.js";

const MyButton = (props) => {
  return (
    <TouchableOpacity
      style={props.theme === "red" ? styles.btnRed : styles.btnYellow}
      onPress={() => props.onClick()}
    >
      <Text style={props.theme === "red" ? styles.textLight : styles.textDark}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;
