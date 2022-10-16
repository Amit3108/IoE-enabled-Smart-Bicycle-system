import { useEffect, useState } from "react";
import "./table-style.css";

function TableData() {
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
  return (
    <>
    <h2 style={{ textAlign: "center", margin: "10px", marginTop:"20px"}}>Accident details</h2>
    <table>
        <tr>
            <th>Sr No.</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
        </tr>
        {data.map((item,index) => {
            return(
            <tr key={item.key}>
                <td>{index+1}</td>
                <td>{item.location}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
            </tr>
            )
        })}
    </table>
    </>
    

  );
}

export default TableData;
