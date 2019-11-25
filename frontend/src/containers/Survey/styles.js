import {
  PixelRatio,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    width: "90%",
    marginTop: 100,
    marginBottom: 50,
    alignSelf: 'center'
  },
  cancelBox: {
    position: 'absolute',
    width: '80%',
    borderRadius: 10,
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  errorMsg: {
    color: '#f00',
    width: '50%',
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 5,
    marginTop: -5
  },
  noError: {
    height: 0,
  }, 
  thankyouText: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
    color: '#000'
  },
  logoutModalContainer: {
    paddingHorizontal: 50,
    paddingTop: 90,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  logoutContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b8141',
    borderRadius: 25,
    position: 'absolute',
    top: 20,
    right: 20
  },
  logoutButton: {
    color: '#fff',
    fontSize: 50,
  },
  logout_error: {
    color: '#f30',
    fontSize: 25,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20
  },
  inputfield_container: {
    backgroundColor: "#e6e6e6",
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    position: 'relative'
  },
  inputicon_container: {
    position: 'absolute',
    left: 10
  },
  inputTabletID: {
    height: 70,
    fontSize: 40,
    textAlign: 'center',
    color: "#989898",
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center'
  },
  cancelBut: {
    marginHorizontal: 10,
    width: '40%'
  },
  textCancel: {
    fontSize: 25
  },
  button_container: {
    marginTop: PixelRatio.getPixelSizeForLayoutSize(15),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    width: 200,
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#e6e6e6",
    borderRadius: 35,
  },
  loginText: {
    color: "#333",
    fontSize: 35,
    textAlign: 'center'
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
  },
  haveAccountText: {
    color: '#bec0ce',
    fontSize: 16,
  },
  topBar: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#3b8041',
    borderRadius: 5
  },
  topBarText: {
    color: '#fff',
    fontSize: 30
  },
  topbar: {
    backgroundColor: "#eee",
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 0,
    zIndex: 9999
  },
  topbar_text: {
    fontSize: 26,
    color: "#3d3d3d"
  },
  servey_question: {
    fontSize: 26,
    color: "#333",
    fontWeight: 'bold'
  },
  answers_container: {
    marginTop: 50
  },
  answer_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  answer_radio: {
    width: 33,
    height: 33,
    borderRadius: 20,
    borderWidth: 2,
    borderColor:"#666", 
  },
  answer_text: {
    fontSize: 26,
    color: "#333",
    marginLeft: 10
  },
  button_text: {
    fontSize: 26,
    color: "#3d3d3d",
    textTransform: 'uppercase'
  },
  active_button: {
    backgroundColor: '#3b8041',
  },
  active_button_text: {
    color: "#fff",
  },
  next_button_container: {
    flexDirection: 'row'
  },
  backbutton: {
    marginRight: 10
  },
  answer_img_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  answer_image: {
    marginBottom: 15,
    width: '48%',
    height: 100
  }
});


export default styles;
