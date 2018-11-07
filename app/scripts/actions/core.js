import store from './store';
import value from './value';
import select from './select';
import lib from './../lib/lib';

// Get element
export default (classname, options) => {

    const opt = (options => {
        let configDefault = {
            prefix: 'fs-select', // String
            attr: 'aria', // String
            arrowIcon: '<div class="fs-select--arrow"><div>', // String
            searchIcon: '', // String
            closeIcon: '', // String

            // config
            filter: false, // Boolean
            reset: false,
            grouping: false,
            tags: false,
            multiple: false,
            avatar: false,
            limit: 5, // Limit item show on list dropdown

            // customize
            customItem: '',
            customTags: '',

            store: store, // store
            storeLimit: 10, // limit show option
            value: value,
            select: select,
            prototype: lib,
        };

        if (options != undefined) {
            let opt = Object.assign(configDefault, options);
            return opt
        } else {
            return configDefault
        }

    })(options);

    // GenerateID
    const generateID = () => { return Math.random().toString(36).substr(2, 9) };

    // CreateElement
    const createWrapper = (config) => { return `<div id=${config.id} class=${config.opt.prefix}></div>`};

    const createValue = (opt) => { return `<div class=${opt.prefix}--value></div>`};

    const createLists = (opt) => { return `<div class=${opt.prefix}--list></div>` };

    const createItem = (config, list) => { 
        let opt = config.opt;
        let data = opt.store(config.el, opt);
        let placeholder = config.el.getAttribute(`${opt.attr}-placeholder`);
        let statusPlaceholder = placeholder != null ? true : false;
        for(let item of data) {
            if(item.selected && !statusPlaceholder) {
                let html = `<div id='${config.opt.prefix}-${generateID()}-${item.value}' class='${config.opt.prefix}--item is-selected'>${item.text}</div>`;
                list.insertAdjacentHTML('beforeend', html);
            }else {
                let html = `<div id='${config.opt.prefix}-${generateID()}-${item.value}' class='${config.opt.prefix}--item'>${item.text}</div>`;
                list.insertAdjacentHTML('beforeend', html);
            }
        }

        setHeightList(config, list);
    };

    const createView = (config) => {
        let elm = document.getElementById(config.id);
        let htmlValue = createValue(config.opt);
        let htmlLists = createLists(config.opt);

        elm.insertAdjacentHTML('beforeend', htmlValue);
        elm.insertAdjacentHTML('beforeend', htmlLists);

        let list = elm.querySelector(`.${config.opt.prefix}--list`);
        let htmlItem = createItem(config, list);
        let htmlArrow = setArrow(config);
        elm.insertAdjacentHTML('beforeend', htmlArrow.arrow);

        let value = setValue(config);
        let target = elm.querySelector(`.${opt.prefix}--value`);
        target.innerText = value.text;
        config.el.value = value;

        let action = valueSelect(config);
    }

    // Value
    const setValue = (config) => opt.value(config);

    // Select 
    const valueSelect = (config) => opt.select(config);

    // Arrow
    const setArrow = (config) => {
        if(config.opt.arrowIcon.length > 0) {
            let arrow = config.opt.arrowIcon;
            let elm = config.el.querySelector(`.${config.opt.prefix}--value`);
            return { elm, arrow }
        }
    }

    // Height dropdown
    const setHeightList = (config, list) => {
        let item = list.children[0];
        let itemHeight = item.offsetHeight;
        list.style.maxHeight = itemHeight * config.opt.limit + 2 + 'px';
    }

    // Init
    const init = ((cl, opt) => {
        let el = document.querySelectorAll(cl);
        Array.prototype.forEach.call(el, function(el ,i) {
            let id = opt.prefix+'--'+generateID();

            let config = {el, id, opt}; // Use it for 
            
            let wrapper = createWrapper(config);
            
            el.insertAdjacentHTML('afterend', wrapper);
            el.style.display = 'none';
            createView(config);
        })
    })(classname, opt);
}