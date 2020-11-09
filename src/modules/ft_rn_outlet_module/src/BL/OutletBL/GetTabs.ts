import { getTabs } from './apis/tabs-api';
import { tabsInterface, tabInterface } from './Interfaces';
interface params {
  category: string;
  location_id: number;
  language: string;
}

const GetTabs = async (token: string, params: params) => {
  try {
    if (token === '') throw new Error('Token not found');
    if(params.language === "") throw new Error('Language not found');
    const tabs = await getTabs(token, params);

    console.log(tabs,'tabs data')
    return transformData(tabs.data);
    //return redemptionData;
  } catch (e) {
    throw new Error(e.message);
  }
};

const transformData = (data: any): tabsInterface => {
  const limit = data.limit ? data.limit : 0;
  const tabs: tabInterface[] = data.tabs.map((tab: any) => {
    const uid = tab.uid ? tab.uid : 0;
    const name = tab.name ? tab.name : "";
    const params = tab.params ? tab.params : ''
    return {
      uid: uid,
      name: name,
      params: params,
    };
  });
  return {
    limit: limit,
    tabs: tabs,
  };
};

export default GetTabs;
