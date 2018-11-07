const hasClass = (el, className) => {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

const addClass = (el, className, callback) => {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
    if (callback){
        callback();
    }
}

const removeClass = (el, className, callback) => {
    if(el){
        if (el.classList) el.classList.remove(className);
        else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
    }
    if (callback){
      callback();
    }
}

const toggleClass = (el, className, callback) => {
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        let classes = el.className.split(' ');
        let existingIndex = classes.indexOf(className);
        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);
            el.className = classes.join(' ');
    }
    if (callback){
        callback();
    }
  }

export default { 
    hasClass, 
    addClass, 
    removeClass,
    toggleClass
}