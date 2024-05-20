export const findWordData = (word, db) => {
    for(const key in db) {
        const list = db[key];
        const found = list.find((item) => item.text === word);
        
        if (found) return {
            wordData: found,
            유사표현List: list
        };
    }
    
    return { wordData: null, 유사표현List: [] }; 
};