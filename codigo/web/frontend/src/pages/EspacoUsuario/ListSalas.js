import "../../App.css";
import React from "react";
import { List } from "antd";
import MyCard from "../../components/card/card";
import { useSelector } from "react-redux";
import { listSalas } from "../../slicers/salasSlice";

function ListSalas(props) {

  const salaList = useSelector(listSalas)
  const getSalaData = (data, salaList, type) => {
    const newArr = []
    for (let i=0; i<data.length; i++) {
      for (let s=0; s<salaList.length; s++) {
        const verify = (type === "owner") ? data[i].id : data[i].sala.id;
        if(verify === salaList[s].id) {
          newArr.push(salaList[s])
        }
      }
    }
    return newArr
  }

  return (
    <>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={getSalaData(props.salasList,salaList,props.type)}
        pagination={{
          pageSize:4,
        }}
        renderItem={data => ( 
          <List.Item>
            <MyCard
              style={{ width: "100%",  height: "100%"}}
              key={data?.id}
              id={data?.id}
              description={data?.descricao}
              esporte={data?.esporte}
              nome={data?.nome}
              usuarioId={data?.usuarioId}
            ></MyCard>
          </List.Item>
        )}
      />
    </>
  );
}

export default ListSalas;
