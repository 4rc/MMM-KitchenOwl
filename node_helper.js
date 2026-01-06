const NodeHelper = require("node_helper");
const fetch = require("node-fetch");

module.exports = NodeHelper.create({
    start: function() {
        console.log("MMM-KitchenOwl Helper avviato!");
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_SHOPPING_LIST") {
            this.config = payload;
            this.getList();
        }
    },

    async getList() {
        // Costruiamo l'URL usando la base del config + il path standard API v2
        // Assumiamo household 1 come default, che è lo standard per installazioni singole
        const url = this.config.apiUrl + "/api/household/1/shoppinglist";
        
        const headers = {
            "Authorization": "Bearer " + this.config.apiKey,
            "Content-Type": "application/json",
            "Accept": "application/json"
        };

        try {
            const response = await fetch(url, { headers: headers });
            
            if (!response.ok) {
                console.error("KitchenOwl Error: " + response.status + " " + response.statusText);
                return;
            }
            
            const json = await response.json();
            
            // Logica robusta per trovare gli items nelle varie versioni dell'API
            let items = [];
            
            if (Array.isArray(json) && json.length > 0) {
                // Versione recente: array di liste, prendiamo la prima
                items = json[0].items || [];
            } else if (json.data && Array.isArray(json.data)) {
                // Vecchio standard API response
                items = json.data;
            } else if (json.items && Array.isArray(json.items)) {
                // Risposta diretta oggetto lista
                items = json.items;
            }

            this.sendSocketNotification("SHOPPING_LIST_RECEIVED", items);

        } catch (error) {
            console.error("KitchenOwl Fetch Error:", error);
        }
    }
});
