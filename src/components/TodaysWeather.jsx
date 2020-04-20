import React, { useState, useEffect } from 'react'
import moment from 'moment'
import './forecast.scss'
import { ReactComponent as Sunrise } from '../sunrise.svg'
import { ReactComponent as Sunset } from '../sunset.svg'

const TodaysWeather = props => {
    const [ temp, setTemp ] = useState('°C')
    
    const formatTime = time => {
        let date = new Date(time *1000)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    
    useEffect(() => {
        if (props.tempUnit === 'metric') {
            setTemp('°C')
        } else if (props.tempUnit === 'imperial') {
            setTemp('°F')
        } else {
            setTemp(' K')
        }
    }, [props.tempUnit])
    

    return (
        <main>
            {!props.data ? <p>No data</p> : 
                <div>

                    <div className="lastUpdate">
                        {moment().format('dddd, MMMM Do (HH:mm)')}
                    </div>
                    
                    <div className="cityTemp">
                        <h1 className="tempDisplay">{Math.round(props.data.temp)}{temp}</h1>
                        <h1 className="cityDisplay">{props.data.name}</h1>
                    </div>
                    
                    <div className="minmax-temp">
                        <span>{Math.round(props.data.temp_min)}{temp}</span>
                        &nbsp;to&nbsp;
                        <span>{Math.round(props.data.temp_max)}{temp}</span>
                    </div>

                    <div>
                        <p>{props.data.description}</p>
                            <div className="sunrise-sunset">
                                <Sunrise className="sunrise" /> 
                                <Sunset className="sunset" />
                                <div>
                                    {formatTime(props.data.sunset)}
                                </div>
                                <div>
                                    {formatTime(props.data.sunrise)}
                                </div>    
                            </div>
                    </div>

                    <div>
                        <div className="hum-wind">
                            <div className="hw-a">{props.data.humidity} %</div>
                            <div className="hw-b">{props.data.windspeed} m/s</div>
                            <div className="hw-c">humidity</div>
                            <div className="hw-d">wind</div>
                        </div>
                    
                    </div>
                </div>
            }
        </main>
    )
    
}

export default TodaysWeather