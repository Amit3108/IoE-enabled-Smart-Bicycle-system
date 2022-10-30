import { useEffect, useState } from "react";
import "./table-style.css";
import {Table} from 'antd';

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
  //
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: 'Location',
      dataIndex: 'location',
      width: '25%',
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.location.startsWith(value),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: "20%"
    },
    {
      title: 'Time',
      dataIndex: 'time',
      width: "20%"
    },
  ];
  //
  return (
    <>
    <h2 style={{ textAlign: "center", margin: "10px", marginTop:"20px"}}>Accident details</h2>
    {/* <table>
        <tr>
            <th>Sr No.</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
        </tr>
        {data.slice(0).reverse().map((item,index) => {
            return(
            <tr key={item.key}>
                <td style={{textAlign:"center"}}>{index+1}</td>
                <td>{item.location}</td>
                <td style={{textAlign:"center"}}>{item.date}</td>
                <td style={{textAlign:"center"}}>{item.time}</td>
            </tr>
            )
        })}
    </table> */}
    <Table columns={columns} dataSource={data.reverse()} onChange={onChange} style={{width:"80%", marginLeft:"10%"}} pagination={{ pageSize:"8" }} />
    </>
    

  );
}

export default TableData;
