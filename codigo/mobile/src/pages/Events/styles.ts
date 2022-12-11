import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7",
    padding: 14,
  },

  headerContainer: {
    backgroundColor: "#FFFF",
    padding: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  menuContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },

  title: {
    //fontFamily: "Archivo_400Regular",
    color: "#4F4F4F",
    fontSize: 22,
    lineHeight: 37,
    marginTop: 29,
  },

  subTitle: {
    //fontFamily: "Archivo_700Bold",
    color: "#4F4F4F",
    fontSize: 22,
    lineHeight: 37,
  },

  sinoIcon: {
    marginRight: 10,
  },

  eventsContainer: {
    backgroundColor: "#36ACE2",
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 20,
    padding: 15,
    flex: 1,
  },

  titleEventos: {
    //fontFamily: "Poppins_400Regular",
    color: "#ffff",
    fontSize: 18,
    lineHeight: 37,
    marginTop: 19,
  },
});

export default styles;
