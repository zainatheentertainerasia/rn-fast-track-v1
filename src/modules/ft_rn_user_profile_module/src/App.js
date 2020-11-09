import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setExposeFun } from '../../../redux/appReducer/app.actions';

import UserProfileBL from "./BL/UserProfileBL";

import UserProfile from './screens/ft_rn_user_profile/index.tsx';
import SavingHistory from './screens/ft_rn_saving_history/index.tsx';
import Preference from './screens/ft_rn_user_preferences/index.tsx';
import RedemptionHistory from './screens/ft_rn_redemption_history/index.tsx';
import SavingBreakdown from './screens/ft_rn_saving_breakdown/index.tsx';

class App extends React.Component {
  componentWillMount() {
      const userServiceUrl = window.endPoints && window.endPoints.userServices
      const redemptionHistoryUrl = window.endPoints && window.endPoints.redemptionHistoryServices
      const userSavingHistoryUrl = window.endPoints && window.endPoints.userSavingHistoryServices

    UserProfileBL.init({
      mode: "real",
      userServiceUrl: userServiceUrl ? userServiceUrl : "",
      historyToken: "6ab7e131543a37ac89f7ce8993c9b3ce",
      redemptionHistoryUrl: redemptionHistoryUrl ? redemptionHistoryUrl : "",
      userSavingHistoryUrl: userSavingHistoryUrl ? userSavingHistoryUrl : "",
    });
  }
  render() {
    return (
      <Stack.Navigator>
            <Stack.Screen
            name={"UserProfile"}
            component={UserProfile}
            options={{ headerShown: false }}
            />
            
            <Stack.Screen
            name={"SavingHistory"}
            component={SavingHistory}
            options={{ headerShown: false }}
            />
            
            <Stack.Screen
            name={"Preference"}
            component={Preference}
            options={{ headerShown: false }}
            />
            
            <Stack.Screen
            name={"RedemptionHistory"}
            component={RedemptionHistory}
            options={{ headerShown: false }}
            />
            
            <Stack.Screen
            name={"SavingBreakdown"}
            component={SavingBreakdown}
            options={{ headerShown: false }}
            />
      </Stack.Navigator>
    )
  }
}


const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch, props) => ({
  onSetExposeFun: data => dispatch(setExposeFun(props.exposeFunction))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
