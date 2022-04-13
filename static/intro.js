const text = document.getElementById('text');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

const dots = document.querySelectorAll("span.dot");
let slide = 0;
let textContent = ['This will take about 20 minutes', '19 tones of different pitches will be played', 'Honest answers are appreciated']


btn1.addEventListener("click", () => {
    if (slide < 2) {
        slide += 1;
    }
    setSlider(slide);
})
btn2.addEventListener("click", () => {
    if (slide > 0) {
        slide -= 1;
    }
    setSlider(slide);
})


function setSlider(slide) {
    console.log(slide)

    // set dot colors
    dots.forEach((dot, idx) => {
        if (idx === slide) {
            dot.classList.add('dot-active')
        } else {
            dot.classList.remove('dot-active')
        }
    });

    // set text
    text.textContent = textContent[slide]

    // check slide value
    if (slide === 0) {
        btn1.textContent = "Continue";
        btn2.classList.add('d-none');
    } else if (slide === 2) {
        btn1.textContent = "Start";
    } else {
        btn1.textContent = "Ok";
        btn2.classList.remove('d-none');
    }

}
