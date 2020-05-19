$(document).on('click','#cityname',function(){
  if($(this).siblings('div').hasClass('customsearch')){
     $(this).siblings('div').remove();
  }
  $(this).parent().append(`<div class='customsearch'><span>Use Current Location</span   ></div>`)
})
$(document).on('click','.customsearch', getLocation)

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    var latitude = parseFloat(position.coords.latitude).toFixed(4);
    var longitude = parseFloat(position.coords.longitude).toFixed(4);
    console.log(`${latitude}+${longitude}`)
    $.ajax({
        url:`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d7e3ffd87cf84706bce4fc6a5c22013c`,       
        async: true,
        type: "GET",
        datatype: "json",
        success:(data)=>{
            console.log(data);
            SearchWeather(data.results[0].components.state)
        },
        error:(error)=>{
            console.log(error)
        }

    })    
  }