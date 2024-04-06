// Service Worker registration code

export const registerSW = () => {
    // Check that service workers are supported
  if ('serviceWorker' in navigator) {
      // Use the window load event to keep the page load performant
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
      // added from index.js
      //navigator.serviceWorker
      //.register('./src-sw.js')
      //.then((register) => console.log(register));
    }
  };
