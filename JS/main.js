function moreLabels() { const containers = document.querySelectorAll(".post-details .labels"); containers.forEach(container => { const spans = container.querySelectorAll("span"); if (spans.length > 1) { const div = document.createElement("div"); container.classList.add("there-more"); div.classList.add("countries"); for (let i = 1; i < spans.length; i++) { if (spans[i].textContent.includes("$")) { spans[i].classList.add("notplot") } div.appendChild(spans[i]) } container.appendChild(div) } }) }

var currentURL = window.location.href; currentURL = currentURL.replace("?m=1", ""); var links = document.querySelectorAll("#PageList404 li a"); for (var i = 0; i < links.length; i++) { var link = links[i]; if (link.href === currentURL) { link.parentNode.classList.add("current-page") } }

var mbmaxresult = document.getElementById("max-results") !== null ? document.getElementById("max-results").innerHTML : 12;

window.addEventListener("scroll", function () { var o = document.querySelector("#top-button"); window.scrollY >= 150 ? o.classList.add("active-scroll") : o.classList.remove("active-scroll") }); function scrollToTop() { window.scrollTo({ top: 0 }) }


var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 5000,
    },
});

const dataDiv = document.getElementById('data');
const loadMoreBtn = document.getElementById('loadMore');
let loadedBoxes = 12;
const jsonDataUrl = '../database/cards.json';

function renderBoxes(data) {
    let html = "";
    data.slice(0, loadedBoxes).forEach((el) => {
        let countriesText = "";
        if (el.countries.length === 1) {
            countriesText = el.countries[0];
        } else if (el.countries.length > 1) {
            countriesText = el.countries[0] + " ... واكثر";
        }
        html +=
            `
                <div class="box" data-id="${el.id}">
                    <div class="first-col">
                        <img src="${el.logo}" alt="logo">
                        <span>${el.title}</span>
                    </div>
                   <div class="second-col">
                        <div>
                            <i class="fa-solid fa-location-dot"></i>
                            <span>${countriesText}</span>
                        </div>
                        <div>
                            <i class="fa-solid fa-receipt"></i>
                            <span>عرض الكوبون</span>
                        </div>
                   </div>
                </div>
                `;
    });

    dataDiv.innerHTML = html;

    // Add event listener to each box
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('click', function () {
            const id = this.dataset.id;
            window.location.href = `../pages/discount-code.html?id=${id}`;
        });
    });

    if (loadedBoxes >= data.length) {
        loadMoreBtn.style.display = 'none';
    }
}

function loadMoreBoxes(data) {
    loadedBoxes += 12;
    renderBoxes(data);
}

fetch(jsonDataUrl)
    .then(res => res.json())
    .then(data => {
        renderBoxes(data);

        loadMoreBtn.addEventListener('click', () => {
            loadMoreBoxes(data);
        });
    })
    .catch(error => console.error('Error fetching data:', error));