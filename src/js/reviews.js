import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swiper from 'swiper';
let data;
new Swiper('.swiper-container');
fetchData();


function renderItems(data) {
  const slider = document.querySelector('.swiper-wrapper');
  const markup = data
    .map(
      ({ author, avatar_url, review }) =>
        `
           <div class="swiper-slide slider-item">
                <img class="slider-item-img" src="${avatar_url}">
                <p class="slider-item-title">${author}</p>
                <p class="slider-item-info">${review}</p>
            </div>             
            `
    )
    .join('');

  slider.insertAdjacentHTML('beforeend', markup);
}

async function getData() { 
  try {
    const response = await axios.get(
      'https://portfolio-js.b.goit.study/api/reviews'
    );
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something wrong, try again later!',
    });
    throw error;
  }
}

async function fetchData() {
  try {
    data = await getData();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something wrong, try again later!',
    });
  }
  console.log(data);
  renderItems(data);
}
