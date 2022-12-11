import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#36ACE2",
    justifyContent: "center",
    padding: 24,
  },

  voltar: {
    marginTop: 30,
    width: "30%",
  },

  title: {
    color: "#FFF",
    fontSize: 20,
    lineHeight: 30,
    //fontFamily: "Poppins_400Regular",
    marginTop: 10,
  },

  form: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 20,
    padding: 15,
  },

  label: {
    color: "#4F4F4F",
    //fontFamily: "Poppins_400Regular",
  },

  firstLabel: {
    marginTop: 14,
  },

  input: {
    height: 54,
    backgroundColor: "#E6E6F0",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },

  inputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputContainer: {
    width: "48%",
    justifyContent: "space-between",
  },

  button: {
    height: 54,
    backgroundColor: "#AD96E3",
    borderRadius: 8,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 14,
  },

  buttonText: {
    //fontFamily: "Archivo_700Bold",
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  footer: {
    //fontFamily: "Poppins_400Regular",
    color: "#FFF",
    fontSize: 12,
    lineHeight: 20,
    marginTop: 30,
    marginBottom: 20,
    display: "flex",
    alignSelf: "center",
  },

  TextAlet: {
    marginTop: 20,
    color: "#E83F5B",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default styles;
