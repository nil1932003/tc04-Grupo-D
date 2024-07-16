trabalho techchalleng fase 4 

Desafio: 
Somos uma empresa que disponibiliza espaços compartilhados, como salões de festas, quadras esportivas, ou salas de reuniões, que os membros desejam utilizar para eventos pessoais, atividades esportivas ou reuniões. No entanto, o processo de reserva desses espaços é frequentemente desorganizado, dependendo de sistemas manuais ou de baixa tecnologia, levando a conflitos de agendamento, má utilização dos recursos e insatisfação geral entre os usuários.

Solução Proposta: 
Para resolver esse problema, propomos o desenvolvimento de um Sistema de Reservas Online simplificado. Esse sistema permitirá aos membros da comunidade visualizar a disponibilidade de espaços, reservar horários específicos e gerenciar suas reservas de forma eficiente, tudo isso através de uma interface web amigável.

Backend em Node.js
          
*Uma API RESTful que gerencia as operações de reservas, como adicionar, visualizar e cancelar reservas.
*Conexão com um banco de dados SQL para armazenar informações sobre os espaços disponíveis, horários de reserva e detalhes das reservas.

Frontend em JavaScript
  
*Uma página web que permite aos usuários visualizar a disponibilidade dos espaços em um calendário interativo.
*Funcionalidades para selecionar um espaço, escolher o horário desejado para a reserva e confirmar a reserva.
*Uma visão geral das reservas existentes, permitindo aos usuários visualizar e cancelar suas reservas.
          
Banco de Dados SQL
 
*Um esquema de banco de dados projetado para armazenar informações sobre os espaços, reservas e horários disponíveis.
*Tabelas para espaços (com informações como nome do espaço, capacidade, etc.), reservas (incluindo data, horário e espaço reservado) e, potencialmente, usuários (para futuras funcionalidades de autenticação).
          
Funcionalidades-Chave
  
* Gestão de Espaços (adicionar, alterar, deletar e consultar), considerando que o espaço tenha um nome e um total de lugares (ou seja, capacidade máxima)
* Gestão de Reservas (adicionar, alterar e cancelar), sendo que isso é por espaço, por data e por hora.
* Design responsivo para garantir acessibilidade através de dispositivos móveis e desktops.
  
Detalhes adicionais

* Tempo mínimo de reserva será de 1 hora e o máximo de 8 horas.
* Reservas não podem se sobrepor.
* Não há recorrência nas reservas.
