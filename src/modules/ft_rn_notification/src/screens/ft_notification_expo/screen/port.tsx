interface datatype {
  locationList: location[]
  selectedLocation: location | null
  homeSections: homeSections[] | null
  currency: string
  loadingOverlayActive: Boolean,
  errorText: string,
  error: boolean,
};

interface location {
  id: number,
  name: string,
  flag: string,
}

interface homeSections {

  sectionIdentifier: string
  //data :  (mainCover | categories | featured)[]
  //  data : mainCover[] | categories[] | featured[]
  data: Array<(mainCover | category | featured)>
}


interface mainCover {
  tileIdentifier: string
  data: messagingTile | savingsTile
}

interface messagingTile {
  messages: string[]
  mainTopImage: string
}

interface savingsTile {
  savingThisYear: number,
  offersUsed: number
}



interface category {
  displayName: string,
  apiName: string,
  image: string
}

interface featured {
  deepLink: string,
  image: string,
  title: string
}




interface ErrorData {
  error: boolean,
  message: string
}


interface callBacks {
  onLocationChange: (location: location) => void
  onSearchClick: () => void
  onCategoryClick: (category: category) => void
  onFeaturedTileClick: (featured: featured) => void
  onError: (data: ErrorData) => void
};

export interface Port {
  data: datatype,
  CallBacks: callBacks
};
