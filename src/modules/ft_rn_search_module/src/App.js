import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setExposeFun } from "../../../redux/appReducer/app.actions";
import SearchScreen from "./screens/ft_rn_search_expo/index.tsx";
import OutletSearchBL from "./BL/OutletSearchBL";

class App extends React.Component {
  componentWillMount() {
    const configServiceUrl =
      window.endPoints && window.endPoints.configsServices;
    const outletServiceUrl =
      window.endPoints && window.endPoints.outletServices;
    OutletSearchBL.init({
      mode: "real",
      configServiceUrl: configServiceUrl ? configServiceUrl : "",
      outletServiceUrl: outletServiceUrl ? outletServiceUrl : "",
    });
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={"Search"}
          component={SearchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch, props) => ({
  onSetExposeFun: (data) => dispatch(setExposeFun(props.exposeFunction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
