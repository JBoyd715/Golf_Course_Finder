
window.addEventListener("load", () => {

// Add buttons to select radius 
// Add function/method to get current loc
const lat= 39.85919;
const lon=-83.03379;
const rad = 50000;




    const golfCourseList = document.querySelector("#golfCourseList");
    console.log(golfCourseList);
  
    const loadButton = document.querySelector("#loadButton");
    console.log(loadButton);
    // On button click load courses
    loadButton?.addEventListener("click", () => {
      iMap();
      search();
    });

    // Function to display details of all results 
    function callback(results, status,pagination) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        results.forEach((el) => {
            const newChild = document.createElement("div");
            newChild.innerText = el['name'];
           
            // add selector of what type of golf (Disc,Normal)

         /*   if(!el['name'].includes("Disc")){
            golfCourseList.appendChild(newChild);
            } */
            
            golfCourseList.appendChild(newChild);

            
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
    function search(){
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