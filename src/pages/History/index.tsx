
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History(){
  return (
    <HistoryContainer>
         <h1>Meu Histórico</h1>
         <HistoryList>
            <table>
              <thead>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Início</th>
                <th>Concluído</th>
              </thead>
              <tbody>
                <tr>
                  <td>Tarefa</td>
                  <td>20 minutos</td>
                  <td>Há 2 meses</td>
                  <td>
                    <Status statusColor="green">concluído</Status>
                  </td>
                </tr>
                <tr>
                  <td>Tarefa</td>
                  <td>20 minutos</td>
                  <td>Há 2 meses</td>
                  <td>
                    <Status statusColor="green">concluído</Status>
                 </td>
                </tr>
                <tr>
                  <td>Tarefa</td>
                  <td>20 minutos</td>
                  <td>Há 2 meses</td>
                  <td>
                    <Status statusColor="green">concluído</Status>
                  </td>
                </tr>
                <tr>
                  <td>Tarefa</td>
                  <td>20 minutos</td>
                  <td>Há 2 meses</td>
                  <td>
                    <Status statusColor="green">concluído</Status>
                  </td>
                </tr>
                <tr>
                  <td>Tarefa</td>
                  <td>20 minutos</td>
                  <td>Há 2 meses</td>
                  <td>
                    <Status statusColor="green">concluído</Status>
                  </td>
                </tr>
                <tr>
                  <td>Tarefa</td>
                  <td>20 minutos</td>
                  <td>Há 2 meses</td>
                  <td>
                    <Status statusColor="yellow">em andamento</Status>
                  </td>
                </tr>
                <tr>
                  <td>Tarefa</td>
                  <td>20 minutos</td>
                  <td>Há 2 meses</td>
                  <td>
                    <Status statusColor="red">interrompido</Status>
                  </td>
                </tr>
              </tbody>
            </table>
         </HistoryList>
    </HistoryContainer>
  )
}