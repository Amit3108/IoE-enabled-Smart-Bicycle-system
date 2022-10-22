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
  //
  const findOcc = (data, key) => {
    let arr2 = [];
      
    data.forEach((x)=>{
       if(arr2.some((val)=>{ return val[key] === x[key] })){
         arr2.forEach((k)=>{
           if(k[key] === x[key]){ 
             k["occurrence"]++
           }
        })
           
       }else{
         let a = {}
         a[key] = x[key]
         a["occurrence"] = 1
         arr2.push(a);
       }
    })
      
    return arr2
  }
  let key = "location"
  console.log(findOcc(data,key))
  //
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "10px", marginTop:"20px" }}>Analysis</h2>
    </div>
  );
}

export default Analysis;
