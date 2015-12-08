function DataPoint(label, value) {
    this.label = label;
    this.value = value;
}

DataPoint.prototype.getLabel = function() {
    return this.label;
}

DataPoint.prototype.getValue = function() {
    return this.value;
}