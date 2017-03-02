$(document).ready(function(){
	if (localStorage.getItem('pages') === null) {
		localStorage.pages = JSON.stringify([]);
	}
	var pagesArray = JSON.parse(localStorage.pages);
	loadPages();
	$(document).on("click",".btn-save",function(){
		$('.valid-feedback').html('');
		if ($('#page_inp').val() != "") {
			if (pageEntered()) {
				if (($('#page_inp').val() <= 10) && ($('#page_inp').val() >= 1)) {
					if ($('#page_inp').val() % 1 == 0) {
						if ($('#service_inp').val() != '--Select service--') {
							if ($('#type_inp').val() != '--Select type--') {
								if ($('#status_inp').val() != '--Select status--') {
									var newpage = {
									"pages" : parseInt($('#page_inp').val()),
									"service" : $('#service_inp').val(),
									"type" : $("#type_inp").val(),
									"status" : $('#status_inp').val(),
									"category" : parseInt($('#page_inp').val()) + ' ' + $('#service_inp').val() + ' ' + $("#type_inp").val() + ' ' + $('#status_inp').val()
									}
									pagesArray.push(newpage);
									localStorage.pages = JSON.stringify(pagesArray);
									pagesArray = JSON.parse(localStorage.pages);
									loadPages();
									clearInput();
									$('#myModal').modal('hide');
								}
								else{
									$('#status_valid').html('Please select status');
								}
							}
							else{
								$('#type_valid').html('Please select type');
							}
						}
						else{
							$('#service_valid').html('Please select service type');
						}
					}
					else{
						$('#page_valid').html("Page number must not contain decimal values.");
					}
				}
				else {
					$('#page_valid').html('Enter page no from 0 to 10');
				}
			}
			else{
				$('#page_valid').html("The page number has already been added");
			}	
		}
		else{
			$('#page_valid').html('Pages cannot be left empty');
		}

	});
	$(document).on("click",".btn-cancel",function(){
		clearInput();
	});
	
	var $filterCheckboxes = $( '.filter-checkboxes' );
	$filterCheckboxes.on( 'change', function() {
		var selectedFilters = {};
		$filterCheckboxes.filter( ':checked' ).each( function() {
		if ( ! selectedFilters.hasOwnProperty( this.name ) ) {
		  selectedFilters[ this.name ] = [];
		}
		selectedFilters[ this.name ].push( this.value );
		});

		var filteredResults = $( '.filterable' );
		$.each( selectedFilters, function( name, filterValues ) {
			filteredResults = filteredResults.filter( function() {
				var matched = false,
				currentFilterValues = $( this ).data( 'category' ).split( ' ' );
				$.each( currentFilterValues, function( _, currentFilterValue ) {
					if ( $.inArray( currentFilterValue, filterValues) != -1 ) {
						matched = true;
						return false;
					}
				});    
				return matched;    
			});
		});
	$( '.filterable' ).hide().filter( filteredResults ).show();
	});
	function loadPages(){
		$(".content-bucket").html('');
		for (var i = 0; i < pagesArray.length; i++) {
			$(".content-bucket").append($('#pageContent').html().replace('pageno',pagesArray[i].pages).replace('typeval',pagesArray[i].type).replace('statusval',pagesArray[i].status).replace('serviceval',pagesArray[i].service).replace('categories',pagesArray[i].category));
		}	
	}
	function clearInput(){
		$('#page_inp').val('');
		$("#service_inp, #type_inp, #status_inp").prop("selectedIndex", 0);
		$('.valid-feedback').html('');
	}
	function pageEntered(){
		var pageno = $('#page_inp').val();
		for (var i = 0; i < pagesArray.length; i++) {
			if (pagesArray[i].pages == pageno) {
				return false;
			}
		}
		return true;
	}
});