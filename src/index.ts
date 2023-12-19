import './style.css'
import f from './function'

const UNIT = 30;

const canvas = document.getElementById("mainc") as HTMLCanvasElement;
const _width = canvas.width;
const _height = canvas.height;
const _ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const sample = document.getElementById("input-sample") as HTMLInputElement;
const mult = document.getElementById("input-multiply") as HTMLInputElement;

drawGrid(_ctx, _width, _height);
drawLine(_ctx, _width, _height);

sample.addEventListener("change", redraw)
mult.addEventListener("change", redraw)

function drawLine(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (let x = 0; x < width; x += parseFloat(sample.value)) {
        ctx.lineTo(x, (height / 2) - f(x, parseFloat(mult.value)));
    }

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'lightgreen';
    ctx.stroke();
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
    console.log("Drawing grid")
    ctx.beginPath();
    const yAxisLength = height / UNIT;
    const xAxisLength = width / (UNIT * (width / height));

    for (let xAxis = 0; xAxis <= width; xAxis += xAxisLength) {
        ctx.moveTo(xAxis, 0);
        ctx.lineTo(xAxis, height);
        ctx.fillText(xAxis.toString(), 0, xAxis);
    }

    for (let yAxis = 0; yAxis <= height; yAxis += yAxisLength) {
        ctx.moveTo(0, yAxis);
        ctx.lineTo(width, yAxis);
        ctx.fillText(yAxis.toString(), 0, yAxis);
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#555';
    ctx.stroke();
}

function redraw(this: HTMLInputElement, ev: Event) {
    _ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(_ctx, _width, _height);
    drawLine(_ctx, _width, _height);
}

