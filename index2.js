let espacos = [
    {
        id: 1,
        tipo: "quadra esportiva",
        nome: "quadra de futebol",
        status: "ativo"
    },
    {
        id: 2,
        tipo: "quadra esportiva",
        nome: "quadra de volei",
        status: "ativo"
    },
    {
        id: 3,
        tipo: "sala de reunião",
        nome: "sala G",
        status: "ativo"
    },
    {
        id: 4,
        tipo: "sala de reunião",
        nome: "sala P",
        status: "ativo"
    },
    {
        id: 5,
        tipo: "salão de festa",
        nome: "salão grande",
        status: "ativo"
    },
    {
        id: 6,
        tipo: "salão de festa",
        nome: "salão médio",
        status: "ativo"
    },
];


// Função para renderizar lista de espaços disponíveis
function renderizarEspacos() {
    const selectEspaco = document.getElementById('espaco');
    if (selectEspaco) {
        espacos.forEach(espaco => {
            if (espaco.status === 'ativo') {
                const option = document.createElement('option');
                option.value = espaco.id;
                option.textContent = espaco.nome;
                selectEspaco.appendChild(option);
            }
        });
    }
}

// Função para gerar horários disponíveis
function gerarHorarios() {
    var startHour = 8;
    var endHour = 19;
    var calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Limpar o calendário antes de gerar novos horários
    for (var hour = startHour; hour <= endHour; hour++) {
        var colDiv = document.createElement('div');
        colDiv.className = 'col-md-4 mb-3';
        var timeSlot = document.createElement('button');
        timeSlot.className = 'btn btn-success btn-block rounded';
        timeSlot.textContent = hour + ':00';
        timeSlot.setAttribute('data-hour', hour); // Adicionar atributo data-hour com o valor do horário
        colDiv.appendChild(timeSlot);
        calendar.appendChild(colDiv);
    }
}

// Função para resetar campos e conteúdos
function resetarCampos() {
    document.getElementById('espaco').selectedIndex = -1;
    document.getElementById('data').value = '';
    document.getElementById('calendar').innerHTML = ''; // Limpar o conteúdo
    document.getElementById('reservar').innerHTML = ''; // Limpar o conteúdo
}

// Event listener quando o DOM estiver completamente carregado
document.addEventListener("DOMContentLoaded", function() {
    renderizarEspacos();

    // Evento de clique no botão de verificação de disponibilidade
    const verificarBtn = document.getElementById("verificar-disponibilidade-btn");
    if (verificarBtn) {
        verificarBtn.addEventListener("click", function(event) {
            event.preventDefault(); // Impedir que o formulário seja enviado

            var espaco = document.getElementById('espaco').value;
            var data = document.getElementById('data').value;

            // Verificar se ambos os campos foram preenchidos
            if (espaco && data) {
                gerarHorarios();
            } else {
                // Mostrar mensagem de erro ou tomar outra ação adequada
                alert('Por favor, preencha os campos de Espaço e Data.');
            }
        });
    }

    // Função para verificar se um horário está reservado localmente
function verificarDisponibilidadeLocal(espaco, data, horario) {
    const chave = `${espaco}-${data}`;
    if (chave in horariosReservados && horariosReservados[chave].includes(horario)) {
        return true; // Horário reservado
    }
    return false; // Horário disponível
}

// Função para adicionar um horário reservado localmente
function adicionarReservaLocal(espaco, data, horario) {
    const chave = `${espaco}-${data}`;
    if (!(chave in horariosReservados)) {
        horariosReservados[chave] = [];
    }
    horariosReservados[chave].push(horario);
}
    // Evento de clique nos botões de horário
    const calendar = document.getElementById('calendar');
    if (calendar) {
        calendar.addEventListener('click', function(event) {
            if (event.target.classList.contains('btn-success')) {
                var hour = event.target.getAttribute('data-hour');
                var espaco = document.getElementById('espaco').value; // Capturar o valor do espaço selecionado
                var data = document.getElementById('data').value;
                var reservaHTML = '<p>Deseja reservar o horário ' + hour + ':00?</p>';
                reservaHTML += '<button id="confirmarReserva" class="btn btn-primary mr-2">Confirmar</button>';
                reservaHTML += '<button id="cancelarReserva" class="btn btn-danger">Cancelar</button>';
                document.getElementById('reservar').innerHTML = reservaHTML;

                // Adicionar evento para confirmar a reserva
                document.getElementById('confirmarReserva').addEventListener('click', function() {
                    confirmarReserva(espaco, data, hour);
                });
            }
        });
    }

    // Evento para cancelar a reserva
    const reservar = document.getElementById('reservar');
    if (reservar) {
        reservar.addEventListener('click', function(event) {
            if (event.target && event.target.id === 'cancelarReserva') {
                resetarCampos(); // Resetar campos de data e espaço
            }
        });
    }
});
// Função para verificar se um horário está reservado localmente
function verificarDisponibilidadeLocal(espaco, data, horario) {
    const chave = `${espaco}-${data}`;
    if (chave in horariosReservados && horariosReservados[chave].includes(horario)) {
        return true; // Horário reservado
    }
    return false; // Horário disponível
}
 
