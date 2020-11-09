interface DataType {
  favourite: Favourite;
}

interface Favourite {
  [locationName: string]: LocationFavorite;
}

interface LocationFavorite {
  [merchantId: number]: Merchant;
}

interface Merchant {
  merchantName: string;
  merchantLogo: string;
  attributes: string[];
  locked: boolean;
}

interface FavouriteClickData {
  merchantId: number;
  outletId: number;
}

interface CallBacks {
  onfavouriteClick: (data: FavouriteClickData) => void;
}

export interface Port {
  data: DataType;
  CallBacks: CallBacks;
}
