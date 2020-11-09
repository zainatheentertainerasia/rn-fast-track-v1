import {UserProfileDataType} from "./Interfaces";


const UserModelMapper = (userData: any) => {

    const userProfile : UserProfileDataType = {
        userId: userData.userId,
        firstName: userData.firstname ? userData.firstname : "" ,
        lastName: userData.lastname ? userData.firstname : "",
        countryOfResidence: userData.country_of_residence ? userData.country_of_residence : "",
        currency: userData.currency ? userData.currency : "USD",
        demographicsUpdated: userData.is_demographics_updated,
        email: userData.email ? userData.email : "",
        gender: userData.gender ? userData.gender : "",
        mobilePhone: userData.mobile_phone ? userData.mobile_phone : "",
        nationality: userData.nationality ? userData.nationality : "",
        profileImage: userData.profile_image ? userData.profile_image : "",
        pushNotifications: userData.push_notifications,
        savings: userData.savings ? userData.savings : 0,
        dateOfBirth: userData.date_of_birth ? userData.date_of_birth : "",
    }

    return userProfile

}

export default UserModelMapper