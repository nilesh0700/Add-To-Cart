import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-5ac74-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputFieldEl();

    // addItemToShoppingListEl(inputValue);
    
    

    
})
// the onValye() function is triggered when there is any addition, updation and deletion in a realtime dataset
onValue(shoppingListInDB, function(snapshot){
    let snapValues = snapshot.val();
    let itemsArray = Object.entries(snapValues);// get both entries therefore used Object.entries() function

    clearShoppingListEl(); // clear the shopping list to avoid the duplication of the entries
    
    for(let i = 0; i < itemsArray.length; i++){

        let currentItem = itemsArray[i];
        let currentItemID = currentItem[0];
        let currentItemValue = currentItem[1];

        addItemToShoppingListEl(currentItem); // adding both id and value from database
    }
})

function clearInputFieldEl(){
    inputFieldEl.value = ""; 
}

function addItemToShoppingListEl(item){
    // shoppingListEl.innerHTML += `<li>${item}</li>`

    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");


    newEl.textContent = itemValue;

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        remove(exactLocationOfItemInDB);
    })

    shoppingListEl.append(newEl);
}

function clearShoppingListEl(){
    shoppingListEl.innerHTML = "";
}

