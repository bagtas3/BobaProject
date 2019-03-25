
$(document).ready(function() {
	/* global L, Mustache */
	var map;

	// create a map in the "map" div, set the view to a given place and zoom
	map = L.map('map').setView([40.0, -105.0], 4);

	var baseLayer = new L.StamenTileLayer('toner', {
		detectRetina: true
	});
	
	baseLayer.addTo(map);

	var loadData = function (data) {
		var colorFunction1 = new L.HSLLuminosityFunction(new L.Point(1,0.75), new L.Point(55,0.2), {outputHue: 240, outputSaturation: '0%'});
		var fillColorFunction1 = new L.HSLLuminosityFunction(new L.Point(1,0.9), new L.Point(55,0.5), {outputHue: 240, outputSaturation: '0%'});

		var q1Options = {
			recordsField: null,
			locationMode: L.LocationModes.STATE,
			codeField: 'State',
			chartOptions: {
				'Boba': {
					color: 'orange',
					fillColor: 'hsl(34, 100%, 50%)',
					maxValue: 1,
					maxHeight: 20,
					displayName: 'Boba',
					displayText: function (value) {
						return value.toFixed(2);
					}
				},
				'Boba Tea': {
					color: 'yellow',
					fillColor: 'hsl(58, 100%, 43%)',
					maxValue: 1,
					maxHeight: 20,
					displayName: 'Boba Tea',
					displayText: function (value) {
						return value.toFixed(2);
					}
				},
				'Bubble Tea': {
					color: 'red',
					fillColor: 'hsl(6, 100%, 50%)',
					maxValue: 1,
					maxHeight: 20,
					displayName: 'Bubble Tea',
					displayText: function (value) {
						return value.toFixed(2);
					}
				},
				'Pearl Milk Tea': {
					color: 'green',
					fillColor: 'hsl(140, 100%, 43%)',
					maxValue: 1,
					maxHeight: 20,
					displayName: 'Pearl Milk Tea',
					displayText: function (value) {
						return value.toFixed(2);
					}
				},
				'Tapioca Milk Tea': {
					color: 'blue',
					fillColor: 'hsl(240,70%,60%)',
					maxValue: 1,
					maxHeight: 20,
					displayName: 'Tapioca Milk Tea',
					displayText: function (value) {
						return value.toFixed(2);
					}
				},
				'Other': {
					color: 'hsl(240,5%,75%)',
					fillColor: 'hsl(240,5%,75%)',
					maxValue: 1,
					maxHeight: 20,
					displayName: 'Other',
					displayText: function (value) {
						return value.toFixed(2);
					}
				}
			},
			layerOptions: {
				fillOpacity: 0.9,
				opacity: 1,
				weight: 0.5,
				radius: 10,
				width: 5,
				// barThickness: 5
			},
			// Use displayOptions to dynamically size the radius and barThickness according to the number of
			// results
			displayOptions: {
				'Respondants': {
					//documentation: https://github.com/humangeo/leaflet-dvf/wiki/5.-Utility-Functions
					radius: new L.LinearFunction(new L.Point(1, 10), new L.Point(1018, 70)),
					
				}
			},
			tooltipOptions: {
				// iconSize: new L.Point(80,55),
				iconAnchor: new L.Point(-5,55)
			},
			
			// // default code: click each piechart: popup with ALL data in a table
			// onEachRecord: function (layer,record) {
				// var $html = $(L.HTMLUtils.buildTable(record));
				// console.log($html)
				// // http://api.jquery.com/wrap/ docs on wrap()
				// layer.bindPopup($html.wrap('<div/>').parent().html(),{
					// minWidth: 400,
					// maxWidth: 400
				// });
			// }

			// click each piechart: popup with select data in a table
			onEachRecord: function (layer,record) {
				var popupTemplate = document.querySelector('.popup-template').innerHTML;
				layer.bindPopup(Mustache.render(popupTemplate, record));
				// layer.on('click', function () {
				// 	console.log(record);
				// });
				layer.on('click', function () {
				  // This function is called whenever a feature on the layer is clicked
				  console.log(record);
				});
			
			},
			

	};

		var q1ResultsLayer = new L.PieChartDataLayer(data,q1Options);

		map.addLayer(q1ResultsLayer);

		var legend = q1ResultsLayer.getLegend({
			className: 'well'
		});

		$('#legend').append(legend);
		
		
	};
	
	loadData(bobaData2);

});
