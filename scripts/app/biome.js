define(["./cell"], (Cell) => {
    class Biome {
        constructor(canvasId) {
            this.canvasId = canvasId;
            this.canvas = document.getElementById(canvasId);
            this.context = this.canvas.getContext("2d");

            this.ecosystem = [];
        }

        seedBiome() {
            const canvasWidth = this.canvas.width;
            const canvasHeight = this.canvas.height;

            for (let x = 0; x < canvasWidth; x += 1) {
                const column = [];
                for (let y = 0; y < canvasHeight; y += 1) {
                    const probability = Math.random() * 100;
                    if (probability < 35) {
                        column.push(new Cell(true));
                    } else {
                        column.push(new Cell(false));
                    }
                }
                this.ecosystem.push(column);
            }
        }

        draw() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ecosystem.forEach((row, x) => {
                row.forEach((cell, y) => {
                    if (cell.checkStatus()) {
                        this.context.fillStyle = "#FF0000";
                        this.context.fillRect(x, y, 1, 1);
                    }
                });
            });
        }

        update() {
            const newGeneration = [];

            this.ecosystem.forEach((row, x) => {
                newGeneration.push([]);
                row.forEach((cell, y) => {
                    let aliveNeighbors = 0;

                    if (x > 0 && y > 0 && x < this.ecosystem.length - 1
                        && y < this.ecosystem.length - 1) {
                        if (this.ecosystem[x - 1][y - 1].checkStatus()) {
                            aliveNeighbors += 1;
                        }
                        if (this.ecosystem[x][y - 1].checkStatus()) {
                            aliveNeighbors += 1;
                        }
                        if (this.ecosystem[x + 1][y - 1].checkStatus()) {
                            aliveNeighbors += 1;
                        }
                        if (this.ecosystem[x - 1][y].checkStatus()) {
                            aliveNeighbors += 1;
                        }
                        if (this.ecosystem[x + 1][y].checkStatus()) {
                            aliveNeighbors += 1;
                        }
                        if (this.ecosystem[x - 1][y + 1].checkStatus()) {
                            aliveNeighbors += 1;
                        }
                        if (this.ecosystem[x][y + 1].checkStatus()) {
                            aliveNeighbors += 1;
                        }
                        if (this.ecosystem[x + 1][y + 1].checkStatus()) {
                            aliveNeighbors += 1;
                        }
                    }

                    if (cell.checkStatus()) {
                        if (aliveNeighbors < 2) {
                            newGeneration[x].push(new Cell(false));
                        } else if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                            newGeneration[x].push(new Cell(true));
                        } else if (aliveNeighbors > 3) {
                            newGeneration[x].push(new Cell(false));
                        }
                    } else if (!cell.checkStatus() && aliveNeighbors === 3) {
                        newGeneration[x].push(new Cell(true));
                    } else {
                        newGeneration[x].push(new Cell(false));
                    }
                });
            });

            this.ecosystem = newGeneration;
        }
    }

    return Biome;
});
