import React from "react";
import colors from 'color-name';

const Color = ({colorName,setColor}) => {

  colorName = colorName.toLowerCase();

  if (colors[colorName]) {
    return (

        
          <li style={{backgroundColor: colorName}} onClick={()=>{setColor(colorName)}}></li>

    );

  }else
  {
    return (
          <li style={{backgroundColor: "black"}} onClick={()=>{setColor('black')}}></li>

    );
  }
};

export default Color;