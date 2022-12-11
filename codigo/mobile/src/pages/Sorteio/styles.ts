import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    padding: 24,
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 24,
    padding: 0,
  },

  title: {
    color: "#AD96E3",
    fontSize: 20,
    lineHeight: 30,
    //fontFamily: "Poppins_400Regular",
    marginTop: 10,
  },

  voltar: {
    marginTop: 30,
  },

  label: {
    color: "#4F4F4F",
    //fontFamily: "Poppins_600SemiBold",
    marginHorizontal: 30,
    fontWeight: "600",
  },

  input: {
    height: 50,
    backgroundColor: "#FAFAFC",
    borderRadius: 8,
    justifyContent: "center",
    marginHorizontal: 30,
    marginVertical: 14,
  },

  footer: {
    //fontFamily: "Poppins_400Regular",
    color: "#AD96E3",
    fontSize: 12,
    lineHeight: 20,
    marginTop: 30,
    marginBottom: 20,
    display: "flex",
    alignSelf: "center",
  },

  img: {
    display: "flex",
    alignSelf: "center",
    marginTop: 60,
  },

  button: {
    height: 54,
    backgroundColor: "#AD96E3",
    borderRadius: 8,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 14,
    marginHorizontal: 30,
  },

  buttonText: {
    //fontFamily: "Archivo_700Bold",
    color: "#FFF",
    fontSize: 17,
  },
});
export default styles;
