import React from 'react'
import { Link } from 'react-router-dom'

function List({cc,name,population,timeZone}) {
  function fun(){
    console.log("clicked for->",name)
    localStorage.setItem("obj",JSON.stringify({name}))
  }
  return (
    <>
     <tr>
     <td class="border border-red-600 px-4 py-2 text-yellow-600" onClick={fun}><Link to="/weather">{name}</Link></td>
                <td class="border border-red-600 px-4 py-2">{cc}</td>
                <td class="border border-red-600 px-4 py-2">{population}</td>
                <td class="border border-red-600 px-4 py-2">{timeZone}</td>
            </tr>
    </>
  )
}

export default List