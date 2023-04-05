import { getEl } from '../utilities.js';
export class FiltersController {
    constructor(filtersManager, homeController, itemsManager) {
        this.filtersManager = filtersManager;
        this.homeController = homeController;
        this.itemsManager = itemsManager;

    }

    render = () => {
        let categoryListLink = "/list.php?c=list";
        let alcoholicListLink = "/list.php?a=list";
        let ingredientsListLink = "/list.php?i=list";
        let glassesListLink = "/list.php?g=list";
        let categoriesContainer = getEl("categoriesContainer");
        categoriesContainer.innerHTML = "";
        let glassesContainer = getEl("glassesContainer");
        glassesContainer.innerHTML = "";
        let ingredientsContainer = getEl("ingredientsContainer");
        ingredientsContainer.innerHTML = "";
        let drinkTypeContainer = getEl("drinkTypeContainer");
        drinkTypeContainer.innerHTML = "";

        this.takeThenShowLinksThenShowFiltredCoctails(categoryListLink, categoriesContainer);
        this.takeThenShowLinksThenShowFiltredCoctails(alcoholicListLink, drinkTypeContainer);
        this.takeThenShowLinksThenShowFiltredCoctails(glassesListLink, glassesContainer);
        this.takeThenShowLinksThenShowFiltredCoctails(ingredientsListLink, ingredientsContainer);

    }

    takeThenShowLinksThenShowFiltredCoctails = (listLink, container) => {

        let itemsContainer = getEl("itemsContainer");
        this.filtersManager.takeLinks(listLink).then(data => {

            this.filtersManager.createLinks(data.drinks, Object.keys(data.drinks[0])[0], container).forEach(link => {

                link.addEventListener("click", () => {

                    let category = listLink[10];
                    let keyword = this.correctKeyword(link);

                    this.filtersManager.receiveFiltred(category, keyword).then(
                        data => {

                            return Promise.all(data.drinks.map(drink => this.itemsManager.searchById(drink.idDrink)))

                        }).then(drinks => {

                            let filtredDrinksArray = drinks.map(el => {

                                return el.drinks[0];
                            });
                            console.log(filtredDrinksArray)
                            location.hash = "cocktailsPage";
                            this.homeController.isFiltredList = true;
                            this.homeController.renderItems(filtredDrinksArray, itemsContainer);


                        })
                })
            })
        })
    }


    correctKeyword = (elementText) => {
        let keyword = elementText.innerText.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join("_");
        return keyword;

    }
}