import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "#ebebed",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "50%",
  },

  button: {
    borderRadius: 6,
    padding: 2,
    paddingHorizontal: 8,
  },

  approveButton: {
    backgroundColor: "#36ACE2",
  },

  rejectButton: {
    backgroundColor: "#ee9984",
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },

  buttonClose: {
    backgroundColor: "#8d98c7",
    marginTop: 2,
  },

  textStyle: {
    color: "white",
    textAlign: "center",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  tile: {
    marginBottom: 15,
    paddingHorizontal: 30,
  },

  tileBold: {
    fontWeight: "bold",
  },

  card: {
    borderRadius: 6,
    padding: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },

  text: {
    color: "#4F4F4F",
    margin: 2,
    textAlign: "center",
  },

  sinoIcon: {
    marginRight: 10,
  },

  buttonText: {
    color: "#363F5F",
    fontSize: 12,
    padding: 10,
  },

  buttonContainer: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default styles;
