define(() => {
    function Cell(status) {
        this.alive = status;
    }

    Cell.prototype.kill = () => {
        this.alive = false;
    };

    Cell.prototype.revive = () => {
        this.alive = true;
    };

    // returns the status of the cell.
    Cell.prototype.checkStatus = () => this.alive;

    return Cell;
});
