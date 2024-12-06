/* 	RNV Delays JavaScript  
	Beginner's Practical SS2021 by Raeesa Yousaf
	supervised by Dennis Aumiller and Philip Hausner */


//======================================= STATIC CHARTS ===========================================


// set up default webpage

	// load google charts libraries and then execute callback
	google.charts.load('current', {packages: ['bar']}).then(defaultPlot1, defaultPlot2, defaultPlot3, defaultPlot4);
	
	// load the charts upon loading of libraries
	google.charts.setOnLoadCallback(defaultPlot1);
	google.charts.setOnLoadCallback(defaultPlot2);
	google.charts.setOnLoadCallback(defaultPlot3);
	google.charts.setOnLoadCallback(defaultPlot4);
	
	
	
	// bar chart showing average delay time for each station upon arrival
	function defaultPlot1() {
		var dataPoints = []; // temporary array
		var n = []; // final array with data
		
		var url = "http://localhost:8000/search/journeys?time_start=2020-02-01T00%3A00%3A00Z&time_end=2020-02-01T12%3A00%3A00Z&label=23"
		
		// create data table for chart rendering
		var chartData = new google.visualization.DataTable();
		chartData.addColumn('string', 'Station');
		chartData.addColumn('number', 'Verspätung (in sec)');
		
		// handling data from url
		function addData(data) {
			// push data from url into array
			for (var i = 0; i < data.length; i++) {
				for (var j = 0; j < data[i].delays.length; j++) {
					dataPoints.push({
						x: data[i].delays[j].Station,
						y: data[i].delays[j].Arrival
					});
				}
			} // end of loop

			// filter "no information" values from array
			values = ["no information"]
			dataPoints = dataPoints.filter(item => !values.includes(item.y));

			// eliminate duplicates of x and get average of the y values
			const map = new Map();
			dataPoints.forEach(({ x, y }) => {
				const [total, count] = map.get(x) ?? [null, 0];
				map.set(x, [(total ?? 0) + parseInt(y), count + 1]);
			});

			// final array with data in desired format
			n = [...map].map(([k, v]) => ({ x: k, y: v[0] / v[1] }));

			console.log(n);
			
			// add array values into data table
			n.forEach(function (row) {
				chartData.addRow([row.x, row.y]);
			});

			// format chart
			var options = {
				width: 850,
				legend: { position: 'none' },
				chart: {
				title: 'Durchschnittliche Verspätungen bei Ankunft (in Sekunden)'},
				axes: {
					x: {
					0: { side: 'top', label: 'Stationen'} // Top x-axis.
					}
				},
				bar: { groupWidth: "90%" }
					};
			
			// create and render new chart with data table and formatting
			var chart = new google.charts.Bar(document.getElementById('plot1'));
			chart.draw(chartData, google.charts.Bar.convertOptions(options));

		}; // end of addData()
		
		// call to url and function that handles data from url
		$.getJSON(url, addData);

	}; // end of plot1()
	
// ------------------------------------------------------------------------------------------------		

	// bar chart showing average delay time for each station upon departure (same as plot1 just for departure)
	function defaultPlot2() {
		var dataPoints = [];
		var n = []; 
		
		var url = "http://localhost:8000/search/journeys?time_start=2020-02-01T00%3A00%3A00Z&time_end=2020-02-01T12%3A00%3A00Z&label=23"

		var chartData = new google.visualization.DataTable();
		chartData.addColumn('string', 'Station');
		chartData.addColumn('number', 'Verspätung (in sec)');

		function addData(data) {
			for (var i = 0; i < data.length; i++) {
				for (var j = 0; j < data[i].delays.length; j++) {
					dataPoints.push({
						x: data[i].delays[j].Station,
						y: data[i].delays[j].Departure
					});
				}
			}

			values = ["no information"]
			dataPoints = dataPoints.filter(item => !values.includes(item.y));

			const map = new Map();
			dataPoints.forEach(({ x, y }) => {
				const [total, count] = map.get(x) ?? [null, 0];
				map.set(x, [(total ?? 0) + parseInt(y), count + 1]);
			});

			n = [...map].map(([k, v]) => ({ x: k, y: v[0] / v[1] }));

			console.log(n);

			n.forEach(function (row) {
				chartData.addRow([row.x, row.y]);
			});

			var options = {
				width: 850,
				legend: { position: 'none' },
				chart: {
				title: 'Durchschnittliche Verspätungen bei Abfahrt (in Sekunden)'},
				axes: {
					x: {
					0: { side: 'top', label: 'Stationen'} // Top x-axis.
					}
				},
				bar: { groupWidth: "90%" }
					};

			var chart = new google.charts.Bar(document.getElementById('plot2'));
			chart.draw(chartData, google.charts.Bar.convertOptions(options));

		}; // end of addData()

		$.getJSON(url, addData);

	}; // end of plot2()

