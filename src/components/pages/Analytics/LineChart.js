import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends Component {
    constructor(props) {
        super(props);
        let d = this.props.dataset.map(el => {
            let singleData = {
                label: el.label,
                data: [...el.data],
                backgroundColor: 'transparent',
                borderColor: `#${("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)}`,
                borderWidth: 2,
                pointRadius: 2,
                borderJoinStyle: 'miter',
                lineTension: 0
            }
            return singleData;
        })
        this.data = {
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
            datasets: [...d]
        }
        this.legendOpts = {
            labels: {
                fontColor: 'white',
                boxWidth: 15,
                usePointStyle: true
            }
        }
    }


    render() {
        return (
            <div className="chart">
                <div className="graph">
                    <Line
                        legend={this.legendOpts}
                        data={this.data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                xAxes: [{
                                    stacked: true,
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 5
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 5
                                    }
                                }]
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default LineChart;