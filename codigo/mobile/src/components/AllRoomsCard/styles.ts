import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleEventos: {
    //fontFamily: "Poppins_400Regular",
    color: "#4F4F4F",
    fontSize: 18,
    lineHeight: 37,
    padding: 10,
  },

  textStatus: {
    color: "#969CB2",
  },

  card: {
    backgroundColor: "#FFFF",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    marginTop: 10,
    height: "26%",
  },

  left: {
    alignItems: "flex-start",
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  text: {
    //fontFamily: "Poppins_400Regular",
    color: "#4F4F4F",
    fontSize: 14,
    lineHeight: 24,
  },

  participantsContainer: {
    flexDirection: "row",
  },

  icons: {
    marginRight: 8,
  },

  button: {
    alignItems: "center",
    marginTop: 6,
    backgroundColor: "#F0F0F7",
    borderRadius: 8,
  },

  buttonText: {
    //fontFamily: "Poppins_600SemiBold",
    color: "#363F5F",
    fontSize: 12,
    padding: 10,
    fontWeight: "600",
  },
});

export default styles;
