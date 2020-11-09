import {redemptionhistoryAPI} from './apis';
import {
    RedemptionhistoryAPIdataType,
    RedemptionHistoryData,
    MonthWiseRedemmptionsData,
    RedemptionsData
} from "./Interfaces";


const GetRedemptionHistory = async (data: RedemptionhistoryAPIdataType) => {
    try {
        if (data.sessionToken === "" || data.sessionToken === null) throw new Error("Session Token not found");
        if (data.company === "" || data.company === null) throw new Error("Company  not found");
        if (data.currency === "" || data.currency === null) throw new Error("Currency  not found");
        if(!data.language || data.language === "") throw new Error("language not found");



        const redemptionhistoryrResult = await redemptionhistoryAPI(data)

        const monthWiseRedemmptions: MonthWiseRedemmptionsData[] = redemptionhistoryrResult.data.month_wise_redemmptions.map((item: any) => {

        const month: RedemptionsData[] = item.redemptions.map((redemption: any) => {
            return {
                logo: redemption.logo_url ? redemption.logo_url : "",
                merchantName: redemption.merchant ? redemption.merchant : "",
                outletName: redemption.outlet ? redemption.outlet : "",
                category: redemption.category ? redemption.category : "",
                date: redemption.date ? redemption.date : "",
                code: redemption.code ? redemption.code : "",
                savings: redemption.savings ? redemption.savings : ""
            }
        })


        return {
            month: item.month ? item.month : "",
            redemptionCount: item.redemption_count ? item.redemption_count : "",
            redemptions: month
        }

        })


        const redemptionHistory: RedemptionHistoryData = {
            currentYear: redemptionhistoryrResult.data.current_year ? redemptionhistoryrResult.data.current_year : "",
            totalNumberOfRedemption: redemptionhistoryrResult.data.total_redemptions ? redemptionhistoryrResult.data.total_redemptions : "",
            monthWiseRedemmptions: monthWiseRedemmptions
        }

        return redemptionHistory


    } catch (e) {
        throw new Error(e.message);
    }
}

export default GetRedemptionHistory