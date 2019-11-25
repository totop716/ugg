import {
  PixelRatio,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  content: {
    flex: 1,
    padding: PixelRatio.getPixelSizeForLayoutSize(12),
    marginTop: 80,
    justifyContent: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(40),
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(40),
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  logo: {
    height: PixelRatio.getPixelSizeForLayoutSize(40),
    width: PixelRatio.getPixelSizeForLayoutSize(40),
    resizeMode: 'contain',
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
    marginTop: -5,
    textTransform: 'uppercase'
  },
  noError: {
    height: 0,
  }, 
  thankyouText: {
    fontSize: 30,
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
    paddingHorizontal: 20,
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
    marginVertical: 20
  },
  cancelBut: {
    marginHorizontal: 10,
    width: '40%'
  },
  textCancel: {
    fontSize: 25
  },
  form: {
    justifyContent: 'flex-end',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputbox: {
    flexBasis: '49%',
    flexGrow: 0,
    color: '#3d3d3d',
    fontSize: 20,
    borderRadius: 4,
    backgroundColor: '#e6e6e6',
    paddingLeft: 10,
  },
  formItem: {
    justifyContent: 'space-between'
  },
  listItem: {
    flexDirection: 'row',
    marginTop: 10,
  },
  checkbox: {
    fontSize: 25
  },
  checkboxText: {
    fontSize: 25,
    color: '#3d3d3d',
    marginLeft: 20
  },
  checkContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: PixelRatio.getPixelSizeForLayoutSize(15),
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    width: 200,
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#3b8041",
    borderRadius: 35 
  },
  loginText: {
    color: 'white',
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
});


export default styles;
