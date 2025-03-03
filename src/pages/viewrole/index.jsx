import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";


const ViewRole = () => {
 
    const [roleList, setRole] = useState([]);
      
      const columns = [
        {
          title: 'Role',
          dataIndex: 'roleName',
          key: 'roleName',
        },      
      ];

      const fetchRole = async () => {

      const response = await  axios.get('https://localhost:7217/roles');
      console.log(response);
      
      setRole(response.data.result)

      };

      useEffect( () => {
        fetchRole();
      }
      , []);
      
    return (
    
        <Table dataSource={roleList} columns={columns} />

    )
    };
    export default ViewRole;
