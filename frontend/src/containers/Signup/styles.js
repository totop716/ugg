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
    backgroundColor: '#fff',
    paddingLeft: 10
  },
  listItem: {
    flexDirection: 'row',
    marginTop: 10
  },
  checkbox: {
    fontSize: 35
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
    height: 70,
    justifyContent: 'center',
    marginBottom: 30,
    backgroundColor: '#007aff'
  },
  topBarText: {
    color: '#fff',
    fontSize: 28
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 20,
    fontSize: 30,
    color: '#fff'
  }
});


export default styles;
