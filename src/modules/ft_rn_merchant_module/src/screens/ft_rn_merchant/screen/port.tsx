interface datatype {
  merchant: Merchant;
  redemptionResponse: RedumptionResponse | null;
  selectedOutlet: SelectedOutlet;
  favourite: Boolean;
  loadingOverlayActive: Boolean;
  errorText: string;
  error: boolean;
  showRedemptionModal: boolean;
  showRedemptionSuccessModal: boolean;
  companyName: string;
  menu: string;
  website: string;
  ruleOfUseURL: string;
}

interface ExternalWebPageData {
  showExternalWebPage: boolean;
  headerText: string;
  externalURL: string;
  getHTMLapi: () => void;
}

interface RedumptionResponse {
  coupon: string;
  redemption_code: string;
  smiles_earned: number;
}

interface ErrorData {
  error: boolean;
  message: string;
}

interface Merchant {
  name: string;
  id: number;
  hero_urls: string[];
  description: string;
  logo_small_url: string;
  outlets: Outlet[];
  offers: Offer[];
  merchant_attributes: MerchantAttributes[];
}

interface MerchantAttributes {
  section_name: string;
  attributes: MerchantAmenities[];
}

interface MerchantAmenities {
  image_url: string;
  name: string;
}

interface Outlet {
  id: number;
  lat: number;
  lng: number;
  human_location: string;
  name: string;
  distance: number;
  email: string;
  telephone: string;
}

interface SelectedOutlet extends Outlet {
  neighborhood: string;
  mall: string;
}

interface OfferToDisplay {
  voucher_type_image: string;
  name: string;
  additional_details: OfferAdditionalDetails[];
  voucher_details: OfferDetails[];
  outlet_ids: number[];
  redeemability: number;
  offer_id: number;
  savings_estimate: number;
  validity_date: string;
  sub_detail_label: string;
  details: string | null;
}

interface OfferDetails {
  title: string;
  image: string;
}

interface OfferAdditionalDetails extends OfferDetails {
  color: string;
}

interface Offer {
  section_name: string;
  offers_to_display: OfferToDisplay[];
  product_id: number;
}

interface AddFavouriteData {
  locationName: string;
  merchant: Merchant;
}

interface RemoveFavouriteData {
  locationName: string;
  merchantId: number;
}

interface RedeemData {
  outlet_id: number;
  offer_id: number;
  merchant_pin: string;
  transaction_id: number;
  product_id: number;
}

export interface callBacks {
  onError: (data: ErrorData) => void;
  hideError: () => void;
  setFavourite: () => void;
  addFavorite: (data: AddFavouriteData) => void;
  removeFavorite: (data: RemoveFavouriteData) => void;
  redeemOffer: (data: any) => any;
  activeLoader: (flag: boolean) => void;
  refreshMerchant: () => void;
  onBack: () => void;
  onSelectedOutletChange: (data: SelectedOutlet) => void;
  onClickWebView: (url: string | null, title: string | null) => void;

  //update porta
  onOfferSelected: (data: any) => void;
  onShowRedemptionModal: () => void;
  onCloseRedemptionModal: () => void;
  onShowRedemptionSuccessModal: () => void;
  onCloseRedemptionSuccessModal: () => void;
  pushAnalytics: (data: any) => void;
}

export interface Port {
  data: datatype;
  CallBacks: callBacks;
}
