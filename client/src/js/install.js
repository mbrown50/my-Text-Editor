const butInstall = document.getElementById('buttonInstall');
const textHeader = document.getElementById('textHeader');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event - done
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installBtn.style.visibility = 'visible';
    textHeader.textContent = 'Click the button to install!';

    installBtn.addEventListener('click', () => {
        event.prompt();
        installBtn.setAttribute('disabled', true);
        installBtn.textContent = 'Installed!';
    });
});

// TODO: Implement a click event handler on the `butInstall` element - done

// TODO: Add an handler for the `appinstalled` event - done
window.addEventListener('appinstalled', (event) => {
    textHeader.textContent = 'Successfully installed!';
    console.log('👍', 'appinstalled', event)
});
