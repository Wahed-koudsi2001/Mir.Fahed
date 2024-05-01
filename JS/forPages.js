const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

function fetchData() {
    return fetch('../database/cards.json')
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
}

function displayObjectById() {
    const displayDiv = document.getElementById('displayData');
    fetchData()
        .then(data => {
            const object = data.find(obj => obj.id === id);
            if (object) {
                document.title = object.title;

                let html = `
                    <div class="box-for-page">
                        <img class="for-pages-image" src="${object.logo}" alt="logo">
                        <div>
                            <p class="title">${object.title}</p>
                            <span>${object.allOffers.length + object.allCoupon.length} كوبونات وعروض | <i class="fa-solid fa-circle-check" style="color: #9FFF1A;"></i> ${object.allOffers.length + object.allCoupon.length} محقق لعام 2024</span>
                        <div id="the-tabs">
                            <div onclick="showTab('all')" class="tab active-tab" data-tab="all">
                                الكل (${object.allCoupon.length + object.allOffers.length})
                            </div>
                            <div onClick="showTab('coupons')" class="tab" data-tab="coupons">كوبونات (${object.allCoupon.length})</div>
                            <div onclick="showTab('offers')" class="tab" data-tab="offers">عروض (${object.allOffers.length})</div>
                        </div>
                        </div>
                    </div>

                    <div class="another-data">
                        <table class="store-table">
                            <tbody>
                                <tr>
                                    <td>عدد الكوبونات</td>
                                    <td class="count-coup">${object.allCoupon.length}</td>
                                </tr>
                                <tr>
                                    <td>عدد العروض</td>
                                    <td class="count-off">${object.allOffers.length}</td>
                                </tr>
                                <tr>
                                    <td>أفضل كود خصم</td>
                                    <td class="offer-clone">${object.codeOfDiscount}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="all-coupon">
                `;

                object.allCoupon.forEach((discount, index) => {
                    html += `
                        <div class="offcop coupons">
                            <div class="coptop"> 
                                <div class="coptitle">
                                    <strong>خصم ${discount.discount}%</strong>
                                    <h2>${discount.titleOfDiscount}</h2> 
                                </div>
                                <div class="coupcodes">  
                                    <button onclick="copyDiscount(this, '${object.codeOfDiscount}')" class="copycoup">نسخ</button>
                                    <input class="coupcode" aria-label="Cuopon" type="text"  value=${object.codeOfDiscount}>
                                </div>  
                            </div>
                            <div class="tafaseel">
                                <button class="more-info" aria-label="More Infor" onclick="toggleShowInfo('allCoupon', ${index})"><span></span></button>
                                <strong></strong>
                            </div>
                            <div class="show-info hidden" id="show-info-allCoupon-${index}">${discount.showInfoHidden}</div>    
                        </div>
                    `;
                });

                object.allOffers.forEach((discount, index) => {

                    html += `
                        <div class="offcop offers">
                            <div class="coptop"> 
                                <div class="coptitle">
                                    <strong>خصم ${discount.discount}%</strong>
                                    <h2>${discount.titleOfDiscount}</h2> 
                                </div>
                                <div class="coupcodes">  
                                    <button onclick="copyDiscount(this, '${object.codeOfDiscount}')" class="copycoup">نسخ</button>
                                    <input class="coupcode" aria-label="Cuopon" type="text"  value=${object.codeOfDiscount}>
                                </div>  
                            </div>
                            <div class="tafaseel">
                                <button class="more-info" aria-label="More Infor" onclick="toggleShowInfo('allOffers', ${index})"><span></span></button>
                                <strong></strong>
                            </div>
                            <div class="show-info hidden" id="show-info-allOffers-${index}">${discount.showInfoHidden}</div>    
                        </div>
                    `;
                });

                html += `
                    <div class="coupons-offers-table">
                        <table class="tuy table" data-action="ClickOnOfferTable">
                            <tbody>
                                <tr>
                                    <th class="sp_col1">الكوبونات والعروض</th>
                                    <th class="sp_col2">كود الخصم</th>
                                </tr>
                `;
                object.tableCouponsOffers.forEach((offer) => {
                    html += `
                        <tr>
                            <td>${offer}</td>
                            <td class="b"><strong>${object.codeOfDiscount}</strong></td>
                        </tr>`;
                });

                html += `
                            </tbody>
                        </table>
                    </div>
                `;

                html += `
                    <div class="coupons-offers-table">
                        <table class="tuy table" data-action="ClickOnOfferTable" style="text-align: center;">
                            <tbody>
                                <tr>
                                    <th class="sp_col1">جدول بأقوى كوبونات ${object.title}</th>
                                    <th class="sp_col2">الخصم</th>
                                    <th class="sp_col3">الرمز</th>
                                </tr>
                                <tr>
                                    <td><b>تفاصيل كود الخصم</b></td>
                                    <td class="b"><strong>قيمة الخصم</strong></td>
                                    <td class="b"><strong>رمز كود الخصم</strong></td>
                                </tr>
                `;

                object.tableForBigCoupons.forEach((coupon) => {
                    html += `
                        <tr>
                            <td>${coupon.title}</td>
                            <td>${coupon.discount}%</td>
                            <td>${object.codeOfDiscount}</td>
                        </tr>
                        `;
                });

                html += `
                            </tbody>
                        </table>
                    </div>
                `;

                html += `
                        </div>
                    </div>
                `;



                displayDiv.innerHTML = html;

            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayDiv.innerHTML = "Error fetching data.";
        });
}

function showTab(tab) {
    const allOffers = document.querySelectorAll(".offers");
    const allCoupons = document.querySelectorAll(".coupons");

    allCoupons.forEach(coupon => {
        coupon.style.display = "none";
    });
    allOffers.forEach(offer => {
        offer.style.display = "none";
    });

    if (tab === "coupons") {
        allCoupons.forEach(coupon => {
            coupon.style.display = "block";
        });
    } else if (tab === "offers") {
        allOffers.forEach(offer => {
            offer.style.display = "block";
        });
    } else {
        allCoupons.forEach(coupon => {
            coupon.style.display = "block";
        });
        allOffers.forEach(offer => {
            offer.style.display = "block";
        });
    }

    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(t => {
        t.classList.remove("active-tab");
    });
    const activeTab = document.querySelector(`.tab[data-tab=${tab}]`);
    activeTab.classList.add("active-tab");
}

function copyDiscount(button, code) {
    const originalText = button.textContent;
    const tempInput = document.createElement('input');
    tempInput.value = code;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    button.textContent = 'تم النسخ';
    setTimeout(function () {
        button.textContent = originalText;
    }, 1000);
}

function toggleShowInfo(type, index) {
    const showInfo = document.getElementById(`show-info-${type}-${index}`);
    showInfo.classList.toggle('hidden');
}

displayObjectById();

async function fetchLogos() {
    try {
        const response = await fetch('../database/cards.json');
        return await response.json();
    } catch (error) {
        return console.error('Error fetching data:', error);
    }
}

function displayLogosById() {
    const displayDiv2 = document.getElementById('dispalyLogos');
    fetchLogos()
        .then(data => {

            if (Array.isArray(data)) {
                let html = '';
                data.forEach(logoObj => {
                    html += `<img src="${logoObj.logo}" alt="" data-id="${logoObj.id}">`;
                });
                displayDiv2.innerHTML = html;
                const logos = displayDiv2.querySelectorAll('img');
                logos.forEach(logo => {
                    logo.addEventListener('click', () => {
                        window.location.href = `discount-code.html?id=${logo.dataset.id}`;
                    });
                });
            }
        })
}

displayLogosById();
