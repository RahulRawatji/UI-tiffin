import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(SplitText);

    const container = document.querySelector('.container');
    const navToggle = document.querySelector('.nav-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuContent = document.querySelector('.menu-content');
    const menuImage = document.querySelectorAll('.menu-img');
    const menuLinkWrapper = document.querySelector('.menu-links-wrapper');
    const linkHighlighter = document.querySelector('.link-highlighter');

    let currentX = 0;
    let targetX = 0;
    const lerpFactor = 0.05;

    let currentHighlighterX = 0;
    let targetHighlighterX = 0;
    let currentHighlighterWidth = 0;
    let targetHighlighterWidth = 0;

    let isMenuOpen = false;
    let isMenuAnimating = false;

    const menuLinks = document.querySelectorAll('.menu-links a');
    menuLinks.forEach(link => {
        const chars = link.querySelectorAll('span');
        chars.forEach((char, charIndex) => {
            const split = new SplitText(char, { type: 'chars' });
            split.chars.forEach((char) => {
                char.classList.add('char');
            });
            if (charIndex === 1) {
                gsap.set(split.chars, { y: '110%' });
            }
        });
    });

    gsap.set(menuContent, { y: "50%", opacity: 0.25 });
    gsap.set(menuImage, { scale: 0.5, opacity: 0.25 });
    gsap.set(menuLinks, { y: "150%" });
    gsap.set(linkHighlighter, { y: "150%" });

    const defaultLinkText = document.querySelector('.menu-links:first-child a span');

    if (defaultLinkText) {
        const linkWidth = defaultLinkText.offsetWidth;
        linkHighlighter.style.width = `${linkWidth}px`;
        currentHighlighterWidth = linkWidth;
        targetHighlighterWidth = linkWidth;

        const defaultLinkTextElement = document.querySelector('.menu-links:first-child');

        const linkRect = defaultLinkTextElement.getBoundingClientRect();
        const menuWrapperReact = menuLinkWrapper.getBoundingClientRect();
        const initialX = linkRect.left - menuWrapperReact.left;

        currentHighlighterX = initialX;
        targetHighlighterX = initialX;
    }

    function toggleMenu() {
        if (isMenuAnimating) return;

        isMenuAnimating = true;

        if (!isMenuOpen) {
            gsap.to(container, {
                y: '-40%',
                opacity: 0.25,
                duration: 1.25,
                ease: 'expo.out'
            });

            gsap.to(menuOverlay, {
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                duration: 1.25,
                ease: 'expo.out',
                onComplete: () => {
                    gsap.set(container, { y: '40%' });
                    gsap.set('menu-links', { overflow: 'visible' });

                    isMenuOpen = true
                    isMenuAnimating = false;
                },
            });

            gsap.to(menuContent, {
                y: "0%",
                opacity: 1,
                duration: 1.5,
                ease: 'expo.out',
            });

            gsap.to(menuImage, {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: 'expo.out',
            });

            gsap.to(menuLinks, {
                y: "0%",
                duration: 1.5,
                stagger: 0.1,
                delay: 0.25,
                ease: 'expo.out',
            });

            gsap.to(linkHighlighter, {
                y: "0%",
                duration: 1,
                delay: 1,
                ease: 'expo.out',
            });

        } else {
            gsap.to(container, {
                y: '0%',
                opacity: 1,
                duration: 1.25,
                ease: 'expo.out'
            });

            gsap.to(menuLinks, {
                y: '-200%',
                duration: 1.25,
                ease: 'expo.out',
            });

            gsap.to(menuContent, {
                y: "-100%",
                opacity: 0.25,
                duration: 1.25,
                ease: 'expo.out',
            });

            gsap.to(menuImage, {
                y: "-100%",
                opacity: 0.5,
                duration: 1.25,
                ease: 'expo.out',
            });

            gsap.to(menuOverlay, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                duration: 1.25,
                ease: 'expo.out',
                onComplete: () => {
                    gsap.set(menuOverlay, {
                        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
                    });
                    gsap.set(menuLinks, { y: '150%' });
                    gsap.set(linkHighlighter, { y: "150%" });
                    gsap.set(menuContent, { y: "50%", opacity: 0.25 });
                    gsap.set(menuImage, { y: "0%", scale: 0.5, opacity: 0.25 });
                    gsap.set(".menu-links", { overflow: 'hidden' });
                    // check menu-links
                    gsap.set(menuLinkWrapper, { x: 0 });
                    currentX = 0;
                    targetX = 0;

                    isMenuOpen = false;
                    isMenuAnimating = false;
                }
            })
        }
    };

    navToggle.addEventListener('click', toggleMenu);

    const menuLinkContainers = document.querySelectorAll('.menu-links');
    
    menuLinkContainers.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            if (window.innerWidth < 1000) return;

            const linkCopy = link.querySelectorAll('a span');
            const visibleCopy = linkCopy[0];
            const animatedCopy = linkCopy[1];

            const visibleChars = visibleCopy.querySelectorAll('.char');
          
            gsap.to(visibleChars, {
                y: '-110%',
                stagger: 0.03,
                duration: 0.5,
                ease: 'expo.inOut',
            });

            const animatedChars = animatedCopy.querySelectorAll('.char');
            gsap.to(animatedChars, {
                y: '0%',
                stagger: 0.03,
                duration: 0.5,
                ease: 'expo.inOut',
            });

        });

        link.addEventListener('mouseleave', (e) => {
            if (window.innerWidth < 1000) return;

            const linkCopy = link.querySelectorAll('a span');
            const visibleCopy = linkCopy[0];
            const animatedCopy = linkCopy[1];
        
            const visibleChars = visibleCopy.querySelectorAll('.char');
            console.log(visibleChars)
            gsap.to(visibleChars, {
                y: '0%',
                stagger: 0.03,
                duration: 0.5,
                ease: 'expo.inOut',
            });

            const animatedChars = animatedCopy.querySelectorAll('.char');
            gsap.to(animatedChars, {
                y: '110%',
                duration: 0.5,
                stagger: 0.03,
                ease: 'expo.inOut',
            });
        })
    });

    menuOverlay.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 1000) return;

        const mouseX = e.clientX;
        const viewportWidth = window.innerWidth;
        const menuLinkWrapperWidth = menuLinkWrapper.offsetWidth;

        const maxMoveLeft = 0;
        const maxMoveRight = viewportWidth - menuLinkWrapperWidth;

        const senstivityRange = viewportWidth * 0.5;
        const startX = (viewportWidth - senstivityRange) / 2;
        const endX = startX + senstivityRange;

        let mousePercent;
        if (mouseX <= startX) {
            mousePercent = 0;
        } else if (mouseX >= endX) {
            mousePercent = 1;
        } else {
            mousePercent = (mouseX - startX) / senstivityRange;
        }

        targetX = maxMoveLeft + mousePercent * (maxMoveRight - maxMoveLeft) ;

    function animate() {
        console.log('animate');
        currentX += (targetX - currentX) * lerpFactor;
        currentHighlighterX += (targetHighlighterX - currentHighlighterX) * lerpFactor;
        currentHighlighterWidth += (targetHighlighterWidth - currentHighlighterWidth) * lerpFactor;

        gsap.to(menuLinkWrapper, {
            x: currentX,
            ease: 'power4.out',
            duration: 0.3,
        });

        gsap.to(linkHighlighter, {
            x: currentHighlighterX,
            width: currentHighlighterWidth,
            ease: 'power4.out',
            duration: 0.3,
        });
    }
    animate();
    });

   
         menuLinkContainers.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            if (window.innerWidth < 1000) return;

            const linkReact = link.getBoundingClientRect();
            const mentWrapperReact = menuLinkWrapper.getBoundingClientRect();

            targetHighlighterX = linkReact.left - mentWrapperReact.left;

            const linkCopyElement = link.querySelector('a span');
            targetHighlighterWidth = linkCopyElement
                ? linkCopyElement.offsetWidth
                : link.offsetWidth;
        });
    });

    menuLinkWrapper.addEventListener('mouseleave', (e) => {
        const defaultLinkTextElement = document.querySelector('.menu-links:first-child');
        const defaultLinkTextSpan = defaultLinkTextElement.querySelector('a span');

        const linkRect = defaultLinkTextElement.getBoundingClientRect();
        const menuWrapperReact = menuLinkWrapper.getBoundingClientRect();

        targetHighlighterX = linkRect.left - menuWrapperReact.left;
        targetHighlighterWidth = defaultLinkTextSpan.offsetWidth
    });

});


