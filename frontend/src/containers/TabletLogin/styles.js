import {
  PixelRatio,
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  formContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -50}],
    width: '80%',
    alignSelf: 'center'
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(5),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#3b8141',
    width: 170,
    height: 65,
    borderRadius: 33,
    alignSelf: 'center'
  },
  loginText: {
    color: 'white',
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  inputfield_container: {
    backgroundColor: "#8ab48e",
    paddingVertical: 5,
    marginBottom: 20,
    borderRadius: 30,
    position: 'relative'
  },
  inputicon_container: {
    position: 'absolute',
    top: 5,
    left: 10
  },
  inputTabletID: {
    height: 50,
    fontSize: 35,
    textAlign: 'center',
    color: "#fff"
  },
  errorText: {
    color: '#f00',
    fontSize: 25,
    alignSelf: 'center',
    marginBottom: 10
  },
});


export default styles;
