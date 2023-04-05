import { PAGE_IDS } from "../consts.js";
import { getEl } from '../utilities.js';
import { UserManager } from "../model/userManager.js";
import { ItemsManager } from "../model/itemsManager.js";
import { FiltersManager } from "../model/filterManager.js";
import { RegisterController } from "./registerController.js";
import { LoginController } from "./loginController.js";
import { DetailsController } from "./detailsController.js";
import { HomeController } from "./homeController.js";
import { FiltersController } from "./filterController.js";

class ViewController {

    constructor() {
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
            this.disableHeader();
        });
        window.addEventListener('load', () => {
            this.handleHashChange();
            this.disableHeader();
        });

        this.userManager = new UserManager();
        this.itemsManager = new ItemsManager();
        this.filtersManager = new FiltersManager();

        this.registerController = new RegisterController(this.userManager);
        this.loginController = new LoginController(this.userManager);
        this.detailsController = new DetailsController(this.itemsManager);
        this.homeController = new HomeController(this.itemsManager, this.userManager, this.detailsController);
        this.filtersController = new FiltersController(this.filtersManager, this.homeController, this.itemsManager);

    }

    disableHeader = () => {
        let header = getEl("headerEl");
        if (this.userManager.loggedUser) {
            header.style.display = "block";
        } else {
            header.style.display = "none";
        }
    }

    handleHashChange = () => {
        const hash = location.hash.slice(1) || PAGE_IDS[0];

        if (hash === 'filters' || hash === 'cocktailsPage' || hash === 'details') {
            if (!this.userManager.loggedUser) {
                location.hash = 'login';
                return;
            }
        }

        if (!PAGE_IDS.includes(hash)) {
            location.hash = "errorPage";
            return;
        }

        PAGE_IDS.forEach(pageId => {
            let page = getEl(pageId);
            hash === pageId ? page.style.display = "block" :
                page.style.display = "none";

        })

        switch (hash) {
            case "register":
                this.registerController.render();
                break;

            case "login":
                this.loginController.render();
                break;

            case "cocktailsPage":
                this.homeController.render();
                break;

            case "filters":
                this.filtersController.render();
                break;

        }
    }


}

let viewController = new ViewController();
