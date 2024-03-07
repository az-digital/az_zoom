((document) => {

    document.addEventListener('DOMContentLoaded', function () {
    const defaults = {
        url: false,
        callback: false,
        target: false,
        duration: 120,
        on: 'mouseover', // Other options: grab, click, toggle
        touch: true, // Enables a touch fallback
        onZoomIn: false,
        onZoomOut: false,
        magnify: 1,
    };

    function extend(out) {
        out = out || {};
        for (let i = 1; i < arguments.length; i++) {
        if (!arguments[i]) continue;
        for (const key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
        }
        }
        return out;
    }

    function zoom(target, source, img, magnify) {
        let targetHeight,
        targetWidth,
        sourceHeight,
        sourceWidth,
        xRatio,
        yRatio,
        offset;
        const position = getComputedStyle(target).position;

        // Ensure target positioning for zoom
        target.style.position = /(absolute|fixed)/.test(position)
        ? position
        : 'relative';
        target.style.overflow = 'hidden';
        img.style.width = img.style.height = '';

        img.classList.add('zoomImg');
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.opacity = '0';
        img.style.width = `${img.width * magnify}px`;
        img.style.height = `${img.height * magnify}px`;
        img.style.border = 'none';
        img.style.maxWidth = 'none';
        img.style.maxHeight = 'none';
        target.appendChild(img);

        return {
        init: function () {
            targetWidth = target.offsetWidth;
            targetHeight = target.offsetHeight;

            if (source === target) {
            sourceWidth = targetWidth;
            sourceHeight = targetHeight;
            } else {
            sourceWidth = source.offsetWidth;
            sourceHeight = source.offsetHeight;
            }

            xRatio = (img.width - targetWidth) / sourceWidth;
            yRatio = (img.height - targetHeight) / sourceHeight;

            offset = source.getBoundingClientRect();
        },
        move: function (e) {
            const left = e.pageX - offset.left,
            top = e.pageY - offset.top;

            img.style.left = `${-left * xRatio}px`;
            img.style.top = `${-top * yRatio}px`;
        },
        };
    }

    function setupZoom(element, options) {
        const settings = extend({}, defaults, options || {}),
        source = element,
        target = settings.target || element,
        img = document.createElement('img');
        let touched = false;

        if (!settings.url) {
        const srcElement = source.querySelector('img');
        settings.url = srcElement
            ? srcElement.getAttribute('data-src') ||
            srcElement.currentSrc ||
            srcElement.src
            : null;
        if (!settings.url) return;
        }

        img.onload = function () {
        const zoomObj = zoom(target, source, img, settings.magnify);

        function start(e) {
            zoomObj.init();
            zoomObj.move(e);

            img.style.opacity = '1';
            img.style.transition = `opacity ${settings.duration}ms`;

            if (typeof settings.onZoomIn === 'function')
            settings.onZoomIn.call(img);
        }

        function stop() {
            img.style.opacity = '0';
            if (typeof settings.onZoomOut === 'function')
            settings.onZoomOut.call(img);
        }

        // Event listeners based on settings.on
        switch (settings.on) {
            case 'mouseover':
            source.addEventListener('mouseenter', start);
            source.addEventListener('mouseleave', stop);
            source.addEventListener('mousemove', zoomObj.move);
            break;
        }

        // Touch events
        if (settings.touch) {
            source.addEventListener('touchstart', function (e) {
            touched ? stop() : start(e.touches[0]);
            touched = !touched;
            });
            source.addEventListener('touchmove', function (e) {
            zoomObj.move(e.touches[0]);
            });
            source.addEventListener('touchend', stop);
        }

        if (typeof settings.callback === 'function') settings.callback.call(img);
        };

        img.src = settings.url;
        target.appendChild(img);
    }

    // Example of usage:
    // Find all elements with the 'zoomable' class and apply the zoom functionality to them.
    const zoomableElements = document.querySelectorAll('.zoomable');
    zoomableElements.forEach((element) => setupZoom(element));
    });

})(document);