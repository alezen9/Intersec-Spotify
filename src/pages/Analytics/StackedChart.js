import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Stacked extends Component {
    constructor(props) {
        super(props);

        let d = this.props.dataset.map(el => {
            let singleData = {
                label: el.label,
                data: [...el.data],
                backgroundColor: `#E6${("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)}`, // #E6 means 90% opacity
                borderWidth: 0,
                borderColor: 'transparent',
                pointRadius: 3
            }
            return singleData;
        })
        this.data = {
            type: 'line',
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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

export default Stacked;
