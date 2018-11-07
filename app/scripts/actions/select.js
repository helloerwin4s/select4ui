export default config => {
    
    const $ = config.opt.prototype;

    const remove = (target) => {
        for (let item of target) {
            if($.hasClass(item, 'is-active')) $.removeClass(item, 'is-active')
        }
    }

    const closeAllDropdown = ((config) => {
        let opt = config.opt;
        let target = document.getElementsByClassName(opt.prefix);

        window.addEventListener('click', e => remove(target));

        window.addEventListener('keyup', e => {
            if (e.keyCode == 27) remove(target);
        })

    })(config);
    
    const openDropdown = trigger => {
        trigger.addEventListener('click', e => {
            e.stopPropagation();
            let $this = e.target;
            $.toggleClass($this.parentElement, 'is-active');
        })
    }

    const selectItem = (el, items) => {
        for (let item of items) {
            item.addEventListener('click', e => {
                let id = e.target.id;
                let data = id.split('-');
                let value = data[data.length-1]; 
                let array = [];
                let target = e.target.parentElement.parentElement;
                let elValue = target.querySelector('div');
                
                elValue.innerText = e.target.innerText;
                array.push(target);
                el.value = value;

                $.removeClass(elValue, 'is-placeholder');
                selectedItem(e.target, e.target.parentElement);
                remove(array);
            })
        }
    }

    const selectedItem = (el, items) => {
        for (let item of items.querySelectorAll('div')) {
            $.removeClass(item, 'is-selected');
        }

        $.addClass(el, 'is-selected');
    }


    const init = ((config) => {
        let el = config.el;
        let opt = config.opt;
        let id = config.id;
        
        let trigger = document.getElementById(id);
        let item = trigger.querySelectorAll(`.${opt.prefix}--item`); 
        openDropdown(trigger);
        selectItem(el, item);
        
    })(config);
}