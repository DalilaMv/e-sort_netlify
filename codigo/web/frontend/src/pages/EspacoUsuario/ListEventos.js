import "../../App.css";
import React from "react";
import { List } from "antd";
import MyCard from "../../components/cardEvento/cardEvento";
import { useSelector } from "react-redux";
import { listEventos } from "../../slicers/eventosSlice";

function ListEventos(props) {

  const eventosList = useSelector(listEventos)
  const getEventoData = (data, salaList, type) => {
    const newArr = []
    for (let i=0; i<data.length; i++) {
      for (let s=0; s<salaList.length; s++) {
          console.log(data[i])
        const verify = (type === "owner") ? data[i].id : data[i].evento.id;
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
        dataSource={getEventoData(props.salasList,eventosList,props.type)}
        pagination={{
          pageSize:4,
        }}
        renderItem={data => ( 
          <List.Item>
            <MyCard
              style={{ width: "100%",  height: "100%"}}
              key={data?.id}
              id={data?.id}
              data={data?.data}
              esporte={data?.textoesporte}
              nome={data?.nome}
              valor={data?.valor}
              local={data?.local}
              usuarioId={data?.usuarioId}
              esportesList={props.esportesList}
              horaFim={data?.horaFim}
              horaInicio={data?.horaInicio}
              quantidadeMax={data?.quantidadeMax}
              esporteId={data?.esporteId}
              quantidade={data?.quantidade}
            ></MyCard>
          </List.Item>
        )}
      />
    </>
  );
}

export default ListEventos;
