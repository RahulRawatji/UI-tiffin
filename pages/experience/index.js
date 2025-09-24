import { gsap } from "gsap";
import Lenis from "lenis";

let lenis;

const gallery = {
    element: document.querySelector('.gallery'),

    grid:document.querySelectorAll('.gallery_grid'),
    links:document.querySelectorAll('.gallery_grid_link'),
    index: document.querySelector('.gallery_grid_col_index'),

    nav:document.querySelector('.gallery_nav_list'),
    navList:document.querySelectorAll('.gallery_nav_list_item')
}


const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

const initPage = () => {
    gsap.defaults({duration:1.5,ease:'expo.inOut'});
    // get the height of the single grid
    const galleryGridHeight = gallery.grid[0].getBoundingClientRect().height;
    // Calculate 100vh(viewport height) - 45vh(padding top) = 55vh;
    gsap.set(gallery.element,{
        paddingBottom : `calc(55vh - ${galleryGridHeight/ rootFontSize}`
    });

    gsap.set(gallery.links,{ yPercent: 120});
    gsap.to(gallery.links,{yPercent:0, stagger:0.032});
};

const initLenis = () => {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll',animateScrollBar);

    function raf(time){
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf)
};

const animateScrollBar = ({scroll, limit}) => {
    const percentage = (scroll / limit) * 100;
    const scrollBar = document.querySelector('.scrollbar');
    scrollBar.style.height = `${percentage}%`;

};

const handleScroll = (index) =>{
    console.log(Array.from(gallery.grid))
    console.log(index)
    const sectionOffsets = Array.from(gallery.grid).map((section) => {
        
        return {
                    top: section.getBoundingClientRect().top - window.scrollY
            }
    });

    const target = sectionOffsets[index].top - (gallery.grid[0].getBoundingClientRect().top - window.scrollY);
    console.log(target)
    lenis.scrollTo(target,{lerp:0.2});
};

gallery.navList.forEach((item,index)=>{
    item.addEventListener('click',()=>handleScroll(index));
})

window.addEventListener("DOMContentLoaded",()=>{
    initPage();
    initLenis();
    lenis.scrollTo(0);
})