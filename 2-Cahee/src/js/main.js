var containerNavbar = document.getElementsByClassName('container-navbar')[0];
var navLink = document.getElementsByClassName('nav-link');
var freshLife = document.getElementById('fresh-life');
var about = document.getElementById('about');
var services = document.getElementById('services');
var gallery = document.getElementById('gallery');
var subscribe = document.getElementById('subscribe');
var blog = document.getElementById('blog');
var contact = document.getElementById('contact');

window.addEventListener('load', function () {
    removeActiveBar();
    screenDetection();
});
window.addEventListener('resize', function () {
    screenDetection();
});
window.addEventListener('scroll', function () {
    removeActiveBar();
    screenDetection();
});

for (var i = 0; i < navLink.length; i++) {
    navLink[i].addEventListener('click', function () {
        setActiveBar(this);
        screenDetection();
    });
}

///////////////////FUNCTIONS///////////////////

var screenDetection = function () {
    var rectFreshLife = freshLife.getBoundingClientRect();
    var rectAbout = about.getBoundingClientRect();
    var rectServices = services.getBoundingClientRect();
    var rectGallery = gallery.getBoundingClientRect();
    var rectSubscribe = subscribe.getBoundingClientRect();
    var rectBlog = blog.getBoundingClientRect();
    var rectContact = contact.getBoundingClientRect();


    if (window.scrollY === 0 && window.innerWidth >= 992) {
        windowScroll(0,'bg_start');
    }
    else if (rectAbout.top > 101) {
        windowScroll(0,'bg_fresh_life');
    }
    else if (rectServices.top > 101) {
        windowScroll(1,'bg_about');
    }
    else if (rectGallery.top > 101) {
        windowScroll(2,'bg_services');
    }
    else if (rectSubscribe.top > 101) {
        windowScroll(3,'bg_gallery');
    }
    else if (rectBlog.top > 101) {
        windowScroll(4,'bg_subscribe');
    }
    else if (rectContact.top > 101) {
        windowScroll(5,'bg_blog');
    }
    else {
        windowScroll(6,'bg_contact');
    }
};

function windowScroll(index,section) {
    containerNavbar.removeAttribute('id');
    containerNavbar.setAttribute('id', section);
    navLink[index].setAttribute('id', 'active');
}

var setActiveBar = function (section) {
    for (let j = 0; j < navLink.length; j++) {
        navLink[j].removeAttribute('id');
    }
};
var removeActiveBar = function () {
    for (let j = 0; j < navLink.length; j++) {
        navLink[j].removeAttribute('id');
    }
};

////////////////smooth scrolling////////////////

(function() // Code in a function to create an isolate scope
{
var speed = 600;
var moving_frequency = 15; // Affects performance !
var links = document.getElementsByTagName('a');
var href;
for(var i=0; i<links.length; i++)
{   
    href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
    if(href !== null && href.length > 1 && href.substr(0, 1) == '#')
    {
        links[i].onclick = function()
        {
            var element;
            var href = this.attributes.href.nodeValue.toString();
            if(element = document.getElementById(href.substr(1)))
            {
                var hop_count = speed/moving_frequency
                var getScrollTopDocumentAtBegin = getScrollTopDocument();
                var gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;

                for(var i = 1; i <= hop_count; i++)
                {
                    (function()
                    {
                        var hop_top_position = gap*i;
                        setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency*i);
                    })();
                }
            }

            return false;
        };
    }
}

var getScrollTopElement =  function (e)
{
    var top = -100;

    while (e.offsetParent != undefined && e.offsetParent != null)
    {
        top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
        e = e.offsetParent;
    }

    return top;
};

var getScrollTopDocument = function()
{
    return document.documentElement.scrollTop + document.body.scrollTop;
};
})();
