import React from 'react';

import { ScrollView } from 'react-native';

import i18n, { isRTL } from '../../screen/utils/localization/I18n';

import { CustomComponents } from 'rn_fast_track_uilib';
const { FavEmpty, FavList } = CustomComponents;
interface State {}

export default class Fav extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    //fetching data from props
    let favouritesHTML = [];
    const favouriteList = this.props.data.favourite;
    if (favouriteList && favouriteList !== {}) {
      for (const location in favouriteList) {
        favouritesHTML.push(
          <FavList
            locationName={location}
            favouriteList={favouriteList[location]}
            onfavouriteClick={this.props.calbacks.onfavouriteClick}
            isRTL={isRTL}
          />
        );
      }
    }

    if (favouritesHTML.length === 0) {
      return <FavEmpty isRTL={isRTL} i18n={i18n} />;
    } else {
      return <ScrollView>{favouritesHTML}</ScrollView>;
    }
  }
}
