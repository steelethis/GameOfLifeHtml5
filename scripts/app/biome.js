define(["./cell"], (Cell) => {
    function Biome(canvasId) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
    }

    Biome.prototype.seedBiome = () => {

    };

    Biome.prototype.draw = () => {

    };

    Biome.prototype.update = () => {

    };

    return Biome;

    // function Stage(canvasId) {
    //     this.canvasId = canvasId;
    //     this.canvas = document.getElementById(canvasId);
    //     this.context = this.canvas.getContext("2d");
    // }

    // Stage.prototype.draw = function draw() {
    //     if (this.context) {
    //         this.context.fillStyle = "rgb(200, 0, 0)";
    //         this.context.fillRect(10, 10, 50, 50);

    //         this.context.fillStyle = "rgba(0, 0, 200, 0.5)";
    //         this.context.fillRect(30, 30, 50, 50);
    //     }
    // };

    // return Stage;
});
