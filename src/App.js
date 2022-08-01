import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10 + 1);
  };

  const data = [
    {
      id: 1,
      title: "Sun Dolls",
      color: "f5f5dc",
      textColor: "white",
      value: getRandomNumber(),
      maxValue: 1500,

    },
    {
      id: 2,
      title: "Rangerettes",
      color: "rgb(184, 115, 51)",
      textColor: "white",
      value: getRandomNumber(),
      maxValue: 5500,
    },
    {
      id: 3,
      title: "Silver Steppers",
      color: "#d2b48c",
      textColor: "white",
      value: getRandomNumber(),
      maxValue: 3500,
    },
    {
      id: 4,
      title: " Jesterz",
      color: "#f5deb3",
      textColor: "white",
      value: getRandomNumber(),
      maxValue: 2500,
    },
    {
      id: 5,
      title: "Pirouette Champs",
      color: "#c19a6b",
      textColor: "white",
      value: getRandomNumber(),
      maxValue: 4500,
    },
  ];

  const [barData, setBarData] = useState(data);

  function compareValues(key, order = "asc") {
    return function innerSort(a, b) {
      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  const setBarDataRandomWith = () => {
    let data = [...barData];
    data.map((item) => {
      return (item.value += getRandomNumber());
    });
    setBarData(data);
  };

  useEffect(() => {
    const arr = [...barData];
    let timer;
    timer = setInterval(() => {
      arr.forEach((item, index) => {
        if (item.value > item.maxValue) {
          let data = [...barData];
          data.map((item) => {
            return (item.value = item.maxValue);
          });
          setBarData(data);
          clearInterval(timer);
        } else {
          setBarDataRandomWith();
        }
      });
    }, 500);
  }, []);

  return (
    <div className="App">
      <h1> 26. Dans Yarışmasında İlk 5 </h1>

      {barData.sort(compareValues("value", "desc")).map((item, index) => {
        return (
          <div style={ {witdh:
            item.value > item.maxValue
              ? "100%"
              : (item.value * 100) / item.maxValue + "%"} } >
          <div
            key={index}
            className="chart"
            style={{
              backgroundColor: item.color,
              color: item.textColor,
                
                  transform: `translateY(${index * 70 + 20 + "px"})`,
                }}>
                <h3>
                  {index + 1}. Grup : {item.title}   Seyirci Oyu:
                  {item.value} 
                </h3>
              </div>
              </div>
            );
          })
        }
      </div>
    );
  }
  
  export default App;
