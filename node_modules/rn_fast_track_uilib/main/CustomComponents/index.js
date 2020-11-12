import BlueButton from "./Button/index";
import ProceedButton from "./Button/proceedButton";
import CustomInput from "./Input/index";
import CustomText from "./Text/Text";
import TextLabel from "./Text/TextLabel";
import DemographicInput from "./Input/DemograficInput";
import CustomCheckbox from "./checkbox/index";
import CustomCheckbo2 from "./checkbox/index2";
import CustomCheckbox3 from "./checkbox/index3";
import ProfileHeader from "./header/headerProfile";
import HeaderWithBackButton from "./header/headerWithBackButton";
import NavBarHeader from "./header/navBarHeader";

import CustomChers from "./cheers/index";
import CustomBottomSheet from "./ButtonSheet/index";
import CustomBottomSheetComp from "./BottomSheetComp/index";
import CustomBottomSheet2 from "./ButtonSheet/filter";
import CustomBottomSheetWithBackdrop from "./BottomSheetComp/index";
import CustomChip from "./chip/index";
import CustomChipList from "./chipList/index";

import CustomListing from "./listing/index";
// import CustomMap from './map/index';

//modals import here

import CustomNoRecord from "./noRecode/index";
import CustomSearchBar from "./SearchBar/index";
import CustomSearch from "./search/index";
import ScreenIntro from "./ScreenIntro/index";
import Loader from "./modal/loader";
import ErrorModal from "./modal/error_modal";
import WebViewModal from "./modal/webview_modal";
import SwiperModal from "./modal/swiper_modal";
import GeneralModal from "./modal/generalModal";
import DemographicModal from "./modal/demographicModal";
import CustomCarousel from "./carousel/index";
import CustomCategoryHome from "./category/index";
import LoaderWithoutModal from "./modal/LoaderWithoutModal";
import OutletHeader1 from "./header/outletheader1";
import OutletHeader2 from "./header/outletheader2";
import OutletCheckBoxFilter from "./checkbox/index";
import OutletFilter from "./filters/index";
import SelectCountryModal from "./modal/select_country_modal";
import SelectDateModal from "./modal/select_date_modal";
import SelectGenderModal from "./modal/select_gender_modal";
import ChangeLocationModal from "./modal/changeLocationModal";
import MerchantContinueModal from "./modal/merchantContinueModal";
import ResetPasswordModal from "./modal/reset_password_modal";
import ResetPasswordSuccessModal from "./modal/reset_success_modal.tsx";
import SelectCurrencyModal from "./modal/select_country_modal";
import HeaderWithLogo from "./header/headerWithLogo";
import HeaderWithLogoWithSkipButton from "./header/headerWithLogoSkipButton";
import MerchantHeader from "./header/merchantHeader";
import HeaderWithTitleOnly from "./header/headerWithTitleOnly";
import FavEmpty from "./FavEmpty/index";
import RedemptionEmpty from "./RedemptionEmpty"
import HistoryEmpty from "./HistoryEmpty"
import FavList from "./FavList/index";


import MerchantImageSlider from "./MerchantImageSlider/index";
import MerchantContactBar from "./MerchantContactBar/index";
import MerchantLocation from "./MerchantLocation/index";
import SimpleRadioButton from './RadioButtons/SimpleRadioButton';

export const CustomComponents = {
  //tested
  BlueButton,
  ProceedButton,
  CustomInput,
  DemographicInput,
  CustomText,
  TextLabel,
  CustomCheckbox,
  CustomCheckbo2,
  CustomCheckbox3,
  ProfileHeader,
  NavBarHeader,
  HeaderWithTitleOnly,
  //not tested
  CustomBottomSheet,
  CustomBottomSheet2,
  CustomBottomSheetWithBackdrop,
  CustomChers,
  CustomChip,
  CustomChipList,

  //Modal
  Loader,
  LoaderWithoutModal,
  ErrorModal,
  WebViewModal,
  SwiperModal,
  GeneralModal,
  DemographicModal,
  CustomCarousel,
  CustomCategoryHome,

  //headers
  OutletHeader1,
  OutletHeader2,

  ScreenIntro,
  CustomSearchBar,
  CustomSearch,
  CustomNoRecord,
  OutletCheckBoxFilter,
  CustomListing,
  OutletFilter,
  SelectCountryModal,
  SelectDateModal,
  SelectGenderModal,
  ChangeLocationModal,
  MerchantContinueModal,
  ResetPasswordModal,
  ResetPasswordSuccessModal,
  SelectCurrencyModal,

  //Headers
  HeaderWithLogo,
  HeaderWithLogoWithSkipButton,
  MerchantHeader,
  HeaderWithBackButton,

  FavEmpty,
  RedemptionEmpty,
  FavList,
  HistoryEmpty,

  MerchantImageSlider,
  MerchantContactBar,
  MerchantLocation,
  CustomBottomSheetComp,

  SimpleRadioButton,
};
