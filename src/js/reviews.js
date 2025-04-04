import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
let data;
fetchData();

function renderItems(data) {
  const slider = document.querySelector('.swiper-wrapper');
  const markup = data
    .map(
      ({ author, avatar_url, review }) =>
        `
           <div class="swiper-slide">
                <img src="${avatar_url}">
                <h4>${author}</h4>
                <p>${review}</p>
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
