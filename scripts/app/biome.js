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
                    const probability = Math.random() * 100;
                    if (probability < 25) {
                        column.push(new Cell(true));
                    } else {
                        column.push(new Cell(false));
                    }
//                    const isAlive = Boolean(Math.floor(Math.random() * 2));
                }
                this.ecosystem.push(column);
            }
        }

        draw() {
            if (this.context) {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
            const nextGeneration = [];

            for (let x = 0; x < this.ecosystem.length; x += 1) {
                const column = [];

                for (let y = 0; y < this.ecosystem[x].length; y += 1) {
                    // check each cell against its neighbors.
                    let cellStatus = true;
                    let neighborsAlive = 0;

                    for (let xOffset = -1; xOffset < 2; xOffset += 1) {
                        for (let yOffset = -1; yOffset < 2; yOffset += 1) {
                            let xVal = x + xOffset;
                            let yVal = y + yOffset;

                            // Clamping offset values to within array boundaries.
                            if (xVal < 0) {
                                xVal = 0;
                            }
                            if (yVal < 0) {
                                yVal = 0;
                            }
                            if (xVal >= this.ecosystem.length) {
                                xVal = this.ecosystem.length - 1;
                            }
                            if (yVal >= this.ecosystem[x].length) {
                                yVal = this.ecosystem[x].length - 1;
                            }

                            if (xVal !== 0 && yVal !== 0) {
                                if (this.ecosystem[xVal][yVal].checkStatus()) {
                                    neighborsAlive += 1;
                                }
                            }
                        }
                    }

                    if (this.ecosystem[x][y].checkStatus()) {
                        if (neighborsAlive < 2) {
                            cellStatus = false;
                        }
                        if (neighborsAlive === 2 || neighborsAlive === 3) {
                            cellStatus = true;
                        }
                        if (neighborsAlive > 3) {
                            cellStatus = false;
                        }
                    } else if (!this.ecosystem[x][y].checkStatus()) {
                        if (neighborsAlive === 3) {
                            cellStatus = true;
                        }
                    }

                    column.push(new Cell(cellStatus));
                }
                nextGeneration.push(column);
            }

            for (let x = 0; x < this.ecosystem.length; x += 1) {
                for (let y = 0; y < this.ecosystem[x].length; y += 1) {
                    this.ecosystem[x][y] = nextGeneration[x][y];
                }
            }
        }
    }

    return Biome;
});
