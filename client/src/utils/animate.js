export const animateValue = (start***REMOVED*** end***REMOVED*** duration***REMOVED*** obj***REMOVED*** attr***REMOVED*** suffix="") => {
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
    ***REMOVED***
***REMOVED******REMOVED*** stepTime);
};