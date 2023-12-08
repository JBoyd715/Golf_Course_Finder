
window.addEventListener("load", () => {

// Add buttons to select radius 
// Add function/method to get current loc
let lat;
let lon;


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
       lat=position.coords.latitude;
       lon=position.coords.longitude;
    });
  }
    

    const golfCourseList = document.querySelector("#golfCourseList");
    console.log(golfCourseList);
  
    const loadButton = document.querySelector("#loadButton");
    console.log(loadButton);
    // On button click load courses
    
    loadButton?.addEventListener("click", () => {
      console.log(navigator.geolocation) ;
      golfCourseList.innerHTML="";

      const drop = document.querySelector("#radiusDrop");
      const rad= drop.value;

      //checks if current location was found if not it sends a default location to get results from
      if(lat,lon == null){
       golfCourseList.innerHTML="Current Location not found, please try again (default Location: Grove City, Ohio)";
      lat= 39.85919;
      lon=-83.03379;
      }

      iMap();

      var rtitle = document.createElement("h1");
      rtitle.innerHTML="Your Course Results!";
      golfCourseList.appendChild(rtitle);

      search(rad);
    });

    // Function to display details of all results 
    function callback(results, status,pagination) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        results.forEach((el) => {
            const newChild = document.createElement("div");
            const addy = document.createElement("p");
            const rating = document.createElement("p");
            newChild.innerText = el['name'];
            addy.innerText = el['vicinity'];
            rating.innerText="Rating:"+el['rating'];
            

           
            // add selector of what type of golf (Disc,Normal)

            if(!el['name'].includes("Disc")){
            golfCourseList.appendChild(newChild);
            golfCourseList.appendChild(addy);
            golfCourseList.appendChild(rating);
            } 
            
            

            
        });
        /* checks to see if the search results exceed 20 results. Each page only holds 20.
        To get the rest of your results you have to use the next_page_token which is stored in pagination.
        The .nextPage() method displays the rest of the results. 

        */
        if(pagination.hasNextPage){
          pagination.nextPage();
        }
      }
    }
    // Fills out request parameters and then sends the request
    function search(rad){
    var request ={
      location: new google.maps.LatLng(lat,lon),
      radius:rad,
      //type is establishment to get all businesses and keyword is golf to select all items related to golf
      type:'establishment',
      keyword: 'golf',
    }
    
     //Call to Places API using nearbySearch
      service.nearbySearch(request, callback);
  }

  //Initializes map so you can use the Places API
  function iMap(){
    map = new google.maps.Map(document.getElementById('map'),{
      center: { lat: lat, lng: lon },
      zoom:15
    });
    service = new google.maps.places.PlacesService(map);
    
    
  }
  });