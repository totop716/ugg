import {
  PixelRatio,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1142',
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
  form: {
    justifyContent: 'flex-end',
  },
  item: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(3),
    backgroundColor: '#121d56',
    borderColor: '#121d56',
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    color: 'white',
    fontSize: 20
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
    color: '#fff',
    marginLeft: 20
  },
  buttonContainer: {
    marginTop: PixelRatio.getPixelSizeForLayoutSize(15),
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#7646e4',
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
