function showShelterMap() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<div id="map"></div>';
    initMap();
  }
  
  function initMap() {
    // Initialize Google Map centered on Seoul (or user's location)
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.5665, lng: 126.9780 }, // Seoul's coordinates
      zoom: 15
    });
  
    // Fetch shelter data
    fetch('/output_file_with_latlng.csv')
      .then(response => response.text())
      .then(csvText => {
        const shelters = parseCsv(csvText);
        shelters.forEach(shelter => {
          new google.maps.Marker({
            position: { lat: shelter.latitude, lng: shelter.longitude },
            map: map,
            title: shelter.name
          });
        });
      });
  }
  
  function parseCsv(csvText) {
    // Parse the CSV text and return an array of shelter objects
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const shelters = [];
  
    for (let i = 1; i < lines.length; i++) {
      const data = lines[i].split(',');
      shelters.push({
        name: data[headers.indexOf('대피소명')],
        address: data[headers.indexOf('소재지')],
        latitude: parseFloat(data[headers.indexOf('위도')]),
        longitude: parseFloat(data[headers.indexOf('경도')])
      });
    }
  
    return shelters;
  }
  