import { getEl, createEl } from '../utilities.js';
export class DetailsController {

    constructor(itemsManager,) {

        this.itemsManager = itemsManager;

    }


    render = (drink) => {
        console.log(drink);

        let cardLeft = getEl('detailsContainerLeft');
        cardLeft.classList.add("card");
        cardLeft.style.width = "18rem";
        cardLeft.innerHTML = "";

        let alcoholic = createEl('h3', drink.strAlcoholic);
        alcoholic.classList.add("card-title");

        let img = createEl('img', drink.strDrinkThumb);
        img.classList.add("card-img-top");

        cardLeft.append(img, alcoholic);

        let cardRight = getEl('detailsContainerRight');
        cardRight.classList.add("card");
        cardRight.style.width = "18rem";
        cardRight.innerHTML = "";

        let drinkName = createEl('h3', drink.strDrink);
        drinkName.classList.add("card-title");
        cardRight.append(drinkName);

        if (drink.strTags) {
            let strTags = createEl('h6', drink.strTags);
            cardRight.append(strTags);
        }

        let glassType = createEl('p', drink.strGlass);
        let strInstructions = createEl('p', drink.strInstructions);
        let ingrContainer = createEl("div");
        let ingrTitle = createEl('h5', "Ingredients");
        ingrContainer.append(ingrTitle);
        for (let i = 1; i <= 15; i++) {
            let str = "strIngredient" + i;
            let quantity = "strMeasure" + i;

            if (!drink[quantity]) {
                drink[quantity] = "Add to taste";
            }

            if (drink[str]) {
                let strIngredient = createEl('p', `${drink[str]} : ${drink[quantity]}`);
                ingrContainer.append(strIngredient);
            }
        }

        let buttonsDiv = createEl('div');
        let detailsNotif = createEl("span");

        let addTofavorites = createEl('button', 'Add to favorites')
        addTofavorites.classList.add('btn', 'btn-primary');

        if (drink.isFavorite) {
            addTofavorites.innerText = "Remove from Favorites";
        }

        addTofavorites.onclick = () => {
            if (addTofavorites.innerText === "Add to favorites") {
                this.itemsManager.addFavorite(drink);
                addTofavorites.innerText = "Remove from favorites";

            } else {
                this.itemsManager.removeFavorite(drink);
                addTofavorites.innerText = "Add to favorites";

            }
        }


        buttonsDiv.append(addTofavorites);
        cardRight.append(glassType, strInstructions, ingrContainer, buttonsDiv, detailsNotif);

    }

}