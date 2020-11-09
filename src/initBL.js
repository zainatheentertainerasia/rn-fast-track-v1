import EndPoints from './EndPoints.json';
import AppConfig from './AppConfig.json'
import AuthBL  from '../src/modules/ft_rn_auth_module/src/BL/AuthBL'
import MerchantBL from '../src/modules/ft_rn_merchant_module/src/BL/MerchantBL'
import OutletBL from '../src/modules/ft_rn_outlet_module/src/BL/OutletBL'
import HomeBL from '../src/modules/ft_rn_home_module/src/BL/HomeBL'

export const AllInitBL = () => {
  const currentEnvEndPoint = EndPoints[AppConfig.env];
  
  //Auth BL Initial
  const userServiceUrl = currentEnvEndPoint.userServices
  AuthBL.init({
    mode: AppConfig.mode,
    userServiceUrl: userServiceUrl ? userServiceUrl : ""
  });


  const merchantServiceUrl = currentEnvEndPoint.merchantServices
  const redemptionServiceUrl = currentEnvEndPoint.redemptionServices
  MerchantBL.init({
    mode: AppConfig.mode,
    merchantServiceUrl: merchantServiceUrl ? merchantServiceUrl : "",
    redemptionServiceUrl: redemptionServiceUrl ? redemptionServiceUrl : "",
  });


  const configServiceOutletUrl =currentEnvEndPoint.configsServices
  const outletServiceUrl = currentEnvEndPoint.outletServices
  OutletBL.init({
    mode: AppConfig.mode,
    configServiceUrl: configServiceOutletUrl ? configServiceOutletUrl : "",
    outletServiceUrl: outletServiceUrl ? outletServiceUrl : "",
  });


  const homeServiceUrl = currentEnvEndPoint.homeServices;
  const configServiceHomeUrl =currentEnvEndPoint.configsServices;

  HomeBL.init({
    mode: AppConfig.mode,
    homeServiceUrl: homeServiceUrl ? homeServiceUrl : "",
    configServiceUrl: configServiceHomeUrl ? configServiceHomeUrl : "",
  });

};


