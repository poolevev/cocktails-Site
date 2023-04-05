import { getEl, createEl, debounce } from '../utilities.js';
export class HomeController {
    constructor(itemsManager, userManager, detailsController) {
        this.itemsManager = itemsManager;
        this.userManager = userManager;
        this.detailsController = detailsController;
        this.mainPage.onclick = () => {
            this.render()
        };
    }

    mainPage = getEl("mainPage");
    isFiltredList = false;

    render = () => {
        if (!this.isFiltredList) {
            let inputSearch = getEl("searchInput");
            let itemsContainer = getEl("itemsContainer");
            itemsContainer.innerHTML = "";


            inputSearch.oninput = debounce((event) => {
                const keyword = event.target.value;

                this.itemsManager.search(keyword).then(items => {
                    itemsContainer.innerHTML = "";
                    this.renderItems(items.drinks, itemsContainer)
                })

                setTimeout(() => {
                    event.target.value = "";
                }, 2000);
            }, 500);

            this.itemsManager.showHomePageCocktails(this.renderItems, itemsContainer);

        } else {
            this.isFiltredList = false;
        }
    }

    //render cards
    renderItems = (list, container) => {

        container.innerHTML = "";

        list.forEach(item => {

            let card = createEl("div");
            card.classList.add("card");
            card.style.width = "18rem";

            let img = createEl('img', item.strDrinkThumb);
            img.classList.add("card-img-top");
            card.append(img);

            let cardBody = createEl("div");
            cardBody.classList.add("card-body");

            let cardTitle = createEl("h5", item.strDrink);
            cardTitle.classList.add("card-title");
            cardBody.append(cardTitle);

            let ingredientsTitle = createEl("h6", "Ingredients:");
            ingredientsTitle.classList.add("card-title");
            cardBody.append(ingredientsTitle);

            let ingredients = createEl("p");
            //Shows all ingredients
            for (let i = 1; i <= 15; i++) {
                let str = "strIngredient" + i;
                if (item[str]) {
                    ingredients.innerText += `${item[str]}, `
                };

            }
            cardBody.append(ingredients);
            let btnContainer = createEl("div");
            btnContainer.classList.add("rowFlex");

            let addFavoritesBtn = createEl("button", "Add to Favorites");

            let detailsBtn = createEl("button", "Details");
            let dayDrinkText = createEl("h6", "Drink of the day");
            dayDrinkText.style.color = "red";

            if (item.dayDrink) {
                cardBody.append(dayDrinkText);
            }

            if (item.isFavorite) {
                addFavoritesBtn.innerText = "Remove from Favorites";
            }

            addFavoritesBtn.classList.add("btn", "btn-primary");
            detailsBtn.classList.add("btn", "btn-primary");

            addFavoritesBtn.onclick = () => {
                if (addFavoritesBtn.innerText === "Add to Favorites") {
                    this.itemsManager.addFavorite(item);
                    addFavoritesBtn.innerText = "Remove from Favorites";
                    item.isFavorite = true;

                } else {
                    this.itemsManager.removeFavorite(item);
                    addFavoritesBtn.innerText = "Add to Favorites";
                    item.isFavorite = false;

                }
            }

            detailsBtn.onclick = () => {

                this.detailsController.render(item);
                location.hash = 'details';

            }

            btnContainer.append(addFavoritesBtn, detailsBtn);
            card.append(cardBody, btnContainer);
            container.append(card);
        })

    }
}