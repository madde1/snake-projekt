var elBackgroundVolume = document.getElementById('backgroundMusicVolume');
var elSoundVolume = document.getElementById('soundEffectsVolume');
var elBackgroundVolumeText = document.getElementById('backgroundMusicVolumeText');
var elSoundVolumeText = document.getElementById('soundEffectsVolumeText');

updateText();

function updateText() {
    elBackgroundVolumeText.innerText = "Bakgrundsmusik(" + Math.floor(elBackgroundVolume.value*100) + "): ";
    elSoundVolumeText.innerText = "Ljudeffekter: (" + Math.floor(elSoundVolume.value*100) + "): ";

    backgroundMusicVolume = elBackgroundVolume.value;
    soundEffectsVolume = elSoundVolume.value;

}

elBackgroundVolume.addEventListener('input', updateText);
elSoundVolume.addEventListener('input', updateText);