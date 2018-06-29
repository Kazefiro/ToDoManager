import { AppRegistry } from 'react-native';
//import Login from './src/screens/Login';
//import Register from './src/screens/Register';
import { Routes } from './src/routes/Routes';
import { initializeFirebaseApi } from './src/services/FirebaseApi';

AppRegistry.registerComponent('ToDoManager', 
    () => {
        initializeFirebaseApi();
        return Routes
    });
