// ======================================================
// TOPIC SLIDE DATA
// ======================================================

const topicSlides = {

  // ====================================================
  // TOPIC 1
  // ====================================================

  1: [
    {
      video: "./assets/videos/slide-1.mp4",
      text: "Throwing paper here & there",
    },

    {
      video: "./assets/videos/slide-2.mp4",
      text: "Keeping the room neat and clean",
    },

    {
      video: "./assets/videos/slide-3.mp4",
      text: "Placing books properly on the shelf",
    },

    {
      video: "./assets/videos/slide-4.mp4",
      text: "Wiping the table after work",
    },
  ],


  // ====================================================
  // TOPIC 2
  // ====================================================

  2: [
    {
      video: "./assets/videos/slide-5.mp4",
      text: "Putting toys back in their place",
    },

    {
      video: "./assets/videos/slide-6.mp4",
      text: "Folding clothes nicely after use",
    },

    {
      video: "./assets/videos/slide-7.mp4",
      text: "Keeping shoes in the shoe rack",
    },

    {
      video: "./assets/videos/slide-8.mp4",
      text: "Throwing waste in the dustbin",
    },
  ],


  // ====================================================
  // TOPIC 3
  // ====================================================

  3: [
    {
      video: "./assets/videos/slide-9.mp4",
      text: "Watering plants with care",
    },

    {
      video: "./assets/videos/slide-10.mp4",
      text: "Helping in cleaning the study table",
    },

    {
      video: "./assets/videos/slide-11.mp4",
      text: "Keeping bags in the correct place",
    },

    {
      video: "./assets/videos/slide-12.mp4",
      text: "Closing books after reading",
    },

    {
      video: "./assets/videos/slide-13.mp4",
      text: "Organizing pencils and stationery",
    },

    {
      video: "./assets/videos/slide-14.mp4",
      text: "Arranging cushions and chairs properly",
    },

    {
      video: "./assets/videos/slide-15.mp4",
      text: "Cleaning up after finishing work",
    },

    {
      video: "./assets/videos/slide-16.mp4",
      text: "Living neatly every day",
    },
  ],


  // ====================================================
  // TOPIC 4
  // ====================================================

  4: [
    {
      video: "./assets/videos/slide-17.mp4",
      langKey: "slide-4.1",
    },

    {
      video: "./assets/videos/slide-18.mp4",
      langKey: "slide-4.2",
    },
  ],

};


// ======================================================
// TOPIC 4 SLIDE TEXT
// ======================================================

const slideTranslations = {

  English: {
    "slide-4.1": "Your English line for slide 17",
    "slide-4.2": "Your English line for slide 18",
  },

  Hindi: {
    "slide-4.1": "स्लाइड 17 के लिए हिंदी वाक्य",
    "slide-4.2": "स्लाइड 18 के लिए हिंदी वाक्य",
  },

  Gujrati: {
    "slide-4.1": "સ્લાઇડ 17 માટે ગુજરાતી વાક્ય",
    "slide-4.2": "સ્લાઇડ 18 માટે ગુજરાતી વાક્ય",
  },

};


// ======================================================
// DOM ELEMENTS
// ======================================================

const videoWrapper =
  document.getElementById("video-swiper-wrapper");

const contentWrapper =
  document.getElementById("content-swiper-wrapper");

const prevBtn =
  document.querySelector(".prev-btn");

const nextBtn =
  document.querySelector(".next-btn");

const topicButtons =
  document.querySelectorAll(".topic");

const swiperSection =
  document.querySelector(".custom-swiper-section");

const languageButtons =
  document.querySelectorAll(
    ".language-container div"
  );

const pranamLink =
  document.querySelector(".pranam-link");


// ======================================================
// CURRENT DATA
// ======================================================

let slidesData = [];

let currentTopic = null;


// ======================================================
// CREATE EMPTY SWIPERS
// ======================================================

const videoSwiper = new Swiper(".video-swiper", {

  effect: "fade",

  fadeEffect: {
    crossFade: true,
  },

  speed: 600,

  allowTouchMove: false,

  autoHeight: false,

  observer: true,

  observeParents: true,

});


const contentSwiper = new Swiper(".content-swiper", {

  effect: "fade",

  fadeEffect: {
    crossFade: true,
  },

  speed: 600,

  allowTouchMove: false,

  autoHeight: true,

  observer: true,

  observeParents: true,

});


// ======================================================
// PAUSE ALL VIDEOS
// ======================================================

function pauseAllVideos() {

  const allVideos =
    document.querySelectorAll(
      ".video-slide-inner video"
    );


  allVideos.forEach((video) => {

    video.pause();

    try {

      video.currentTime = 0;

    } catch (error) {

      // Ignore

    }

  });

}


// ======================================================
// PLAY ACTIVE VIDEO
// ======================================================

