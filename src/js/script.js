function query(elem) {
    return document.querySelector(elem);
}

function debounce(func) {
    var wait = 10;
    var immediate = true;
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function changeClassOnScroll() {
    const location = window.pageYOffset || document.body.scrollTop;
    const nav = document.querySelector('nav');
    const arrowUp = document.querySelector('.arrow-up');
    
    if (location < 80) {
        nav.classList.remove('nav__scroll');
        arrowUp.classList.remove('arrow-up--visible');
    } else {
        nav.classList.add('nav__scroll');
        arrowUp.classList.add('arrow-up--visible');
    }
}

function removeClassFromSibling(selector, className) {
    const siblingsLinks = document.querySelectorAll(selector);
    [].forEach.call(siblingsLinks, function(sibling){
        sibling.removeAttribute("class" , className);
    })
}

function switchActiveLink() {
    const offsetTop = window.pageYOffset || document.body.scrollTop;
    const links = document.querySelectorAll('.nav__menu-bar a');
    [].forEach.call(links, function(link) {
        let sectionOffset = document.querySelector(link.hash).offsetTop - 150;            
        if (sectionOffset <= offsetTop ) {
            removeClassFromSibling('.nav__menu-bar li', 'active');
            link.parentElement.setAttribute('class', 'active');
        } else {
            link.parentElement.removeAttribute('class');
        }
    })
}

function handleScroll() {
    changeClassOnScroll();
    switchActiveLink();
}

window.addEventListener('scroll', debounce(handleScroll));

query('.nav__toggle').addEventListener('click', function(){
    query('.nav__toggle').classList.toggle('open'),
    query('.nav__menu-bar').classList.toggle('collapse'),
    query('body').classList.toggle('menu-opened');
});

const aLinks = document.querySelectorAll('.nav__menu-bar li a, .nav__logo a')
Array.prototype.slice.call(aLinks).forEach(function(link) {
    link.addEventListener('click', function() {
        query('.nav__menu-bar').classList.remove('collapse'),
        query('.nav__toggle').classList.remove('open'),
        query('body').classList.remove('menu-opened');
    })
});

const scroll = new SmoothScroll();

const smoothScrollWithoutHash = function (selector, settings) {
	/**
	 * If smooth scroll element clicked, animate scroll
	 */
	const clickHandler = function (event) {
		let toggle = event.target.closest( selector );
		console.log(toggle);
		if ( !toggle || toggle.tagName.toLowerCase() !== 'a' ) return;
		console.log(toggle.hash);
		let anchor = document.querySelector( toggle.hash );
		if ( !anchor ) return;

		event.preventDefault(); // Prevent default click event
		scroll.animateScroll( anchor, toggle, settings || {} ); // Animate scroll
	};

	window.addEventListener('click', clickHandler, false );
};

// Run our function
smoothScrollWithoutHash( 'a[href*="#"]', {
    speed: 1000,
    offset: 100
} );
