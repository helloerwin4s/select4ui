export default (config, val) => {

    const $ = config.opt.prototype;

    const setPlaceholder = (el, id, opt) => {
        let text = el.getAttribute(`${opt.attr}-placeholder`);
        let status = text != null ? true : false;
        let value = status ? '' : el.value;
        let classname = 'is-placeholder';

        return { 
            status: status, 
            classname: classname,
            placeholderText: text,
            value: value
        }
    };

    const setDefaultValue = el => {
        for(let item of el.options) {
            if (item.selected) {
                return {
                    value: item.textContent
                }
            }
        }
    }

    const setValue = (el, id, opt) => {
        let val = setPlaceholder(el, id, opt);
        let wrapper = document.getElementById(id);
        let target = wrapper.querySelector(`.${opt.prefix}--value`);
        
        if(val.status) {
            $.addClass(target, val.classname);
            return {
                value: val.value,
                text: val.placeholderText,
            }
        }else {
            return {
                value: val.value,
                text: setDefaultValue(el).value,
            }
        }
    }
    
    return (config => {
        let el = config.el;
        let opt = config.opt;
        let id = config.id;

        let ss = setValue(el, id, opt);

        return setValue(el, id, opt);
    })(config);
}