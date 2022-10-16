import { useEffect, useState } from "react";

function Analysis() {
  const [data, setData] = useState([]);
  useEffect(() => {
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
    fetchdata();
  }, []);
  console.log(data);
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "10px", marginTop:"20px" }}>Analysis</h2>
    </div>
  );
}

export default Analysis;
