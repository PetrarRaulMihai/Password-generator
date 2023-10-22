
let uppers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //26 elements
let lowers = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; // 26 elements
let numbers = [0,1,2,3,4,5,6,7,8,9]; // 10 elements
let symbols = ['!','”','#','$','%','&','(',')','*','+','-','.','/',':',';','<','=','>','?','@','[',']','^','_','`','{','|','}','.','~']; // 30 elements
let fullArray = [uppers, lowers, numbers, symbols]


let mainArray = [];

let form = document.querySelector('form');
let inputFields = form.getElementsByTagName('input');

let range = document.querySelector('#rangeOfPassword'); // input range
let showLength = document.querySelector('#show-length'); // output range
let display = document.querySelector('#display');
let displayButton = document.querySelector('#get-result-button');
let copyPasswordButton = document.querySelector('#copy-password');
let displayPassword = document.querySelector('#display-password');

let blockSoft = document.querySelector('#soft');
let blockWeak = document.querySelector('#weak');
let blockMedium = document.querySelector('#medium');
let blockStrong = document.querySelector('#strong');

let checkCount = 0;

// displays slider range value
range.addEventListener('input' , () => {
  let value = range.value;
    showLength.textContent = value;
})

// works the same
// range.oninput = (() => {
//     let value = range.value;
//     showLength.textContent = value;    
// });

// Build mainArray after user choose what to contain 
const checked = () =>{  
   for(let i = 0; i < inputFields.length; i++){
        if(inputFields[i].checked === true){
            mainArray = mainArray.concat(fullArray[i]);
            checkCount++;
        }
   }
   console.log(checkCount);
}

let setDifficulty = () => {
  let levelClasses = [blockSoft, blockWeak, blockMedium, blockStrong];
  let strengthInfo = document.querySelector('#strength-info');
  
  // Remove all level classes from div blocks indicators
  levelClasses.forEach((block) => {
    block.classList.remove('level-class');
  });

  // Determine level classe based on checkCount and range value
  if (checkCount >= 1 && checkCount <= 4) {
    let levelsToApply = checkCount - 1; // works without -1 also but is more accuratr the difficulty indicator
    if (range.value > 20) {
      levelsToApply = Math.min(levelsToApply, 3);
    } 
    else if (range.value > 15) {
      levelsToApply = Math.min(levelsToApply, 2);
    } 
    else if (range.value > 5) {
      levelsToApply = Math.min(levelsToApply, 1);
    }
    else if(range.value < 5){
      levelsToApply = Math.min(levelsToApply, 0);
    }
    
    // Add level classes based on levelsToApply
    for (let i = 0; i <= levelsToApply; i++) {
      levelClasses[i].classList.add('level-class');      
    }

    if(levelsToApply === 0){
      strengthInfo.textContent = 'Soft'
    }
    else if(levelsToApply === 1){
      strengthInfo.textContent = 'Weak'
    }
    else if(levelsToApply === 2){
      strengthInfo.textContent = 'Medium'
    }
    else{
      strengthInfo.textContent = 'Strong'
    }
  }
}

let clearAllChecks = () => {   
   for(let i = 0; i < inputFields.length; i++){
        if(inputFields[i].checked === true){            
            inputFields[i].checked = false;
        }
   }    
}

let generatePassword = () => {
    if(range.value < 1){
        alert('Please set a range for your password');
        displayPassword.textContent = 'Password';        
    }else if(mainArray.length === 0){
        alert('Please check unleast one option');
        displayPassword.textContent = 'Password';
    }
    else{
        let password = ''; 
        for(let i = 0; i < range.value; i++){
            let randomise = mainArray[Math.floor(Math.random() * mainArray.length)];
            password += randomise;              
        }   
        displayPassword.value = password;           
    }         
}

let copyPassword = () => {
  // displayPassword.select();
  navigator.clipboard.writeText(displayPassword.value);
}


copyPasswordButton.addEventListener('click', copyPassword)


displayButton.addEventListener('click', ()=>{  
  copyPassword();  
    checked();
    clearAllChecks(); 
    setDifficulty();        
    generatePassword();    

    // reset values and mainArray
    range.value = 0;    
    showLength.textContent = 0;    
    mainArray = [];  
    checkCount = 0;
    strengthInfo.textContent = '';
       
})


