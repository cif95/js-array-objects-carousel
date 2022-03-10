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

document.querySelector('.my-carousel-container').innerHTML += `<button class="reverse-slider btn btn-primary w-25 mx-auto rounded-pill mt-5">Reverse Slider Direction</button>`;

let activeItem = 0;

const carouselElements = document.getElementsByClassName('carousel-current-item');
carouselElements[activeItem].classList.add('active');

const carouselThumbnailsElements = document.getElementsByClassName('carousel-thumbnails-item');
carouselThumbnailsElements[activeItem].classList.remove('my-filter');
carouselThumbnailsElements[activeItem].classList.add('border', 'border-2');


let sliderLoop;

setTimeout(function() {
	sliderNextLoop = setInterval ( slideNext, 1500);
}, 7000 );


document.querySelector('.my-next-hook').addEventListener ( 'click', function(){
	slideNext();
} );


document.querySelector('.my-prev-hook').addEventListener ( 'click', function() {
	slideBack();
})

document.querySelector('button.reverse-slider').addEventListener ( 'click', function(){
	clearInterval(sliderNextLoop);
	const	sliderBackLoop = setInterval ( slideBack, 1500);
});



//function that slides carousel image to the next one
function slideNext(){
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
};

//function that slides carousel image to the previous one
function slideBack(){
	carouselElements[activeItem].classList.remove('active');
	carouselThumbnailsElements[activeItem].classList.remove('border', 'border-2');
	if ( activeItem === 0 ){
		activeItem = carousel.length - 1;
	} else {
		activeItem--;
	}
	carouselThumbnailsElements[activeItem].classList.add('my-filter');
	carouselElements[activeItem].classList.add('active');
	carouselThumbnailsElements[activeItem].classList.remove('my-filter');
	carouselThumbnailsElements[activeItem].classList.add('border', 'border-2');
};