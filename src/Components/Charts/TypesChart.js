import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function TypesChart(props) {

    let unprocessedData = Object.entries(props.types)
    let labelsData = []
    let datasetsData = []
    let datasetsBackgroundColors = []
    let data 

    unprocessedData.forEach(element => {
        if ( element[1] !== 0 ) {
            switch(element[0]) {
                case ('basicLand'):
                    labelsData.push('Basic Land') 
                    datasetsBackgroundColors.push('rgba(100, 100, 100, 0.6)')
                    break
                case ('land'): 
                    labelsData.push('Land')
                    datasetsBackgroundColors.push('rgba(255, 255, 255, 0.6)')
                    break
                case ('creature'): 
                    labelsData.push('Creature')
                    datasetsBackgroundColors.push('rgba(255, 20, 20, 0.6)')
                    break
                case ('instant'): 
                    labelsData.push('Instant')
                    datasetsBackgroundColors.push('rgba(0, 87, 209, 0.6)')
                    break
                case ('sorcery'): 
                    labelsData.push('Sorcery')
                    datasetsBackgroundColors.push('rgba(0, 168, 33, 0.6)')
                    break
                case ('enchantment'): 
                    labelsData.push('Enchantment')
                    datasetsBackgroundColors.push('rgba(10, 10, 10, 0.6)')
                    break
                case ('artifact'): 
                    labelsData.push('Artifact')
                    datasetsBackgroundColors.push('rgba(191, 191, 191, 0.6)')
                    break
                case ('other'): 
                    labelsData.push('Other')
                    datasetsBackgroundColors.push('rgba(0, 255, 240, 0.6)')
                    break
            }
            datasetsData.push(element[1])
        }
    });

    
    if (props.types) {
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
            {props.types? 
            <Doughnut data={data}/>
            :<></>
            }
        </div>
    );
}

export default TypesChart;