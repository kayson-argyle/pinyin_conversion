import dict from './new_dict.json' assert { type: "json" };


let characterInputText;
let pinyinInputText;

const cpm = document.getElementById("cpm");
const buttons = document.getElementById("buttons");
const characters = document.getElementById("characters");
const output = document.getElementById("output");
const characterInput = document.getElementById("character_input");
const pinyinInput = document.getElementById("pinyin_input");
const analyzeButton = document.getElementById("analyze");
const textInput = document.getElementById("text");
const finalTextOutput = document.getElementById("finalText");

analyzeButton.addEventListener("click", () => {
    analyze();
    const d = new Date();
    startTime = d.getTime();
});


let errorText = "";
let characterCounter = 0;
let pinyinCounter = 0;
let startTime;
let finalText = "";


fetch("characters.txt")
  .then((res) => res.text())
  .then((text) => {
    characterInputText = text.replace(/[^\p{L}\d]/gu, '').replace(/[0-9]/g, '');
   })
  .catch((e) => console.error(e));

fetch("pinyin.txt")
  .then((res) => res.text())
  .then((text) => {
    pinyinInputText = text;
   })
  .catch((e) => console.error(e));


async function makeButtons(pinyin, yins, character, pinyinCounter) {
    for (const yin of yins) {
        // need to add else statement here
        if (pinyin.toLowerCase().startsWith(yin)) {
            console.log("making buttons")
            characters.innerHTML = characterInputText.substring(characterCounter - 20, characterCounter) + "<span style='color:red;'>" + characterInputText.substring(characterCounter, characterCounter + 1) + "</span>" + characterInputText.substring(characterCounter + 1, characterCounter + 20);
            var promiseResolve, promiseReject;

            var promise = new Promise(function(resolve, reject){
                promiseResolve = resolve;
                promiseReject = reject;
            });
            let index = 0;
            for (const yin of dict[character].pinyin.split(" ")) {
                const div = document.createElement("div");
                const definition = document.createElement("div");
                definition.className = ("definition");
                definition.innerHTML = dict[character].definitions[yin];
                const button = document.createElement("button");
                button.innerHTML = yin;
                button.className = ("button static");
                div.appendChild(button);
                div.appendChild(definition);
                buttons.appendChild(div);
                button.addEventListener("click", () => {
                    buttons.innerHTML = "";
                    output.scrollLeft = output.scrollWidth;
                    const d = new Date();
                    const elapsed = d.getTime() - startTime;
                    cpm.innerHTML = characterCounter / elapsed * 60000;
                    promiseResolve(yin);
                }) 
                index++;
            }
            let text = await promise;
            if (pinyin[0].match(/[A-Z]/)){
                text = capitalizeFirst(text);
            }
            updateOutput(text, true);
            pinyinCounter += text.length;
            return pinyinCounter;
        }
    }
}

async function analyze() {
    errorText = ""
    // get the text from google translate 
    // const characterInputText = characterInput.value;
    // const pinyinInputText = pinyinInput.value;




    textInput.innerHTML = "";
    textInput.id = ""
    pinyinCounter = 0;
    characterCounter = 0;
    let counter = 0;
    while(true) {
        counter++;
        const character = characterInputText[characterCounter];
        const entry = dict[character];
        const pinyin = pinyinInputText.slice(pinyinCounter, pinyinCounter + 10);
        console.log("character: '" + character + "'  pinyin:" + pinyin + ":");

        if (character === " "){
            console.log("its a space")
        }
            

        if (" , .\n\t\r1234567890".includes(pinyin[0])) {
            pinyinCounter++;
            updateOutput(pinyin[0], false);
            continue;
        }
        if (entry.duoyin) {
            const yins = entry.pinyin.split(" ");
            pinyinCounter = await makeButtons(pinyin, yins, character, pinyinCounter)
            continue;
        } else {
            if (pinyin.toLowerCase().startsWith(entry.pinyin)) {
                let text = entry.pinyin;
                if (pinyin[0].match(/[A-Z]/)){
                    text = capitalizeFirst(text);
                }
                updateOutput(text, true);
                pinyinCounter += text.length;
                continue;
            }
            console.log("error");
            errorText += pinyin[0];
            pinyinCounter++;
        }

    }

 //   const pinyinArray = pinyinInputText.split(" ");

}

function updateOutput(text, iterateCharacter) {
    finalText += errorText + text;
    displayOutput(finalText)
    if (errorText !== "" || iterateCharacter) {
        characterCounter ++;
    }
    errorText = "";
}

function displayOutput(text) {
    output.innerHTML = text.substring(text.length - 60, text.length);
    finalTextOutput.innerHTML = text;
}

function capitalizeFirst(word) {
    const first = word[0].toUpperCase();
    const remaining = word.slice(1);
    return first + remaining;
}

//     let pinyinCounter = 0;
//     let characterCounter = 0;
//     big: while(pinyinCounter < pinyinArray.length) {
//         const character = characterInputText[characterCounter];
//         let pinyin = pinyinArray[pinyinCounter];
//         console.log(pinyin);
//         if (checkPinyin(pinyin, dict[character])) {
//             updateOutput(pinyin, character, " ");
//             pinyinCounter++;
//             characterCounter++;
//         } else {
//             const yins = dict[character].pinyin.split();
//             output.innerHTML += " ";
//             small: while (true) {
//                 if (!pinyin.match(/^[a-zA-Z]+$/)) {
//                     characterCounter += pinyin.length;
//                     pinyinCounter++;
//                     output.innerHTML += pinyin;
//                     continue big;
//                 }
//                 for (const yin of yins) {
//                     if (pinyin.toLowerCase().includes(yin)){
//                         updateOutput(yin, character, "");
//                         break small;
//                     }
//                 }
//             }
//             pinyinCounter++;
            
            
//         }


//     }
// }

// // see if string has characters
// // string.match(/[\u3400-\u9FBF]/);

// function checkPinyin(pinyin, character) {
//     return pinyin === dict[character].pinyin;
// }

// async function updateOutput(pinyin, character, space) {
//     if (dict[character].duoyin === false) {
//         output.innerHTML += pinyin + space;
//     } else {
//         for (const yin in dict[character].pinyin.split()) {
//             const button = document.createElement("button");
//             button.innerHTML = yin;
//             buttons.appendChild(button);
//             let promise = new Promise(() => {
//                 button.addEventListener("click", () => {
//                     output.innerHTML += yin + space;
//                     buttons.innerHTML = "";
//                     resolve()
//                 });
//             });
//             await promise;
//             return;
//         }
//     }
// }