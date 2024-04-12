import React, { useEffect, useState } from 'react'

function Weather() {
  const [data,setData]=useState({'condition':{'icon':'hello'}})
  var obj=JSON.parse(localStorage.getItem('obj'))
  var name=obj.name
  useEffect(()=>{
  async function fun(){
    const res=await fetch(`https://api.weatherapi.com/v1/current.json?key=39612653fb544a00813110316241004&q=${name}&aqi=no`)
    const resj=await res.json()
    setData(resj.current)
    console.log(resj.current)
  }fun()},[])

  return (
    <div className='bg-zinc-900 h-screen w-full pt-36'>
    <div className="bg-blue-200 rounded-lg p-4 shadow-md max-w-md mx-auto border-2 border-red-600">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-5xl font-bold text-red-600">{name}</h2>
        <img
          className="w-20 h-20"
          src={`https:${data.condition.icon}`}
          alt={data.condition.text}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold">Temperature</p>
          <p>{data.temp_c}°C ({data.temp_f}°F)</p>
        </div>
        <div>
          <p className="font-bold">Condition</p>
          <p>{data.condition.text}</p>
        </div>
        <div>
          <p className="font-bold">Wind</p>
          <p>{data.wind_kph} kph ({data.wind_mph} mph), {data.wind_dir}</p>
        </div>
        <div>
          <p className="font-bold">Pressure</p>
          <p>{data.pressure_mb} mb ({data.pressure_in} inHg)</p>
        </div>
        <div>
          <p className="font-bold">Humidity</p>
          <p>{data.humidity}%</p>
        </div>
        <div>
          <p className="font-bold">Visibility</p>
          <p>{data.vis_km} km ({data.vis_miles} miles)</p>
        </div>
        <div>
          <p className="font-bold">UV Index</p>
          <p>{data.uv}</p>
        </div>
        <div>
          <p className="font-bold">Feels like</p>
          <p>{data.feelslike_c}°C ({data.feelslike_f}°F)</p>
        </div>
        <div>
          <p className="font-bold">Gusts</p>
          <p>{data.gust_kph} kph ({data.gust_mph} mph)</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Weather