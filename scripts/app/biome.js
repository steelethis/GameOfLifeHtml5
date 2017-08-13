define(["./cell"], (Cell) => {
    class Biome {
        constructor(canvasId) {
            this.canvasId = canvasId;
            this.canvas = document.getElementById(canvasId);
            this.context = this.canvas.getContext("2d");

            this.ecosystem = [];
        }

        seedBiome() {
            const canvasWidth = 400;
            const canvasHeight = 400;
            for (let x = 0; x < canvasWidth; x += 1) {
                const column = [];
                for (let y = 0; y < canvasHeight; y += 1) {
                    column.push(new Cell(true));
                }
                this.ecosystem.push(column);
            }
        }

        draw() {
            if (this.context) {
                const imagedata = this.context.createImageData(400, 400);
                const imagedatalength = imagedata.data.length;

                for (let i = 0; i < imagedatalength / 4; i += 1) {
                    let x = 0;
                    let y = 0;

                    if (this.ecosystem[x][y].checkStatus()) {
                        imagedata.data[4 * i] = 255;
                        imagedata.data[4 * i + 1] = 0;
                        imagedata.data[4 * i + 2] = 0;
                        imagedata.data[4 * i + 3] = 255;
                    }

                    x += 1;
                    if (x > 400) {
                        x = 0;
                        y += 1;
                    }
                }

                this.context.putImageData(imagedata, 0, 0);
                // for (let x = 0; x < this.ecosystem.length; x += 1) {
                //     for (let y = 0; y < this.ecosystem[x].length; y += 1) {
                //         console.log(`Drawing cell ${this.ecosystem[x][y]}`);
                //     }
                // }
            }
        }

        // ignore the eslint error, method is stubbed out.
        update() {
            console.log("Updating biome");
        }
    }

    return Biome;
    // Stage.prototype.draw = function draw() {
    //     if (this.context) {
    //         this.context.fillStyle = "rgb(200, 0, 0)";
    //         this.context.fillRect(10, 10, 50, 50);

    //         this.context.fillStyle = "rgba(0, 0, 200, 0.5)";
    //         this.context.fillRect(30, 30, 50, 50);
    //     }
    // };
});
