(function (Drupal, drupalSettings, window) {
  'use strict';

  Drupal.behaviors.zoom = {
    attach: function (context, settings) {
      const originalUrls = drupalSettings.AzZoom.image_urls;
      const images = context.querySelectorAll(
        '.image-zoom-container img.original-image'
      );

      images.forEach((img) => {
        // Ensuring each image is initialized once
        if (img.dataset.initialized) {
          return;
        }
        img.dataset.initialized = true;

        const imageZoomParent = img.closest('.image-zoom');
        if (imageZoomParent) {
          setupZoom(imageZoomParent, {
            url: originalUrls[img.getAttribute('fid')],
            on: drupalSettings.AzZoom.image_zoom_style,
            touch: drupalSettings.AzZoom.image_touchscreen_compatible,
            magnify: drupalSettings.AzZoom.image_magnify,
            duration: drupalSettings.AzZoom.image_fade_duration,
          });
        }
      });
    },
  };

  function setupZoom(element, options) {
    const img = document.createElement('img');
    const target = element; // Assuming 'element' is where the zoomed image should be appended.
    let touched = false;
              console.log(img);

    img.onload = function () {

      const zoomObj = zoom(target, element, img, options.magnify);
      console.log(zoomObj);

      function start(e) {
        zoomObj.init();
        zoomObj.move(e);

        img.style.opacity = '1';
        img.style.transition = `opacity ${options.duration}ms`;

        if (typeof options.onZoomIn === 'function') options.onZoomIn.call(img);
      }

      function stop() {
        img.style.opacity = '0';
        if (typeof options.onZoomOut === 'function')
          options.onZoomOut.call(img);
      }

      // Event listeners based on options.on
      // Example for 'mouseover', similar logic can be applied for 'click', 'grab', 'toggle'
      if (options.on === 'mouseover') {
        element.addEventListener('mouseenter', start);
        element.addEventListener('mouseleave', stop);
        element.addEventListener('mousemove', function (e) {
          zoomObj.move(e);
        });
      }

      // Touch events
      if (options.touch) {
        element.addEventListener('touchstart', function (e) {
          touched ? stop() : start(e.touches[0]);
          touched = !touched;
        });
        element.addEventListener('touchmove', function (e) {
          zoomObj.move(e.touches[0]);
        });
        element.addEventListener('touchend', stop);
      }
    };

    img.src = options.url;
    target.appendChild(img);
  }

    window.AZZoom = window.AZZoom || {};
    window.AZZoom.setupZoom = setupZoom;

})(Drupal, drupalSettings, window);
