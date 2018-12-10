import { createStackNavigator } from 'react-navigation';

import Login from "../Login";
import Singup from "../Singup";
import Home from "../Home/Home.js";

export default Routes = createStackNavigator({
    Login: Login,
    Home: Home,
    Singup: Singup

},
{
    initialRouteName: 'Login'
});
