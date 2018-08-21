"use strict";
//mustache

var templateListItem = document.getElementById('template-list-item').innerHTML;
Mustache.parse(templateListItem);

var listItems='';

for(var i = 0; i < sliderData.length; i++){
	listItems += Mustache.render(templateListItem, sliderData[i]);
}

var results = document.getElementById('results');

results.insertAdjacentHTML('beforeend', listItems);

//carousel
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  hash: true
});

var buttonRestart = document.querySelector('.button');

buttonRestart.addEventListener( 'click', function( event ) {
  flkty.select( 0 );
});


var progressBar = document.querySelector('.progress-bar')

flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});


// map

// Initialize and add the map



window.initMap = function initMap() {

	var marker = [];
	var coordinations = sliderData[0].coords;

	var map = new google.maps.Map(
	document.getElementById('map'), {zoom: 4, center: coordinations});

	for(var i = 0; i < sliderData.length; i++){
		var coordinationsSlide = sliderData[i].coords;
		marker[i] = new google.maps.Marker({position: coordinationsSlide, map: map});
		addClickToMarker(marker[i], i);
	};


	function addClickToMarker(marker, index) {
		marker.addListener('click', function(){
			flkty.select(index);
		});
	}

	//change location on slide change

	flkty.on( 'change', function( index ) {
	  map.panTo(sliderData[index].coords);
	  map.setZoom(12);
	});


};




			
