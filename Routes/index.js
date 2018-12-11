import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Login from "../Login";
import Singup from "../Singup";
import Home from "../Home/Home.js";


const AuthStack = createStackNavigator({
    Login: Login,
    Singup: Singup
},
{
    initialRouteName: "Login"
});

export default Routes = createSwitchNavigator({
    Auth: AuthStack,
    Home: Home,

},
{
    initialRouteName: 'Auth'
});
