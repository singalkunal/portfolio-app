export const animateValue = (start, end, duration, obj, attr, suffix="") => {
    // const progress = progressRef.current;
    // if(!progress) return;

    if(!obj) return;
    
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));

    var timer = setInterval(function() {
        current += increment;

        obj[attr] = current + suffix;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
};