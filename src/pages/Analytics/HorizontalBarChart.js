import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

class HorizontalBarChart extends Component {
    constructor(props) {
        super(props);
        let d = this.props.dataset.map(el => {
            let singleData = {
                label: el.label,
                data: [...el.data],
                backgroundColor: `#E6${("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)}`, // #E6 means 90% opacity
                borderWidth: 0,
                pointRadius: 2
            }
            return singleData;
        })
        this.data = {
            labels: ['Morning', 'Afternoon'],
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
                    <HorizontalBar
                        legend={this.legendOpts}
                        data={this.data}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                xAxes: [{
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

export default HorizontalBarChart;
