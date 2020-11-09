import { getCheersData } from './apis/cheers-api';
import { cheersInterface, cheersRule, cheersParams } from './Interfaces';

const GetCheers = async (token: string, params: cheersParams) => {
  try {
    if (token === '') throw new Error('Token not found');
    if(!params.location_id) throw new Error('Location id not found');
    if(params.language === "") throw new Error('Language not found');
    const cheers = await getCheersData(token, params);

    if(cheers.data && cheers.data.cheers_rules && cheers.data.cheers_rules.length === 0){
      throw new Error('Could not found cheers rules');
    }
    return transformData(cheers.data);
    //return redemptionData;
  } catch (e) {
    throw new Error(e.message);
  }
};

const transformData = (data: any): cheersInterface => {
  const cheersRules: cheersRule[] = data.cheers_rules.map((rule: any) => {
    if(rule) {
      const cheers_logo_url = rule.cheers_logo_url ? rule.cheers_logo_url : "";

      const product_information = rule.product_information ? rule.product_information : "";
      const drinking_age_confirmation_message =
          rule.drinking_age_confirmation_message ? rule.drinking_age_confirmation_message : "";
      const not_interested_in_cheers_offers_message =
          rule.not_interested_in_cheers_offers_message ? rule.not_interested_in_cheers_offers_message : "";
      const error_message_to_select_an_option =
          rule.error_message_to_select_an_option ? rule.error_message_to_select_an_option : "";
      return {
        cheers_logo_url: cheers_logo_url,
        product_information: product_information,
        drinking_age_confirmation_message: drinking_age_confirmation_message,
        not_interested_in_cheers_offers_message: not_interested_in_cheers_offers_message,
        error_message_to_select_an_option: error_message_to_select_an_option,
      };
    }
  });
  return {
    cheersRules: cheersRules,
  };
};

export default GetCheers;
