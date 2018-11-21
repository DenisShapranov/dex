function getData() {
  return [
    {
      name: 'Ivan',
    },
    {
      name: 'Ivanka',
    },
    {
      name: 'Divan',
    },
    {
      name: 'Alex',
    },
    {
      name: 'Alexey',
    },
    {
      name: 'Taras',
    },
    {
      name: 'Bogdan',
    },
    {
      name: 'Danya',
    },
    {
      name: 'Nestar',
    },
    {
      name: 'Buffy',
    },
    {
      name: 'Vetal',
    },
    {
      name: 'Sveta',
    },
    {
      name: 'Garry',
    },
     {
      name: 'Kate',
    }
  ]
}

var BUTTON_UP = 38;
var BUTTON_DOWN = 40;
var BUTTON_ENTER = 13;

var $area = $('.autocomplete');
var $input = $area.find('.autocomplete__input');
var $result = $('<div></div>').addClass('autocomplete__result');

$result.currentElement = 0;

$result.moveUp = function(e) {
  e.preventDefault();
  var $items = $result.find('.autocomplete__result__item');
  
  if ($items.length == 0) 
    return;
  
  var $currentElement = $result.find('.autocomplete__result__item--active');
  if ($currentElement.length == 0) {
    $currentElement = $items.eq(0);
  }
  
  $currentElement = $currentElement.removeClass('autocomplete__result__item--active').prev();

  if ($currentElement.length == 0) {
    $currentElement = $items.eq( $currentElement.length - 1);
  }

  $currentElement.addClass('autocomplete__result__item--active');
}

$result.moveDown = function(e) {
  e.preventDefault();
  var $items = $result.find('.autocomplete__result__item');
  
  if ($items.length == 0) 
    return;
  
  var $currentElement = $result.find('.autocomplete__result__item--active');
  if ($currentElement.length == 0) {
    $currentElement = $items.eq( $currentElement.length - 1 );
  }
  
  $currentElement = $currentElement.removeClass('autocomplete__result__item--active').next();

  if ($currentElement.length == 0) {
    $currentElement = $items.eq( 0 );
  }

  $currentElement.addClass('autocomplete__result__item--active');
}

$result.pushEnter = function(e){
  e.preventDefault();
  $result.find(".autocomplete__result__item--active").trigger("click");
}

$input.on("keydown", function(e) {  
  switch( e.which ) {
    case (BUTTON_UP) :
        $result.moveUp(e);
      break;
    case (BUTTON_DOWN) :
        $result.moveDown(e);
      break;
    case (BUTTON_ENTER) :
        $result.pushEnter(e);
      break;
  }
});

$input.on("keyup", function(e) {
  switch( e.which ) {
    case (BUTTON_UP) :
    case (BUTTON_DOWN) :
    case (BUTTON_ENTER) :
      break;
    default :
      searchUsers();
  }
});

function searchUsers() {
    var str = $input.val();
  if ( str.length < 1 ) {
    $result.hide();
    return;
  }

  var data = getData();
  if (!data.length) {
    return;
  } 
  
  $result.html('').hide();
  var counter = 0;
  
  data.forEach( function( item, i, array ) {
    if ( item.name.toLowerCase().indexOf(str.toLowerCase()) != -1 ) {
      counter++;
      $result.append(createView(item, str));
    } 
  });
  if (counter > 0) {$result.show()};
  $area.append($result);
}


function createView(obj, str) {
  var $result = $('<div></div>').addClass('autocomplete__result__item');
  var nameTxt = obj.name;
  var numIn = nameTxt.toLowerCase().indexOf(str.toLowerCase());
  nameTxt = nameTxt.substring(0, numIn) + '<span>' + nameTxt.substring(numIn, numIn + str.length) + '</span>' +
     nameTxt.substring(numIn + str.length, nameTxt.length);
  var $name = $('<p></p>').addClass('autocomplete__result__item__name');
  
  $name.append(nameTxt);
  return $result.append($name);
};

$area.on('click', '.autocomplete__result__item', function(e){
  var nameTemp = $(this).find('.autocomplete__result__item__name').text();
  $input.val(nameTemp);
  $result.hide();
});


$result.on('mouseover', '.autocomplete__result__item', function(){
  var $this = $(this);
  var $currentElement = $result.find('.autocomplete__result__item--active');
  if ($this == $currentElement)
    return;
  $currentElement.removeClass('autocomplete__result__item--active');
  $currentElement = $this;
  $currentElement.addClass('autocomplete__result__item--active');
});


$result.on('mouseleave', '.autocomplete__result__item', function(){
  $result.find('.autocomplete__result__item--active').removeClass('autocomplete__result__item--active');
});