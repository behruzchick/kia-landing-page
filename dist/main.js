let spans = document.querySelectorAll('.sp');
let cars = [
    {
        title:"Новый Seltos",
        price:"369 900 000",
        img: "https://cdn.kia-motors.uz/uploads/articles/1857/article-original.png"
    },
    {
        title:"Cerato",
        price:"299 900 000",
        img: "https://cdn.kia-motors.uz/uploads/articles/1643/article-original.png"
    },
    {
        title:"Sorento",
        price:"534 900 000",
        img: "https://cdn.kia-motors.uz/uploads/articles/1114/article-original.png"
    },
    {
        title:"Sportage",
        price:"389 900 000",
        img: "https://cdn.kia-motors.uz/uploads/articles/1576/article-original.png"
    },
    {
        title:"EV6",
        price:"699 900 000",
        img: "https://cdn.kia-motors.uz/uploads/articles/1852/article-original.png"
    },
    {
        title:"K5",
        price:"339 900 000",
        img: "https://cdn.kia-motors.uz/uploads/articles/978/article-original.png"
    },
    {
        title:"Stinger",
        price:"770 900 000",
        img: "https://cdn.kia-motors.uz/uploads/articles/1126/article-original.png"
    },
    {
        title:"Carnival",
        price:"770 900 000",
        img: "https://cdn.kia-motors.uz/uploads/articles/1143/article-original.png"
    },
    {
        title:"K8",
        price:"684 900 000",
        img: "https://cdn.kia-motors.uz/uploads/articles/1399/article-original.png"
    },
    {
        title:"Bongo",
        price:"254 900 000",
        img: "https://cdn.kia-motors.uz/uploads/articles/1818/article-original.png"
    }
]
let carDiv = document.querySelector('.car_cont');
spans.forEach(function(btn){
    btn.addEventListener('click', (e)=> {
        // btn.classList.toggle('active')
        let DATAid = e.currentTarget.dataset.id;
        let CarFILTER = cars.filter(type => type.title === DATAid );
            let map = CarFILTER.map((p1)=>{
                return `
                 <div class="car_img">
                     <a href="#">
                         <img class="img_car" src="${p1.img}" alt>
                     </a>
                 </div>
                 <div class="car_info">
                     <h2>${p1.title}</h2> 
                     <p>от ${p1.price} сум</p>
                 </div>
                `
            })
            map = map.join("");
            carDiv.innerHTML = map;
    })
})

// if(window.matchMedia('max-width:800px')){
//     let section = document.querySelector('.hero_section');
//     let video = document.querySelector('video');
//     // video.style = 'display:none;'
//     let imgResponsive = document.querySelector('.img_responsive');
//     imgResponsive.style = 'display:block;'
// }else{
//     video.style = 'display:block;'
//     imgResponsive.style = 'display:none;'
// }


// Get the left and right buttons and carousel blocks
let Leftbtn = document.querySelector('.item_media_btn_left');
let Rightbtn = document.querySelector('.item_media_btn_right');
let blocksContainer = document.querySelector('.item_media_video_carusel');
let carouselItems = document.querySelectorAll('.item_media_carusel_video_block');

// Calculate the total width of all carousel items
let totalWidth = 0;
carouselItems.forEach(item => {
  totalWidth += item.offsetWidth;
});

// Clone the carousel items and append them to both ends
let clonedItems = [];
carouselItems.forEach(item => {
  let clone = item.cloneNode(true);
  clonedItems.push(clone);
});

clonedItems.forEach(clone => {
  blocksContainer.appendChild(clone);
});

blocksContainer.prepend(...clonedItems.reverse());

// Function to slide carousel blocks
function slideCarousel(direction) {
  let scrollAmount = 900; // Adjust this value to control the slide distance

  let currentPosition = blocksContainer.scrollLeft;
  let newPosition;


  if(window.matchMedia('max-width:600px')){
    scrollAmount = 300;
  }

  if (direction === 'left') {
    newPosition = currentPosition - scrollAmount;
  } else if (direction === 'right') {
    newPosition = currentPosition + scrollAmount;
  } else {
    return; // If direction is neither left nor right, exit the function
  }

  // Check if reached the end of the carousel
  if (newPosition < 0) {
    newPosition = totalWidth - blocksContainer.offsetWidth;
  } else if (newPosition >= totalWidth) {
    newPosition = 0;
  }

  blocksContainer.scrollTo({
    left: newPosition,
    behavior: 'smooth'
  });
}

// Event listeners for left and right button clicks
Leftbtn.addEventListener('click', () => {
  slideCarousel('left');
});

Rightbtn.addEventListener('click', () => {
  slideCarousel('right');
});

const tl = gsap.timeline();
//HEADER
tl.fromTo(".first_row", {x:-300, opacity:0}, {x:0,opacity:1,duration:1})
tl.fromTo(".second_row", {x:300, opacity:0}, {x:0,opacity:1,duration:1})
tl.fromTo('.logo_container', {y:-300, opacity:0}, {y:0, duration:0.9, opacity:1})
// HERO 
tl.fromTo(".first_title-hero", {x:-300, opacity:0}, {x:0,opacity:1,duration:1})
tl.fromTo(".second_title-hero", {x:-300, opacity:0}, {x:0,opacity:1,duration:1.2})
tl.fromTo(".link_hero", {y:-50, opacity:0}, {y:0,opacity:1,duration:1.4})



