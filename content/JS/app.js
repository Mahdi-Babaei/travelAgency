const $ = document
const menuBtn = $.querySelector("#menuBar")
const rightSideMobile = $.querySelector("#rightMobileMenu")
const menuCloseBtn = $.querySelector("#menuCloseX")
const overlay = $.querySelector(".overlay")
const themeTogglers = $.querySelectorAll("#theme-toggler")
const popularDivElems = $.querySelectorAll(".popular div")
const whyUsImg = $.querySelector("#whyUsImg")
const bestSellerDivElems = $.querySelectorAll("#bestSellerDivElems div")
const toursTab = $.querySelectorAll("#toursTab h4")
const ourAppImg = $.querySelector("#ourAppImg")
const commentBoxWrapper = $.querySelectorAll("#commentBoxWrapper div")
const showMoreBtn = $.querySelector("#showMoreBtn")
const dateSearchBtn = $.querySelector("#dateSearchBtn")
let tourID = null
let isMenuOpen = false
let theme = document.documentElement.className
let themeLS = localStorage.getItem("theme")
let toastTextColor , toastBackgroundColor = null



// Moblie Menu
menuBtn.addEventListener("click" , () => {
    if (!isMenuOpen) {
        rightSideMobile.classList.remove("-right-2/3")
        rightSideMobile.classList.add("right-0")
        overlay.classList.remove("overlay-invisible")
        overlay.classList.add("overlay-visible")
        isMenuOpen = true
    }
})

menuCloseBtn.addEventListener("click" , () => {
    if (isMenuOpen) {
        rightSideMobile.classList.remove("right-0")
        rightSideMobile.classList.add("-right-2/3")
        overlay.classList.remove("overlay-visible")
        overlay.classList.add("overlay-invisible")
        isMenuOpen = false
    }
})


// Theme Toggler
window.onload = () => {
    if (themeLS) {
        document.documentElement.className = themeLS
    } else {
        document.documentElement.className = 'light'
    }
    whyUsImgChanger()
    ourAppImgChanger()
}


themeTogglers.forEach(btn => {
    btn.addEventListener("click" , () => {
        if (document.documentElement.className === "light") {
            document.documentElement.className = "dark"
            theme = "dark"
        } else {
            document.documentElement.className = "light"
            theme = "light"
        }
        localStorage.setItem("theme" , theme)
        whyUsImgChanger()
        ourAppImgChanger()

    })
})



// Popular Grid
popularDivElems.forEach(div => {
    placeGeneratorFunc(div)
})

// Why us ? 
function whyUsImgChanger () {
    if (document.documentElement.className.includes("dark")) {
        whyUsImg.classList.remove("xl:bg-[url('../images/earth.png')]")
        whyUsImg.classList.add("xl:bg-[url('../images/earthDark.svg')]")
    } else {
        whyUsImg.classList.remove("xl:bg-[url('../images/earthDark.svg')]")
        whyUsImg.classList.add("xl:bg-[url('../images/earth.png')]")
    }
}

// Best Seller
bestSellerDivElems.forEach(div => {
    placeGeneratorFunc(div)
})

toursTab.forEach(tab => {
    tab.addEventListener("click" , () => {
        toursTab.forEach(tab => tab.classList.remove("activeTab"))
        tab.classList.add("activeTab")
        if (tab.dataset.id !== "allTours") {
            tourID = tab.dataset.id
            bestSellerDivElems.forEach(div => div.classList.remove("activeTours"))
            $.querySelectorAll(`#${tourID}`).forEach(div => div.classList.add("activeTours"))
        } else {
            bestSellerDivElems.forEach(div => div.classList.add("activeTours"))
        }
    })
})

function placeGeneratorFunc (div) {
    div.className = "bg-white dark:bg-[#1d1d1d] dark:text-[#fbfbfb] border border-[#404040]/25 dark:border-white/25 p-4 rounded-[36px] flex flex-col hidden activeTours"
    div.insertAdjacentHTML("beforeend" , `
            <img src="${div.dataset.imgsrc}" alt="" class="rounded-3xl">
            <div class="flex justify-between pb-2 pt-5">
                <h2 class="font-IranSansMedium text-3xl">${div.dataset.title}</h2>
                <div class="flex gap-x-2 items-center">
                    <svg class="w-5 h-5 text-yellow-400"><use href="#star"></use></svg>
                    <span class="font-RokhNum text-2xl pt-2">${div.dataset.star}</span>
                </div>
            </div>
            <span class="text-gray-400">${div.dataset.time}</span>
            <div class="flex justify-between items-center pt-10">
                <div class="flex items-center gap-x-2">
                    <h3 class="font-RokhNum text-4xl">${div.dataset.price}<span class="text-2xl pr-2">تومان</span></h3>
                    <span class="text-gray-400">هر فرد</span>
                </div>
                <div class="w-[50px] h-[50px] rounded-full bg-[#5264FF] flex items-center justify-center text-white">
                    <svg class="w-6 h-6 rotate-45"><use href="#x-mark"></use></svg>
                </div>
            </div>
        `)
}


