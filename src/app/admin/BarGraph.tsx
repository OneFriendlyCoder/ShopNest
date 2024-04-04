"use client"

import {Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, BarElement, CategoryScale} from 'chart.js'
import {Bar} from 'react-chartjs-2' 

ChartJS.register(Tooltip, Legend, LinearScale, BarElement, CategoryScale);

interface BarGraphProps{
    data: GraphData[]
}

type GraphData = {
    day: string;
    date: string;
    totalAmount: number;
}

const BarGraph:React.FC<BarGraphProps> = ({data}) =>{
    const labels = data.map(item => item.day);
    const amounts = data.map(item => item.totalAmount);
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Sale Amount',
                data: amounts,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1.0)',
                borderWidth: 1
            }
        ]
    }
    const options = {
        scales: {
            y : {
                beginAtZero: true
            }
        }
    }
    return (
        <Bar data={chartData} options={options}/>
    )
}

export default BarGraph;