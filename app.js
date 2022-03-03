"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchByTraits(people)
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}
function searchByTraits(people){
  let searchType = prompt("What would you like to search by? (eye color, gender, occupation, date of birth, height,or weight");


  switch(searchType){
    case 'eye color':
      let returnedInfo = searchByEyeColor(people);
      displayPeople(returnedInfo)
      return returnedInfo
      break;
      case 'gender':
        let genderInfo = searchByGender(people);
        displayPeople(genderInfo)
        return genderInfo
      break;
      case 'date of birth':
        let DOBInfo = searchByDOB(people);
        displayPeople(DOBInfo)
        return DOBInfo
      break;
      case 'occupation':
        let occupationInfo = searchByOccupation(people);
        displayPeople(occupationInfo)
        return occupationInfo
      break;
      case 'height':
        let heightInfo = searchByHeight(people);
        displayPeople(heightInfo)
        return heightInfo
      break;
      case 'weight':
        let weightInfo = searchByWeight(people);
        displayPeople(weightInfo)
        return weightInfo
      break;
}}
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      return (displayPerson(person));
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    return (findDescendants(person, people));
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson[0];
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", autoValid);
  let foundEyeColor = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  return foundEyeColor
}
//TODO: add other trait filter functions here.

function searchByGender(people){
  let gender = promptFor("What is the person's gender?", autoValid);

  let foundGender = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  return foundGender;
}

  function searchByHeight(people){
    let height = promptFor("What is the person's height?", autoValid);
    let num1 = parseInt(height)
    let foundHeight = people.filter(function(potentialMatch){
      if(potentialMatch.height === num1){
        return true;
      }
      else{
        return false;
      }
    })
    return foundHeight;
  }

  function searchByWeight(people){
    let weight= promptFor("What is the person's weight?", autoValid);
    let num2 = parseInt(weight)
    let foundWeight = people.filter(function(potentialMatch){
      if(potentialMatch.weight === num2){
        return true;
      }
      else{
        return false;
      }
    })
   
    return foundWeight;
  }

  function searchByDOB(people){
    let dob = promptFor("What is the person's date of birth?", autoValid);

    let foundDob = people.filter(function(potentialMatch){
      if(potentialMatch.dob === dob){
        return true;
      }
      else{
        return false;
      }
    })
    
    return foundDob;
  }

  function searchByOccupation(people){
    let occupation = promptFor("What does this person do for a living?", autoValid);
  
    let foundOccupation = people.filter(function(potentialMatch){
      if(potentialMatch.occupation === occupation){
        return true;
      }
      else{
        return false;
      }
    })
  
    return foundOccupation;
  }


  // TODO: find the person single person object using the name they entered.


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "\n" + "Select OK to go back to person or Cancel to start a new search"

  // alert(personInfo);
  let result = promptFor(personInfo, autoValid);
  return result
  
  // TODO: finish getting the rest of the information to display.
//#endregion
}


function findChildren(personWithDescedants, people){
  let foundDescendants = people.filter(function(potentialDescendant){
    if(potentialDescendant.parents.includes(personWithDescedants.id)){
      return true;
    }
    else{
      return false;
    }
  })
  return foundDescendants;
}
//personWithDescandant's id is in potentialDescant's parents array

function findDescendants(personWithDescedants, people){
  //find children
  let children = findChildren(personWithDescedants, people);
  return children;
  //find children of children

}


//Validation functions.
//functions to validate user input

//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. 
// true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or 
// is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endymion

// todo use potentialMatch.id compared to person.parents[0]