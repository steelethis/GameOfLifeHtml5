define(["./cell"], (Cell) => {
    class Biome {
        constructor(canvasId) {
            this.canvasId = canvasId;
            this.canvas = document.getElementById(canvasId);
            this.context = this.canvas.getContext("2d");
            this.x = 0;
            this.y = 0;

            this.ecosystem = [];
        }

        seedBiome() {
            const canvasWidth = 400;
            const canvasHeight = 400;
            for (let x = 0; x < canvasWidth; x += 1) {
                const column = [];
                for (let y = 0; y < canvasHeight; y += 1) {
                    const isAlive = Boolean(Math.floor(Math.random() * 2));
                    column.push(new Cell(isAlive));
                }
                this.ecosystem.push(column);
            }
        }

        draw() {
            if (this.context) {
                const imagedata = this.context.getImageData(0, 0, 400, 400);
                const imagedatalength = imagedata.data.length;

                for (let i = 0; i < imagedatalength; i += 4) {
                    if (this.x > 399) {
                        this.x = 0;
                        if (this.y <= 399) {
                            this.y += 1;
                        }
                    }
                    if (this.ecosystem[this.x][this.y].checkStatus()) {
                        imagedata.data[i] = 255;
                        imagedata.data[i + 1] = 0;
                        imagedata.data[i + 2] = 0;
                        imagedata.data[i + 3] = 255;
                    }

                    this.x += 1;
                }

                this.context.putImageData(imagedata, 0, 0);
            }
        }

        // ignore the eslint error, method is stubbed out.
        update() {
            console.log("Updating biome");
        }
    }

    return Biome;
});
