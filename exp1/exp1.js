// javascriot program to perform CRUD operations on an array

const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let arr = [];

function showMenu() {
    console.log("\nChoose an operation:");
    console.log("1. Create (Add element)");
    console.log("2. Read (View elements)");
    console.log("3. Update (Modify element)");
    console.log("4. Delete (Remove element)");
    console.log("5. Exit");
}

function crudApp() {
    showMenu();
    rl.question("Enter your choice (1-5): ", (choice) => {
        switch (choice) {
            case "1": // Create
                rl.question("Enter element to add: ", (newElement) => {
                    arr.push(newElement);
                    console.log("✅ Element added! Current Array:", arr);
                    crudApp();
                });
                break;

            case "2": // Read
                console.log("📌 Current Array:", arr.length > 0 ? arr : "Array is empty");
                crudApp();
                break;

            case "3": // Update
                rl.question("Enter index to update (0-based): ", (index) => {
                    index = parseInt(index);
                    if (index >= 0 && index < arr.length) {
                        rl.question("Enter new value: ", (newValue) => {
                            arr[index] = newValue;
                            console.log("✏️ Element updated! Current Array:", arr);
                            crudApp();
                        });
                    } else {
                        console.log("❌ Invalid index!");
                        crudApp();
                    }
                });
                break;

            case "4": // Delete
                rl.question("Enter index to delete (0-based): ", (index) => {
                    index = parseInt(index);
                    if (index >= 0 && index < arr.length) {
                        arr.splice(index, 1);
                        console.log("🗑️ Element deleted! Current Array:", arr);
                    } else {
                        console.log("❌ Invalid index!");
                    }
                    crudApp();
                });
                break;

            case "5": // Exit
                console.log("👋 Exiting program...");
                rl.close();
                break;

            default:
                console.log("❌ Invalid choice! Please try again.");
                crudApp();
        }
    });
}

// Start the program
crudApp();