// ------------------------------------------------------------------------------------------------	

	// bar chart showing average delay time per hour upon arrival
	function defaultPlot3() {
		var dataPoints = []; // temporary array
		var result = []; // final array with data
		
		var url = "http://localhost:8000/search/hourly_delays?time_start=2020-02-01T00%3A00%3A00Z&time_end=2020-02-01T12%3A00%3A00Z&label=23"
		
		// create data table for chart rendering
		var chartData = new google.visualization.DataTable();
		chartData.addColumn('string', 'Stunde');
		chartData.addColumn('number', 'Verspätung (in sec)');
		
		// handling data from url
		function addData(data) {
			// push data from url into array
			r = data[0]["Mean of Arrivals for each hour"];
			for(const key in r) result.push({x: key, y: r[key]})
			
			// add array values into data table
			result.forEach(function (row) {
				chartData.addRow([row.x, row.y]);
			});

			console.log(result);
			
			// format chart
			var options = {
				width: 850,
				legend: { position: 'none' },
				chart: {
				title: 'Durchschnittliche Verspätung pro Stunde (Ankunft, in Sekunden)'},
				axes: {
					x: {
					0: { side: 'top', label: 'Uhrzeit'} // Top x-axis.
					}
				},
				bar: { groupWidth: "90%" }
					};
			
			// create and render new chart with data table and formatting
			var chart = new google.charts.Bar(document.getElementById('plot3'));
			chart.draw(chartData, google.charts.Bar.convertOptions(options));

		}; // end of addData()
		
		// call to url and function that handles data from url
		$.getJSON(url, addData);

	}; // end of plot3()
	
// ------------------------------------------------------------------------------------------------		
	
	// bar chart showing average delay time per hour upon departure (same as plot 3 just for departure)
	function defaultPlot4() {
		var dataPoints = []; // temporary array
		var result = []; // final array with data
		
		var url = "http://localhost:8000/search/hourly_delays?time_start=2020-02-01T00%3A00%3A00Z&time_end=2020-02-01T12%3A00%3A00Z&label=23"

		var chartData = new google.visualization.DataTable();
		chartData.addColumn('string', 'Stunde');
		chartData.addColumn('number', 'Verspätung (in sec)');

		function addData(data) {
			r = data[1]["Mean of Departures for each hour"];
			for(const key in r) result.push({x: key, y: r[key]})

			result.forEach(function (row) {
				chartData.addRow([row.x, row.y]);
			});

			console.log(result);
			
			var options = {
				width: 850,
				legend: { position: 'none' },
				chart: {
				title: 'Durchschnittliche Verspätung pro Stunde (Abfahrt, in Sekunden)'},
				axes: {
					x: {
					0: { side: 'top', label: 'Uhrzeit'} // Top x-axis.
					}
				},
				bar: { groupWidth: "90%" }
					};

			var chart = new google.charts.Bar(document.getElementById('plot4'));
			chart.draw(chartData, google.charts.Bar.convertOptions(options));

		}; // end of addData()

		$.getJSON(url, addData);

	}; // end of plot4()




//======================================== DYNAMIC CHARTS ==========================================



