
window.addEventListener("load", () => {
    const golfCourseList = document.querySelector("#golfCourseList");
    console.log(golfCourseList);
  
    const loadButton = document.querySelector("#loadButton");
    console.log(loadButton);
    loadButton?.addEventListener("click", () => {
      // This is where you would call the api
      let lat= 39.85919;
      let long=-83.03379;

      map = new google.maps.Map(document.getElementById('map'),{
        latitude: lat,
        longitude:long,
        zoom:15
      });
      var request ={
        location: new google.maps.LatLng(lat,long),
        radius:10000,
        type:'establishment',
        keyword: 'golf'

      }

      //The only way I could figure out how to get this request to work was by creating a map;

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);

  
      
      /*[...Array(30).keys()].forEach((el) => {
        const newChild = document.createElement("div");
        newChild.innerText = el;
        golfCourseList.appendChild(newChild);
      });*/
    });
    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((el) => {
            const newChild = document.createElement("div");
            newChild.innerText = el;
            golfCourseList.appendChild(newChild);
        });
      }
    }
  });