async function cancelarReserva(espaco, data, hour) {
    try {
        const myHeaders = new Headers();
        myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bHVubGxlYWxjbWt6c2Rna3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyOTYwODAsImV4cCI6MjAzNTg3MjA4MH0.bw82z1xKUP0DB5D-nJFf6mZxLtBHMzODrz2rmggVdj0");
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bHVubGxlYWxjbWt6c2Rna3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyOTYwODAsImV4cCI6MjAzNTg3MjA4MH0.bw82z1xKUP0DB5D-nJFf6mZxLtBHMzODrz2rmggVdj0");
        myHeaders.append("Content-Type", "application/json");

        let hourColumn = `${hour}`;

        const requestOptions = {
            method: "PATCH", // PATCH para atualização parcial
            headers: myHeaders,
            body: JSON.stringify({
                [hourColumn]: false
            })
        };

        const response = await fetch(`https://etlunllealcmkzsdgkyq.supabase.co/rest/v1/${espaco}?Data=eq.${data}`, requestOptions);

        if (response.ok) {
            try {
                const result = await response.json();
                Swal.fire('Reserva cancelada');
                resetarCampos();
            } catch (error) {
                Swal.fire('Reserva cancelada');
                resetarCampos();
            }
        } else {
            const result = await response.json();
            Swal.fire('Erro ao cancelar reserva', result.message, 'error');
        }
    } catch (error) {
        Swal.fire('Erro ao cancelar reserva', error.message, 'error');
    }
}
async function verificarDisponibilidade(espaco, data, hour) {
    try {
        const myHeaders = new Headers();
        myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bHVubGxlYWxjbWt6c2Rna3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyOTYwODAsImV4cCI6MjAzNTg3MjA4MH0.bw82z1xKUP0DB5D-nJFf6mZxLtBHMzODrz2rmggVdj0");
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bHVubGxlYWxjbWt6c2Rna3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyOTYwODAsImV4cCI6MjAzNTg3MjA4MH0.bw82z1xKUP0DB5D-nJFf6mZxLtBHMzODrz2rmggVdj0");
        myHeaders.append("Content-Type", "application/json");

        let hourColumn = `${hour}`;

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        const response = await fetch(`https://etlunllealcmkzsdgkyq.supabase.co/rest/v1/${espaco}?Data=eq.${data}&${hourColumn}=eq.true`, requestOptions);

        if (response.ok) {
            const data = await response.json();
            return data.length === 0;
        } else {
            throw new Error('Erro ao verificar disponibilidade');
        }
    } catch (error) {
        console.error('Erro:', error);
        return false;
    }
}

async function confirmarReserva(espaco, data, hour) {
    const disponibilidade = await verificarDisponibilidade(espaco, data, hour);
    if (disponibilidade) {
        try {
            const myHeaders = new Headers();
            myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bHVubGxlYWxjbWt6c2Rna3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyOTYwODAsImV4cCI6MjAzNTg3MjA4MH0.bw82z1xKUP0DB5D-nJFf6mZxLtBHMzODrz2rmggVdj0");
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bHVubGxlYWxjbWt6c2Rna3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyOTYwODAsImV4cCI6MjAzNTg3MjA4MH0.bw82z1xKUP0DB5D-nJFf6mZxLtBHMzODrz2rmggVdj0");
            myHeaders.append("Content-Type", "application/json");

            let hourColumn = `${hour}`;

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    Data: data,
                    Usuario: 'Adm',
                    [hourColumn]: true
                })
            };

            const response = await fetch(`https://etlunllealcmkzsdgkyq.supabase.co/rest/v1/${espaco}`, requestOptions);

            if (response.ok) {
                const text = await response.text();
                console.log('Resposta do servidor:', text);

                if (text) {
                    try {
                        const data = JSON.parse(text);
                        alert('Reserva confirmada!');
                    } catch (error) {
                        console.error('Erro ao parsear o JSON:', error);
                        alert('Erro ao processar a resposta do servidor. Tente novamente.');
                    }
                } else {
                    alert('Reserva confirmada!');
                }
                
                document.getElementById('reservar').innerHTML = '';
                gerarHorarios();
            } else {
                const errorText = await response.text();
                console.error('Erro do servidor:', errorText);
                alert('Erro ao reservar, tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao reservar, tente novamente.');
        }
    } else {
        alert('Horário já reservado.');
    }
}
