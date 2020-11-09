import React from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import APP_COLORS from './res/colors';

import i18n, {
  i18n_Init,
  changeLanguage,
  withTransation,
} from './utils/localization/I18n';
import RedemptionHistoryDetails from './components/RedemptionHistoryDetails';

import { Port } from '../screen/port';

import {
  CustomComponents,
  init_font,
  FastTrackLibs,
  design,
} from 'rn_fast_track_uilib';

const {
  ErrorModal,
  Loader,
  CustomText,
  HeaderWithBackButton,
  RedemptionEmpty,
} = CustomComponents;
const { AntDesign } = FastTrackLibs;

export default class RedemptionHistoryScreen extends React.Component<Port> {
  state = {
    detailsModalVisible: false,
    redemption: null,
    // redemptionsData: [{
    //   month: 'May 2020',
    //   redemptionCount: 3,
    //   redemptions: [{
    //     category: "Restaurants and Bars",
    //     code: "A-074-327-666",
    //     date: "21/04/2020 - 18:15",
    //     logo: "https://offerengine.theentertainerme.com/app-tutorial-x295726/merchant_primary_logo_%28retina%29_-_merchant.png",
    //     merchantName: "App Tutorial",
    //     outletName: "Practise Using Our App",
    //     savings: 0.27
    //   }, {
    //     category: "Restaurants and Bars",
    //     code: "A-074-327-666",
    //     date: "21/04/2020 - 18:15",
    //     logo: "https://offerengine.theentertainerme.com/app-tutorial-x295726/merchant_primary_logo_%28retina%29_-_merchant.png",
    //     merchantName: "App Tutorial",
    //     outletName: "Practise Using Our App",
    //     savings: 0.27
    //   }, {
    //     category: "Restaurants and Bars",
    //     code: "A-074-327-666",
    //     date: "21/04/2020 - 18:15",
    //     logo: "https://offerengine.theentertainerme.com/app-tutorial-x295726/merchant_primary_logo_%28retina%29_-_merchant.png",
    //     merchantName: "App Tutorial",
    //     outletName: "Practise Using Our App",
    //     savings: 0.27
    //   }]}, {
    //     month: 'April 2020',
    //     redemptionCount: 5,
    //     redemptions: [{
    //       category: "Restaurants and Bars",
    //       code: "A-074-327-666",
    //       date: "21/04/2020 - 18:15",
    //       logo: "https://offerengine.theentertainerme.com/app-tutorial-x295726/merchant_primary_logo_%28retina%29_-_merchant.png",
    //       merchantName: "App Tutorial",
    //       outletName: "Practise Using Our App",
    //       savings: 0.27
    //     }, {
    //       category: "Restaurants and Bars",
    //       code: "A-074-327-666",
    //       date: "21/04/2020 - 18:15",
    //       logo: "https://offerengine.theentertainerme.com/app-tutorial-x295726/merchant_primary_logo_%28retina%29_-_merchant.png",
    //       merchantName: "App Tutorial",
    //       outletName: "Practise Using Our App",
    //       savings: 0.27
    //     }, {
    //       category: "Restaurants and Bars",
    //       code: "A-074-327-666",
    //       date: "21/04/2020 - 18:15",
    //       logo: "https://offerengine.theentertainerme.com/app-tutorial-x295726/merchant_primary_logo_%28retina%29_-_merchant.png",
    //       merchantName: "App Tutorial",
    //       outletName: "Practise Using Our App",
    //       savings: 0.27
    //     }, {
    //       category: "Restaurants and Bars",
    //       code: "A-074-327-666",
    //       date: "21/04/2020 - 18:15",
    //       logo: "https://offerengine.theentertainerme.com/app-tutorial-x295726/merchant_primary_logo_%28retina%29_-_merchant.png",
    //       merchantName: "App Tutorial",
    //       outletName: "Practise Using Our App",
    //       savings: 0.27
    //     }, {
    //       category: "Restaurants and Bars",
    //       code: "A-074-327-666",
    //       date: "21/04/2020 - 18:15",
    //       logo: "https://offerengine.theentertainerme.com/app-tutorial-x295726/merchant_primary_logo_%28retina%29_-_merchant.png",
    //       merchantName: "App Tutorial",
    //       outletName: "Practise Using Our App",
    //       savings: 0.27
    //     }, {
    //       category: "Restaurants and Bars",
    //       code: "A-074-327-666",
    //       date: "21/04/2020 - 18:15",
    //       logo: "https://offerengine.theentertainerme.com/app-tutorial-x295726/merchant_primary_logo_%28retina%29_-_merchant.png",
    //       merchantName: "App Tutorial",
    //       outletName: "Practise Using Our App",
    //       savings: 0.27
    //     }]
    //   }
    // ],
  };

