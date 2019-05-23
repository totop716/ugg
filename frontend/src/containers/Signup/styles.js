import {
  PixelRatio,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: '50%',
    transform: [{translateY: -75}],
    backgroundColor: '#ddd',
    borderColor: '#333',
    borderWidth: 1,
    borderBottomWidth: 2,
    zIndex: 999,
    paddingTop: 20,
    height: 150
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
  },
  textCancel: {
    fontSize: 25
  },
  form: {
    justifyContent: 'flex-end',
  },
  item: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(3),
    backgroundColor: '#d7d7d7',
    borderColor: '#121d56',
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    color: '#000',
    fontSize: 20,
    backgroundColor: '#d7d7d7',
    paddingLeft: 10
  },
  listItem: {
    flexDirection: 'row',
    marginTop: 10
  },
  checkbox: {
    fontSize: 40
  },
  checkboxText: {
    fontSize: 30,
    color: '#333',
    marginLeft: 20
  },
  buttonContainer: {
    marginTop: PixelRatio.getPixelSizeForLayoutSize(15),
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#41823f',
  },
  signupText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
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
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  topBar: {
    padding: 15,
    backgroundColor: '#555',
    height: 70,
    justifyContent: 'center',
    marginBottom: 30
  },
  topBarText: {
    color: '#fff',
    fontSize: 28
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 20,
    fontSize: 50,
    color: '#fff'
  }
});


export default styles;
