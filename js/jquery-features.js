// Все фичи Assignment 7 на jQuery
$(function () {
    console.log("jQuery is ready!");

    /* =========================
       Task 4: Scroll progress
    ========================== */
    const $progress = $("#scrollProgress");
    const updateProgress = () => {
        const scrollTop = $(window).scrollTop();
        const docH = $(document).height() - $(window).height();
        const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
        $progress.css("width", pct + "%");
    };
    updateProgress();
    $(window).on("scroll resize", updateProgress);

    /* =========================================
       Tasks 1–3: Live filter + autocomplete + highlight
    ========================================== */
    const $search = $("#searchBar");
    const $listItems = $("#recipeList .searchable");
    const $suggest = $("#searchSuggest");

    // Источник для подсказок (можешь заменить на актуальные названия блюд/постов)
    const SUGGESTIONS = $listItems
        .map(function () { return $(this).text().trim(); })
        .get();

    // Функция подсветки совпадений
    function highlightTerm($elements, term) {
        const t = term.trim();
        $elements.each(function () {
            const $el = $(this);
            const text = $el.text();
            if (!t) {
                $el.html(text); // снятие подсветки
                return;
            }
            // Экраним спецсимволы RegExp
            const safe = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const re = new RegExp(`(${safe})`, "gi");
            const html = text.replace(re, "<mark>$1</mark>");
            $el.html(html);
        });
    }

    // Обновление live-фильтра и подсказок
    function handleSearch() {
        const q = $search.val().toLowerCase();

        // Live фильтр
        $listItems.each(function () {
            const $li = $(this);
            $li.toggle($li.text().toLowerCase().indexOf(q) > -1);
        });

        // Подсветка
        highlightTerm($listItems, q);

        // Подсказки
        $suggest.empty();
        if (!q) return;
        const matches = SUGGESTIONS.filter(s => s.toLowerCase().includes(q)).slice(0, 6);
        matches.forEach(m => {
            $suggest.append(`<li class="suggest-item" tabindex="0">${m}</li>`);
        });
    }

    $search.on("input keyup", handleSearch);

    // Клик/выбор подсказки
    $suggest.on("click keydown", ".suggest-item", function (e) {
        if (e.type === "click" || (e.type === "keydown" && (e.key === "Enter" || e.key === " "))) {
            const txt = $(this).text();
            $search.val(txt);
            handleSearch();
            $suggest.empty();
            // небольшой тост, что применён поиск
            toast(`Search applied: "${txt}"`);
        }
    });

    /* =========================
       Task 5: Animated counters
    ========================== */
    const animateCounter = ($el) => {
        const target = parseInt($el.attr("data-count"), 10) || 0;
        const duration = 1200; // ms
        const start = performance.now();

        function tick(now) {
            const p = Math.min(1, (now - start) / duration);
            const val = Math.floor(target * p);
            $el.text(val);
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    };

    $(".stat-num").each(function () { animateCounter($(this)); });

    /* =========================
       Task 6: Submit spinner
    ========================== */
    const $form = $("#demoForm");
    const $btn = $("#submitBtn");
    const $btnText = $btn.find(".btn-text");

    $form.on("submit", function (e) {
        e.preventDefault();
        if (!$form[0].checkValidity()) return;

        // блокируем и показываем спиннер
        $btn.prop("disabled", true).addClass("loading");
        $btnText.text("Please wait...");

        // имитация запроса
        setTimeout(() => {
            $btn.prop("disabled", false).removeClass("loading");
            $btnText.text("Submit");
            toast("Form submitted successfully");
            $form[0].reset();
        }, 1600);
    });

    /* =========================
       Task 7: Toast notifications
    ========================== */
    const $toastWrap = $("#toastContainer");
    function toast(message = "Done", timeout = 2200) {
        const $t = $(
            `<div class="toast-item">
        <span>${message}</span>
      </div>`
        );
        $toastWrap.append($t);
        setTimeout(() => $t.addClass("show"));
        setTimeout(() => { $t.removeClass("show"); setTimeout(() => $t.remove(), 300); }, timeout);
    }
    // пример: toast("Item added to cart");

    /* =========================
       Task 8: Copy to clipboard
    ========================== */
    $("#copyBtn").on("click", async function () {
        try {
            const text = $("#couponText").text().trim();
            await navigator.clipboard.writeText(text);
            $("#copyTooltip").text("Copied to clipboard! ✓");
            toast("Coupon copied");
        } catch {
            $("#copyTooltip").text("Copy failed");
        } finally {
            setTimeout(() => $("#copyTooltip").text(""), 1500);
        }
    });

    /* =========================
       Task 9: Lazy loading images
    ========================== */
    const $lazyImgs = $("img.lazy");
    const loadIfVisible = () => {
        const winTop = $(window).scrollTop();
        const winBot = winTop + $(window).height();
        $lazyImgs.each(function () {
            const $img = $(this);
            if ($img.data("loaded")) return;
            const top = $img.offset().top;
            if (top < winBot + 150) { // небольшой предзагрузочный буфер
                const realSrc = $img.attr("data-src");
                if (realSrc) {
                    $img.attr("src", realSrc);
                    $img.data("loaded", true).removeClass("lazy");
                }
            }
        });
    };
    loadIfVisible();
    $(window).on("scroll resize", loadIfVisible);
});
