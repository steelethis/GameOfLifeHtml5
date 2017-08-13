define(() => {
    class Cell {
        constructor(status) {
            this.alive = status;
        }

        checkStatus() {
            return this.alive;
        }

        kill() {
            this.alive = false;
        }

        revive() {
            this.alive = true;
        }
    }

    return Cell;
});
