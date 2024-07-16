document.addEventListener('DOMContentLoaded', () => {
    getReservationsByUser('Adm');
  
    // Adiciona um listener de eventos para delegação de eventos em `#reservasList`
    document.getElementById('reservasList').addEventListener('click', async (event) => {
      if (event.target.classList.contains('cancelar-btn')) {
        const reservaId = event.target.getAttribute('data-reserva-id');
        const tableName = event.target.getAttribute('data-table-name');
        await cancelarReserva(tableName, reservaId);
        await getReservationsByUser('Adm'); // Atualiza a lista após cancelar a reserva
      }
    });
  });
  
  async function getReservationsByUser(usuario) {
    const SUPABASE_URL = 'https://etlunllealcmkzsdgkyq.supabase.co/rest/v1/';
    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bHVubGxlYWxjbWt6c2Rna3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyOTYwODAsImV4cCI6MjAzNTg3MjA4MH0.bw82z1xKUP0DB5D-nJFf6mZxLtBHMzODrz2rmggVdj0';
  
    const myHeaders = new Headers();
    myHeaders.append("apikey", API_KEY);
    myHeaders.append("Authorization", `Bearer ${API_KEY}`);
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
  
    async function fetchTable(tableName) {
      try {
        const response = await fetch(`${SUPABASE_URL}${tableName}?Usuario=eq.${usuario}`, requestOptions);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (Array.isArray(data)) {
          // Filtrar as reservas marcadas como true nos horários (8 a 19)
          const reservasFiltradas = data.filter(reserva => {
            return Object.keys(reserva)
              .filter(key => parseInt(key) >= 8 && parseInt(key) <= 19 && reserva[key])
              .length > 0; // Verificar se há pelo menos um horário marcado como true
          });
  
          // Adicionar o nome da sala como atributo 'sala' e remover 'id' e 'Usuario'
          return reservasFiltradas.map(reserva => {
            const { id, Usuario, ...reservaSemIdUsuario } = reserva;
            return { ...reservaSemIdUsuario, id, sala: tableName };
          });
        } else {
          // Caso seja apenas um objeto único, como retornar do Supabase
          const { id, Usuario, ...reservaSemIdUsuario } = data;
          return [{ ...reservaSemIdUsuario, id, sala: tableName }];
        }
      } catch (error) {
        console.error(`Error fetching reservations from table ${tableName}:`, error);
        return []; // Retornar um array vazio em caso de erro
      }
    }
  
    try {
      const tableNames = ['1', '2', '3', '4', '5', '6'];
      const promises = tableNames.map(fetchTable);
      const results = await Promise.all(promises);
      const combinedResults = results.flat();
  
      const reservasList = document.getElementById('reservasList');
      reservasList.innerHTML = '';
  
      combinedResults.forEach(reserva => {
        // Verificar horários marcados como true e montar o item da lista
        const horariosTrue = Object.keys(reserva)
          .filter(key => parseInt(key) >= 8 && parseInt(key) <= 19 && reserva[key])
          .map(key => `${reserva.sala} às ${key}:00`)
          .join(', ');
  
        if (horariosTrue.length > 0) {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  
          // Extrai a data da reserva do campo 'created_at' (formato YYYY-MM-DD)
          const dataReserva = new Date(reserva.created_at).toLocaleDateString('pt-BR');
  
          // Troca o nome da tabela pelo nome do espaço conforme o modelo fornecido
          const nomeDoEspaco = reservasModelo.find(item => item.id_num === parseInt(reserva.sala)).nome_do_espaco;
  
          listItem.innerHTML = `
            <span>Reserva em ${dataReserva} para ${nomeDoEspaco}: ${horariosTrue}</span>
            <button class="btn btn-sm btn-danger cancelar-btn" data-reserva-id="${reserva.id}" data-table-name="${reserva.sala}">
              Cancelar
            </button>
          `;
          reservasList.appendChild(listItem);
        }
      });
  
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  }
  
  async function cancelarReserva(tableName, reservaId) {
    const SUPABASE_URL = 'https://etlunllealcmkzsdgkyq.supabase.co/rest/v1/';
    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bHVubGxlYWxjbWt6c2Rna3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyOTYwODAsImV4cCI6MjAzNTg3MjA4MH0.bw82z1xKUP0DB5D-nJFf6mZxLtBHMzODrz2rmggVdj0';
  
    const myHeaders = new Headers();
    myHeaders.append("apikey", API_KEY);
    myHeaders.append("Authorization", `Bearer ${API_KEY}`);
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
  
    try {
      const response = await fetch(`${SUPABASE_URL}${tableName}?id=eq.${reservaId}`, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(`Reserva ${reservaId} cancelada com sucesso.`);
    } catch (error) {
      console.error(`Erro ao cancelar reserva ${reservaId}:`, error);
    }
  }
  
  // Modelo de dados dos espaços conforme fornecido
  const reservasModelo = [
    {
      "id": "26c57856-c24e-45f4-9a78-c0b1c1f39ed5",
      "nome_do_espaco": "Quadra de Futebol",
      "id_num": 1
    },
    {
      "id": "df0f1e57-8a0e-4c98-baf8-e90d5b4947b4",
      "nome_do_espaco": "Quadra de Volei",
      "id_num": 2
    },
    {
      "id": "f7121f51-7a2e-4a56-8e1b-e8acdd540867",
      "nome_do_espaco": "Salão P - 200 pessoas",
      "id_num": 5
    },
    {
      "id": "e05b2f6e-138a-487a-9f8b-86a25c5ca2a2",
      "nome_do_espaco": "Sala Pequena- 5 pessoas",
      "id_num": 4
    },
    {
      "id": "d14d0de2-3e5d-4fbb-bc2e-f18871f68eaf",
      "nome_do_espaco": "Sala Grande - 25 pessoas",
      "id_num": 3
    },
    {
      "id": "5e953186-7e46-49eb-901a-f3a6719275bb",
      "nome_do_espaco": "Salão Grande - 1000 pessoas",
      "id_num": 6
    }
  ];
  