/* 
 * Developed by 4rc with AI Assistance (Gemini) 
 */ 

Module.register("MMM-KitchenOwl", {
    defaults: {
        apiUrl: "",
        apiKey: "",
        updateInterval: 60000,
        showCompleted: false
    },

    getStyles: function() {
        return ["MMM-KitchenOwl.css"];
    },

    start: function() {
        this.items = [];
        this.loaded = false;
        this.getData();
        setInterval(() => {
            this.getData();
        }, this.config.updateInterval);
    },

    getData: function() {
        this.sendSocketNotification("GET_SHOPPING_LIST", this.config);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "SHOPPING_LIST_RECEIVED") {
            this.items = payload;
            this.loaded = true;
            this.updateDom();
        }
    },

    getIcon: function(name) {
        const n = name.toLowerCase();
        
        // Mapping automatico Emoji in base al nome
        if (n.includes("latte")) return "🥛";
        if (n.includes("pane") || n.includes("focaccia")) return "🍞";
        if (n.includes("uova")) return "🥚";
        if (n.includes("mela") || n.includes("mele")) return "🍎";
        if (n.includes("banana")) return "🍌";
        if (n.includes("pomodor")) return "🍅";
        if (n.includes("insalata") || n.includes("lattuga")) return "🥬";
        if (n.includes("carne") || n.includes("pollo") || n.includes("bistecca")) return "🥩";
        if (n.includes("pesce") || n.includes("tonno")) return "🐟";
        if (n.includes("acqua") || n.includes("bibita")) return "💧";
        if (n.includes("vino") || n.includes("birra")) return "🍷";
        if (n.includes("carta") || n.includes("rotol")) return "🧻";
        if (n.includes("pasta") || n.includes("riso")) return "🍝";
        if (n.includes("formaggio") || n.includes("parmigiano")) return "🧀";
        if (n.includes("pizza")) return "🍕";
        if (n.includes("biscotti") || n.includes("dolce")) return "🍪";
        if (n.includes("caff")) return "☕";
        if (n.includes("detersivo") || n.includes("sapone")) return "🧼";
        if (n.includes("olio")) return "🫒";
        if (n.includes("sale") || n.includes("zucchero")) return "🧂";
        if (n.includes("frutta")) return "🍇";
        if (n.includes("verdura")) return "🥦";
        
        // Icona di fallback
        return "<i class='fa fa-shopping-basket'></i>";
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "ko-container";

        if (!this.loaded) {
            wrapper.innerHTML = "<div class='dimmed small'><i class='fa fa-spinner fa-spin'></i> Sync...</div>";
            return wrapper;
        }

        var ul = document.createElement("ul");
        ul.className = "ko-list";

        var activeItems = this.items.filter(item => !item.completed || this.config.showCompleted);

        if (activeItems.length === 0) {
            ul.innerHTML = "<li class='empty-list'><i class='fa fa-check-circle'></i> Tutto preso!</li>";
        } else {
            activeItems.forEach(item => {
                var li = document.createElement("li");
                
                var iconHtml = "<span class='ko-icon'>" + this.getIcon(item.name) + "</span>";
                
                var textHtml = "<div class='ko-text-box'><span class='ko-name'>" + item.name + "</span>";
                if (item.description) {
                    textHtml += "<span class='ko-desc'>" + item.description + "</span>";
                }
                textHtml += "</div>";
                
                li.innerHTML = iconHtml + textHtml;
                if (item.completed) li.className = "completed";
                
                ul.appendChild(li);
            });
        }

        wrapper.appendChild(ul);
        return wrapper;
    }
});
