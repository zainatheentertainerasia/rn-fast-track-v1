export const isDemographicsEnable=(screenName)=>{
  if(window.appConfigs.demographics_is_active==="1")
  {
    if(window.appConfigs.demographics_screen_locations.indexOf(screenName)>-1)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  else
  {
    return false;
  }
}