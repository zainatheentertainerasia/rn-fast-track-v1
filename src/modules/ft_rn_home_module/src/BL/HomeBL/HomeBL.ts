import { homeApi } from './apis';
import {
  HomeAPIdataType,
  HomeSectionsDataType,
  mainCover,
  category,
  featured,
} from './Interfaces';

const HomeBL = async (data: HomeAPIdataType) => {

    try {
        if (data.token === "") throw new Error("Token not found");
        if (data.currency === "") throw new Error("currency not found");
        if(data.language === "") throw new Error("language not found");


        const HomeApiResult = await homeApi(data)
        console.log("result: ",HomeApiResult)

        let homeSections: HomeSectionsDataType[] = []

        for (let i = 0; i < HomeApiResult.data.home_sections.length; i++) {
            const section = HomeApiResult.data.home_sections[i]

            if(section.identifier === null || section.identifier === ""){
                continue
            }


      if (section.identifier === 'main_cover') {
        let mainCover: mainCover[] = [];

        for (let j = 0; j < section.tiles.length; j++) {
          const tile = section.tiles[j];

                    if(tile.identifier === null || tile.identifier === ""){
                        continue
                    }

                    if (tile.identifier === "messaging_tile") {
                        mainCover.push({
                            tileIdentifier: tile.identifier ? tile.identifier : "",
                            data: {
                                messages: tile.messages ? tile.messages : "",
                                mainTopImage: tile.image ? tile.image : "",
                            }
                        })
                    } else if (tile.identifier === "savings_tile") {
                        mainCover.push({
                            tileIdentifier: tile.identifier ? tile.identifier : "",
                            data: {
                                savingThisYear: tile.savings.savings_this_year ? tile.savings.savings_this_year : "",
                                offersUsed: tile.savings.offers_used ? tile.savings.offers_used : ""
                            }
                        })
                    }
                }

        homeSections.push({
          sectionIdentifier: section.identifier,
          data: mainCover,
        });
      } else if (section.identifier === 'categories') {
        let categories: category[] = [];

        for (let j = 0; j < section.tiles.length; j++) {
          const category = section.tiles[j];

          if (category) {
            categories.push({
              apiName: category.api_name ? category.api_name : '',
              displayName: category.display_name ? category.display_name : '',
              image: category.image ? category.image : '',
              analytics_category_name: category.analytics_category_name
                ? category.analytics_category_name
                : '',
              category_id: category.category_id ? category.category_id : 0,
              pinUrl:category.map_pin_url
            });
          }
        }

        homeSections.push({
          sectionIdentifier: section.identifier,
          data: categories,
        });
      } else if (section.identifier === 'featured_sections') {
        let featured: featured[] = [];

        for (let j = 0; j < section.tiles.length; j++) {
          const featureSlide = section.tiles[j];

                    if(featureSlide){
                        featured.push({
                            deepLink: featureSlide.deep_link ? featureSlide.deep_link : "",
                            image: featureSlide.image_url ? featureSlide.image_url : "",
                            title: featureSlide.title ? featureSlide.title : "",
                            entity_id: featureSlide.id ? featureSlide.id : 0,
                        })
                    }


                }

        homeSections.push({
          sectionIdentifier: section.identifier,
          data: featured,
        });
      }
    }

    return homeSections;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default HomeBL;
