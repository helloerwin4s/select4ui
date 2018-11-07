export default (el, opt) => {
    
    const dataStore = ((el, opt) => {
        if(el.length > 0) {
            let data = el.options;
            let val = [];
            let limit = opt.storeLimit;
            for(let item of data) {
                const items = {
                    text: item.textContent,
                    value: item.value,
                    selected: item.selected
                }
                if(val.length < limit) val.push(items);
            }
            return val;
        }else {
            return console.log(`Data is null`);
        }
    })(el, opt);

    return dataStore;
    
}