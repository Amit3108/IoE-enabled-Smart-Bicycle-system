import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import './Analysis.css'


function Analysis() {
  const [data, setData] = useState([]);
  const [cOccurence, setCOccurence] = useState([]);
  const [dOccurence, setDOccurence] = useState([]);
  const [doccur, setDoccur] = useState([])
  function getAllDaysInMonth(year, month) {
    const date = new Date(year, month, 1);
    const dates = [];
    while (date.getMonth() === month) {
      dates.push(new Date(date).toLocaleDateString());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
  const now = new Date();
  const d = getAllDaysInMonth(now.getFullYear(), now.getMonth());
  const fetchdata = async () => {
    const response = await fetch(
      "https://smart-bicycle-ioe-default-rtdb.firebaseio.com/acc_data.json"
    );
    const resData = await response.json();
    const d = [];
    for (const key in resData) {
      d.push({
        id: key,
        location: resData[key][0],
        time: resData[key][1],
        date: resData[key][2],
      });
      //setData([...data,{id: key, location: resData[key][0], time: resData[key][1], date: resData[key][2]}])
    }
    setData(d);
  };
  //
  const findOcc = (data, key) => {
    let arr2 = [['Cities', 'Count']];
    data.forEach((x) => {
      if (arr2.some((val) => { return val[0] === x[key] })) {
        arr2.forEach((k) => {
          if (k[0] === x[key]) {
            k[1] = k[1] + 1
          }
        })

      } else {
        let a = []
        a[0] = x[key]
        a[1] = 1
        arr2.push(a);
      }
    })
    // setCOccurence(arr2)
    return arr2
  }
  //
  const dateOcc = (data, key) => {
    let dateArr2 = [['Date', 'Count']];
    data.forEach((x) => {
      if (dateArr2.some((val) => { return val[0] === x[key] })) {
        dateArr2.forEach((k) => {
          if (k[0] === x[key]) {
            k[1] = k[1] + 1
          }
        })
      } else {
        let a = []
        a[0] = x[key]
        a[1] = 1
        dateArr2.push(a);
      }
    })
    return dateArr2
  }
  useEffect(() => {
    const getdata = async () => {
      await fetchdata();
    };
    getdata()
  }, []);
  useEffect(() => {

    const getdata2 = async () => {
      setCOccurence(findOcc(data, "location"))
      setDOccurence(dateOcc(data, "date"))

    }
    getdata2()

  }, [data])
  useEffect(() => {
    const docc = [['Date', 'Count']]
    console.log(dOccurence)
    for (const i in d) {
      var t = false
      for (const j in dOccurence) {
        var d1 = new Date(d[i])
        var d2 = new Date(dOccurence[j][0])
        if (d1.toLocaleDateString() === d2.toLocaleDateString()) {
          t = true
          docc.push([d[i], dOccurence[j][1]])
        }
      }
      if (!t) {
        docc.push([d[i], 0])
      }
    }
    setDoccur(docc)
  }, [dOccurence])
  console.log(data);
  console.log(cOccurence);
  console.log(dOccurence);
  const topCities = cOccurence.sort((a, b) => b[1] - a[1]).slice(0, 5)
  console.log(topCities)
  console.log(doccur)
  
  const totalAccident = data.length

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "10px", marginTop: "20px" }}>Analysis - Total Accident: {totalAccident} </h2>
      <h4 style={{marginBottom:"8px", textAlign:"center"}}>Daily Accident Count</h4>
      <Chart
        chartType="Line"
        className="daily"
        data={doccur}
      />
      <h4 style={{marginTop: "30px",marginBottom:"8px", textAlign:"center"}}>Top 4 cities</h4>
      <Chart
        chartType="Bar"
        data={topCities}
        className="top"
      />
    </div>
  );
}

export default Analysis;