function playActiveVideo(index) {

  const activeVideo =
    document.querySelector(
      `.video-swiper .swiper-slide[data-slide-index="${index}"] video`
    );


  if (!activeVideo) return;


  try {

    activeVideo.currentTime = 0;

  } catch (error) {

    // Ignore

  }


  const playPromise =
    activeVideo.play();


  if (playPromise !== undefined) {

    playPromise.catch(() => {

      // Autoplay may be blocked

    });

  }

}


// ======================================================
// HIDE PRANAM LINK
// ======================================================

function hidePranamLink() {

  if (!pranamLink) return;

  pranamLink.classList.remove("show");

  pranamLink.style.display = "none";
  pranamLink.style.opacity = "0";
  pranamLink.style.visibility = "hidden";
  pranamLink.style.pointerEvents = "none";

}


// ======================================================
// SHOW PRANAM LINK
// ======================================================

function showPranamLink() {

  if (!pranamLink) return;

  pranamLink.classList.add("show");

  pranamLink.style.display = "flex";
  pranamLink.style.opacity = "1";
  pranamLink.style.visibility = "visible";
  pranamLink.style.pointerEvents = "auto";

}


// ======================================================
// UPDATE PRANAM LINK
// SHOW ONLY ON slide-16.mp4
// ======================================================

function updatePranamLink(index) {

  // Always hide first
  hidePranamLink();


  if (!slidesData.length) return;

  if (!slidesData[index]) return;


  const currentSlide =
    slidesData[index];


  // Show ONLY on slide-16.mp4
  if (
    currentSlide.video &&
    currentSlide.video.includes("slide-16.mp4")
  ) {

    showPranamLink();

  }

}


// ======================================================
// UPDATE PREVIOUS / NEXT BUTTON
// ======================================================

function updateButtons(index) {

  if (!slidesData.length) {

    hidePranamLink();

    return;

  }


  // ====================================================
  // PREVIOUS BUTTON
  // ====================================================

  if (prevBtn) {

    const isFirstSlide =
      index === 0;


    prevBtn.classList.toggle(
      "disabled",
      isFirstSlide
    );


    prevBtn.disabled =
      isFirstSlide;

  }


  // ====================================================
  // NEXT BUTTON
  // ====================================================

  if (nextBtn) {

    const isLastSlide =
      index === slidesData.length - 1;


    nextBtn.classList.toggle(
      "disabled",
      isLastSlide
    );


    nextBtn.disabled =
      isLastSlide;

  }


  // ====================================================
  // PRANAM LINK
  // ====================================================

  updatePranamLink(index);

}


// ======================================================
// GET CURRENT LANGUAGE
// ======================================================

function getCurrentLanguage() {

  const storageKey =
    typeof STORAGE_KEY !== "undefined"
      ? STORAGE_KEY
      : "selectedLanguage";


  return (
    localStorage.getItem(storageKey) ||
    "English"
  );

}


// ======================================================
// FILL MISSING LANGUAGE TEXT
// ======================================================

function fillMissingLangText(language) {

  if (!contentWrapper) return;


  const dictionary =
    slideTranslations[language] ||
    slideTranslations.English;


  contentWrapper
    .querySelectorAll("[data-lang-key]")
    .forEach((element) => {

      if (element.textContent.trim()) {

        return;

      }


      const key =
        element.getAttribute(
          "data-lang-key"
        );


      element.textContent =
        dictionary[key] || "";

    });

}


// ======================================================
// REFRESH CURRENT LANGUAGE
// ======================================================

function refreshCurrentLanguage() {

  const language =
    getCurrentLanguage();


  if (contentWrapper) {

    contentWrapper
      .querySelectorAll("[data-lang-key]")
      .forEach((element) => {

        element.textContent = "";

      });

  }


  if (
    typeof applyLanguage === "function"
  ) {

    applyLanguage(language);

  }


  fillMissingLangText(language);

}


// ======================================================
// CREATE TOPIC SLIDES
// ======================================================

function createTopicSlides(topicNumber) {

  const selectedSlides =
    topicSlides[topicNumber];


  if (!selectedSlides) {

    return;

  }


  // Save current topic
  currentTopic =
    topicNumber;


  // Save current slides
  slidesData =
    selectedSlides;


  // Hide Pranam link when topic changes
  hidePranamLink();


  // Stop old videos
  pauseAllVideos();


  // Remove old slides
  videoSwiper.removeAllSlides();

  contentSwiper.removeAllSlides();


  const videoSlides = [];

  const contentSlides = [];


  selectedSlides.forEach(
    (slide, index) => {


      // ==================================================
      // VIDEO SLIDE
      // ==================================================

      videoSlides.push(`
        <div
          class="swiper-slide"
          data-slide-index="${index}"
        >

          <div class="video-slide-inner">

            <video
              playsinline
              muted
              preload="metadata"
            >

              <source
                src="${slide.video}"
                type="video/mp4"
              />

            </video>

          </div>

        </div>
      `);


      // ==================================================
      // CONTENT
      // ==================================================

      let contentHTML = "";


      if (slide.langKey) {

        contentHTML = `
          <p
            data-lang-key="${slide.langKey}"
          ></p>
        `;

      } else {

        contentHTML = `
          <p>
            ${slide.text}
          </p>
        `;

      }


      contentSlides.push(`
        <div
          class="swiper-slide"
          data-slide-index="${index}"
        >

          <div class="content-slide-inner">

            ${contentHTML}

          </div>

        </div>
      `);

    }
  );


  // ====================================================
  // ADD SLIDES
  // ====================================================

  videoSwiper.appendSlide(
    videoSlides
  );


  contentSwiper.appendSlide(
    contentSlides
  );


  videoSwiper.update();

  contentSwiper.update();


  // ====================================================
  // START FROM FIRST SLIDE
  // ====================================================

  videoSwiper.slideTo(
    0,
    0
  );


  contentSwiper.slideTo(
    0,
    0
  );


  refreshCurrentLanguage();


  pauseAllVideos();

  playActiveVideo(0);


  updateButtons(0);

}


