jQuery Subordinate
==================

`$.subordinate()` is a combination of [`$.append()`](http://api.jquery.com/append/) and [`$.find()`](http://api.jquery.com/find/).

It appends an element but returns this new created jQuery object.
That makes your code way much shorter and cleaner, when building complex DOM structures on-the-fly.

## Example ##
[Here's a Demo](http://bl.ocks.org/brainedia/a837f5ef9f4921f126f2) 

## How to use ##

#### Short ####
```
$('body')
  .subordinate( '<div id="parent"></div>' )
  .subordinate( '<h1>Headline</h1>' );
```

#### Shorter: defining tags by CSS-like selectors ####
```
$('body')
  .subordinate( 'div#parent' )
  .subordinate( 'h1', "Another headline" );
```

#### Ultimate way: sequence of definitions ####
```
$('body').subordinate( 'div#parent > p.child > span', "I like!" );
```
