requirejs.config({
    baseUrl: "scripts/app",
    paths: {
    },
    shim: {
    },
});

requirejs(["./helloworld", "./stage"],
    (helloworld, Stage) => {
        const mainStage = new Stage("mainCanvas");

        window.onload = mainStage.draw();
    });
