import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#36ACE2",
    justifyContent: "center",
    padding: 40,
  },

  voltar: {
    marginTop: 30,
  },

  title: {
    color: "#FFF",
    fontSize: 20,
    lineHeight: 30,
    //pins_400Regular",
    marginTop: 10,
  },

  form: {
    backgroundColor: "#FFF",
    flex: 1,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 20,
    padding: 15,
  },

  label: {
    color: "#4F4F4F",
    //pins_400Regular",
  },

  firstLabel: {
    marginTop: 20,
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

  button: {
    height: 54,
    backgroundColor: "#AD96E3",
    borderRadius: 8,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  TextAlet: {
    marginTop: 20,
    color: "#E83F5B",
    fontSize: 17,
    fontWeight: "bold",
  },

  footer: {
    color: "#FFF",
    fontSize: 12,
    lineHeight: 20,
    marginTop: 30,
    marginBottom: 20,
    display: "flex",
    alignSelf: "center",
  },
});

export default styles;
