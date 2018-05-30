document.getElementById("app").innerHTML = `
<h1>Where the F. am I</h1>
<button class="js-btn">Get location</button>
<div class="js-output">
</div>
`;

const btn = document.querySelector(".js-btn"),
  output = document.querySelector(".js-output");

const handleLocationError = () => {
  output.innerHTML = "<h3>Couldn't find you!</h3>";
};

const handleLocationSuccess = position => {
  const {
    coords: { latitude, longitude }
  } = position;
  output.innerHTML = `<h3>Got ya!</h3>
                      <p>Latitude: ${latitude} / Longiute: ${longitude}</p>`;

  createImage(latitude, longitude);
};

const createImage = (latitude, longitude) => {
  const mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&size=500x500&zoom=13&maptype=hybrid&markers=color:red|label:H|${latitude},${longitude}`;
  const image = new Image();
  image.src = mapURL;
  output.appendChild(image);
};

const getLocation = () => {
  output.innerHTML = "<h3>Locating you...</h3>";
  navigator.geolocation.getCurrentPosition(
    handleLocationSuccess,
    handleLocationError
  );
};

btn.addEventListener("click", getLocation);
