import React, { useState } from 'react';
import style from "./MainPage.module.css"
// import Hammer from 'hammerjs';
import { LineChart } from '@mui/x-charts';
import { colors } from '@mui/material';

const MainPage = () => {
    let [count,setCount] = useState(0);
    // let [spanClass, setSpanClass] = useState('percent_span_plus')

    function changingCount(newValue) {
        if (newValue >= 0) {
            setCount(newValue)
        }
        else {
            setCount(count = 0)

            
        }
    }

    const shopsStore = [
        {id:1,title:"Выручка руб.",
            currentDay:5426,yesterday: 2344,selectedDay:5645},
        {id:2,title:"Безналичный расчет",
            currentDay:45646,yesterday: 234,selectedDay:354},
        {id:3,title:"Кредитные карты",
            currentDay:645,yesterday: 423,selectedDay:435},
        {id:4,title:"Средний чек, руб.",
            currentDay:454,yesterday: 246,selectedDay:53},
        {id:5,title:"Средний гость, руб.",
            currentDay:32432,yesterday: 354,selectedDay:453},
        {id:6,title:"Удаление из чека (После оплаты) руб.",
            currentDay:534,yesterday: 435,selectedDay:400},
        {id:7,title:"Удаления из чека (До оплаты) руб..",
            currentDay:534,yesterday: 534,selectedDay:400},
        {id:8,title:"Количество чеков",
            currentDay:200,yesterday: 3060,selectedDay:534},
        {id:9,title:"Количество гостей",
            currentDay:200,yesterday: 354,selectedDay:435},
    ]

    const percentArr = []
    function getPercent () {
        shopsStore.map (el => {
            percentArr.push((Math.round((el.currentDay / el.yesterday * 100) - 100)))
        })
    }
    getPercent()

    const listItems = shopsStore.map(el =>
                <tr 
                    onClick={() => changingCount(el.id - 1)} 
                    className={style.row_pointer}
                    key={el.id}
                    >
                    <td>{el.title}</td>
                    <td className={style.current_day}>{el.currentDay}</td>
                    
                    <td className={percentArr[el.id - 1] > 0 ?
                        style.yesterday_plus
                        :
                        style.yesterday_minus
                    }>
                        {el.yesterday}
                        {'  '}
                        {
                            <span className={percentArr[el.id - 1] > 0 ? 
                            style.percent_span_plus
                            : style.percent_span_minus}
                            >
                            {percentArr[el.id - 1]}%</span>
                        }
                        </td>
                    <td>{el.selectedDay}</td>
                </tr>
    )

    return (
        <main>
            <table className={style.main_table}>
            <tbody>
                <tr>
                    <td>Показатель</td>
                    <td 
                        className={style.current_day}
                    >Текущий день</td>
                    <td>Вчера</td>
                    <td>Этот день недели</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td className={style.chart_line} colSpan="4">
                        <LineChart
                            width={1000}
                            height={300}
                            series={[
                                { data: 
                                    [shopsStore[count].currentDay,
                                    shopsStore[count].yesterday,
                                    shopsStore[count].selectedDay]},
                            ]}
                            xAxis={[{ scaleType: 'point', data: 
                                [shopsStore[count].currentDay,
                                shopsStore[count].yesterday,
                                shopsStore[count].selectedDay] }]}
                        />
            </td>
                </tr>
            </tbody>
            <tbody>
                {listItems}
            </tbody>
            </table>
        </main>
    );
};

export default MainPage;