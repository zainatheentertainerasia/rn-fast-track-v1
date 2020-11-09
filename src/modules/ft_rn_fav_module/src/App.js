import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setExposeFun } from "../../../redux/appReducer/app.actions";
import FavouriteScreen from "./screens/ft_rn_fav_screen/index.tsx";
class App extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={"Favourite"}
          component={FavouriteScreen}
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
