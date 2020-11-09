import { updateDemographicApi, getUserProfileApi } from './apis';
import { DemographicsDataType } from './Interfaces'
import UserModelMapper from "./UserModelMapper";


const STRINGS = {
    tokenCheck: 'Token not found',
    sessionTokenCheck: 'Session Token not found',
    allCheck: 'Please fill in all the required fields',
    emailCheck: 'Please enter a valid email!',
    passwordCheck: 'Please enter a password!',
    privacyPolicyCheckString: 'Please review & accept the Privacy Policy',
    endUserLicenseAgreementCheckString:
        'Please review & accept the End User License Agreement.',
};

const UpdateDemographicBL = async (data: DemographicsDataType) => {

    try {

        const {token, nationality, dateOfBirth, gender,} = data;


        if (token == null || token == "" ) {
            throw ({ messageType: "tokenError", messageText: STRINGS.tokenCheck })
        }

        if (
            (nationality == null || nationality == "") ||
            (dateOfBirth == null || dateOfBirth == "") ||
            (gender == null || gender == "")
        ) {
            throw ({ messageType: "emptyFields", messageText: STRINGS.allCheck })
        }


        const demographicResult = await updateDemographicApi(data)
        console.log("demographicResult: ",demographicResult)
        const userResult = await getUserProfileApi(data.token)

        const userProfile = UserModelMapper(userResult.data)

        return userProfile

    } catch (e) {
        throw (e)
    }


};

export default UpdateDemographicBL
