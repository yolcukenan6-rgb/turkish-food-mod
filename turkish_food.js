
/*
 TURKISH FOOD MOD 🇹🇷
 Sandboxels
*/

// ==================================
// 1. ÜZÜM TOHUMU
// ==================================

elements.uzum_tohumu = {
    color: "#98713C",
    behavior: behaviors.POWDER,
    category: "life",
    state: "solid",
    density: 1200,

    tick: function(pixel) {
        var below = pixelMap[pixel.x]?.[pixel.y + 1];

        if (
            below &&
            ["dirt", "mud", "wet_sand"].includes(below.element)
        ) {
            pixel.growth = (pixel.growth || 0) + 1;

            if (pixel.growth > 150) {
                changePixel(pixel, "asma_govdesi");
            }
        }
    }
};

// ==================================
// 2. ÜZÜM ASMASI
// ==================================

elements.asma_govdesi = {
    color: "#79502C",
    behavior: behaviors.WALL,
    category: "life",
    state: "solid",

    tick: function(pixel) {
        if (pixelTicks % 120 !== 0) return;

        // Asma yaprağı üret
        if (Math.random() < 0.5) {
            var x = pixel.x + (Math.random() < 0.5 ? -1 : 1);
            var y = pixel.y - 1;

            if (isEmpty(x, y)) {
                createPixel("asma_yapragi", x, y);
            }
        }

        // Üzüm üret
        if (Math.random() < 0.25) {
            var gx = pixel.x + (Math.random() < 0.5 ? -1 : 1);
            var gy = pixel.y;

            if (isEmpty(gx, gy)) {
                createPixel("uzum", gx, gy);
            }
        }
    }
};

// ==================================
// 3. ÜZÜM
// ==================================

elements.uzum = {
    color: ["#673AB7", "#7B3FA1", "#8E44AD"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 900,
    isFood: true
};

// ==================================
// 4. ASMA YAPRAĞI
// ==================================

elements.asma_yapragi = {
    color: ["#397D32", "#4F963D", "#659B45"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 700
};

// ==================================
// 5. ÇİĞ YAPRAK SARMA
// ==================================

elements.cig_yaprak_sarma = {
    color: ["#91A94D", "#718D3B", "#819D43"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    density: 1050,

    tempHigh: 100,
    stateHigh: "yaprak_sarma",

    desc: "Pişmemiş Türk yaprak sarması!"
};

// ==================================
// 6. PİŞMİŞ YAPRAK SARMA
// ==================================

elements.yaprak_sarma = {
    color: ["#557D35", "#6B8E45", "#45652D"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    density: 1100,

    isFood: true,

    tempHigh: 300,
    stateHigh: "ash",

    desc: "Lezzetli Türk yaprak sarması!"
};

// ==================================
// 7. PİRİNÇ + ASMA YAPRAĞI TARİFİ
// ==================================

if (elements.rice) {

    if (!elements.rice.reactions) {
        elements.rice.reactions = {};
    }

    elements.rice.reactions["asma_yapragi"] = {
        elem1: "cig_yaprak_sarma",
        elem2: null
    };

} else {
    console.warn(
        "Turkish Food Mod: Rice elementi bulunamadı!"
    );
}
