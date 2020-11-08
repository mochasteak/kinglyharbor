    // Animate the coins
    let coinTimeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 250
    });

    coinTimeline
        .add({
            targets: `#coins`,
            scale: 2,
            opacity: 0
        })
        .add({
            targets: `#coins`,
            scale: 2,
            opacity: 0
        })
        .add({
            targets: `#coins`,
            scale: 2,
            opacity: 0
        })
        .add({
            targets: `#coins`,
            scale: 2,
            opacity: 0
        });

function coins() {
    console.log('invoking coins');
    return coinTimeline;
}