// function processes user input
function process() {
	// load google charts libraries
	google.charts.load('current', {packages: ['bar']}).then(plot1, plot2, plot3, plot4);
	
	// load the charts upon loading of libraries
	google.charts.setOnLoadCallback(plot1);
	google.charts.setOnLoadCallback(plot2);
	google.charts.setOnLoadCallback(plot3);
	google.charts.setOnLoadCallback(plot4);
	
	
	
	// bar chart showing average delay time for each station upon arrival
	function plot1() {
		var dataPoints = []; // temporary array
		var n = []; // final array with data
		
		var url = "http://localhost:8000/search/journeys?time_start=" + document.getElementById("time_start").value 
				+ "T00%3A00%3A00Z&time_end=" + document.getElementById("time_end").value 
				+ "T12%3A00%3A00Z&label=" + document.getElementById("label").value;
		
		// create data table for chart rendering
		var chartData = new google.visualization.DataTable();
		chartData.addColumn('string', 'Station');
		chartData.addColumn('number', 'Verspätung (in sec)');
		
		// handling data from url
		function addData(data) {
			// push data from url into array
			for (var i = 0; i < data.length; i++) {
				for (var j = 0; j < data[i].delays.length; j++) {
					dataPoints.push({
						x: data[i].delays[j].Station,
						y: data[i].delays[j].Arrival
					});
				}
			} // end of loop

			// filter "no information" values from array
			values = ["no information"]
			dataPoints = dataPoints.filter(item => !values.includes(item.y));

			// eliminate duplicates of x and get average of the y values
			const map = new Map();
			dataPoints.forEach(({ x, y }) => {
				const [total, count] = map.get(x) ?? [null, 0];
				map.set(x, [(total ?? 0) + parseInt(y), count + 1]);
			});

			// final array with data in desired format
			n = [...map].map(([k, v]) => ({ x: k, y: v[0] / v[1] }));

			console.log(n);
			
			// add array values into data table
			n.forEach(function (row) {
				chartData.addRow([row.x, row.y]);
			});

			// format chart
			var options = {
				width: 850,
				legend: { position: 'none' },
				chart: {
				title: 'Durchschnittliche Verspätungen bei Ankunft (in Sekunden)'},
				axes: {
					x: {
					0: { side: 'top', label: 'Stationen'} // Top x-axis.
					}
				},
				bar: { groupWidth: "90%" }
					};
			
			// create and render new chart with data table and formatting
			var chart = new google.charts.Bar(document.getElementById('plot1'));
			chart.draw(chartData, google.charts.Bar.convertOptions(options));

		}; // end of addData()
		
		// call to url and function addData() that handles data from url
		$.getJSON(url, addData);

	}; // end of plot1()
	

// ------------------------------------------------------------------------------------------------		

	
	// bar chart showing average delay time for each station upon departure (same as plot1 just for departure)
	function plot2() {
		var dataPoints = []; 
		var n = []; 
		
		var url = "http://localhost:8000/search/journeys?time_start=" + document.getElementById("time_start").value 
				+ "T00%3A00%3A00Z&time_end=" + document.getElementById("time_end").value 
				+ "T12%3A00%3A00Z&label=" + document.getElementById("label").value;

		var chartData = new google.visualization.DataTable();
		chartData.addColumn('string', 'Station');
		chartData.addColumn('number', 'Verspätung (in sec)');

		function addData(data) {
			for (var i = 0; i < data.length; i++) {
				for (var j = 0; j < data[i].delays.length; j++) {
					dataPoints.push({
						x: data[i].delays[j].Station,
						y: data[i].delays[j].Departure
					});
				}
			}

			values = ["no information"]
			dataPoints = dataPoints.filter(item => !values.includes(item.y));

			const map = new Map();
			dataPoints.forEach(({ x, y }) => {
				const [total, count] = map.get(x) ?? [null, 0];
				map.set(x, [(total ?? 0) + parseInt(y), count + 1]);
			});

			n = [...map].map(([k, v]) => ({ x: k, y: v[0] / v[1] }));

			console.log(n);

			n.forEach(function (row) {
				chartData.addRow([row.x, row.y]);
			});

			var options = {
				width: 850,
				legend: { position: 'none' },
				chart: {
				title: 'Durchschnittliche Verspätungen bei Abfahrt (in Sekunden)'},
				axes: {
					x: {
					0: { side: 'top', label: 'Stationen'} // Top x-axis.
					}
				},
				bar: { groupWidth: "90%" }
					};

			var chart = new google.charts.Bar(document.getElementById('plot2'));
			chart.draw(chartData, google.charts.Bar.convertOptions(options));

		}; // end of addData()

		$.getJSON(url, addData);

	}; // end of plot2()


// ------------------------------------------------------------------------------------------------	


	// bar chart showing average delay time per hour upon arrival
	function plot3() {
		var dataPoints = []; // temporary array
		var result = []; // final array with data
		
		var url = "http://localhost:8000/search/hourly_delays?time_start=" + document.getElementById("time_start").value 
				+ "T00%3A00%3A00Z&time_end=" + document.getElementById("time_end").value 
				+ "T12%3A00%3A00Z&label=" + document.getElementById("label").value;
		
		// create data table for chart rendering
		var chartData = new google.visualization.DataTable();
		chartData.addColumn('string', 'Stunde');
		chartData.addColumn('number', 'Verspätung (in sec)');
		
		// handling data from url
		function addData(data) {
			// push data from url into array
			r = data[0]["Mean of Arrivals for each hour"];
			for(const key in r) result.push({x: key, y: r[key]})
			
			// add array values into data table
			result.forEach(function (row) {
				chartData.addRow([row.x, row.y]);
			});

			console.log(result);
			
			// format chart
			var options = {
				width: 850,
				legend: { position: 'none' },
				chart: {
				title: 'Durchschnittliche Verspätung pro Stunde (Ankunft, in Sekunden)'},
				axes: {
					x: {
					0: { side: 'top', label: 'Uhrzeit'} // Top x-axis.
					}
				},
				bar: { groupWidth: "90%" }
					};
			
			// create and render new chart with data table and formatting
			var chart = new google.charts.Bar(document.getElementById('plot3'));
			chart.draw(chartData, google.charts.Bar.convertOptions(options));

		}; // end of addData()
		
		// call to url and function that handles data from url
		$.getJSON(url, addData);

	}; // end of plot3()
	

// ------------------------------------------------------------------------------------------------		

	
	// bar chart showing average delay time per hour upon departure (same as plot 3 just for departure)
	function plot4() {
		var dataPoints = []; // temporary array
		var result = []; // final array with data
		
		var url = "http://localhost:8000/search/hourly_delays?time_start=" + document.getElementById("time_start").value 
				+ "T00%3A00%3A00Z&time_end=" + document.getElementById("time_end").value 
				+ "T12%3A00%3A00Z&label=" + document.getElementById("label").value;

		var chartData = new google.visualization.DataTable();
		chartData.addColumn('string', 'Stunde');
		chartData.addColumn('number', 'Verspätung (in sec)');

		function addData(data) {
			r = data[1]["Mean of Departures for each hour"];
			for(const key in r) result.push({x: key, y: r[key]})

			result.forEach(function (row) {
				chartData.addRow([row.x, row.y]);
			});

			console.log(result);
			
			var options = {
				width: 850,
				legend: { position: 'none' },
				chart: {
				title: 'Durchschnittliche Verspätung pro Stunde (Abfahrt, in Sekunden)'},
				axes: {
					x: {
					0: { side: 'top', label: 'Uhrzeit'} // Top x-axis.
					}
				},
				bar: { groupWidth: "90%" }
					};

			var chart = new google.charts.Bar(document.getElementById('plot4'));
			chart.draw(chartData, google.charts.Bar.convertOptions(options));

		}; // end of addData()

		$.getJSON(url, addData);

	}; // end of plot4()

	
// ------------------------------------------------------------------------------------------------
	
	
	// make changes to info_table upon user submission
	document.getElementById("table_linie").innerHTML = document.getElementById("label").value;
	document.getElementById("table_start").innerHTML = document.getElementById("time_start").value;
	document.getElementById("table_end").innerHTML = document.getElementById("time_end").value;


	
	return false;    // prevent page from refreshing
// ------------------------------------------------------------------------------------------------	
	
	
	/* test function for user submission
	upon submission open json file in browser  

	function process() {
		var url = "http://localhost:8000/search/journeys?time_start=" + document.getElementById("time_start").value 
					+ "T00%3A00%3A00Z&time_end=" + document.getElementById("time_end").value 
					+ "T12%3A00%3A00Z&label=" + document.getElementById("label").value;
				
		location.href = url;
		return false;
				
	}
	*/
} // end of process();




