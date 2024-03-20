import dict from './new_dict.json' assert { type: "json" };

const cpm = document.getElementById("cpm");
const buttons = document.getElementById("buttons");
const characters = document.getElementById("characters");
const output = document.getElementById("output");
const characterInput = document.getElementById("character_input");
const pinyinInput = document.getElementById("pinyin_input");
const analyzeButton = document.getElementById("analyze");

analyzeButton.addEventListener("click", () => {console.log("clicked"); analyze();});

let errorText = "";
let characterCounter = 0;

async function analyze() {
    errorText = ""
    console.log(dict);
    // get the text from google translate 
    // const characterInputText = characterInput.value;
    // const pinyinInputText = pinyinInput.value;

    const characterInputText =  "耶穌基督後期聖徒教會中的多重婚姻";
    const pinyinInputText = "Yēsū jīdū hòuqí shèngtú jiàohuì zhōng de duōchónghūnyīn";


    console.log(characterInputText);

    let pinyinCounter = 0;
    characterCounter = 0;
    let counter = 0;
    while(counter < 100) {
        counter++;
        const character = characterInputText[characterCounter];
        const entry = dict[character];
        const pinyin = pinyinInputText.slice(pinyinCounter, pinyinCounter + 10);
        console.log("character:" + character + ": pinyin:" + pinyin + ":");
        // if (!character.match(/[\u3400-\u9FBF]/)) {
        //     console.log("skipping");
        //     characterCounter++;
        //     pinyinCounter++;
        //     output.innerHTML += character;
        // }
        if (" ,.\n".includes(pinyin[0])) {
            console.log("skipping");
            pinyinCounter++;
            updateOutput(pinyin[0], false);
            continue;
        }
        if (entry.duoyin) {
            console.log("duoyin");
            const yins = entry.pinyin.split(" ");
            for (const yin of yins) {
                if (pinyin.toLowerCase().startsWith(yin)) {
                    let promise = new Promise()
                    for (const yin in dict[character].pinyin.split()) {
                        const button = document.createElement("button");
                        button.innerHTML = yin;
                        buttons.appendChild(button);
                        let promise = new Promise(() => {
                            button.addEventListener("click", () => {
                                output.innerHTML += yin + space;
                                buttons.innerHTML = "";
                                resolve()
                            });
                        });
                        
                    }
                    await promise;
                    let text = yin;
                    if (pinyin[0].match(/[A-Z]/)){
                        text = capitalizeFirst(text);
                    }
                    updateOutput(text, true);
                    pinyinCounter += text.length;
                    continue;
                }
            }
        } else {
            console.log("yiyin");
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
    output.innerHTML += errorText + text;
    if (errorText !== "" || iterateCharacter) {
        console.log("iterating");
        characterCounter ++;
    }
    errorText = "";
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