const Hangul = require('hangul-js');

const getConsonantFilter = (inputList, inputField, keyword) => {
    return Hangul.isConsonantAll(keyword) ?
        inputList.filter(item => {
            let consonant = Hangul.d(item[inputField], true);
            consonant = consonant.map(item => item[0]).join('');
            return consonant.includes(keyword);
        }) : inputList;
};

const getConsonantFilterByList = (inputList, inputField, keyword) => {
    return Hangul.isConsonantAll(keyword) ?
        inputList.map(item => {
            return item.filter(item1 => {
                    let consonant = Hangul.d(item1, true);
                    consonant = consonant.map(item => item[0]).join('');
                    return consonant.includes(keyword)
                }
            ).join(';');
        })
        : inputList;
};
// const inputList = [{"ag_name": "기업1"}, {"ag_name": "나다1"}];
// const field = "ag_name";
// const result = getConsonantFilter(inputList, field, "ㄴ");
// console.log(result);

const isConsonantAll = (word) => {
    return Hangul.isConsonantAll(word);
}

module.exports = {
    getConsonantFilter,
    getConsonantFilterByList,
    isConsonantAll,
}


