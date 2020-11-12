import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import analytics from 'rn-horizon-analytics';

import React, { Component } from 'react';

const mongo = analytics.mongo;

export default class App extends Component {
  async initFunc() {
    mongo.init('cda6397940d3b191b7960e432be3f16f');
    console.log('init successfull');
  }

  async componentDidMount() {
    //console.log(analytics.mongo);
    //mongo.init('cda6397940d3b191b7960e432be3f16f');
    //this.makeSessionFunction();
    //this.updateSessionsFunc('asdfasdf');
    //await this.makeStackFunctcdion();
    //await this.makeStackFunction();
    // await this.makeStackFunction();
    //     await this.makeStackFunction();
    //     await this.makeStackFunction();
    // this.getStackArray();
    this.resetSession();
    // this.resetStackObject();
    // // ,
    //this.postMongoAnalytics();
    // const session = await this.getSessionFunction();
    // console.log(session, 'session');
    // this.initFunction();
  }

  componentWillMount() {
    //this.initFunction();
    //     setTimeout(() => {
    //       this.configFunction();
    //       this.sendAnalyticFunction();
    //     }, 1000);
    console.log('In Component Will Mount');
  }

  updateSessionsFunc = (customer_id) => {
    mongo.updateSessions(customer_id);
  };
  sendAnalyticFunction = () => {
    analytics.sendAnalytics(
      'MegaData',
      {
        content_name: 'Really Fast Running Shoes',
        content_category: 'Apparel & Accessories > Shoes',
        content_ids: ['1234'],
        content_type: 'product',
        value: 0.5,
        currency: 'USD',
      },
      ['group1']
    );
  };

  configFunction = () => {
    const configObject = {
      groups: {
        group1: ['facebook', 'appBoy', 'gtm', 'firebase', 'appFlyer'],
        group2: ['firebase'],
      },
    };
    analytics.config(configObject);
  };

  facebookAllFunction = () => {};

  getSessionFunction = async () => {
    let temp = await mongo.getSession();
    console.log(temp);
  };

  resetSession = () => {
    mongo.resetSessionObject();
  };

  resetStackObject = () => {
    mongo.resetStackObject();
  };

  getStackArray = async () => {
    const stackArray = await mongo.getStackArray();
    console.log(stackArray, 'stackArray');
    return stackArray;
  };

  postMongoAnalytics = () => {
    mongo.postStack();
  };

  makeStackFunction = async () => {
    const stackData = {
      current_screen: 'Notifications',
      action: 'Open',
      category_id: 'FD',
      categories: '',
      categories_analytics: '',
      location_id: 1,
    };
    await mongo.makeStack(stackData);
  };

  initFunction = async () => {
    const initData = {
      facebook: '192588848560357',
      appBoy: '26920561-6ce2-4d3e-9deb-b2383691ec0a',
      gtm: 'GTM-W7QGHK3',
      appFlyer: {
        key: '0f717a65-3577-4fa9-835e-d9795f173587',
        appId: 'com.getpaydays.paydays',
        devId: 'hSfKdQuMsDmDAKYSFo4Txa',
      },
      firebase: {
        apiKey: 'AIzaSyCB-TZDcB5DlJVbXpt3nnZMPveTERa_TCI',
        authDomain: 'hireme-df47b.firebaseapp.com',
        databaseURL: 'https://hireme-df47b.firebaseio.com',
        projectId: 'hireme-df47b',
        storageBucket: 'hireme-df47b.appspot.com',
        messagingSenderId: '467382943082',
        appId: '1:467382943082:web:20dabf597952350d8a7913',
        measurementId: 'G-123J',
      },
    };
    await analytics.init(initData);
  };

  makeSessionFunction = () => {
    console.log('in make session function');
    const sessionData = {
      app_version: '',
      device_uid: '',
      device_install_token: '',
      screen_resolution: '',
      language: '',
      company: '',
      created_at: '',
      wlcompany: '',
    };

    mongo.makeSession(sessionData);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            borderWidth: 1,
            flexDirection: 'row',
            width: '100%',
            textAlign: 'center',
            paddingBottom: 10,
            justifyContent: 'center',
          }}
        >
          Horizon Analytics
        </Text>
        <TouchableOpacity onPress={this.initFunc}>
          <Text>Mongo init</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.makeSessionFunction}>
          <Text>Make Session</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.getSessionFunction}>
          <Text>get session</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.makeStackFunction}>
          <Text>Make Stack</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.getStackArray}>
          <Text>Get Stacks</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.postMongoAnalytics}>
          <Text>Post Analytics</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
