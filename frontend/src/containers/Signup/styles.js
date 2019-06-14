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
    position: 'absolute'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: PixelRatio.getPixelSizeForLayoutSize(12),
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
  errorMsg: {
    color: '#f00',
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 10,
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
    color: '#000',
    width: '45%',
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 20,
    backgroundColor: '#fff',
    paddingLeft: 10
  },
  firstinputbox: {
    marginRight: 10,
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
    color: '#333',
    marginLeft: 20
  },
  checkContainer: {
    marginTop: 10,
    marginLeft: -10
  },
  buttonContainer: {
    marginTop: PixelRatio.getPixelSizeForLayoutSize(15),
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
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
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#3F51B5'
  },
  topBarText: {
    color: '#fff',
    fontSize: 25
  },
  closeIcon: {
    position: 'absolute',
    top: 3,
    right: 20,
    fontSize: 35,
    color: '#fff'
  }
});


export default styles;
