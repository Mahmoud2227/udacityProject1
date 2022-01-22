/**
 * Define Global Variables
 *
 */

const navBarList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const header = document.querySelector(".page__header");
const fragment = new DocumentFragment();
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// get the positon of the section
function sectionPositon(element) {
    let sectionPos = element.getBoundingClientRect();
    return sectionPos;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// create a listItem for every section made in the website
function createListItem() {
    for (let section of sections) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a class="menu__link">${section.getAttribute("data-nav")}</a>`;
        fragment.appendChild(listItem);
    }
    navBarList.appendChild(fragment)
}

// Add class 'your-active-class' to section when near top of viewport
function toggleSectionClass ()
{
    const links = document.querySelectorAll(".navbar__menu .menu__link")
    sections.forEach((section) => {
        if (sectionPositon(section).top >= 0 && sectionPositon(section).top < section.offsetHeight - 100) {
            // sections.forEach((sec) => sec.removeAttribute("class"));
            section.classList.add( "your-active-class" );
            links.forEach( ( link ) =>
            {
                if ( link.textContent === section.getAttribute("data-nav") )
                {
                    link.classList.add("activeLink")
                }
                else
                    link.classList.remove("activeLink")
            })
        }
        else
            section.classList.remove("your-active-class");
    } );
}

// Scroll to anchor ID using scrollTO event
function scrollToSection() {
    header.addEventListener("click", function (event) {
        event.preventDefault();
        sections.forEach((section) => {
            if (event.target.textContent === section.getAttribute("data-nav")) {
                window.scrollTo({
                    top: section.offsetTop-100,
                    left: 0,
                    behavior: "smooth",
                });
            }
        });
    });
}

// Hide the header when the user isn't scrolling
function NoScrollHideNav() {
    window.addEventListener("scroll", function () {
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function () {
            // Run the callback
            header.classList.add("hidden");
        }, 5000);
        header.classList.remove("hidden");
    });
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener("DOMContentLoaded", createListItem())
// Scroll to section on link click
scrollToSection();
// Set sections as active
document.addEventListener("scroll", toggleSectionClass);
// Hide the header on no scroll
NoScrollHideNav();

console.log(document.querySelectorAll(".navbar__menu .menu__link"))
