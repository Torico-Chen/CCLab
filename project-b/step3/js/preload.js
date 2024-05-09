function preload() {
    spaceshipImg = loadImage('./images/ufo.jpg');
    backgroundImage = loadImage("./images/solarbg.jpg"); // Add your background image URL here
    planetImgs = [
        'plan_dark.png',
        'plan_purple.png',
        'plan_orange.png',
        'plan_white.png',
        'plan_light_forms2.png'
    ].map(url => loadImage(url));
}
