import React from 'react';
import { Port as Container } from './screen/port';
import {AsyncStorage} from 'react-native'


//Screen
import SavingBreakDownScreen from './screen/index';
import UserProfileBL from '../../BL/UserProfileBL';
import { getItem } from '../../utils/storage';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectAppConfigs} from '../../../../../redux/appReducer/app.selectors';
import {selectUserSessionToken,selectUserInfo} from '../../../../../redux/userReducer/user.selectors';

interface State {
    adaptor: Container,s
    monthlySaving: any,
    yearlySavings: any
}

//analytics
import {
  makeStackMongo,
  makeSessionMongo,
  getStackArrayMongo,
  resetStackObject,
  updateSessions,
  getSessions,
} from '../../utils/horizonAnalytics';

class SavingBreakDown extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

        this.state = {
            adaptor: {
                data: {
                    activeTab: 0,
                    loadingOverlayActive: false,
                    currency: "",
                    errorText: "",
                    error: false,
                    title: null,
                    savings: null,
                    graph: null,
                    progressBar: null,
                },
                CallBacks: {
                    changeTab: (tab) => {
                         this.onChangeTabHandler(tab)
                        // console.log("tab: ",tab)
                    },
                    onError: (data) => {
                        this.ErrorHandler(data)
                    },
                    onBack: () => {
                        this.onBackHandler()
                    }
                }
            }
            ,
            userSessionToken: "",
            monthlySaving: null,
            yearlySavings: null,
        }
    }

    async componentWillMount() {
        try {
            const token = this.props.userSessionToken;
            this.setState({userSessionToken: token}, () => {
                this.onChangeTabHandler('1')
            });
        } catch (error) {
            this.activeLoader(false);
            console.log(error, "userSaving error")
        }
    }

    onChangeTab = (activeTab) => {
        if (activeTab === 0) {
            let data = {
                name: 'Savings Breakdown',
                action: 'select_savings_monthly',
            };
            this.makeAnalyticsStack(data.name, data.action);
        } else if (activeTab === 1) {
            let data = {
                name: 'Savings Breakdown',
                action: 'select_savings_yearly',
            };
            this.makeAnalyticsStack(data.name, data.action);
        }
        this.setState({ activeTab });
    };

    onChangeTabHandler = (tab) => {
        if (tab == 0) {
            let data = {
                name: 'Savings Breakdown',
                action: 'select_savings_monthly',
            };
            this.makeAnalyticsStack(data.name, data.action);

            this.setState({
                adaptor: {
                    data: {
                        ...this.state.adaptor.data,
                        activeTab: 1
                    },
                    CallBacks: {...this.state.adaptor.CallBacks}
                }

            }, async () => {
                if (this.state.yearlySavings === null) {
                    try{
                        const {data,userObj}: any = await this.getUserSaving(this.state.userSessionToken, this.state.adaptor.data.activeTab)
                        console.log("year: ",data)
                        if (data) {
                            this.setState({
                                adaptor: {
                                    data: {
                                        ...this.state.adaptor.data,
                                        title: "LIFETIME SAVINGS",
                                        savings: data.lifeTimeSaving,
                                        progressBar: data.savings.progressBar,
                                        graph: data.savings.graph,
                                        currency:userObj.currency,
                                    },
                                    CallBacks: {...this.state.adaptor.CallBacks}
                                },
                                yearlySavings: data
                            })
                        }
                    }catch (e) {

                        this.activeLoader(false)

                        setTimeout(() => {
                            if(e.message === 'logout'){
                                const exposeData={
                                    type:"logout",
                                    data:null
                                }
                                this.props.exposeFunction && this.props.exposeFunction(exposeData);
                            }else{
                                this.ErrorHandler({
                                    error: true,
                                    message: e.message
                                })
                            }

                        }, 100)
                    }

                } else {
                    this.setState({
                        adaptor: {
                            data: {
                                ...this.state.adaptor.data,
                                title: "LIFETIME SAVINGS",
                                savings: this.state.yearlySavings.lifeTimeSaving,
                                progressBar: this.state.yearlySavings.savings.progressBar,
                                graph: this.state.yearlySavings.savings.graph
                            },
                            CallBacks: {...this.state.adaptor.CallBacks}
                        },
                    })
                }
            })


        } else if (tab == 1) {
            let data = {
                name: 'Savings Breakdown',
                action: 'select_savings_yearly',
            };
            this.makeAnalyticsStack(data.name, data.action);

            this.setState({
                adaptor: {
                    data: {
                        ...this.state.adaptor.data,
                        activeTab: 0
                    },
                    CallBacks: {...this.state.adaptor.CallBacks}
                }

            }, async () => {
                if (this.state.monthlySaving === null) {
                    const {data,userObj} = await this.getUserSaving(this.state.userSessionToken, this.state.adaptor.data.activeTab)
                    if (data) {
                        this.setState({
                            adaptor: {
                                data: {
                                    ...this.state.adaptor.data,
                                    title: data.currentMonth + " SAVINGS",
                                    savings: data.currentMonthSaving,
                                    progressBar: data.savings.progressBar,
                                    graph: data.savings.graph,
                                    currency:userObj.currency,
                                    
                                },
                                CallBacks: {...this.state.adaptor.CallBacks}
                            },
                            monthlySaving: data
                        })
                    }

                } else {

                    this.setState({
                        adaptor: {
                            data: {
                                ...this.state.adaptor.data,
                                title: this.state.monthlySaving.currentMonth + " SAVINGS",
                                savings: this.state.monthlySaving.currentMonthSaving,
                                progressBar: this.state.monthlySaving.savings.progressBar,
                                graph: this.state.monthlySaving.savings.graph
                            },
                            CallBacks: {...this.state.adaptor.CallBacks}
                        },
                    })
                }
            })
        }
    }

    getUserSaving = async (token, activeTab) => {
        try {
            this.activeLoader(true);
            let summaryType = ""

            if (activeTab == 0) {
                summaryType = 'by_month'
            } else if (activeTab == 1) {
                summaryType = 'by_year'
            }

            const userSessionToken =  this.props.userSessionToken;
            let AppConfigs =  this.props.AppConfigs;
            let user = this.props.user;
            console.log("token: ",token)
            console.log("sessionToken: ",userSessionToken)
            const data = {
                sessionToken: userSessionToken,
                company:AppConfigs.company.toLowerCase(),
                currency:user.currency,
                summaryType: summaryType,
                language: 'en',
            }
            console.log("data: ",data)
            const redemData = await UserProfileBL.userSaving(data);
            console.log("redemData: ",redemData)
            this.activeLoader(false);
            return {'data':redemData,'userObj':data}

        } catch (e) {

            this.activeLoader(false)

            setTimeout(() => {
                if(e.message === 'logout'){
                    const exposeData={
                        type:"logout",
                        data:null
                    }
                    this.props.exposeFunction && this.props.exposeFunction(exposeData);
                }else{
                    this.ErrorHandler({
                        error: true,
                        message: e.message
                    })
                }

            }, 100)
        }

        return null

    }

    // userSaving = async () => {
    //     try {
    //         this.activeLoader(true);
    //
    //         const data = {
    //             sessionToken: appConfig.apiToken,
    //             company: "chb",
    //             currency: "USD",
    //             summaryType: "by_month"
    //         }
    //         const redemData = await UserProfileBL.userSaving(data);
    //         console.log(redemData, "userSaving")
    //         this.activeLoader(false);
    //
    //     } catch (error) {
    //         this.activeLoader(false);
    //         console.log(error, "userSaving error")
    //     }
    //
    // }

  onBackHandler() {
    this.props.navigation.goBack();
  }

  activeLoader(flag: boolean): void {
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          loadingOverlayActive: flag,
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  }

  ErrorHandler = (data: any) => {
    const { error, message } = data;
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          error: error,
          errorText: message,
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  };

  makeCustomAnalyticsStack = async (stackData) => {
    console.log('stack data', stackData);
    await makeStackMongo(stackData);
    //resetStackObject();
    const dataStack = await getStackArrayMongo();
    console.log(dataStack, 'getStackArrayMongo');
  };

  makeAnalyticsStack = async (
    screenName = '',
    action = '',
    category_id = '',
    categories = '',
    categories_analytics = '',
    location_id = 0,
    changeSequenceNumber = false
  ) => {
    const stackData = {
      current_screen: screenName,
      action: action,
      category_id: category_id,
      categories: categories,
      categories_analytics: categories_analytics,
      location_id: location_id,
      changeSequenceNumber: changeSequenceNumber,
    };
    await makeStackMongo(stackData);
    //resetStackObject();
    const dataStack = await getStackArrayMongo();
    console.log(dataStack, 'getStackArrayMongo');
  };

  render() {
    return <SavingBreakDownScreen {...this.state.adaptor} />;
  }
}

const mapStateToProps = createStructuredSelector({
	userSessionToken: selectUserSessionToken,
	user: selectUserInfo,
	AppConfigs:selectAppConfigs
});

export default connect(mapStateToProps, null)(SavingBreakDown);
