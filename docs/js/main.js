/* DIGITALMOD — vanilla JavaScript, no imports, packages or build step.
   Change WHATSAPP below to the academy's number (country code, digits only).
   Motion timing is controlled by --dur / --delay in animations.css. */
(() => {
  "use strict";
  const WHATSAPP = "94784450088";
  // Resolve from this script, so root domains AND repository subfolders work.
  const SITE_BASE = new URL("../", document.currentScript.src);
  const root = document.documentElement;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [
    ...scope.querySelectorAll(selector),
  ];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const systemDark = matchMedia("(prefers-color-scheme: dark)");
  const money = (value) => Number(value).toLocaleString("en-LK");
  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        /* Preferences remain in memory. */
      }
    },
  };
  let motionChoice = storage.get("dma-motion") !== "off";
  const motionAllowed = () => motionChoice && !reduced.matches;
  let pageController;
  let observer;
  let frame = 0;
  let parallaxElements = [];
  let syncHeroVideo = () => {};
  let toggleHeroVideo = () => {};
  let syncHeroScene = () => {};
  let heroFilmAsset = null; // One small MP4 cached in memory across page visits.
  let routeController;
  let currentURL = new URL(location.href);
  const newEntryKey = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  let currentEntryKey = history.state?.key || newEntryKey();
  const scrollPositions = new Map();
  let detailSource = null;
  let detailBusy = false;
  let detailTransition = Promise.resolve();
  const courseDialog = $("[data-course-dialog]");
  const detailPanel = $("[data-detail-panel]");
  const privacyDialog = $("[data-privacy-dialog]");

  // A callback is executed exactly once, even if the browser rejects a transition.
  async function transition(
    update,
    { fade = false, element = () => $("main"), onStart = () => {} } = {},
  ) {
    let called = false;
    const once = () => {
      if (!called) {
        called = true;
        return update();
      }
    };
    if (motionAllowed() && typeof document.startViewTransition === "function") {
      try {
        const animation = document.startViewTransition(once);
        onStart(animation);
        await animation.updateCallbackDone;
        await animation.finished.catch(() => {});
        return;
      } catch {
        return once();
      }
    }
    const oldMain = element();
    if (
      fade &&
      motionAllowed() &&
      oldMain?.animate &&
      oldMain.getClientRects().length
    ) {
      await oldMain
        .animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120 })
        .finished.catch(() => {});
    }
    await once();
    const newMain = element();
    if (
      fade &&
      motionAllowed() &&
      newMain?.animate &&
      newMain.getClientRects().length
    ) {
      await newMain
        .animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240 })
        .finished.catch(() => {});
    }
  }
  if (!document.startViewTransition) root.classList.add("no-view-transitions");

  // SYSTEM / LIGHT / DARK. OS changes apply only while System is selected.
  function applyTheme(choice) {
    if (!["system", "light", "dark"].includes(choice)) choice = "system";
    root.dataset.themeChoice = choice;
    root.dataset.theme =
      choice === "system" ? (systemDark.matches ? "dark" : "light") : choice;
    $$("[data-theme-picker]").forEach((picker) => {
      picker.value = choice;
    });
    $('meta[name="theme-color"]')?.setAttribute(
      "content",
      root.dataset.theme === "dark" ? "#15120b" : "#faf7ef",
    );
  }
  applyTheme(root.dataset.themeChoice || "system");
  document.addEventListener("change", (event) => {
    if (!event.target.matches("[data-theme-picker]")) return;
    const choice = event.target.value;
    storage.set("dma-theme", choice);
    void transition(() => applyTheme(choice));
  });
  systemDark.addEventListener("change", () => {
    if (root.dataset.themeChoice === "system") applyTheme("system");
  });

  // SESSION INTRO: deadline includes time spent parsing/loading assets.
  // CSS has its own 2.4s failsafe. Never make the visitor wait for a network request.
  function initialiseIntro() {
    const loader = $("[data-loader]");
    const pending = root.classList.contains("intro-pending");
    if (!pending || !motionAllowed()) {
      root.classList.remove("intro-pending");
      loader.hidden = true;
      return;
    }
    try {
      sessionStorage.setItem("dma-intro", "seen");
    } catch {
      /* No persistent session flag available. */
    }
    const surfaces = $$("body > header, body > main, body > footer");
    surfaces.forEach((element) => {
      element.inert = true;
    });
    const skip = $("[data-skip-intro]");
    skip.focus({ preventScroll: true });
    let done = false;
    let introTransition;
    let normalTimer;
    const started = Number(root.dataset.introStarted) || performance.now();
    const clean = () => {
      root.classList.remove("intro-pending");
      loader.hidden = true;
      surfaces.forEach((element) => {
        element.inert = false;
      });
      if (loader.contains(document.activeElement))
        $("main").focus({ preventScroll: true });
    };
    const deadlineTimer = setTimeout(
      () => {
        done = true;
        introTransition?.skipTransition();
        clean();
      },
      Math.max(0, 2350 - (performance.now() - started)),
    );
    const finish = async () => {
      if (done) return;
      done = true;
      clearTimeout(normalTimer);
      // A delayed script must not start a 450ms morph past the hard deadline.
      if (performance.now() - started > 1800) clean();
      else
        await transition(clean, {
          fade: true,
          element: () => loader,
          onStart: (animation) => {
            introTransition = animation;
          },
        });
      clearTimeout(deadlineTimer);
    };
    skip.addEventListener("click", finish, { once: true });
    normalTimer = setTimeout(
      finish,
      Math.max(0, 1600 - (performance.now() - started)),
    );
    reduced.addEventListener("change", () => {
      if (reduced.matches) {
        done = true;
        introTransition?.skipTransition();
        clearTimeout(normalTimer);
        clearTimeout(deadlineTimer);
        clean();
      }
    });
  }

  // REPLAYABLE SCROLL MOTION. The observer is recreated after each page change.
  function initialiseMotion() {
    observer?.disconnect();
    observer = null;
    root.dataset.motion = motionAllowed() ? "on" : "off";
    syncHeroVideo();
    const toggle = $("[data-motion-toggle]");
    toggle.setAttribute("aria-pressed", String(motionAllowed()));
    toggle.textContent = reduced.matches
      ? "Reduced motion"
      : motionAllowed()
        ? "Motion on"
        : "Motion off";
    const elements = $$("main [data-animate]");
    $$(".stagger").forEach((list) => {
      if (list.dataset.stagger)
        list.style.setProperty(
          "--stagger",
          `${Number(list.dataset.stagger) || 80}ms`,
        );
      $$("[data-animate]", list).forEach((element, index) =>
        element.style.setProperty("--i", Math.min(index, 8)),
      );
    });
    if (!motionAllowed() || !("IntersectionObserver" in window)) {
      root.classList.remove("motion-ready");
      elements.forEach((element) => element.classList.add("is-in"));
      parallaxElements = [];
      return;
    }
    // Only enable hiding AFTER observer construction succeeds.
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting || target.contains(document.activeElement))
            target.classList.add("is-in");
          else target.classList.remove("is-in"); // reset so the next visit replays
        });
      },
      { threshold: 0, rootMargin: "0px 0px -16px 0px" },
    );
    root.classList.add("motion-ready");
    elements.forEach((element) => observer.observe(element));
    parallaxElements = $$("main [data-parallax]");
    scheduleFrame();
  }
  function updateScroll() {
    frame = 0;
    const distance = Math.max(1, root.scrollHeight - innerHeight);
    $(".scroll-progress").style.transform =
      `scaleX(${Math.min(1, Math.max(0, scrollY / distance))})`;
    // Keep back/forward positions current, including the page being left by Back.
    scrollPositions.set(currentEntryKey, scrollY);
    if (!motionAllowed()) return;
    syncHeroScene();
    parallaxElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const amount = Math.max(
        -1,
        Math.min(
          1,
          (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight,
        ),
      );
      element.style.setProperty(
        "--parallax-y",
        `${amount * Number(element.dataset.parallax)}px`,
      );
    });
  }
  function scheduleFrame() {
    if (!frame) frame = requestAnimationFrame(updateScroll);
  }
  addEventListener("scroll", scheduleFrame, { passive: true });
  addEventListener("resize", scheduleFrame, { passive: true });
  document.addEventListener("focusin", (event) =>
    event.target.closest("[data-animate]")?.classList.add("is-in"),
  );
  reduced.addEventListener("change", initialiseMotion);

  // Course cards are the data source: every course also exists in plain HTML.
  function initialiseCatalogue(signal) {
    const grid = $("[data-course-grid]");
    if (!grid) return;
    const cards = $$(".course-card", grid);
    const originalIndex = new Map(cards.map((card, index) => [card, index]));
    let category = "all";
    let expanded = false;
    const search = $("[data-course-search]");
    const sort = $("[data-course-sort]");
    const showAll = $("[data-show-all]");
    function render() {
      const query = search.value.trim().toLocaleLowerCase();
      const matches = cards.filter(
        (card) =>
          (category === "all" || card.dataset.category === category) &&
          card.dataset.title.toLocaleLowerCase().includes(query),
      );
      matches.sort((a, b) =>
        sort.value === "fee"
          ? Number(a.dataset.fee) - Number(b.dataset.fee) ||
            originalIndex.get(a) - originalIndex.get(b)
          : sort.value === "duration"
            ? Number(a.dataset.duration) - Number(b.dataset.duration) ||
              originalIndex.get(a) - originalIndex.get(b)
            : originalIndex.get(a) - originalIndex.get(b),
      );
      const limited =
        !expanded && category === "all" && !query && sort.value === "featured";
      const visible = limited ? matches.slice(0, 6) : matches;
      cards.forEach((card) => {
        card.hidden = !visible.includes(card);
      });
      matches.forEach((card, index) => {
        card.style.setProperty("--i", index % 3);
        grid.append(card);
      });
      $("[data-course-results]").textContent =
        `${visible.length} of ${cards.length} proposed courses${limited ? " · Featured selection" : " · Fully online"}`;
      $("[data-course-empty]").hidden = matches.length !== 0;
      showAll.hidden = !limited;
      $$("[data-category-filter]").forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.categoryFilter === category),
        ),
      );
      scheduleFrame();
    }
    $$("[data-category-filter]").forEach((button) =>
      button.addEventListener(
        "click",
        () => {
          category = button.dataset.categoryFilter;
          render();
        },
        { signal },
      ),
    );
    search.addEventListener("input", render, { signal });
    sort.addEventListener("change", render, { signal });
    showAll.addEventListener(
      "click",
      () => {
        expanded = true;
        render();
      },
      { signal },
    );
    $("[data-reset-filters]").addEventListener(
      "click",
      () => {
        category = "all";
        search.value = "";
        sort.value = "featured";
        expanded = true;
        render();
        search.focus();
      },
      { signal },
    );
    render();
  }

  async function openCourse(card) {
    if (
      detailBusy ||
      courseDialog.open ||
      typeof courseDialog.showModal !== "function"
    )
      return;
    detailBusy = true;
    detailSource = card;
    $("[data-detail-category]").textContent = $(
      ".course-category",
      card,
    ).textContent;
    $("#detail-title").textContent = card.dataset.title;
    $("[data-detail-description]").textContent = $(
      ".course-description",
      card,
    ).textContent;
    const meta = $("[data-detail-meta]");
    meta.replaceChildren();
    [
      `${card.dataset.duration} months`,
      "Fully online",
      `Proposed fee: LKR ${money(card.dataset.fee)}`,
    ].forEach((text) => {
      const span = document.createElement("span");
      span.textContent = text;
      meta.append(span);
    });
    $("[data-detail-enrol]").href = new URL(
      `contact.html?course=${encodeURIComponent(card.dataset.courseId)}#enrolment`,
      SITE_BASE,
    ).href;
    card.style.viewTransitionName = "course-focus";
    detailTransition = transition(
      () => {
        card.style.viewTransitionName = "";
        detailPanel.style.viewTransitionName = "course-focus";
        courseDialog.showModal();
      },
      { fade: true, element: () => detailPanel },
    );
    await detailTransition;
    detailPanel.style.viewTransitionName = "";
    $("#detail-title").focus({ preventScroll: true });
    detailBusy = false;
  }
  async function closeCourse() {
    if (detailBusy) {
      await detailTransition;
      return closeCourse();
    }
    if (!courseDialog.open) return;
    detailBusy = true;
    const source = detailSource;
    detailPanel.style.viewTransitionName = "course-focus";
    detailTransition = transition(
      () => {
        detailPanel.style.viewTransitionName = "";
        courseDialog.close();
        if (source?.isConnected)
          source.style.viewTransitionName = "course-focus";
      },
      { fade: true, element: () => detailPanel },
    );
    await detailTransition;
    if (source?.isConnected) {
      source.style.viewTransitionName = "";
      $("[data-course-open]", source).focus({ preventScroll: true });
    }
    detailSource = null;
    detailBusy = false;
  }
  courseDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    void closeCourse();
  });
  courseDialog.addEventListener("click", (event) => {
    if (event.target === courseDialog) void closeCourse();
  });
  privacyDialog.addEventListener("click", (event) => {
    if (event.target === privacyDialog) privacyDialog.close();
  });

  // ENROLMENT: validate -> review locally -> open a prepared WhatsApp message.
  // Personal details never enter storage or a server-side form endpoint.
  function initialiseEnrolment(signal) {
    const form = $("[data-enrolment-form]");
    if (!form) return;
    const review = $("[data-form-review]");
    const course = form.elements.course;
    const selected = $("[data-selected-course]");
    const name = form.elements.name;
    const phone = form.elements.phone;
    function updateCourse() {
      const option = course.selectedOptions[0];
      selected.hidden = !course.value;
      selected.textContent = course.value
        ? `${option.dataset.duration} months · Fully online · Proposed fee LKR ${money(option.dataset.fee)}`
        : "";
    }
    const preselected = new URL(location.href).searchParams.get("course");
    if ([...course.options].some((option) => option.value === preselected))
      course.value = preselected;
    course.addEventListener("change", updateCourse, { signal });
    name.addEventListener("input", () => name.setCustomValidity(""), {
      signal,
    });
    phone.addEventListener("input", () => phone.setCustomValidity(""), {
      signal,
    });
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        name.setCustomValidity(
          name.value.trim().length < 2
            ? "Please enter your name using at least two characters."
            : "",
        );
        const digits = phone.value.replace(/\D/g, "");
        phone.setCustomValidity(
          digits.length < 7 || digits.length > 15
            ? "Please enter a phone number containing 7–15 digits."
            : "",
        );
        if (!form.reportValidity()) return;
        const values = Object.fromEntries(new FormData(form));
        const option = course.selectedOptions[0];
        const rows = [
          ["Course", option.textContent.replace(/\s+/g, " ").trim()],
          ["Duration", `${option.dataset.duration} months · Online`],
          ["Proposed fee", `LKR ${money(option.dataset.fee)}`],
          ["Name", values.name.trim()],
          ["WhatsApp", values.phone.trim()],
          ["Email", values.email.trim()],
          ["District", values.district],
          ["Schedule", values.schedule],
          ["Qualifications", values.qualifications.trim() || "Not provided"],
          ["Notes", values.notes.trim() || "None"],
        ];
        const list = $("[data-review-details]");
        list.replaceChildren();
        rows.forEach(([label, text]) => {
          const row = document.createElement("div");
          const term = document.createElement("dt");
          const detail = document.createElement("dd");
          term.textContent = label;
          detail.textContent = text;
          row.append(term, detail);
          list.append(row);
        });
        const message = [
          "Hello Digitalmod Academy, I would like to request enrolment.",
          "",
          ...rows.map(([label, text]) => `${label}: ${text}`),
          "",
          "I understand fees and availability are proposed. Please confirm the curriculum, class arrangements, certificate recognition and final fee.",
          "I consent to sharing these details for this enrolment request.",
        ].join("\n");
        $("[data-send-request]").href =
          `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
        form.hidden = true;
        review.hidden = false;
        $("[data-form-stage]").textContent = "02 / REVIEW & SEND";
        $("#review-title").focus({ preventScroll: true });
        review.scrollIntoView({
          behavior: motionAllowed() ? "smooth" : "instant",
          block: "start",
        });
      },
      { signal },
    );
    $("[data-edit-request]").addEventListener(
      "click",
      () => {
        review.hidden = true;
        form.hidden = false;
        $("[data-form-stage]").textContent = "01 / YOUR DETAILS";
        name.focus({ preventScroll: true });
        form.scrollIntoView({
          behavior: motionAllowed() ? "smooth" : "instant",
          block: "start",
        });
      },
      { signal },
    );
    updateCourse();
    $("[data-form-submit]").disabled = false;
  }

  // HERO FILM: native playback at rest, frame seeking along the sticky runway.
  // The same passive scroll / requestAnimationFrame loop drives both directions.
  // No canvas, image-sequence downloads, wheel interception or animation library.
  function initialiseHeroVideo(signal) {
    const video = $("[data-hero-video]");
    if (!video) return;
    const button = $("[data-hero-video-toggle]");
    const scene = video.closest("[data-hero-scene]");
    const stage = $(".hero-stage", scene || document);
    let visible = false;
    let manuallyPaused = false;
    let explicitlyPlaying = false;
    let videoObserver;
    let progress = 0;
    let scrubbing = false;
    let filmPrepared = false;
    let preparingFilm = false;
    let filmObjectURL;
    const canSeek = () =>
      video.seekable.length > 0 && video.seekable.end(video.seekable.length - 1) > 0;
    const active = () =>
      !manuallyPaused && (!video.paused || (scrubbing && motionAllowed()));
    const updateButton = () => {
      const playing = active();
      button.setAttribute(
        "aria-label",
        playing ? "Pause hero video" : "Play hero video",
      );
      button.textContent = playing ? "❚❚ Pause film" : "▷ Play film";
    };
    const seekFrame = () => {
      if (
        !scrubbing || manuallyPaused || !motionAllowed() ||
        video.seeking || !canSeek() || !Number.isFinite(video.duration)
      ) return;
      // Leave a small tail so a seek never triggers the video's loop boundary.
      const target = progress * Math.max(0, video.duration - 0.12);
      if (Math.abs(video.currentTime - target) > 0.045) {
        try { video.currentTime = target; } catch { /* Metadata is not ready yet. */ }
      }
    };
    const updatePlayback = () => {
      if (
        visible &&
        !document.hidden &&
        !manuallyPaused &&
        (motionAllowed() || explicitlyPlaying)
      ) {
        if (!filmPrepared) {
          prepareFilm();
          return;
        }
        if (scrubbing && motionAllowed() && canSeek()) {
          video.pause();
          seekFrame();
        } else if (video.paused) {
          video.play().catch(updateButton);
        }
      } else video.pause();
      updateButton();
    };
    // Loading the small film once as a Blob makes frame seeking work even on
    // static hosts that do not implement HTTP byte-range responses. Until ready,
    // the poster stays visible. A failed fetch falls back to normal video loading.
    const prepareFilm = async () => {
      if (preparingFilm || signal.aborted) return;
      preparingFilm = true;
      try {
        if (!heroFilmAsset) {
          const response = await fetch($("source", video).src, { signal });
          if (!response.ok) throw new Error("Film unavailable");
          heroFilmAsset = await response.blob();
        }
        if (signal.aborted) return;
        filmObjectURL = URL.createObjectURL(heroFilmAsset);
        video.src = filmObjectURL;
        video.load();
      } catch {
        if (signal.aborted) return;
      }
      filmPrepared = true;
      updatePlayback();
    };
    syncHeroScene = () => {
      if (!scene || !stage || !motionAllowed()) return;
      const rect = scene.getBoundingClientRect();
      const runway = Math.max(1, rect.height - stage.offsetHeight);
      progress = Math.min(1, Math.max(0, -rect.top / runway));
      // Adjust these small multipliers to change the camera/frame movement.
      scene.style.setProperty("--scene-inset", `${(progress * 20).toFixed(2)}px`);
      scene.style.setProperty("--scene-radius", `${(progress * 32).toFixed(2)}px`);
      scene.style.setProperty("--scene-scale", (1.035 - progress * 0.035).toFixed(4));
      scene.style.setProperty("--scene-copy-y", `${(-progress * 36).toFixed(2)}px`);
      scene.style.setProperty("--scene-progress", progress.toFixed(4));
      const nextScrubbing = progress > 0.012;
      if (nextScrubbing !== scrubbing) {
        scrubbing = nextScrubbing;
        updatePlayback();
      } else if (scrubbing && visible && !document.hidden) {
        seekFrame();
      }
    };
    syncHeroVideo = () => {
      if (!motionAllowed()) explicitlyPlaying = false;
      scrubbing = motionAllowed() && progress > 0.012;
      updatePlayback();
      syncHeroScene();
    };
    video.controls = false;
    button.hidden = false;
    video.addEventListener("play", updateButton, { signal });
    video.addEventListener("pause", updateButton, { signal });
    video.addEventListener("loadedmetadata", syncHeroScene, { signal });
    video.addEventListener("loadeddata", updatePlayback, { signal });
    // Coalesce seeks: finish the current decode, then render the newest frame.
    video.addEventListener("seeked", seekFrame, { signal });
    toggleHeroVideo = () => {
      if (!active()) {
        manuallyPaused = false;
        explicitlyPlaying = true;
        visible = true;
      } else {
        manuallyPaused = true;
        explicitlyPlaying = false;
      }
      updatePlayback();
    };
    document.addEventListener("visibilitychange", updatePlayback, { signal });
    if ("IntersectionObserver" in window) {
      videoObserver = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          updatePlayback();
        },
        { threshold: 0.2 },
      );
      videoObserver.observe(stage || video);
    } else {
      visible = true;
      updatePlayback();
    }
    signal.addEventListener(
      "abort",
      () => {
        manuallyPaused = true;
        video.pause();
        if (filmObjectURL) URL.revokeObjectURL(filmObjectURL);
        videoObserver?.disconnect();
        syncHeroVideo = () => {};
        toggleHeroVideo = () => {};
        syncHeroScene = () => {};
      },
      { once: true },
    );
  }

  function initialisePage() {
    pageController?.abort();
    pageController = new AbortController();
    const signal = pageController.signal;
    $(".site-header").classList.toggle(
      "is-home", $("main").dataset.pageName === "index",
    );
    initialiseCatalogue(signal);
    initialiseEnrolment(signal);
    initialiseMotion();
    initialiseHeroVideo(signal);
    $$("[data-tilt]").forEach((panel) => {
      panel.addEventListener(
        "pointermove",
        (event) => {
          if (!motionAllowed() || event.pointerType !== "mouse") return;
          const rect = panel.getBoundingClientRect();
          panel.style.setProperty(
            "--tilt-x",
            `${(0.5 - (event.clientY - rect.top) / rect.height) * 5}deg`,
          );
          panel.style.setProperty(
            "--tilt-y",
            `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`,
          );
        },
        { signal },
      );
      panel.addEventListener(
        "pointerleave",
        () => {
          panel.style.setProperty("--tilt-x", "0deg");
          panel.style.setProperty("--tilt-y", "0deg");
        },
        { signal },
      );
    });
  }

  // SMALL PAGE ROUTER: normal HTTP page links also work without JavaScript.
  // HTTP pages fetch real HTML; no hidden JSON data, framework or SPA server rule.
  function scrollDestination(url, position) {
    const target = url.hash
      ? document.getElementById(decodeURIComponent(url.hash.slice(1)))
      : null;
    if (target && !position)
      target.scrollIntoView({ behavior: "instant", block: "start" });
    else scrollTo({ top: position || 0, behavior: "instant" });
    scheduleFrame();
  }
  function rememberScroll() {
    scrollPositions.set(currentEntryKey, scrollY);
    history.replaceState(
      { ...history.state, key: currentEntryKey, scroll: scrollY },
      "",
      location.href,
    );
  }
  function pushEntry(url) {
    currentEntryKey = newEntryKey();
    history.pushState({ key: currentEntryKey, scroll: 0 }, "", url.href);
    scrollPositions.set(currentEntryKey, 0);
  }
  function updateMetadata(incoming) {
    document.title = incoming.title;
    [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:url"]',
      'link[rel="canonical"]',
    ].forEach((selector) => {
      const old = $(selector);
      const next = $(selector, incoming);
      if (old && next) old.replaceWith(next.cloneNode(true));
    });
    const oldRobots = $('meta[name="robots"]');
    const newRobots = $('meta[name="robots"]', incoming);
    oldRobots?.remove();
    if (newRobots) document.head.append(newRobots.cloneNode(true));
  }
  async function navigate(
    url,
    { push = true, position = 0, entryKey = currentEntryKey } = {},
  ) {
    routeController?.abort();
    if (
      url.pathname === currentURL.pathname &&
      url.search === currentURL.search
    ) {
      if (push) {
        rememberScroll();
        pushEntry(url);
      } else currentEntryKey = entryKey;
      currentURL = url;
      scrollDestination(url, position);
      $("[data-route-status]").textContent = `${document.title} loaded.`;
      return;
    }
    const request = new AbortController();
    routeController = request;
    $("[data-route-status]").textContent = "Loading page…";
    try {
      const response = await fetch(url.href, {
        signal: request.signal,
        headers: { Accept: "text/html" },
      });
      if (!response.ok) throw new Error("Page unavailable");
      const incoming = new DOMParser().parseFromString(
        await response.text(),
        "text/html",
      );
      const newMain = $("main[data-page-name]", incoming);
      if (!newMain || request.signal.aborted) throw new Error("Invalid page");
      if (courseDialog.open) await closeCourse();
      privacyDialog.close();
      if (request.signal.aborted) return;
      if (push) rememberScroll();
      await transition(
        () => {
          if (request.signal.aborted) return;
          $("[data-hero-video]")?.pause();
          $("main").replaceWith(newMain);
          updateMetadata(incoming);
          if (push) pushEntry(url);
          else currentEntryKey = entryKey;
          currentURL = url;
          $$(".main-nav a").forEach((link) => {
            if (
              new URL(link.href).pathname === url.pathname ||
              new URL(link.href).pathname.endsWith(
                `/${newMain.dataset.pageName}.html`,
              )
            )
              link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
          });
          initialisePage();
          scrollDestination(url, position);
        },
        { fade: true },
      );
      if (!request.signal.aborted) {
        $("main").focus({ preventScroll: true });
        $("[data-route-status]").textContent = `${document.title} loaded.`;
      }
    } catch (error) {
      if (error.name !== "AbortError" && !request.signal.aborted)
        location.assign(url.href);
    }
  }
  history.scrollRestoration = "manual";
  if (!history.state?.key)
    history.replaceState(
      { ...history.state, key: currentEntryKey, scroll: scrollY },
      "",
      location.href,
    );
  addEventListener("popstate", (event) => {
    scrollPositions.set(currentEntryKey, scrollY);
    const entryKey = event.state?.key || newEntryKey();
    void navigate(new URL(location.href), {
      push: false,
      entryKey,
      position: scrollPositions.get(entryKey) ?? event.state?.scroll ?? 0,
    });
  });
  addEventListener("pagehide", rememberScroll);
  const menu = $("[data-menu-toggle]");
  function closeMenu() {
    $("#main-nav").classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open menu");
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    const target = event.target.closest("a, button");
    if (!target) return;
    if (target.matches("[data-hero-video-toggle]")) toggleHeroVideo();
    if (target.matches("[data-menu-toggle]")) {
      const open = menu.getAttribute("aria-expanded") !== "true";
      $("#main-nav").classList.toggle("is-open", open);
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    if (target.matches("[data-motion-toggle]")) {
      motionChoice = !motionChoice;
      storage.set("dma-motion", motionChoice ? "on" : "off");
      initialiseMotion();
    }
    if (target.matches("[data-open-privacy]") && privacyDialog.showModal)
      privacyDialog.showModal();
    if (target.matches("[data-close-privacy]")) privacyDialog.close();
    if (target.matches("[data-close-course]")) void closeCourse();
    if (
      target.matches('a[href^="#"]') &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      const destination = document.getElementById(
        target.getAttribute("href").slice(1),
      );
      if (destination) {
        event.preventDefault();
        routeController?.abort();
        rememberScroll();
        const url = new URL(location.href);
        url.hash = target.getAttribute("href");
        pushEntry(url);
        currentURL = url;
        destination.scrollIntoView({
          behavior: motionAllowed() ? "smooth" : "instant",
          block: "start",
        });
        if (target.classList.contains("skip-link"))
          destination.focus({ preventScroll: true });
        return;
      }
    }
    if (
      target.matches("[data-course-open]") &&
      courseDialog.showModal &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      event.preventDefault();
      void openCourse(target.closest(".course-card"));
      return;
    }
    if (
      !target.matches("a[data-page]") ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target.target ||
      target.hasAttribute("download")
    )
      return;
    const url = new URL(target.href);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol))
      return;
    if (
      !/\/(?:index|about|courses|contact|404)\.html$/.test(url.pathname) &&
      !url.pathname.endsWith("/")
    )
      return;
    event.preventDefault();
    closeMenu();
    void navigate(url);
  });
  $$("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
  initialisePage();
  initialiseIntro();
})();
