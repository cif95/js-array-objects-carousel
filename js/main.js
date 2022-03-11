/**
 *
 *
 *
Riprendiamo l'esercizio carosello e rifacciamolo, questa volta usando gli oggetti, prendendo come riferimento il codice scritto oggi insieme a lezione, che troverete direttamente nella mia repository di github a questo link: [link github]

Modifichiamo il codice dell'esercizio per renderlo funzionante con un array di oggetti al posto dei tre array separati, con una sola regola: non è possibile modificare l'HTML ma solamente JS e CSS.
Ricordiamo sempre l'importanza dell'integrità del dato.

Bonus 1:
Sperimentiamo attraverso l'uso delle timing functions anche una funzionalità di scorrimento al nostro carosello:
al click di un bottone o già dall'inizio possiamo far partire, ad intervalli di tempo a piacere, lo scorrimento delle immagini disponibili nel carosello stesso.

Bonus 2:
E se volessi un bottone per invertire la "direzione" del carosello?

 *
 */

const carousel = [
	{
		image: "https://picsum.photos/775/540?random=1",
		title: 'Lorem Ipsum',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus perferendis est fugiat animi veniam, corrupti quaerat velit temporibus dolore soluta, corporis ullam magni',
	},
	{
		image: "https://picsum.photos/775/540?random=2",
		title: 'Lorem Ipsum',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus perferendis est fugiat animi veniam, corrupti quaerat velit temporibus dolore soluta, corporis ullam magni',
	},
	{
		image: "https://picsum.photos/775/540?random=3",
		title: 'Lorem Ipsum',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus perferendis est fugiat animi veniam, corrupti quaerat velit temporibus dolore soluta, corporis ullam magni',
	},
	{
		image: "https://picsum.photos/775/540?random=4",
		title: 'Lorem Ipsum',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus perferendis est fugiat animi veniam, corrupti quaerat velit temporibus dolore soluta, corporis ullam magni',
	},
	{
		image: "https://picsum.photos/775/540?random=5",
		title: 'Lorem Ipsum',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus perferendis est fugiat animi veniam, corrupti quaerat velit temporibus dolore soluta, corporis ullam magni',
	}
];

// creating dinamically carousel items and thumbnails
for (let i = 0 ; i < carousel.length ; i++){
	generateCarouselItem('div.my-carousel-images', '.my-thumbnails', carousel[i].image, carousel[i].title, carousel[i].text );
}


//creating dinamically a button to reverse automatic slide direction, 
//a form group with input text 
// and a button that creates a new carousel element from input values
document.getElementById('my-before-carousel').innerHTML =`
<button class="reverse-slider btn btn-outline-secondary mx-auto">Reverse Slider Direction</button>`;

let activeItem = 0;
let isSlideNext = true;

const carouselElements = document.getElementsByClassName('carousel-current-item');
carouselElements[activeItem].classList.add('active');
const carouselThumbnailsElements = document.getElementsByClassName('carousel-thumbnails-item');
carouselThumbnailsElements[activeItem].classList.add('active');

// setting an automatic carousel slide that starts after 4s
setTimeout(function(){
	let autoSlide = setInterval(function(){
		if (isSlideNext) {
			document.querySelector('.my-next-hook').click();
		}
		else {
			document.querySelector('.my-prev-hook').click();
		}
		}, 2000);
}, 4000);


// carousel slides onwards on click of right arrow icon 
document.querySelector('.my-next-hook').addEventListener ( 'click', function(){
	slideNext(carouselElements, carouselThumbnailsElements, carousel);
} );

// carousel slides backwards on click of right arrow icon 
document.querySelector('.my-prev-hook').addEventListener ( 'click', function() {
	slideBack(carouselElements, carouselThumbnailsElements, carousel);
});

// carousel automatically slides in the opposite direction when button reverse is clicked
document.querySelector('.reverse-slider').addEventListener('click', function(){
	isSlideNext = !isSlideNext;
})



// ! functions below !
/**
 * function that generates a new carousel item
 * @param {*} carouselParentSelector carousel items parent dom element query selector
 * @param {*} thumbsParentSelector thumbnails items parent dom element query selector
 * @param {*} image new carousel item image
 * @param {*} title new carousel title
 * @param {*} text new carousel text
 */
function generateCarouselItem(carouselParentSelector, thumbsParentSelector, image, title, text){
	document.querySelector(carouselParentSelector).innerHTML += 
	`<figure class="carousel-current-item position-relative">
		<img src="${image}" alt="${title}">
		<figcaption id="carusel-info" class="position-absolute bottom-0 end-0 text-white text-end p-5">
		<h2>${title}</h2>
		<p>${text}</p>
		</figcaption>
	</figure>`
	document.querySelector(thumbsParentSelector).innerHTML += 
	`<img class="carousel-thumbnails-item" src="${image}" alt="${title}">`;
}


/**
 * function that slides carousel image to the next one
 * @param {*} carouselDOMElements dom elements of carousel
 * @param {*} thumbnailsDOMElements thumbnails dom elements of carousel
 * @param {*} itemsList list of carousel items
 */
function slideNext(carouselDOMElements, thumbnailsDOMElements, itemsList){
	carouselDOMElements[activeItem].classList.remove('active');
	thumbnailsDOMElements[activeItem].classList.remove('active');
	if ( activeItem === itemsList.length - 1 ){
		activeItem = 0;
	} else {
		activeItem++;
	}
	carouselDOMElements[activeItem].classList.add('active');
	thumbnailsDOMElements[activeItem].classList.add('active');
};

/**
 * function that slides carousel image to the previous one
 * @param {*} carouselDOMElements dom elements of carousel
 * @param {*} thumbnailsDOMElements thumbnails dom elements of carousel
 * @param {*} itemsList list of carousel items
 */
function slideBack(carouselDOMElements,thumbnailsDOMElements, itemsList){
	carouselDOMElements[activeItem].classList.remove('active');
	thumbnailsDOMElements[activeItem].classList.remove('active');
	if ( activeItem === 0 ){
		activeItem = itemsList.length - 1;
	} else {
		activeItem--;
	}
	carouselDOMElements[activeItem].classList.add('active');
	thumbnailsDOMElements[activeItem].classList.add('active');
};
