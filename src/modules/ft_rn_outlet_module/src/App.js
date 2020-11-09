import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setExposeFun } from "../../../redux/appReducer/app.actions";
import Outlet from "./screens/ft_rn_outlet_screen/screen/index";
import OutletBL from "./BL/OutletBL";

class App extends React.Component {
  componentWillMount() {
    const configServiceUrl = window.endPoints && window.endPoints.configsServices
    const outletServiceUrl = window.endPoints && window.endPoints.outletServices
    OutletBL.init({
      mode: "real",
      configServiceUrl: configServiceUrl ? configServiceUrl : "",
      outletServiceUrl: outletServiceUrl ? outletServiceUrl : "",
    });
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={"Outet"}
          component={Outlet}
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
