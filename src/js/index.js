import '../css/styles.css';
import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"; 

new SimpleLightbox('.gallery a', {
  captionType: "attr",
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
  enableKeyboard: true,
  docClose: true,
  scaleImageToRatio: true,
});

const refs = {
  searchForm: document.querySelector('.search-form'),
  userInput: document.querySelector('input'),
  buttonSearch: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
  buttonLoadMore: document.querySelector('.load-more'),
};

const notify = {
  succes: (response) => {
    Notiflix.Notify.success(`Hooray! We found the ${response.data.totalHits} images of ${refs.userInput.value}`);
  },
  failure: () => {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  },
  empty: () => {
    Notiflix.Notify.info('The input of search are empty. Please, type your request!');
  },
  error: (error) => {
    Notiflix.Notify.failure(error);
  },
  end: () => {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  },
};

const fetchOptions = {
  pixabayGet: 'https://pixabay.com/api/?',
  key: '32352574-5bc542a713dc09dea2d440a15',
  q: refs.userInput,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
  page: 1,
};

refs.searchForm.addEventListener('submit', onInput);
refs.gallery.addEventListener('click', onFotoClick); // prevent go by foto link
refs.buttonLoadMore.addEventListener('click', onLoadMore);
refs.userInput.addEventListener('input', clearPage);

function urlLine() {
  return `${fetchOptions.pixabayGet}key=${fetchOptions.key}&q=${fetchOptions.q.value.trim()}&image-type=${fetchOptions.image_type}&orientation=${fetchOptions.orientation}&safesearch=${fetchOptions.safesearch}&per_page=${fetchOptions.per_page}&page=${fetchOptions.page}`;
}

async function onInput(e) { 
  e.preventDefault();
  try {

    if (refs.userInput.value == '' || refs.userInput.value == ' ') {
      clearHTML();
      refs.buttonLoadMore.classList.add('visually-hidden');
      notify.empty();
    }
    
    else {
      const response = await axios.get(urlLine());
      
      if (response.data.totalHits === 0) {
        notify.failure();
        refs.buttonLoadMore.classList.add('visually-hidden');
        clearHTML();
      }

      else {
        refs.gallery.insertAdjacentHTML('beforeend',
          renderCard(response.data.hits));
        
        console.log(response);
        console.log(response.data.hits);

        if (response.data.totalHits > fetchOptions.per_page) {
          refs.buttonLoadMore.classList.remove('visually-hidden');
        }
        
        if (fetchOptions.page === 1) {
          notify.succes(response);
        }

        theGalleryEnd(response); 
      }
    }
  } catch (error) {
    notify.error(error);
  }
}

function onLoadMore(e) {
  fetchOptions.page += 1;
  onInput(e);
}

function renderCard(obj) {
  return obj.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
    return `
  <div class="photo-card">
      <a href="${largeImageURL}"> <img src="${webformatURL}" alt="${tags }" loading="lazy" /> </a>
     <div class="info">
    <p class="info-item">
      <b>Likes </b>
      <span>${ likes } </span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${ views }</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${ comments }</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${ downloads } </span>
    </p>
  </div>
</div>
`;
  }).join('');
}

function clearHTML() {
    refs.gallery.innerHTML = '';
    refs.gallery.innerHTML = '';
}

function clearPage() {
  if (refs.userInput.value == '' || refs.userInput.value.length == 1) {
    setTimeout(() => { 
    clearHTML();
    refs.buttonLoadMore.classList.add('visually-hidden');
    fetchOptions.page = 1;}, 700);
  }
}

function theGalleryEnd(response) {
if (response.data.totalHits / (fetchOptions.page * fetchOptions.per_page) < 1 && fetchOptions.page > 1) {
          refs.buttonLoadMore.classList.add('visually-hidden');
          notify.end();
        }
}

function onFotoClick(e) {
  e.preventDefault();
}

const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});