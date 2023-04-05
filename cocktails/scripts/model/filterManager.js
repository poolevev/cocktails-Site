import { createEl, makeAPICall } from '../utilities.js';
import { API_URL } from "../consts.js";
export class FiltersManager {
    takeLinks = (category) => {
        return makeAPICall(API_URL + category, {

        })
    }

    createLinks = (list, linkTitle, container) => {
        let links = [];
        list.forEach(item => {

            let miniCard = createEl("span");

            if (container.id === "ingredientsContainer") {
                container.classList.add("rowFlex");
                miniCard.classList.add("card");
                miniCard.style.width = "8rem";

                let imageLink = `https://www.thecocktaildb.com/images/ingredients/${item[linkTitle]}.png`
                let image = createEl("img", imageLink);
                miniCard.append(image);
            }

            let link = createEl("a", item[linkTitle]);
            link.classList.add("link");
            miniCard.append(link);

            container.append(miniCard);
            links.push(link);

        })

        return links;
    }

    receiveFiltred = (category, keyword) => {
        return makeAPICall(API_URL + `/filter.php?${category}=` + keyword, {

        })
    }
}