  collapseMonth = (index) => {
    this.props.CallBacks.onExpand(index);
  };

  hideErrorModal = () => {
    this.props.CallBacks.onError({
      error: false,
      message: '',
    });
  };

  closeDetailsModal = () => {
    this.setState({ detailsModalVisible: false });
  };

  renderRedemptionListItem(item) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          this.setState({ redemption: item, detailsModalVisible: true })
        }
        style={styles.redemptionDetailsItem}
      >
        <Image
          style={{ width: 45, height: 45, resizeMode: 'contain' }}
          source={{ uri: item.logo }}
        />
        <View style={styles.redemptionDetailsView}>
          <CustomText style={{ fontFamily: 'MuseoSans500', fontSize: 16 }}>
            {item.merchantName}
          </CustomText>
          <CustomText style={{ marginTop: 2 }}>{item.outletName}</CustomText>
          <CustomText style={{ color: APP_COLORS.LIGHT_TEXT, marginTop: 5 }}>
            {item.category}
          </CustomText>
        </View>
        <AntDesign name='caretright' color={APP_COLORS.LIGHT_GREY} size={16} />
      </TouchableOpacity>
    );
  }

  renderMonthsList(item, index) {
    return (
      <View style={styles.redemptionsListViewItem}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.collapseMonth(index)}
          style={styles.redemptionMonthView}
        >
          <CustomText style={{ color: 'white', flex: 0.5 }}>
            {item.month}
          </CustomText>
          <CustomText style={{ color: 'white', flex: 0.5, textAlign: 'right' }}>
            Total: {item.redemptionCount} -
          </CustomText>
        </TouchableOpacity>
        {item.collapsed && (
          <FlatList
            data={item.redemptions}
            renderItem={({ item }) => this.renderRedemptionListItem(item)}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{ height: 1, backgroundColor: APP_COLORS.COLOR_DIVIDER }}
              />
            )}
          />
        )}
      </View>
    );
  }

  render() {
    const data = this.props.data.redemptionHistory;
    const { error, errorText, loadingOverlayActive } = this.props.data;
    const { redemption, detailsModalVisible } = this.state;

    if (
      data.totalNumberOfRedemption === 0 ||
      data.totalNumberOfRedemption === ''
    ) {
      return (
        <View style={styles.mainContainer}>
          <HeaderWithBackButton
            title='Redemption History'
            onBack={this.props.CallBacks.onBack}
          />
          <RedemptionEmpty isRTL={false} i18n={i18n} />
        </View>
      );
    } else {
      return (
        <View style={styles.mainContainer}>
          <HeaderWithBackButton
            title='Redemption History'
            onBack={this.props.CallBacks.onBack}
          />
          <View style={{ alignItems: 'center', paddingVertical: 15 }}>
            <CustomText>
              <CustomText>{i18n.t('TOTAL_OFFERS_REDEEMED')}</CustomText>{' '}
              {data.currentYear}
            </CustomText>
            <CustomText style={{ fontFamily: 'MuseoSans700', marginTop: 15 }}>
              {data.totalNumberOfRedemption || '0'}
            </CustomText>
          </View>
          <FlatList
            data={data.monthWiseRedemmptions}
            renderItem={({ item, index }) => this.renderMonthsList(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{ height: 1, backgroundColor: APP_COLORS.COLOR_DIVIDER }}
              />
            )}
          />
          {/* <ErrorModal isVisible={error} dataString={errorText} hide={this.hideErrorModal} /> */}
          {loadingOverlayActive && <Loader isVisible={loadingOverlayActive} />}
          <RedemptionHistoryDetails
            redemption={redemption}
            isVisible={detailsModalVisible}
            closeModal={this.closeDetailsModal}
          />
        </View>
      );
    }
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: design['--global--secondary--BackgroundColor']
      ? design['--global--secondary--BackgroundColor']
      : 'white',
  },
  redemptionMonthView: {
    flexDirection: 'row',
    backgroundColor: 'rgb(50, 192, 168)',
    height: 35,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  redemptionDetailsItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  redemptionDetailsView: {
    flex: 1,
    paddingLeft: 10,
  },
};
