import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import HomeBL from "./BL/HomeBL";
import HomeScreen from "./screens/ft_rn_home_expo/index.tsx";
class App extends React.Component {
  componentWillMount() {
    const homeServiceUrl = window.endPoints && window.endPoints.homeServices;
    const configServiceUrl =
      window.endPoints && window.endPoints.configsServices;

    HomeBL.init({
      mode: "real",
      homeServiceUrl: homeServiceUrl ? homeServiceUrl : "",
      configServiceUrl: configServiceUrl ? configServiceUrl : "",
    });
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={"Home"}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}

export default App;
