var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector(".card-body button");

var uppercaseList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowercaseList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var specialList = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];

function isValidPassword(password) {
  var isUpper = false;
  var isLower = false;
  var isSpecial = false;
  var isNumber = false;
  for (var i = 0; i < password.length; i++) {
    if (uppercaseList[0] <= password[i] <= uppercaseList[uppercaseList.length]){
      isUpper = true;
    } else if (lowercaseList[0] <= password[i] <= lowercaseList[lowercaseList.length]) {
      isLower = True;
    } else if (specialList[0] <= password[i] <= specialList[specialList.length]) {
      isSpecial = true;
    } else {
      isNumber = true;
    }
  } if (isUpper && isLower && isSpecial && isNumber) {
    return true
  } else {
    return false;
  }
}

function generatePassword() {
  let lowercase = document.querySelector("#lowercase").checked;
  let uppercase = document.querySelector("#uppercase").checked;
  let numeric = document.querySelector("#numeric").checked;
  let special = document.querySelector("#special").checked;
  let numElement = document.querySelector("#num_chars");
  let num = Number(numElement.value);
  let password = "";

  if ((num > numElement.max || num < numElement.min) || !(lowercase || uppercase || numeric || special)) {
    if (num > numElement.max || num < numElement.min) {
      document.querySelector(".warning_range").style.display="block";
    } else {
      document.querySelector(".warning_range").style.display="none";
    }
    if (!(lowercase || uppercase || numeric || special)) {
      document.querySelector(".warning_type").style.display="block";
    } else {
      document.querySelector(".warning_type").style.display="none";
    }
      return password;
  } 

  document.querySelector(".warning_range").style.display="none";
  document.querySelector(".warning_type").style.display="none";

  let type = [];

  if (uppercase) {
    type.push("uppercase");
  } 
  if (lowercase) {
    type.push("lowercase");
  }
  if (numeric) {
    type.push("numeric");
  }
  if (special) {
    type.push("special");
  }

  while(password.length < num) {

    var index = Math.floor(Math.random() * type.length);

    if (type[index] == "uppercase") {
      password += uppercaseList[Math.floor(Math.random() * uppercaseList.length)];
    } 
    else if (type[index] == "lowercase") {
      password += lowercaseList[Math.floor(Math.random() * lowercaseList.length)];
    } 
    else if (type[index] == "numeric") { 
      password += [Math.floor(Math.random() * 10)];
    } 
    else if (type[index] == "special") {
      password += specialList[Math.floor(Math.random() * specialList.length)];
    } 
  } return password;

}
// Write password to the #password input
function writePassword() {

  var passwordText = document.querySelector("#password");

  var password = generatePassword();

  if (isValidPassword(password)){
    return password;
  } else {
    password = generatePassword();
  }

  passwordText.value = password;

}

// courtesy of W3schools :D
function copyText() {
  /* Get the text field */
  var copyText = document.querySelector("#password");

  if (copyText.value == "") return;

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  document.querySelector(".copy_msg").style.display = "inline";

  setTimeout(hideCopyMsg, 1000);
}

function hideCopyMsg() {
  document.querySelector(".copy_msg").style.display = "none";
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copyText)

