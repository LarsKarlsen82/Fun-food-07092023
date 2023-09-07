
let searchMode = "none";

// DOM elements for function --------------------------------------------------------

const myResultElement = document.getElementById("myResult");

const myFirstLetterInput = document.getElementById("firstLetterInput");
const myFirstLetterSearchButton = document.getElementById("firstLetterSearch");

myFirstLetterSearchButton.addEventListener("click", () => {
  searchMode = "firstLetterSearch";
  console.info(myFirstLetterInput.value);
  getRecipesByFirstLetter(myFirstLetterInput.value);
});

const myNameInput = document.getElementById("nameInput");
const myNameSearchButton = document.getElementById("nameSearch");

myNameSearchButton.addEventListener("click", () => {
  searchMode = "nameSearch";
  console.info(myNameInput.value);
  getRecipesByName(myNameInput.value);
});

const myIdInput = document.getElementById("idInput");
const myIdSearchButton = document.getElementById("idSearch");

myIdSearchButton.addEventListener("click", () => {
  searchMode = "idSearch";
  console.info(myIdInput.value);
});

//-------------------------------------------------------------------------------------

// Fetch functions --------------------------------------------------------------------

function getRecipesByName(myName) {
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${myName}`;

  fetch(apiUrl)
    .then((response) => {
      // Error check
      if (!response.ok) {
        throw Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setupResultView(data);
    })
    .catch((error) => {
      searchMode = 'error';
      console.log('Error:', error);
      setupResultView(error);
    });
}

function getRecipesByFirstLetter(myData) {
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${myData}`;

  fetch(apiUrl)
    .then((response) => {
      // Error check
      if (!response.ok) {
        throw Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setupResultView(data);
    })
    .catch((error) => {
      searchMode = 'error';
      console.log('Error:', error);
      setupResultView(error);
    });
}

function idSearch(idMeal) {
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;

  fetch(apiUrl)
    .then((response) => {
      // Error check
      if (!response.ok) {
        throw Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setupResultView(data);
    })
    .catch((error) => {
      searchMode = 'error';
      console.log('Error:', error);
      setupResultView(error);
    });
}




// View code --------------------------------------------------------------------------

function setupResultView(myData) {
  switch (searchMode) {
    case "firstLetterSearch":
      console.log(myData.meals);
      let myFoodNameArray = [];

      if (myData.meals) {
        myData.meals.forEach((myMeal) => {
          myFoodNameArray.push(myMeal.strMeal);
        });
      } else {
        myFoodNameArray.push("No meals found.");
      }

      // Display the array as a list within the article element
      const listElement = document.createElement("ul");
      myFoodNameArray.forEach((mealName) => {
        const listItem = document.createElement("li");
        listItem.textContent = mealName;
        listElement.appendChild(listItem);
      });

      myResultElement.innerHTML = ""; // Clear previous content
      myResultElement.appendChild(listElement);
      break;



    case "nameSearch":
      console.log(myData.meals);
      let myText = "";

      if (myData.meals) {
          const myMealList = document.createElement("ul"); // Create a new unordered list
          myData.meals.forEach((myMeal) => {
            // Check if the meal name (strMeal) is not empty or null
            if (myMeal.strMeal) {
              // Create a container div for each meal with a border
              const listItemContainer = document.createElement("div");
              listItemContainer.style.border = "1px solid #ccc";
              listItemContainer.style.padding = "5px";
              listItemContainer.style.margin = "5px";

            // Create an anchor element with the strYoutube URL as the href
            const youtubeLink = document.createElement("a");
            youtubeLink.href = myMeal.strYoutube;
            youtubeLink.textContent = myMeal.strMeal; // Display the meal name as the link text
            youtubeLink.target = "_blank"; // Open the link in a new tab

            listItemContainer.appendChild(youtubeLink); // Append the link to the container
            myMealList.appendChild(listItemContainer); // Append the container to the list
      }
    });

        myResultElement.innerHTML = ""; // Clear previous content
        myResultElement.appendChild(myMealList); // Append the list to the result element
      } else {
        myText = "No meals found.";
        myResultElement.textContent = myText;
      }
     break;
    
      // case "idSearch":
      //   console.log(idMeal);
      //   let myFoodId = "";
  
      //   if (idMeal.myFoodId) {
      //     idMeal.forEach((myFoodId) => {
      //       myFoodId += myMeal.strMeal + ", ";
      //     });
      //   } else {
      //     myFoodId = "No ID";
      //   }
      //   break;
      case "idSearch":
        console.log(myData.meals);
        let myFoodId = "";
      
        if (myData.meals) {
          const meal = myData.meals[0]; // Assuming there's only one meal in the response
          if (meal) {
            myFoodId = `Meal ID: ${meal.idMeal}`;
          } else {
            myFoodId = "No ID";
          }
        } else {
          myFoodId = "No meals found.";
        }
        break;

    case "error":
      console.log(myData);
      // Do view stuff with the error message here
      break;


    default:
      console.warn("Oops, no data to show from setupResultView");
      break;
  }
}