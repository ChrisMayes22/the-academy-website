// Declare elements
const els = {
    menu: document.getElementById('menu'),
    toggleView: document.getElementById('toggleView'),
    bannerImage: document.getElementById('bannerImage')
}

// Setup and implement expanding menu button (mobile view only)
const clickHandlers = {
    addActive: function(){
        els.toggleView.className += " active";
        this.className += " active";
        this.removeEventListener("click", clickHandlers.addActive);
        this.addEventListener("click", clickHandlers.removeActive);
    },
    removeActive: function(){
        els.toggleView.className = "";
        this.className = this.className.replace(/ active/, "");
        this.removeEventListener("click", clickHandlers.removeActive);
        this.addEventListener("click", clickHandlers.addActive);
    }
}

els.menu.addEventListener("click", clickHandlers.addActive);

// Setup & implement rotating banner image
function Counter(cb){
    let i = 0;
    this.getIncrement = () => i;
    this.increment = () => i++;
    this.reset = () => {
        i = 0;
    }
    this.cb = cb;
}

const imageCycler = new Counter(function(arr){
    const i = this.getIncrement();
    if(i < arr.length-1) this.increment()
    else this.reset();
    return function(){
        els.bannerImage.className = els.bannerImage.className.replace(/\d/, (i+''));
    }
})

const timers = {
    imageTimer: function(){
        const timerPromise = new Promise(function(resolve, err){
            setTimeout(function() {
                resolve(imageCycler.cb([0,1,2]));
              }, 10000)
            }).then(function(cycle){
                cycle();
                timers.imageTimer();
            })
            .catch(() => console.log('imageTimer error'));
        return timerPromise;
    }
}
timers.imageTimer();
