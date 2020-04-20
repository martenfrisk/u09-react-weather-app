import React, { useState, useEffect } from 'react'
import './forecast.scss'
import moment from 'moment'

const FiveDayForecast = props => {
    const [ dataFromTomorrow, setDataFromTomorrow ] = useState([])
    const [ temp, setTemp ] = useState('°C')

    useEffect(() => {
        if (props.tempUnit === 'metric') {
            setTemp('°C')
        } else if (props.tempUnit === 'imperial') {
            setTemp('°F')
        } else {
            setTemp(' K')
        }
    }, [props.tempUnit])

    useEffect(() => {
        setDataFromTomorrow(props.data.data)
    }, [props.data])


    const everyThirdHour = ["", "00", "03", "06", "09", "12", "15", "18", "21"]
    const hourRepeater = 
        everyThirdHour.map((i) => 
            <div className="fiveDayHours">{i}</div>
        )

    
    return (        
        <div className="fiveDayForecast">
                <div className="dayName">tomorrow</div>
                <div className="dayName">day after tomorrow</div>
                <div className="dayName">3 days from now</div>
                <div className="dayName">4 days from now</div>
                <div className="dayName">5 days from now</div>

            {hourRepeater}

            <div className="fiveDayRow">
                {dataFromTomorrow ? 
                    dataFromTomorrow.filter((option) => {
                        if(moment(option.dt_txt).date() > moment().date()) {
                            return option;
                            }
                        }
                    ).map((item) => (
                            <div>
                                {item.main.temp.toFixed(0)}{temp}
                            </div>
                    ))
                : <div> Loading </div>}      
            </div>
        </div>
    )
}

export default FiveDayForecast