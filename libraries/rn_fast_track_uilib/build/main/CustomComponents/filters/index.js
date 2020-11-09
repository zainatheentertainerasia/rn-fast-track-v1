import React, { Component } from 'react';
import { View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import SectionList from './sectionlist';
import filtersData from './defaults';
import ModalBox from '../modal';
import ModalBoxListItem from './modalListItem';

class index extends Component {
  constructor(props) {
    super(props);
    const categoryKey = this.props.categoryKey;
    console.log(categoryKey,"categoryKey nomi")
    // const filter = filtersData.filter.filter(x => x.category_name === this.props.categoryKey)
    const filter = filtersData.filter.filter(
      (x) => x.category_name === categoryKey
    );
    // console.log("mine filter: ", filter)
    this.state = {
      show: false,
      filter: filter[0],
      //

      newOffer: false,

      selectedType: 'All',
      typeFilter: false,

      selectedCuisine: [],
      cuisineFilter: false,

      selectedAmenities: {},
      modalType: 'type',
      isVisible: false,

      selectedCuisineActual: '',
    };
    this.badge = 0;
  }

  componentDidUpdate(
    prevProps: Readonly<Port>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    if (prevProps.selectedFilter !== this.props.selectedFilter) {
      this.props.onRefreshUI();
    }
  }

  componentDidMount() {
    // this.setState({isVisible:true})
    let filter = {};
    // console.log("filter state:  ", this.props.selectedFilter);
    //if filters of selected category are available in redux
    if (this.props.selectedFilter) {
      filter = this.props.selectedFilter;
    }

    this.setFilter(filter);

    this.setState({ show: true });
  }

  setFilter(filter) {
    // console.log("filter: nomi112233", filter);
    let newOffer = false;
    let selectedType = '';
    let selectedCuisine = [];
    let selectedAmenities = {};

    if (Object.keys(filter).length !== 0) {
      if (filter['newOffer']) {
        newOffer = filter['newOffer'];
      }

      if (filter['selectedType']) {
        selectedType = filter['selectedType'];
      }

      if (filter['selectedCuisine']) {
        selectedCuisine = filter['selectedCuisine'];
      }

      if (filter['selectedAmenities']) {
        selectedAmenities = filter['selectedAmenities'];
      }
    }

    this.setState({
      newOffer: newOffer,
      selectedType: selectedType,
      selectedCuisine: selectedCuisine,
      selectedAmenities: selectedAmenities,
    });
  }

  badgeCount = () => {
    const {
      selectedAmenities,
      selectedCuisine,
      selectedType,
      newOffer,
    } = this.state;
    let count = 0;
    count += selectedCuisine.length;
    count += Object.keys(selectedAmenities).length;
    if (selectedType !== '') {
      count += 1;
    }
    if (newOffer) {
      count += 1;
    }
    this.badge = count;
    return count;
  };

  getChipsData = () => {
    let data = [];
    const {
      selectedAmenities,
      selectedCuisine,
      selectedType,
      newOffer,
    } = this.state;
    for (let [key, value] of Object.entries(selectedAmenities)) {
      data.push({
        type: 'selectedAmenities',
        title: value.name,
        value: value.flag,
        key: key,
      });
    }

    if (newOffer) {
      data.push({ type: 'newOffer', title: 'New offers', value: true });
    }

    if (selectedCuisine.length > 0) {
      selectedCuisine.map((cuisineitem) => {
        data.push({
          type: 'selectedCuisine',
          title: cuisineitem.name,
          value: true,
        });
      });
    }

    if (selectedType) {
      data.push({ type: 'selectedType', title: selectedType, value: true });
    }

    return data;
  };

  onPressSelectionHandler = (type, data) => {
    if (type === 'Type') {
      this.setState({ typeFilter: true, isVisible: true, modalType: 'type' });
    } else if (type === 'Cuisine') {
      this.setState({
        cuisineFilter: true,
        isVisible: true,
        modalType: 'cuisine',
      });
    } else if (type === 'newOffer') {
      this.setState({ newOffer: !this.state.newOffer });
    }
  };

  addAmenity = (key, value) => {
    let amenities = { ...this.state.selectedAmenities };
    //if amentities is already in state then delete it
    if (amenities[key] && amenities[key].flag === value.flag) {
      delete amenities[key];
    } else {
      amenities[key] = value;
    }
    this.setState({ selectedAmenities: amenities }, () => {
      // console.log(this.state.selectedAmenities, "nominomi");
    });
  };

  clearFilter = () => {
    const categoryKey = this.props.categoryKey;
    const filter = filtersData.filter.filter(
      (x) => x.category_name === categoryKey
    );
    this.setState(
      {
        newOffer: false,
        selectedType: '',
        selectedCuisine: [],
        selectedAmenities: {},
        filter: {
          filter_sections: [],
        },
      },
      () => this.setState({ filter: filter[0] })
    );
  };
  removeFromCurrentState = (type, value) => {
    let { filter } = this.state;
    // console.log(filter.filter_sections, "zxczxc");

    return new Promise((resolve, reject) => {
      console.log(
        type,
        value,
        'removeFromCurrentState',
        this.state.selectedAmenities
      );
      let {
        selectedAmenities,
        selectedCuisine,
        selectedType,
        newOffer,
      } = this.state;
      if (type === 'newOffer') {
        newOffer = false;
      }

      if (type === 'selectedType') {
        selectedType = '';
      } else if (type === 'selectedCuisine') {
        selectedCuisine = selectedCuisine.filter(
          // (item: any) => item !== value
          (item: any) => item.name !== value.title
        );
      } else if (type === 'selectedAmenities') {
        delete selectedAmenities[value.key];
      }

      this.setState(
        {
          selectedAmenities,
          selectedCuisine,
          selectedType,
          newOffer,
        },
        () => {
          resolve();
        }
      );
    });
  };

  remove = async (type: any, value?: any) => {
    let filterList: any = { ...this.props.selectedFilter };
    await this.removeFromCurrentState(type, value);
    if (type === 'newOffer') {
      delete filterList['newOffer'];
    }

    if (type === 'selectedType') {
      delete filterList['selectedType'];
    } else if (type === 'selectedCuisine') {
      if (Object.keys(filterList['selectedCuisine']).length === 1) {
        delete filterList['selectedCuisine'];
      } else {
        filterList['selectedCuisine'] = filterList['selectedCuisine'].filter(
          // (item: any) => item !== value
          (item: any) => item.name !== value.title
        );
      }
    } else if (type === 'selectedAmenities') {
      if (Object.keys(filterList['selectedAmenities']).length === 1) {
        delete filterList['selectedAmenities'];
      } else {
        delete filterList['selectedAmenities'][value];
      }
    }

    if (Object.keys(filterList).length === 0) {
      this.props.removeFilter();
    } else {
      this.props.addFilter(filterList);
    }
  };

  onDeleteFilter = async (data) => {
    if (data.type === 'newOffer') {
      await this.remove('newOffer', '');
    } else if (data.type === 'selectedType') {
      await this.remove('selectedType', '');
    } else if (data.type === 'selectedCuisine') {
      await this.remove('selectedCuisine', data);
    } else if (data.type === 'selectedAmenities') {
      await this.remove('selectedAmenities', data);
    }

    // console.log(data, "datadata");
  };

  close = () => {
    //if no filter is selected then delete category from redux filter else add new filter state object to redux filter object
    if (
      !this.state.newOffer &&
      this.state.selectedType === '' &&
      Object.keys(this.state.selectedCuisine).length === 0 &&
      Object.keys(this.state.selectedAmenities).length === 0
    ) {
      this.setFilter({});
      // this.props.dispatch(removeFilter(this.props.categoryKey))
      this.props.removeFilter();
    } else {
      let filter = {};

      if (this.state.newOffer) {
        filter['newOffer'] = this.state.newOffer;
      }

      if (this.state.selectedType !== '') {
        filter['selectedType'] = this.state.selectedType;
      }

      if (Object.keys(this.state.selectedCuisine).length !== 0) {
        filter['selectedCuisine'] = this.state.selectedCuisine;
      }

      if (Object.keys(this.state.selectedAmenities).length !== 0) {
        filter['selectedAmenities'] = this.state.selectedAmenities;
      }

      this.setFilter(filter);
      // this.props.dispatch(addFilter(this.props.categoryKey, filter))
      this.props.addFilter(filter);
    }
  };

  onClickModalBoxListItem = (item) => {
    this.setState({ selectedType: item.name }, () => {
      setTimeout(() => {
        this.setState({ isVisible: false });
      }, 300);
    });
  };

  renderItem = (data, index) => {
    const item = data.item;
    const selectedType = this.state.selectedType;
    return (
      <ModalBoxListItem
        item={item}
        isSelected={selectedType.key === item.name ? true : false}
        onPress={this.onClickModalBoxListItem}
      />
    );
  };

  addAmenity(key, value) {
    let amenities = { ...this.state.selectedAmenities };

    //if amentities is already in state then delete it
    if (amenities[key] && amenities[key].flag === value.flag) {
      delete amenities[key];
    } else {
      amenities[key] = value;
    }
    this.setState({ selectedAmenities: amenities });
  }

  onClickModalBoxListItemCusine = (item) => {
    let selectedCuisine = this.state.selectedCuisine;
    let flag = false;
    selectedCuisine = selectedCuisine.filter((selectedCuisineItem) => {
      if (selectedCuisineItem.key === item.key) {
        flag = true;
        return false;
      } else {
        return true;
      }
    });

    if (!flag) selectedCuisine.push(item);

    this.setState({ selectedCuisine: selectedCuisine });
  };

  checkIsselectedCuisine = (selectedCuisine, item) => {
    let returnVal = false;
    selectedCuisine.find((selectedCuisineItem) => {
      if (selectedCuisineItem.key === item.key) {
        returnVal = true;
      }
    });
    return returnVal;
  };

  renderItemcuisine = (data, index) => {
    const item = data.item;
    const selectedCuisine = this.state.selectedCuisine;
    const isSelected = this.checkIsselectedCuisine(selectedCuisine, item);
    return (
      <ModalBoxListItem
        item={item}
        isSelected={isSelected}
        onPress={this.onClickModalBoxListItemCusine}
      />
    );
  };

  onPressDoneHandler = () => {
    this.setState({
      isVisible: false,
      selectedCuisineActual: this.state.selectedCuisine,
    });
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#F3F3F3',
        }}
      />
    );
  };

  render() {
    const { filter, selectedType, selectedCuisine, modalType } = this.state;
    const sectionlist = filter.filter_sections;
    let flatlist = null;
    let modalBoxTitle = '';
    if (sectionlist.length > 0)
      switch (modalType) {
        case 'type':
          modalBoxTitle = 'Type';
          flatlist = (
            <FlatList
              data={sectionlist[0].options}
              renderItem={this.renderItem}
              extraData={this.state.selectedType}
            />
          );
          break;
        case 'cuisine':
          modalBoxTitle = 'Select cuisine';
          flatlist = (
            <FlatList
              data={sectionlist[1].options}
              renderItem={this.renderItemcuisine}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              extraData={this.state.selectedCuisine}
            />
          );
          break;
      }

    const { i18nCollection } = this.props;

    return (
      <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <SectionList
              title='OFFERS'
              data={{
                section_name: 'NEW OFFERS',
              }}
              onChange={() => this.onPressSelectionHandler('newOffer', {})}
              onPress={() => this.onPressSelectionHandler('newOffer', {})}
              checked={this.state.newOffer}
              i18nCollection={i18nCollection}
            />

            {sectionlist.map((filterItem) => {
              return (
                <SectionList
                  title={filterItem.section_name}
                  data={filterItem}
                  selectedType={selectedType}
                  selectedCuisine={selectedCuisine}
                  onPress={this.onPressSelectionHandler}
                  addAmenity={this.addAmenity}
                  selectedAmenities={this.state.selectedAmenities}
                  i18nCollection={i18nCollection}
                />
              );
            })}
          </View>
        </ScrollView>

        <ModalBox
          type='md'
          title={modalBoxTitle}
          isVisible={this.state.isVisible}
          isDoneButton={modalType === 'type' ? false : true}
          doneButtonText='Done'
          onPress={this.onPressDoneHandler}
        >
          {flatlist}
        </ModalBox>
      </View>
    );
  }
}

export default index;
