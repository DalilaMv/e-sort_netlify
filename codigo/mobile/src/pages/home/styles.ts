import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    padding: 40,
  },

  banner: {
    width: "100%",
    resizeMode: "contain",
  },

  title: {
    color: "#FFF",
    fontSize: 20,
    lineHeight: 30,
    //fontFamily: "Poppins_400Regular",
  },

  buttonsContainer: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
  },

  button: {
    height: 150,
    width: "48%",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 24,
    justifyContent: "space-between",
  },

  buttonPrimary: {
    backgroundColor: "#9871F5",
  },

  buttonSecondary: {
    backgroundColor: "#36ACE2",
  },

  buttonText: {
    //fontFamily: "Archivo_700Bold",
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  footer: {
    //fontFamily: "Poppins_400Regular",
    color: "#d4c2ff",
    fontSize: 12,
    lineHeight: 20,
    marginTop: 50,
    marginBottom: 20,
    display: "flex",
    alignSelf: "center",
  },
});

export default styles;