// ======================================================
// OPEN TOPIC SWIPER
// ======================================================

function openTopicSwiper(topicNumber) {

  createTopicSlides(
    topicNumber
  );


  if (swiperSection) {

    swiperSection.classList.add(
      "active"
    );

  }

}


// ======================================================
// TOPIC BUTTON CLICKS
// ======================================================

topicButtons.forEach((topic) => {

  topic.addEventListener(
    "click",
    (event) => {

      event.preventDefault();


      hidePranamLink();


      const topicNumber =
        Number(
          topic.dataset.topic
        );


      topicButtons.forEach(
        (item) => {

          item.classList.remove(
            "active"
          );

        }
      );


      topic.classList.add(
        "active"
      );


      openTopicSwiper(
        topicNumber
      );

    }
  );

});


// ======================================================
// LANGUAGE BUTTON CLICKS
// ======================================================

languageButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        setTimeout(
          () => {

            refreshCurrentLanguage();

          },
          0
        );

      }
    );

  }
);


// ======================================================
// PREVIOUS BUTTON
// ======================================================

if (prevBtn) {

  prevBtn.addEventListener(
    "click",
    () => {

      const currentIndex =
        contentSwiper.activeIndex;


      if (currentIndex <= 0) {

        return;

      }


      goToSlide(
        currentIndex - 1
      );

    }
  );

}


// ======================================================
// NEXT BUTTON
// ======================================================

if (nextBtn) {

  nextBtn.addEventListener(
    "click",
    () => {

      const currentIndex =
        contentSwiper.activeIndex;


      if (
        currentIndex >=
        slidesData.length - 1
      ) {

        return;

      }


      goToSlide(
        currentIndex + 1
      );

    }
  );

}


// ======================================================
// GO TO SLIDE
// ======================================================

function goToSlide(index) {

  if (
    index < 0 ||
    index >= slidesData.length
  ) {

    return;

  }


  pauseAllVideos();


  // Update pranam immediately
  updatePranamLink(index);


  videoSwiper.slideTo(
    index
  );


  contentSwiper.slideTo(
    index
  );


  updateButtons(
    index
  );

}


// ======================================================
// VIDEO TRANSITION START
// ======================================================

videoSwiper.on(
  "slideChangeTransitionStart",
  () => {

    pauseAllVideos();

  }
);


// ======================================================
// VIDEO TRANSITION END
// ======================================================

videoSwiper.on(
  "slideChangeTransitionEnd",
  () => {

    const activeIndex =
      videoSwiper.activeIndex;


    playActiveVideo(
      activeIndex
    );


    updateButtons(
      activeIndex
    );


    updatePranamLink(
      activeIndex
    );

  }
);


// ======================================================
// CONTENT SWIPER CHANGE
// ======================================================

contentSwiper.on(
  "slideChange",
  () => {

    const activeIndex =
      contentSwiper.activeIndex;


    if (
      videoSwiper.activeIndex !==
      activeIndex
    ) {

      videoSwiper.slideTo(
        activeIndex
      );

    }


    updateButtons(
      activeIndex
    );


    updatePranamLink(
      activeIndex
    );

  }
);


// ======================================================
// CONTENT TRANSITION END
// Extra safety to ensure Pranam appears
// ======================================================

contentSwiper.on(
  "slideChangeTransitionEnd",
  () => {

    const activeIndex =
      contentSwiper.activeIndex;


    updatePranamLink(
      activeIndex
    );

  }
);


// ======================================================
// PRANAM LINK CLICK
// ======================================================

if (pranamLink) {

  pranamLink.addEventListener(
    "click",
    () => {

      hidePranamLink();

    }
  );

}


// ======================================================
// INITIAL STATE
// ======================================================

window.addEventListener(
  "load",
  () => {

    // Swiper closed initially
    if (swiperSection) {

      swiperSection.classList.remove(
        "active"
      );

    }


    // Pranam hidden initially
    hidePranamLink();

  }
);