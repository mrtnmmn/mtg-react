import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function ManaCostsChart(props) {

    ChartJS.register(ArcElement, Tooltip, Legend);

    let unprocessedData = Object.entries(props.cardCosts)
    let labelsData = []
    let datasetsData = []
    let datasetsBackgroundColors = []

    unprocessedData.forEach(element => {
        if ( element[1] !== 0 ) {
            switch(element[0]) {
                case ('c0'):
                    labelsData.push('Cost zero') 
                    datasetsBackgroundColors.push('rgba(183, 183, 183, 0.6)')
                    break
                case ('c1'): 
                    labelsData.push('1')
                    datasetsBackgroundColors.push('rgba(255, 255, 255, 0.6)')
                    break
                case ('c2'): 
                    labelsData.push('2')
                    datasetsBackgroundColors.push('rgba(255, 20, 20, 0.6)')
                    break
                case ('c3'): 
                    labelsData.push('3')
                    datasetsBackgroundColors.push('rgba(0, 87, 209, 0.6)')
                    break
                case ('c4'): 
                    labelsData.push('4')
                    datasetsBackgroundColors.push('rgba(0, 168, 33, 0.6)')
                    break
                case ('c5'): 
                    labelsData.push('5 or more')
                    datasetsBackgroundColors.push('rgba(10, 10, 10, 0.6)')
                    break
            }
            datasetsData.push(element[1])
        }
    });

    let data
    
    if (props.cardCosts) {
        data = {
            labels: labelsData,
            datasets: [
                {
                    data: datasetsData,
                    backgroundColor: datasetsBackgroundColors,
                    borderWidth: 0,
                },
            ],
        }
    }
    
    return (  
        <div>
            {props.cardCosts? 
            <Doughnut data={data}/>
            :<></>
            }
        </div>
    );
}

export default ManaCostsChart;