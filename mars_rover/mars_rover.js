$(document).ready(function () {
    const API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
    const API_KEY = "qmAJJvGIynvXumNAkqHih7zbeGRBYGAUFKCkJGWw";

    // Fetch photos based on the Martian Sol
    function fetchPhotos(sol) {
        const url = `${API_URL}?sol=${sol}&api_key=${API_KEY}`;
        $.get(url)
            .done(data => {
                if (data && data.photos && data.photos.length > 0) {
                    displayPhotos(data.photos);
                } else {
                    $("#photo-gallery").html('<p class="text-center text-muted">No photos available for the selected Sol.</p>');
                }
            })
            .fail(() => {
                alert("Failed to fetch data from NASA API. Please try again later.");
            });
    }

    // Display photos in the gallery with lazy loading
    function displayPhotos(photos) {
        const gallery = $("#photo-gallery");
        gallery.empty();

        photos.forEach(photo => {
            const photoCard = `
          <div class="col-md-4 col-lg-3 mb-4">
            <div class="card card-custom h-100">
              <img 
                data-src="${photo.img_src}" 
                class="card-img-top lazyload" 
                alt="Mars Rover Photo">
              <div class="card-body">
                <h5 class="card-title">${photo.rover.name}</h5>
                <p class="card-text">
                  <strong>Camera:</strong> ${photo.camera.full_name}<br>
                  <strong>Date:</strong> ${photo.earth_date}
                </p>
              </div>
            </div>
          </div>`;
            gallery.append(photoCard);
        });

        // Trigger lazy loading
        initLazyLoad();
    }

    // Initialize lazy loading using the lazyload library
    function initLazyLoad() {
        if ("loading" in HTMLImageElement.prototype) {
            // Native lazy loading
            document.querySelectorAll("img.lazyload").forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback to lazyload.js library
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
            document.body.appendChild(script);
        }
    }

    // Handle fetch button click
    $("#fetch-photos").on("click", function () {
        const sol = $("#sol").val();
        if (sol) {
            fetchPhotos(sol);
        } else {
            alert("Please enter a valid Martian Sol.");
        }
    });

    // Initial fetch for Sol 1000
    fetchPhotos(1000);
});
