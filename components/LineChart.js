import React, {Component} from 'react'
import css from './LineChart.css';

class LineChart extends Component {

    getMinX() {
        const {data} = this.props;
        return data[0].x;
    }
    getMaxX() {
        const {data} = this.props;
        return data[data.length-1].x;
    }
    getMinY() {
        const {data} = this.props;
        return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
    }
    getMaxY() {
        const {data} = this.props;
        return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
    }
    getSvgX(x) {
        const {svgWidth} = this.props;
        return (x / this.getMaxX() * svgWidth);
    }
    getSvgY(y) {
        const {svgHeight} = this.props;
        return svgHeight - (y / this.getMaxY() * svgHeight);
    }
    makePath() {
        const {data, color} = this.props;
        let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";

        pathD += data.map((point, i) => {
            return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
        });

        return (
            <path className="linechart_path" d={pathD} stroke="red" strokeWidth="4" fill="none" />
        );
    }
    makeAxis() {
        const minX = this.getMinX(), maxX = this.getMaxX();
        const minY = this.getMinY(), maxY = this.getMaxY();

        return (
            <g className="linechart_axis">
                <line
                    x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
                    x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)} />
                <line
                    x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
                    x2={this.getSvgX(minX)} y2={this.getSvgY(maxY)} />
            </g>
        );
    }

    render() {
        const {svgHeight, svgWidth} = this.props;

        return (
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {this.makePath()}
                {this.makeAxis()}
          </svg>
        );
    }
}

LineChart.defaultProps = {
    data: [],
    color: '#2196F3',
    svgHeight: 300,
    svgWidth: 700
}

export default LineChart;