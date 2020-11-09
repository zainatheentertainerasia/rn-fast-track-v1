import React from 'react';
import { Port as Container } from './screen/port';

//Screen
import RedemptionHistoryScreen from './screen/index';
import UserProfileBL from '../../BL/UserProfileBL';

import {isRTL} from './screen/utils/localization/I18n';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectAppConfigs} from '../../../../../redux/appReducer/app.selectors';
import {selectUserSessionToken,selectUserInfo} from '../../../../../redux/userReducer/user.selectors';

interface State {
	adaptor: Container
}

class RedemptionHistory extends React.Component<any, State> {

	constructor(props: any) {
		super(props)

		this.state = {
			adaptor: {
				data: {
					loadingOverlayActive: false,
					errorText: "",
					error: false,
					currency: "USD",
					redemptionHistory: {
						currentYear: new Date().getFullYear(),
						totalNumberOfRedemption: null,
						monthWiseRedemmptions: []
					}

				},
				CallBacks: {
					onError: (data) => { this.ErrorHandler(data) },
					onBack: () => { this.onBackHandler() },
					onExpand: (index) => { this.onExpandHandler(index) },
				}
			}
		}
	}

componentWillMount(){
	this.getRedemtionHistory();
}

	// redemptionHistory

	getRedemtionHistory = async () => {
		try {
			this.activeLoader(true);
			const userSessionToken = this.props.userSessionToken;
			const company = this.props.AppConfigs.company
			const currency = this.props.user.currency
			console.log("userSessionToken: ",userSessionToken)
  		var currentYear = new Date().getFullYear();
			const data={
				sessionToken:userSessionToken,
				company:company,
				currency:currency,
				currentYear:currentYear,
				language: isRTL ? 'ar' : 'en'
			}
			console.log("data: ",data)
		const redemData = await UserProfileBL.redemptionHistory(data);
		this.setRedemtionData(redemData);
		this.activeLoader(false);

		} catch (error) {
			this.activeLoader(false);
			this.ErrorHandler({error: true, message: error.message});
		}

	}

	setRedemtionData=(data)=>{
		// console.log(data,"redemData")

		this.setState({
			adaptor:{
				data:{
					...this.state.adaptor.data,
					redemptionHistory: {
						...data
					}
				},
				CallBacks: this.state.adaptor.CallBacks
			}
		})
	}

	onBackHandler(){
		this.props.navigation.goBack();
	}

	onExpandHandler = (index) => {
		const adaptor = this.state.adaptor;
		const data = adaptor.data.redemptionHistory.monthWiseRedemmptions;
		data[index].collapsed = !data[index].collapsed;
		adaptor.data.redemptionHistory.monthWiseRedemmptions = data;
    this.setState({adaptor});
	}

	activeLoader(flag: boolean): void {
		this.setState({
			adaptor: {
				data: {
					...this.state.adaptor.data, loadingOverlayActive: flag
				},
				CallBacks: this.state.adaptor.CallBacks
			}
		})
	}

	ErrorHandler = (data: any) => {
		const { error, message } = data
		this.setState({
			adaptor: {
				data: {
					...this.state.adaptor.data, error: error, errorText: message
				},
				CallBacks: this.state.adaptor.CallBacks
			}
		})
	}



	render() {
		return (
			<RedemptionHistoryScreen {...this.state.adaptor} />
		)
	}

}

const mapStateToProps = createStructuredSelector({
	userSessionToken: selectUserSessionToken,
	user: selectUserInfo,
	AppConfigs:selectAppConfigs
});

export default connect(mapStateToProps, null)(RedemptionHistory);
