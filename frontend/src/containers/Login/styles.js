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
  },
  thankyouBox: {
    position: 'absolute',
    width: '80%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: '50%',
    transform: [{translateY: -50}],
    backgroundColor: '#ddd',
    zIndex: 999
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
    fontSize: 20
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  passwordBox: {
    padding: 10,
  },
  inputMenuPass:{
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
    height: 30,
    textAlign: 'center',
    fontSize: 25
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: PixelRatio.getPixelSizeForLayoutSize(12),
  },
  menuIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    fontSize: 35, 
    color: '#333'
  },
  menuContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
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
    marginTop: PixelRatio.getPixelSizeForLayoutSize(40),
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(40),
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  logo: {
    height: PixelRatio.getPixelSizeForLayoutSize(150),
    width: PixelRatio.getPixelSizeForLayoutSize(150),
    resizeMode: 'contain',
  },
  form: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(15),
    backgroundColor: '#121d56',
    borderColor: '#121d56',
  },
  input: {
    color: 'white',
  },
  inputPhoneNo: {
    width: '100%',
    height: 50,
    fontSize: 25,
    color: '#fff'
  },
  disclaimerContain: {
    width: '100%',
    height: 180,
    padding: 10
  },
  disclaimerText: {  
    fontSize: 20,
    color: '#fff'
  },
  buttonContainer: {
    flex: 1,
    marginTop: PixelRatio.getPixelSizeForLayoutSize(15),
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#7646e4',
    width: '60%',
    alignSelf: 'center'
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
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
    borderWidth: 2,
    marginVertical: 20,
    borderColor: '#333',
    width: '100%'
  },
  tabletBox: {
    height: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 10,
    transform: [{translateY: -80}]
  }
});


export default styles;
