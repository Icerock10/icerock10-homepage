const bindArrowEvents = () => {
    const arrows = document.querySelectorAll('.navigation-arrow, .arrow-up');
    arrows.forEach(addArrowClickEventListener)
}
const addArrowClickEventListener = (arrow) => {
    arrow.addEventListener('click', _ => {
        const isTopScrolling = arrow.className.includes('arrow-up') ? 0 : document.body.scrollHeight
        window.scrollTo(0, isTopScrolling)
    });
}

const handleIntersection = (entries) => {
    entries.forEach(toggleActiveClassOnIntersection);
}

const toggleActiveClassOnIntersection = (entry) => {
    const sidebar = document.querySelector('.profile-sidebar');
    const profileAvatar = document.querySelector('.profile-avatar');
    const profileName = document.querySelector('.profile-name');
    const isViewportWidthFits = window.innerWidth > 1200;

    if (isViewportWidthFits && entry.isIntersecting) {
        updateActiveClass(true, sidebar, profileAvatar, profileName);
        return;
    }
    updateActiveClass(false, sidebar, profileAvatar, profileName);
}

const updateActiveClass = (isAdd, ...elements) => {
    elements.forEach(element => isAdd ? element.classList.add('active') : element.classList.remove('active'));
}

const observeProfileTimeline = () => {
    const timeline = document.querySelector('.profile-timeline');
    observer.observe(timeline);
}

const observer = new IntersectionObserver(handleIntersection);

window.addEventListener('resize', () => {
    observer.disconnect();
    observeProfileTimeline();
});

observeProfileTimeline();
bindArrowEvents()