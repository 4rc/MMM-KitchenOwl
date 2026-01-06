# MMM-KitchenOwl

A module for [MagicMirror²](https://github.com/MichMich/MagicMirror) to display your shopping list from a self-hosted [KitchenOwl](https://kitchenowl.org/) instance.

**✨ Compatible with the new Flutter version of KitchenOwl (2025+) using Long Lived Tokens.**

![Example](https://via.placeholder.com/400x200?text=KitchenOwl+Module)

## Features
* 🛒 **Real-time Sync:** Shows items from your KitchenOwl shopping list.
* 🔐 **Secure:** Uses Long Lived Tokens (no need to refresh tokens daily!).
* 🎨 **Auto-Emoji:** Automatically assigns emojis to common items (Milk 🥛, Bread 🍞, etc.).
* 📱 **Clean UI:** Styled to look like a modern mobile app checklist.

## Prerequisites
* An instance of MagicMirror².
* A self-hosted instance of KitchenOwl.

## Installation

1.  Navigate to your MagicMirror `modules` folder:
    ```bash
    cd ~/MagicMirror/modules
    ```
2.  Clone this repository:
    ```bash
    git clone https://github.com/IL-TUO-NOME-GITHUB/MMM-KitchenOwl.git
    ```
3.  Install dependencies:
    ```bash
    cd MMM-KitchenOwl
    npm install
    ```

## Configuration

Add this to your `config/config.js` file:

```javascript
{
    module: "MMM-KitchenOwl",
    position: "bottom_left",
    header: "Shopping List",
    config: {
        // Your KitchenOwl internal URL (e.g., http://192.168.1.50:8383)
        apiUrl: "http://YOUR_NAS_IP:PORT",

        // Generate this in KitchenOwl App: Settings -> Long Lived Tokens -> Create New
        apiKey: "YOUR_LONG_LIVED_TOKEN_HERE",

        // Update interval in milliseconds (default: 1 minute)
        updateInterval: 60 * 1000,

        // Show checked items? (true/false)
        showCompleted: false
    }
},
```

## License
MIT
