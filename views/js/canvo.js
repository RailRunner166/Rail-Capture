class Editor {
    constructor(options) {
        this.canvas = document.getElementById('editor');
        this.c = this.canvas.getContext('2d');

        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';

        this.defaultLineWidth = options.defaults.width || 7;
        this.defaultColor = options.defaults.color || '#000000';

        this.draw = this.draw.bind(this);
        this.initEvents = this.initEvents.bind(this);
        this.toDataUri = this.toDataUri.bind(this);
        this.setColor = this.setColor.bind(this);
        this.setLineWidth = this.setLineWidth.bind(this);

        this.initEvents();
    }

    initEvents() {
        this.canvas.addEventListener('mousedown', e => {
            this.isDrawing = true;
            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        });

        this.canvas.addEventListener('mousemove', this.draw);
        this.canvas.addEventListener('mouseup', () => this.isDrawing = false);
        this.canvas.addEventListener('mouseout', () => this.isDrawing = false);
    }

    setColor(newColor) {
        this.c.strokeStyle = newColor;
    }

    setLineWidth(newWidth) {
        this.c.lineWidth = newWidth;
    }

    loadImageFromDataUri(dataUri) {
        const img = new Image;

        img.onload = () => {
            this.canvas.style.width = `${img.width}px`;
            this.canvas.style.height = `${img.height}px`;
            this.canvas.width = img.width;
            this.canvas.height = img.height;

            this.c.lineJoin = 'round';
            this.c.lineCap = 'round';
            this.c.lineWidth = this.defaultLineWidth || 7;
            this.c.strokeStyle = this.defaultColor || '#000000';

            this.c.drawImage(img, 0, 0);
        };

        img.src = dataUri;
    }

    toDataUri() {
        return this.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    }

    draw(e) {
        if(!this.isDrawing) return;

        this.c.beginPath();
        this.c.moveTo(this.lastX, this.lastY);
        this.c.lineTo(e.offsetX, e.offsetY);
        this.c.stroke();
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
    }
}