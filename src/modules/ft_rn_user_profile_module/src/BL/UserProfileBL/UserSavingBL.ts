import {userSavingAPI} from './apis';
import {UserProfileDataType, UserSavingAPIdataType, UserSavingData, ProgressBar} from "./Interfaces";


const UserSavingBL = async (data: UserSavingAPIdataType) => {

    try {
        if (data.sessionToken === "" || !data.sessionToken) throw new Error("Session Token not found");
        if (data.company === "" || !data.company) throw new Error("Company not found");
        if (!data.currency || data.currency === "") throw new Error("Currency not found");
        if (!data.summaryType || data.summaryType === "") throw new Error("Summary Type not found");
        if (!data.summaryType || data.summaryType !== "by_month" && data.summaryType !== "by_year") throw new Error("Invalid summary type");
        if(!data.language || data.language === "") throw new Error("language not found");

        const userSavingResult = await userSavingAPI(data)
        console.log("userSavingResult: ",userSavingResult)



        let graphData: number[] = []
        if (userSavingResult.data.graph_members && userSavingResult.data.graph_members.length !== 0) {
            let graphMembers = userSavingResult.data.graph_members[0]
            if (graphMembers.graph_data && graphMembers.graph_data.length !== 0) {
                graphData = graphMembers.graph_data.map((item) => {
                    return item.value ? item.value : ""
                })
            }
        }
        let progressBarData: ProgressBar[] = []
        let currentMonthSaving: number = 0
        if (userSavingResult.data.progress_data && userSavingResult.data.progress_data.length !== 0) {

            progressBarData = userSavingResult.data.progress_data.map((item) => {
                if (item.name === userSavingResult.data.current_month) {
                    currentMonthSaving = item.savings ? item.savings.toFixed(2) : 0
                }
                return {
                    name: item.name ? item.name : "",
                    savings: item.savings ? item.savings.toFixed(2) : 0,
                    totalSavings: item.total_savings ? item.total_savings.toFixed(2) : 0,
                }

            })
        }


        const userSaving: UserSavingData = {
            lifeTimeSaving: userSavingResult.data.life_time_saving ? userSavingResult.data.life_time_saving.toFixed(2) : 0,
            currentYear: userSavingResult.data.current_year ? userSavingResult.data.current_year : 0,
            currentMonth: userSavingResult.data.current_month ? userSavingResult.data.current_month : 0,
            currentMonthSaving: currentMonthSaving,
            savings: {
                graph: graphData,
                progressBar: progressBarData
            }
        }

        return userSaving

        // const userProfile : UserProfileDataType = {
        //     userId: userData.userId,
        //     firstName: userData.firstname ? userData.firstname : "" ,
        //     lastName: userData.lastname ? userData.firstname : "",
        //     countryOfResidence: userData.country_of_residence,
        //     currency: userData.currency,
        //     demographicsUpdated: userData.is_demographics_updated,
        //     email: userData.email,
        //     gender: userData.gender,
        //     mobilePhone: userData.mobile_phone,
        //     nationality: userData.nationality,
        //     profileImage: userData.profile_image,
        //     pushNotifications: userData.push_notifications,
        //     savings: userData.savings,
        //     dateOfBirth: userData.date_of_birth,
        // }

        // return userProfile

    } catch (e) {

        throw new Error(e.message);
    }

}

export default UserSavingBL
