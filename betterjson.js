dict = require('./cedict.json');
const fs = require('fs');

const newDict = [];
const map = {};

function updateEntry(entry, type){
    const character = entry[type];
    const pinyin = entry.pinyin;
    if (map[character] !== undefined) {
        if (!map[character].pinyin.includes(pinyin)){
            map[character].pinyin += " " + pinyin;
            map[character].definitions[pinyin] = entry.definitions;
            if (character === "为") {
                console.log(map[character].definitions);
                console.log(entry.definitions);
            }
            map[character].duoyin = true;
        }
    } else {
        map[character] = {};
        Object.assign(map[character], entry);
        const definitions = {};
        definitions[pinyin] = entry.definitions;
        map[character].definitions = definitions;

        map[character].duoyin = false;
    }
}

for (entry of dict) {
    entry.pinyin = number2ToneMark(entry.pinyin);
    if (entry.traditional.length === 1) {
        updateEntry(entry, "simplified");
        updateEntry(entry, "traditional");
    }
}

fs.writeFile('new_dict.json', JSON.stringify(map), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
  }); 

function number2ToneMark(car) {
    car = car.toLowerCase();
    car = car.replace("a5", "a");
    car = car.replace("e5", "e");
    car = car.replace("i5", "i");
    car = car.replace("o5", "o");
    car = car.replace("u5", "u");
    car = car.replace("ü5", "ü");

    car = car.replace("a1", "ā");
    car = car.replace("a2", "á");
    car = car.replace("a3", "ǎ");
    car = car.replace("a4", "à");
    car = car.replace("e1", "ē");
    car = car.replace("e2", "é");
    car = car.replace("e3", "ě");
    car = car.replace("e4", "è");
    car = car.replace("i1", "ī");
    car = car.replace("i2", "í");
    car = car.replace("i3", "ǐ");
    car = car.replace("i4", "ì");
    car = car.replace("o1", "ō");
    car = car.replace("o2", "ó");
    car = car.replace("o3", "ǒ");
    car = car.replace("o4", "ò");
    car = car.replace("u1", "ū");
    car = car.replace("u2", "ú");
    car = car.replace("u3", "ǔ");
    car = car.replace("u4", "ù");
    car = car.replace("ü1", "ǖ");
    car = car.replace("ü2", "ǘ");
    car = car.replace("ü3", "ǚ");
    car = car.replace("ü4", "ǜ");
    car = car.replace("an1", "ān");
    car = car.replace("an2", "án");
    car = car.replace("an3", "ǎn");
    car = car.replace("an4", "àn");
    car = car.replace("ang1", "āng");
    car = car.replace("ang2", "áng");
    car = car.replace("ang3", "ǎng");
    car = car.replace("ang4", "àng");
    car = car.replace("en1", "ēn");
    car = car.replace("en2", "én");
    car = car.replace("en3", "ěn");
    car = car.replace("en4", "èn");
    car = car.replace("eng1", "ēng");
    car = car.replace("eng2", "éng");
    car = car.replace("eng3", "ěng");
    car = car.replace("eng4", "èng");
    car = car.replace("in1", "īn");
    car = car.replace("in2", "ín");
    car = car.replace("in3", "ǐn");
    car = car.replace("in4", "ìn");
    car = car.replace("ing1", "īng");
    car = car.replace("ing2", "íng");
    car = car.replace("ing3", "ǐng");
    car = car.replace("ing4", "ìng");
    car = car.replace("ong1", "ōng");
    car = car.replace("ong2", "óng");
    car = car.replace("ong3", "ǒng");
    car = car.replace("ong4", "òng");
    car = car.replace("un1", "ūn");
    car = car.replace("un2", "ún");
    car = car.replace("un3", "ǔn");
    car = car.replace("un4", "ùn");
    car = car.replace("er2", "ér");
    car = car.replace("er3", "ěr");
    car = car.replace("er4", "èr");
    car = car.replace("aō", "āo");
    car = car.replace("aó", "áo");
    car = car.replace("aǒ", "ǎo");
    car = car.replace("aò", "ào");
    car = car.replace("oū", "ōu");
    car = car.replace("oú", "óu");
    car = car.replace("oǔ", "ǒu");
    car = car.replace("où", "òu");
    car = car.replace("aī", "āi");
    car = car.replace("aí", "ái");
    car = car.replace("aǐ", "ǎi");
    car = car.replace("aì", "ài");
    car = car.replace("eī", "ēi");
    car = car.replace("eí", "éi");
    car = car.replace("eǐ", "ěi");
    car = car.replace("eì", "èi");
    return car;
}

