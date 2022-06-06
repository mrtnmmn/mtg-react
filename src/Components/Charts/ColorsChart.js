import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import '../../Css/ColorsChart.css'

function ColorsChart(props) {

    ChartJS.register(ArcElement, Tooltip, Legend);

    let unprocessedData = Object.entries(props.colors)
    let labelsData = []
    let datasetsData = []
    let datasetsBackgroundColors = []
    let data 

    unprocessedData.forEach(element => {
        if ( element[1] !== 0 ) {
            switch(element[0]) {
                case ('colorless'):
                    labelsData.push('Colorless') 
                    datasetsBackgroundColors.push('rgba(183, 183, 183, 0.6)')
                    break
                case ('white'): 
                    labelsData.push('White')
                    datasetsBackgroundColors.push('rgba(255, 255, 255, 0.6)')
                    break
                case ('blue'): 
                    labelsData.push('Blue')
                    datasetsBackgroundColors.push('rgba(0, 87, 209, 0.6)')
                    break
                case ('green'): 
                    labelsData.push('Green')
                    datasetsBackgroundColors.push('rgba(0, 168, 33, 0.6)')
                    break
                case ('red'): 
                    labelsData.push('Red')
                    datasetsBackgroundColors.push('rgba(255, 20, 20, 0.6)')
                    break
                case ('black'): 
                    labelsData.push('Black')
                    datasetsBackgroundColors.push('rgba(10, 10, 10, 0.6)')
                    break
                case ('multicolor'): 
                    labelsData.push('Multicolor')
                    datasetsBackgroundColors.push('rgba(153, 0, 224, 0.6)')
                    break
            }
            datasetsData.push(element[1])
        }
    });

    if(props.colors) {
    data = {
        labels: labelsData,
        datasets: [
        {
            data: datasetsData,
            backgroundColor: datasetsBackgroundColors,
            borderWidth: 0,
        },
        ],
    };
    }

    return (  
        <div className="chartContainerDiv">
            {props.colors? 
            <Doughnut data={data}/>
            :<></>
            }
        </div>
    );
}

export default ColorsChart;