// Download App
function ourAppImgChanger () {
    if ($.documentElement.className.includes("dark") && window.innerWidth > 390) { // desktop dark
        ourAppImg.setAttribute("src","content/images/bannerDark.png")
    } else if ($.documentElement.className.includes("light") && window.innerWidth !== 390) { // desktop light
        ourAppImg.setAttribute("src","content/images/banner.png")
    } else if ($.documentElement.className.includes("dark") && window.innerWidth === 390) { // mobile dark
        ourAppImg.setAttribute("src","content/images/bannerMobileDark.png")
    } else if ($.documentElement.className.includes("light") && window.innerWidth === 390) { // mobile light
        ourAppImg.setAttribute("src","content/images/bannerMobile.png")
    }
}

// Comments 
commentBoxWrapper.forEach(div => {
    commentBoxGeneratorFunc(div)
})
function commentBoxGeneratorFunc (div) {
    div.className = "bg-white dark:bg-[#1d1d1d] p-5 border border-[#404040]/25 dark:border-[#fbfbfb]/25 dark:text-[#fbfbfb] rounded-[40px] my-5"
    div.insertAdjacentHTML("beforeend" , `
                    <div class="flex flex-col gap-y-5">
                        <div class="flex gap-x-4 items-center">
                            <img src="${div.dataset.profile}" alt="" class="w-10 h-10 object-cover rounded-full">
                            <div>
                                <h2 class="text-[#5264FF] font-IranSansBold">${div.dataset.name}</h2>
                                <h4 dir="ltr" class="font-IranSans text-right text-[#3C3C43]/50 dark:text-[#bfbfbf]/50">${div.dataset.username}</h4>
                            </div>
                        </div>
                        <p class="font-IranSans text-lg">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
                        <div class="flex justify-between items-center text-[#3C3C43]/50 dark:text-[#bfbfbf]/50">
                            <span>${div.dataset.date}</span>
                            <div class="flex gap-x-4 child-hover:text-black transition-all child:cursor-pointer">
                                <svg class="w-5 h-5"><use href="#dislike"></use></svg>
                                <svg class="w-5 h-5"><use href="#like"></use></svg>
                            </div>
                        </div>
                    </div>
        `)
}

showMoreBtn.addEventListener("click" , (e) => {
    if (showMoreBtn.parentElement.className.includes("-mt-60")) {
        showMoreBtn.parentElement.classList.remove("-mt-60")
        showMoreBtn.parentElement.classList.remove("h-56")
        $.querySelector("#commentBoxWrapper").classList.remove("xl:h-[710px]")
        showMoreBtn.firstElementChild.textContent = "مشاهده کمتر"
    } else {
        showMoreBtn.parentElement.classList.add("-mt-60")
        showMoreBtn.parentElement.classList.add("h-56")
        $.querySelector("#commentBoxWrapper").classList.add("xl:h-[710px]")
        showMoreBtn.firstElementChild.textContent = "مشاهده همه"
    }
})

// date Search Btn
dateSearchBtn.addEventListener("click" , () => {
    if (theme === "dark") {
        toastBackgroundColor = "#333"
        toastTextColor = "#fff"
    } else {
        toastBackgroundColor = "#fff"
        toastTextColor = "#333"
    }
    Swal.fire({
        title: "این سرویس به طور موقت غیر فعال میباشد",
        icon: "error",
        timer: 3000,
        position: "top-end",
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        background: toastBackgroundColor,
        color: toastTextColor
    });
})

// Jalili Date picker
jalaliDatepicker.startWatch({
    minDate: "attr",
    maxDate: "attr",
    plusHtml: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>`,
    minusHtml: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 rotate-180"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>`,
});


// Swiper Slider
let swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
      },
  });