import { useEffect, useState } from "react";
import "./table-style.css";
import { Table, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

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
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: 'LOCATION',
      dataIndex: "location",
      width: "25%",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Search Location"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.location.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "20%",
      sorter: (a, b) => new Date(a.date) - new Date(b.date)
    },
    {
      title: "Time",
      dataIndex: "time",
      width: "20%",
    },
  ];
  //
  return (
    <>
      <h2 style={{ textAlign: "center", margin: "10px", marginTop: "20px" }}>
        Accident details
      </h2>
      <Table
        columns={columns}
        dataSource={data.reverse()}
        onChange={onChange}
        style={{ width: "80%", marginLeft: "10%" }}
        pagination={{ pageSize: "8" }}
        sortDirections={["descend", "ascend"]}
      />
    </>
  );
}

export default TableData;
