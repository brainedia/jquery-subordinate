/*
 *  jQuery Subordinate v1.0
 *  https://github.com/brainedia/jquery-subordinate
 *
 *  Copyright 2014 Robert Saß
 *  Released under the MIT license
 */

(function($) {

	$.fn.subordinate = function( element, content ) {
		var container = this;

		if( typeof element == 'string' && element.substr(0, 1) != '<' ) {

			var insertedElement = container;
			var elements = element.split( '>' );
			for( var k in elements ) {
				var element = $.trim( elements[ k ] );
				insertedElement = insertedElement.subordinate( parseShortElementDefinition( element ) );
			}

		} else {

			var insertedElement = container.append( element ).children(':last');

		}

		if( content != undefined )
			insertedElement.append( content );

		return insertedElement;

	};

	// parse short element definition
	function parseShortElementDefinition( shortDefinition ) {
		var symbols = {
			'name'	: ':',
			'value'	: '=',
			'type'	: '(',
			'id'	: '#',
			'class'	: '.'
		};
		var ignoreCharacters = [ ')' ];
		var isSelfClosing = false;
		var selfClosingContainers = [ 'img', 'input', 'br', 'link', 'meta' ];

		// removing characters that should be ignored
		for( var i in ignoreCharacters ) {
			var character = ignoreCharacters[i];
			shortDefinition = shortDefinition.replace( new RegExp( escapeRegExp(character), 'g' ), '' );
		}
		// splitting each definition
		var defs = shortDefinition;
		for( var attr in symbols ) {
			var symbol = symbols[ attr ];
			defs = defs.replace( new RegExp( escapeRegExp(symbol), 'g' ), '\\'+symbol );
		}
		defs = defs.split( '\\' );

		// parsing definitions & building element
		var containerAttributes = [];
		var containerName = shortDefinition;
		for( var k in defs ) {
			var def = defs[k];
			def = $.trim( def );
			var defSymbol = def.substr(0, 1);
			var defValue = def.substr(1);
			for( var attr in symbols ) {
				var symbol = symbols[ attr ];
				if( symbol == defSymbol ) {
					containerAttributes.push( attr +'="'+ defValue +'"' );
					containerName = containerName.replace( def, '' );
					break;
				}
			}
		}
		isSelfClosing = (containerName in selfClosingContainers);
		var containerAttributeDefinition = containerAttributes.join(' ');
		var containerDefinition = '<'+ $.trim( containerName +' '+ containerAttributeDefinition ) +'>'
								+ (isSelfClosing ? '' : '</'+ containerName +'>');

		return containerDefinition;
	}
	
	// escape regular expression
	function escapeRegExp( string ) {
		string = string+"";
		return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	}

}(jQuery));
