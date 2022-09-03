import firebase from '@react-native-firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCAzg57kOtDc22sXqjVvEVVH6EY2ImbnxA',
  authDomain: 'portercustomer-d8ee0.firebaseapp.com',
  databaseURL: 'https://portercustomer-d8ee0-default-rtdb.firebaseio.com',
  projectId: 'portercustomer-d8ee0',
  storageBucket: 'portercustomer-d8ee0.appspot.com',
  messagingSenderId: '559674016382',
  appId: '1:559674016382:ios:37b577ce1c7e55e6690e2f',
};

export default Firebase = () => {
  if (!firebase.apps.length) {
    console.log('initialized.......');
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
};
