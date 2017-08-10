define(["./cell"], (Cell) => {
    function Biome(canvasId) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");

        this.ecosystem = [];
    }

    Biome.prototype.seedBiome = () => {
        const canvasWidth = 400;
        const canvasHeight = 400;
        for (let x = 0; x < canvasWidth; x += 1) {
            const column = [];
            for (let y = 0; y < canvasHeight; y += 1) {
                column.push(new Cell(true));
            }
            this.ecosystem.push(column);
        }
    };

    Biome.prototype.draw = () => {
        if (this.context) {
            for (let x = 0; x < this.ecosystem.length; x += 1) {
                for (let y = 0; y < this.ecosystem[x].length; y += 1) {
                    // draw each cell.
                    // console.log("Drawing cell" + this.ecosystem[x][y]);
                    console.log(`Drawing cell ${this.ecosystem[x][y]}`);
                }
            }
        }
    };

    Biome.prototype.update = () => {
        console.log("Updating biome");
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
