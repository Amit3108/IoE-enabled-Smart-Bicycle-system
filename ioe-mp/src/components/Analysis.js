import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";


function Analysis() {
  const [data, setData] = useState([]);
  const [cOccurence, setCOccurence] = useState([]);
  const [dOccurence, setDOccurence] = useState([]);
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
    let arr2 = [['Cities','Count']];
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
    let dateArr2 = [['Date','Count']];
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

    const getdata2 = () => {
      setCOccurence(findOcc(data, "location"))
      setDOccurence(dateOcc(data, "date"))
    }
    getdata2()

  }, [data])
  console.log(data);
  console.log(cOccurence);
  console.log(dOccurence);
  const topCities = cOccurence.sort((a, b) => b[1] - a[1]).slice(0,5)
  console.log(topCities) 


  const options = {
    chart: {
      title: "Daily Accident count",
    },
  };
  const options2 = {
    chart: {
      title: "Top 4 cities",
    },
  };
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "10px", marginTop: "20px" }}>Analysis</h2>
      <Chart
      chartType="Line"
      width="70%"
      height="300px"
      data={dOccurence}
      options={options}
      style= {{marginLeft:"15%"}}
    />
    <Chart
      chartType="Bar"
      width="70%"
      height="300px"
      data={topCities}
      options={options2}
      style= {{marginTop: "30px",marginLeft:"15%"}}
    />
    </div>
  );
}

export default Analysis;
