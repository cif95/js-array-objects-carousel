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
   document.querySelector('div.my-carousel-images').innerHTML += 
	`<figure class="carousel-current-item position-relative">
		<img src="${carousel[i].image}" alt="${carousel[i].title}">
		<figcaption id="carusel-info" class="position-absolute bottom-0 end-0 text-white text-end p-5">
		<h2>${carousel[i].title}</h2>
		<p>${carousel[i].text}</p>
		</figcaption>
	</figure>`
	document.querySelector('.my-thumbnails').innerHTML += 
	`<img class="carousel-thumbnails-item my-filter float-left" src="${carousel[i].image}" alt="${carousel[i].title}">`
}

document.querySelector('.my-carousel-container').innerHTML += `<button class="reverse-slider btn btn-primary w-25 mx-auto rounded-3 mt-5">Reverse Slider Direction</button>`;

let activeItem = 0;

const carouselElements = document.getElementsByClassName('carousel-current-item');
carouselElements[activeItem].classList.add('active');

const carouselThumbnailsElements = document.getElementsByClassName('carousel-thumbnails-item');
carouselThumbnailsElements[activeItem].classList.remove('my-filter');
carouselThumbnailsElements[activeItem].classList.add('border', 'border-2');


let sliderLoop;

setTimeout(function() {
	sliderLoop = setInterval ( function(){
	carouselElements[activeItem].classList.remove('active');
	carouselThumbnailsElements[activeItem].classList.add('my-filter');
	carouselThumbnailsElements[activeItem].classList.remove('border', 'border-2');
	if ( activeItem === carousel.length - 1 ){
		activeItem = 0;
	} else {
		activeItem++;
	}
	carouselElements[activeItem].classList.add('active');
	carouselThumbnailsElements[activeItem].classList.remove('my-filter');
	carouselThumbnailsElements[activeItem].classList.add('border', 'border-2');
	},1000)
}, 4000 );


document.querySelector('.my-next-hook').addEventListener ( 'click', slideNext( carouselElements, activeItem, carouselThumbnailsElements, carousel ));
	// carouselElements[activeItem].classList.remove('active');
	// carouselThumbnailsElements[activeItem].classList.add('my-filter');
	// carouselThumbnailsElements[activeItem].classList.remove('border', 'border-2');
	// if ( activeItem === carousel.length - 1 ){
	// 	activeItem = 0;
	// } else {
	// 	activeItem++;
	// }
	// carouselElements[activeItem].classList.add('active');
	// carouselThumbnailsElements[activeItem].classList.remove('my-filter');
	// carouselThumbnailsElements[activeItem].classList.add('border', 'border-2');
// );


document.querySelector('.my-prev-hook').addEventListener ( 'click', function() {
	carouselElements[activeItem].classList.remove('active');
	carouselThumbnailsElements[activeItem].classList.remove('border', 'border-2');
	decrementCarouselItemIndex(activeItem, carousel);
	// if ( activeItem === 0 ){
	// 	activeItem = carousel.length - 1;
	// } else {
	// 	activeItem--;
	// }
	carouselThumbnailsElements[activeItem].classList.add('my-filter');
	carouselElements[activeItem].classList.add('active');
	carouselThumbnailsElements[activeItem].classList.remove('my-filter');
	carouselThumbnailsElements[activeItem].classList.add('border', 'border-2');
})

// document.querySelector('button.reverse-slider').addEventListener ( 'click', function(){
// 	clearInterval(sliderLoop);
// 	setTimeout(function() {
// 		sliderLoop = setInterval ( function(){
// 			carouselElements[activeItem].classList.remove('active');
// 		carouselThumbnailsElements[activeItem].classList.add('my-filter');
// 		carouselThumbnailsElements[activeItem].classList.remove('border', 'border-2');
// 		if ( activeItem === carousel.length - 1 ){
// 			activeItem = 0;
// 		} else {
// 			activeItem--;
// 		}
// 		carouselElements[activeItem].classList.add('active');
// 		carouselThumbnailsElements[activeItem].classList.remove('my-filter');
// 		carouselThumbnailsElements[activeItem].classList.add('border', 'border-2');
// 		},1000)
// 	}, 1000 );
// })



function addClassToElementsWithAnIndex(domElementGroup, indexOfElements, classToAdd){
	domElementGroup[indexOfElements].classList.add(classToAdd);
}

function removeClassToElementsWithAnIndex(domElementGroup, indexOfElements, classToAdd){
	domElementGroup[indexOfElements].classList.remove('classToAdd');
}

function decrementCarouselItemIndex(itemIndex, itemList) {
	if ( itemIndex === 0 ){
		itemIndex = itemList.length - 1;
	} else {
		itemIndex--;
	}
}

function incrementCarouselItemIndex(itemIndex, itemList) {
	if ( itemIndex === 0 ){
		itemIndex = itemList.length - 1;
	} else {
		itemIndex++;
	}
}


/**
 * Function that slides to the next element of a list 
 * @param {*} elementsToSlide principal item to slide next
 * @param {*} indexOfCurrentElement index of item in a list
 * @param {*} thumbnailsToSlide thumbnails to slide next
 * @param {*} elementsList list of all items
 */
function slideNext(elementsToSlide, indexOfCurrentElement, thumbnailsToSlide, elementsList ){
	elementsToSlide[indexOfCurrentElement].classList.remove('active');
	thumbnailsToSlide[indexOfCurrentElement].classList.add('my-filter');
	thumbnailsToSlide[indexOfCurrentElement].classList.remove('border', 'border-2');
	if ( indexOfCurrentElement === elementsList.length - 1 ){
		indexOfCurrentElement = 0;
	} else {
		indexOfCurrentElement++;
	}
	elementsToSlide[indexOfCurrentElement].classList.add('active');
	thumbnailsToSlide[indexOfCurrentElement].classList.remove('my-filter');
	thumbnailsToSlide[indexOfCurrentElement].classList.add('border', 'border-2');
}