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

                let x = 0;
                let y = 0;

                for (let i = 0; i < imagedatalength; i += 4) {
                    if (x > 399) {
                        x = 0;
                        if (y < 399) {
                            y += 1;
                        }
                    }
                    if (this.ecosystem[x][y].checkStatus()) {
                        imagedata.data[i] = 255;
                        imagedata.data[i + 1] = 0;
                        imagedata.data[i + 2] = 0;
                        imagedata.data[i + 3] = 255;
                    }

                    x += 1;
                }

                this.context.putImageData(imagedata, 0, 0);
            }
        }

        // ignore the eslint error, method is stubbed out.
        update() {
            // I need to plan this out, as the logic here is kind of hard to mentally map.
        }
    }

    return Biome;
});
