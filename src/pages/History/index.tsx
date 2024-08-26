import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CycleContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export function History() {
  const { cycles } = useContext(CycleContext);

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      {/* 
        * mostrar as informações em tela usando
        * <pre>
            {JSON.stringify(cycles, null, 2)}
          </pre>
      */}
      
      <HistoryList>
        <table>
          <thead>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Início</th>
            <th>Concluído</th>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmounts} minutos</td>
                  <td>{formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR
                  })}</td>
                  <td>
                    {cycle.fishedDate && (
                      <Status statusColor="green">concluído</Status>
                    )}

                    {cycle.interruptDate && (
                      <Status statusColor="red">interrompido</Status>
                    )}

                    {!cycle.fishedDate && !cycle.interruptDate && (
                      <Status statusColor="yellow">em andamento</Status>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
