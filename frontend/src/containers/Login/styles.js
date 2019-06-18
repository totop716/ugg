import {
  PixelRatio,
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  thankyouBox: {
    position: 'absolute',
    width: '80%',
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: '50%',
    transform: [{translateY: -50}],
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
  passwordContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeIconPass: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  thankyouText: {
    fontSize: 25,
    marginBottom: 20
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 10,
    fontSize: 35
  },
  passwordBox: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  errorText: {
    color: '#f00',
    fontSize: 25,
    marginLeft: 10,
    marginTop: 5
  },
  inputMenuPass:{
    width: '100%',
    borderTopWidth: 2,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#666',
    textAlign: 'center',
    fontSize: 25,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: PixelRatio.getPixelSizeForLayoutSize(12),
  },
  warningContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  warningText: {
    fontSize: 35,
    textAlign: 'center',
    color: '#333',
    alignSelf: 'center'
  },
  menuIcon: {
    position: 'absolute',
    top: 40,
    right: 25,
    color: '#333',
    fontSize: 40,
    zIndex: 999999
  },
  menuContainer: {
    position: 'absolute',
    top: 40,
    right: 25,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333',
    zIndex: 999999
  },
  menuItem: {
    width: 150,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 25,
    backgroundColor: '#fff',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  form: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(15),
    backgroundColor: '#a1a1a1',
    borderColor: '#d7d7d7',
  },
  input: {
    color: 'white',
  },
  inputPhoneNo: {
    width: '100%',
    height: 50,
    fontSize: 25,
    color: '#000',
    backgroundColor: '#d7d7d7',
    textAlign: 'center',
    paddingLeft: 10
  },
  disclaimerContain: {
    width: '100%',
    height: 180,
    borderColor: '#000',
    marginTop: 10
  },
  disclaimerText: {  
    fontSize: 20,
    color: '#000',
    width: 300
  },
  buttonContainer: {
    flex: 1,
    marginTop: PixelRatio.getPixelSizeForLayoutSize(15),
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(5),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  loginText: {
    color: 'white',
    fontSize: 23,
    fontWeight: '600',
    textAlign: 'center'
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(3),
  },
  dontHaveAccountText: {
    color: '#bec0ce',
    fontSize: 16,
  },
  signupText: {
    color: 'white',
    fontSize: 16,
  },
  inputTabletID: {
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
    marginBottom: 10,
  },
  tabletBox: {
    height: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 10,
    transform: [{translateY: -80}]
  },
  countdown: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    textAlign: 'left',
    width: '100%'
  }
});


export default styles;
