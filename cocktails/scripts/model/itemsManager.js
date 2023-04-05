import { makeAPICall } from '../utilities.js';
import { API_URL, SERVER_URL } from "../consts.js";
export class ItemsManager {

    ordinaryDrinks = [];

    getCocktails = () => {
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let number = Math.ceil(Math.random() * letters.length);
        return makeAPICall(API_URL + `/search.php?f=${letters[number]}`, {

        })
    }

    getDayCocktail = () => {

        return makeAPICall(API_URL + `/random.php`, {

        })
    }

    search = (keyword) => {
        return makeAPICall(API_URL + `/search.php?s=${keyword}`, {

        })

    }

    searchById = (id) => {
        return makeAPICall(API_URL + `/lookup.php?i=${id}`, {

        })

    }

    showFavorites = () => {

        return makeAPICall(SERVER_URL + '/favorite-cocktails', {
            headers: {
                "identity": JSON.parse(localStorage.getItem("loggedUser")).sessionId,

            },

        })

    }

    addFavorite = (item) => {

        return makeAPICall(SERVER_URL + '/favorite-cocktails', {
            method: "POST",
            headers: {
                "identity": JSON.parse(localStorage.getItem("loggedUser")).sessionId,
                "content-type": "application/json",

            },
            body: JSON.stringify({
                "id": `${item.idDrink}`
            }),

        }).then(data => console.log(`${data.message} Added to favorites`))

    }

    removeFavorite = (item) => {

        return makeAPICall(SERVER_URL + '/favorite-cocktails', {
            method: "DELETE",
            headers: {
                "identity": JSON.parse(localStorage.getItem("loggedUser")).sessionId,
                "cocktailId": `${item.idDrink}`,

            },

        }).then(data => console.log(`${data.message} Removed from favorites`))


    }


    showHomePageCocktails = (renderFunction, itemsContainer) => {
        this.getCocktails().then(data => {

            this.ordinaryDrinks = data.drinks;
            return this.ordinaryDrinks;

        }).then(drinks => {
            return this.showFavorites().then(data => {

                return Promise.all(data.favorites.map(id => this.searchById(id)))

            })
                .then(drinks => {

                    let drinkObjects = drinks.map(el => {
                        el.drinks[0].isFavorite = true;
                        return el.drinks[0];
                    });

                    this.ordinaryDrinks = [...drinkObjects, ...this.ordinaryDrinks];
                    this.getDayCocktail().then(dayDrink => {

                        dayDrink.drinks[0].dayDrink = true;
                        this.ordinaryDrinks.unshift(dayDrink.drinks[0]);
                        console.log(dayDrink.drinks[0])
                        return this.ordinaryDrinks;

                    })
                        .then(data => {
                            renderFunction(data, itemsContainer);
                        })
                })

        })
    }

}