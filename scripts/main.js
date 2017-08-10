requirejs.config({
    baseUrl: "scripts/app",
    paths: {
    },
    shim: {
    },
});

// Main Game Loop Module

requirejs(["./biome"], (Biome) => {
    const mainBiome = new Biome("mainCanvas");
    mainBiome.seedBiome();

    function animationLoop() {
        mainBiome.draw();
        mainBiome.update();
        requestAnimationFrame(animationLoop);
    }

    animationLoop();
});
