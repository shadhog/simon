$(window).load(function(){
	var colors = ['red', 'yellow', 'green', 'blue'],
		simon = [],
		user = [],
		time = 1500,
		/*green = $('.green'),
		red = $('.red'),
		yellow = $('.yellow'),
		blue = $('.blue'),*/
		game = $('#game'),
		buttons = $('.button'),
		currentClick,
		clicksSum;
	
	// First Level - Game Start:
	step();
	
	function step() {
		clicksSum = 0;
		user = [];
		userClickStatus(false);
		addColor();
		blinkAll();
	};

	
	function userClicked() {		
		currentClick = $(this).attr('data-color');
		if(isItCurrect()) {
			clicksSum++;
			user.push(currentClick);
			// console.log('user.length: ' + user.length);
			// console.log('simon.length: ' + simon.length);
			if(user.length == simon.length) {
				// Next Level
				step();
			}
			else console.log('diffrent');
		}
		else {
			console.error('You Are Wrong!');
			userClickStatus(false);
			game.fadeOut();
			$('h1').html('You Are Wrong! Your Score is: ' + ((simon.length)-1) );
		}
		
	};
	
	function isItCurrect() {
		if(currentClick == simon[clicksSum]) return true;
		else false;
	};
	
	function blinkAll() {
		console.warn('Simon\'s Turn:');
		$.each(simon, function(i, val) { 
			setTimeout(function() { 
				console.log(val);
				blink(val);
				if(i+1==simon.length) {
					userClickStatus(true);
				}
			}, 1000 + i * 1000); 
		});
	};

	
	function blink(color) {
		game.find('.' + color).addClass('active');
		setTimeout(function() { 
			game.find('.' + color).removeClass('active');
		}, 300);
	};
	
	function addColor() {
		simon.push(randomColor());
	};
	
	function randomColor() {
		return colors[(Math.floor(Math.random() * 4))];
	};
	
	function userClickStatus(status) {
		if(status) { // Enable Click
			game.on('click', '.button', userClicked);
			game.addClass('enable');
			console.warn('User Trun:');
		}
		else { // Disable Click
			game.off('click', '.button', userClicked);
			game.removeClass('enable');
		}
	};
	

	
});


