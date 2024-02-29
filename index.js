import dict from './new_dict.json' assert { type: "json" };

const cpm = document.getElementById("cpm");
const buttons = document.getElementById("buttons");
const characters = document.getElementById("characters");
const output = document.getElementById("output");
const characterInput = document.getElementById("character_input");
const pinyinInput = document.getElementById("pinyin_input");
const analyzeButton = document.getElementById("analyze");

analyzeButton.addEventListener("click", () => {console.log("clicked"); analyze();});

function analyze() {
    console.log(dict);
    // get the text from google translate 
    const characterInputText = characterInput.value;
    const pinyinInputText = pinyinInput.value;
    console.log(characterInputText);

    const pinyinArray = pinyinInputText.split(" ");

    let pinyinCounter = 0;
    let characterCounter = 0;
    big: while(pinyinCounter < pinyinArray.length) {
        const character = characterInputText[characterCounter];
        let pinyin = pinyinArray[pinyinCounter];
        console.log(pinyin);
        if (checkPinyin(pinyin, dict[character])) {
            updateOutput(pinyin, character, " ");
            pinyinCounter++;
            characterCounter++;
        } else {
            const yins = dict[character].pinyin.split();
            output.innerHTML += " ";
            small: while (true) {
                if (!pinyin.match(/^[a-zA-Z]+$/)) {
                    characterCounter += pinyin.length;
                    pinyinCounter++;
                    output.innerHTML += pinyin;
                    continue big;
                }
                for (const yin of yins) {
                    if (pinyin.toLowerCase().includes(yin)){
                        updateOutput(yin, character, "");
                        break small;
                    }
                }
            }
            pinyinCounter++;
            
            
        }


    }
}

// see if string has characters
// string.match(/[\u3400-\u9FBF]/);

function checkPinyin(pinyin, character) {
    return pinyin === dict[character].pinyin;
}

async function updateOutput(pinyin, character, space) {
    if (dict[character].duoyin === false) {
        output.innerHTML += pinyin + space;
    } else {
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
            await promise;
            return;
        }
    }
}