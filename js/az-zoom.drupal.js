/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
import FocusImg from './az-zoom.js';
(function (Drupal, drupalSettings) {
  Drupal.behaviors.zoomEffect = {
    attach: function attach(context, drupalSettings) {
      context.querySelectorAll('.image-zoom-container').forEach(function (element) {
        var imgElement = element.querySelector('.original-image');
        var fid = imgElement.getAttribute('fid');
        new FocusImg({
          imageSrc: drupalSettings.AZZoom.image_urls[fid] || imgElement.src,
          parentElement: element,
          zoomFactor: drupalSettings.AZZoom.image_zoom_factor || '250%',
          smoother: drupalSettings.AZZoom.image_smoother || true,
          width: drupalSettings.AZZoom.image_width || '100%',
          height: drupalSettings.AZZoom.image_height || '66.7%',
          displayLoc: drupalSettings.AZZoom.display_loc || false,
          displayZoom: drupalSettings.AZZoom.display_zoom || false,
          zoomOnScroll: drupalSettings.AZZoom.zoom_on_scroll || false
        });
      });
    }
  };
})(Drupal, drupalSettings);