
import { createStackNavigator } from 'react-navigation';
import Login from "../Login";
import MapScreen from "../MapScreen"
import Profile from "../Profile";
import Singup from "../Singup";
import Menu from "../Menu";

export default Routes = createStackNavigator({
    Login: Login,
    MapScreen: MapScreen,
    Profile: Profile,
    Singup: Singup

},
{
    initialRouteName: 'Login'
});