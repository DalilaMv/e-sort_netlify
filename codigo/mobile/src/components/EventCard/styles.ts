import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF",
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    marginTop: 10,
    height: "28%",
  },

  left: {
    alignItems: "flex-start",
  },

  right: {
    alignItems: "flex-end",
  },

  text: {
    //fontFamily: "Poppins_400Regular",
    color: "#4F4F4F",
    fontSize: 14,
    lineHeight: 24,
  },

  textStatus: {
    color: "#969CB2",
  },

  textBold: {
    //fontFamily: "Poppins_600SemiBold",
    color: "#8257E5",
    fontWeight: "600",
  },

  participantsContainer: {
    flexDirection: "row",
  },

  icons: {
    marginRight: 8,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  buttonText: {
    //fontFamily: "Poppins_600SemiBold",
    color: "#E83F5B",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default styles;
