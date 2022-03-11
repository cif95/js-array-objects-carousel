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



for (let i = 0 ; i < carousel.length ; i++){
	generateCarouselItem('div.my-carousel-images', '.my-thumbnails', carousel[i].image, carousel[i].title, carousel[i].text );
}


//creating dinamically a form group with a button that creates a new carousel element
document.getElementById('my-after-carousel').innerHTML =`
<div class="w-25 mx-auto">
	<div class="form-group">
		<label for="new-item-image">Enter image url</label>
		<input type="text" class="form-control" id="new-item-image" placeholder="Enter url..">
	</div>
	<div class="form-group">
		<label for="new-item-title">Enter title</label>
		<input type="text" class="form-control" id="new-item-title" placeholder="Enter title..">
	</div>
	<div class="form-group mb-4">
		<label for="new-item-text">Enter text</label>
		<input type="text" class="form-control" id="new-item-text" placeholder="Enter text..">
	</div>
	<button type="submit" class="add-carousel-item btn btn-outline-secondary">Create new item</button>
</div>
`;


let activeItem = 0;


const carouselElements = document.getElementsByClassName('carousel-current-item');
carouselElements[activeItem].classList.add('active');
const carouselThumbnailsElements = document.getElementsByClassName('carousel-thumbnails-item');


let sliderNextLoop;

setTimeout(function() {
	sliderNextLoop = setInterval ( slideNext, 2000, carouselElements, carouselThumbnailsElements, carousel);
}, 7000 );


document.querySelector('.my-next-hook').addEventListener ( 'click', function(){
	slideNext(carouselElements, carouselThumbnailsElements, carousel);
} );


document.querySelector('.my-prev-hook').addEventListener ( 'click', function() {
	slideBack(carouselElements, carouselThumbnailsElements, carousel);
});

// //creating dinamically a button that changes automated slider direction
// document.querySelector('.my-carousel-container').innerHTML += `<button class="reverse-slider btn btn-outline-secondary w-25 mx-auto rounded-pill mt-5">Reverse Slider Direction</button>`;


// document.querySelector('button.reverse-slider').addEventListener ( 'click', function(){
// 	clearInterval(sliderNextLoop);
// 	const	sliderBackLoop = setInterval ( slideBack, 1200, carouselElements, carouselThumbnailsElements, carousel);
// });



document.querySelector('button.add-carousel-item').addEventListener ( 'click', function(){
	const inputElements = document.querySelectorAll('input');
	const newCarouselItem = {
		image : document.getElementById('new-item-image').value,
		title : document.getElementById('new-item-title').value,
		text : document.getElementById('new-item-text').value
	};
	carousel.push(newCarouselItem);
	for ( let i = 0; i < inputElements.length; i++){
	inputElements[i].value = '';
	}
	generateCarouselItem('div.my-carousel-images', '.my-thumbnails', newCarouselItem.image, newCarouselItem.title, newCarouselItem.text );
});





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
	`<img class="carousel-thumbnails-item my-filter" src="${image}" alt="${title}">`;
}



// ! TO DO -> Create one function only
/**
 * function that slides carousel image to the next one
 * @param {*} carouselDOMElements dom elements of carousel
 * @param {*} thumbnailsDOMElements thumbnails dom elements of carousel
 * @param {*} itemsList list of carousel items
 */
function slideNext(carouselDOMElements, thumbnailsDOMElements, itemsList){
	carouselDOMElements[activeItem].classList.remove('active');
	thumbnailsDOMElements[activeItem].classList.add('my-filter');
	if ( activeItem === itemsList.length - 1 ){
		activeItem = 0;
	} else {
		activeItem++;
	}
	carouselDOMElements[activeItem].classList.add('active');
	thumbnailsDOMElements[activeItem].classList.remove('my-filter');
};

/**
 * function that slides carousel image to the previous one
 * @param {*} carouselDOMElements dom elements of carousel
 * @param {*} thumbnailsDOMElements thumbnails dom elements of carousel
 * @param {*} itemsList list of carousel items
 */
function slideBack(carouselDOMElements,thumbnailsDOMElements, itemsList){
	carouselDOMElements[activeItem].classList.remove('active');
	if ( activeItem === 0 ){
		activeItem = itemsList.length - 1;
	} else {
		activeItem--;
	}
	thumbnailsDOMElements[activeItem].classList.add('my-filter');
	carouselDOMElements[activeItem].classList.add('active');
	thumbnailsDOMElements[activeItem].classList.remove('my-filter');
};