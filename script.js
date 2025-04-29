const imageInput = document.getElementById('image-input');
const photo = document.getElementById('photo');
const placeholderText = document.getElementById('placeholder-text');
const photoFrame = document.getElementById('photo-frame');
const toggleFrameBtn = document.getElementById('toggle-frame');
const audioPlayer = document.getElementById('audio-player');
const musicInput = document.getElementById('music-input');
const startSlideshowBtn = document.getElementById('start-slideshow');
const stopSlideshowBtn = document.getElementById('stop-slideshow');

let isVertical = true;
let images = [];
let currentIndex = 0;
let slideshowInterval;

// Maneja el cambio en el input de imágenes
imageInput.addEventListener('change', (e) => {
  images = Array.from(e.target.files).map(file => URL.createObjectURL(file));
  if (images.length > 0) {
    currentIndex = 0;
    showImage(currentIndex);
    placeholderText.style.display = 'none'; // Oculta el texto de marcador de posición
  }
});

// Muestra la imagen en el marco
function showImage(index) {
  if (images.length > 0) {
    photo.src = images[index];
    photo.classList.remove('hidden'); // Asegúrate de que la imagen no esté oculta
    adjustFrameSize(images[index]);
  }
}

// Ajusta el tamaño del marco según la imagen
function adjustFrameSize(imageSrc) {
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    if (img.width > img.height) {
      photoFrame.classList.remove('frame-vertical');
      photoFrame.classList.add('frame-horizontal');
    } else {
      photoFrame.classList.remove('frame-horizontal');
      photoFrame.classList.add('frame-vertical');
    }
  };
}

// Inicia la presentación de diapositivas
startSlideshowBtn.addEventListener('click', () => {
  if (images.length > 0) {
    clearInterval(slideshowInterval);
    slideshowInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }, 7000); // Cambia la imagen cada 7 segundos
    startSlideshowBtn.classList.add('hidden');
    stopSlideshowBtn.classList.remove('hidden');
  }
});

// Detiene la presentación de diapositivas
stopSlideshowBtn.addEventListener('click', () => {
  clearInterval(slideshowInterval);
  stopSlideshowBtn.classList.add('hidden');
  startSlideshowBtn.classList.remove('hidden');
});

// Cambia la orientación del marco
toggleFrameBtn.addEventListener('click', () => {
  isVertical = !isVertical;
  if (isVertical) {
    photoFrame.classList.remove('frame-horizontal');
    photoFrame.classList.add('frame-vertical');
    toggleFrameBtn.innerHTML = '<i class="fas fa-arrows-alt-v"></i> Marco Vertical';
    toggleFrameBtn.setAttribute('aria-pressed', 'false');
  } else {
    photoFrame.classList.remove('frame-vertical');
    photoFrame.classList.add('frame-horizontal');
    toggleFrameBtn.innerHTML = '<i class="fas fa-arrows-alt-h"></i> Marco Horizontal';
    toggleFrameBtn.setAttribute('aria-pressed', 'true');
  }
});

// Maneja la carga de música
musicInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    audioPlayer.play();
  }
});
