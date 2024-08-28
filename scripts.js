function openModal() {
    const statusData = loadStatusData();
    statusData.forEach(system => {
        document.getElementById(`${system.id}-datetime-input`).value = system.datetime;
        document.getElementById(`${system.id}-description-input`).value = system.description;
        document.getElementById(`${system.id}-status-input`).value = system.status;
            // Esconde a caixa de texto e reseta o select ao abrir o modal
        document.getElementById('important-info-description-input').style.display = 'none';
        document.getElementById('important-info-input').value = 'no';
        document.getElementById('update-modal').style.display = 'block';
    });

    document.getElementById('update-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('update-modal').style.display = 'none';
}

function updateStatus() {
    const statusData = [
        {
            id: 'onvio',
            datetime: document.getElementById('onvio-datetime-input').value,
            description: document.getElementById('onvio-description-input').value,
            status: document.getElementById('onvio-status-input').value
        },
        {
            id: 'dominio',
            datetime: document.getElementById('dominio-datetime-input').value,
            description: document.getElementById('dominio-description-input').value,
            status: document.getElementById('dominio-status-input').value
        },
        {
            id: 'api',
            datetime: document.getElementById('api-datetime-input').value,
            description: document.getElementById('api-description-input').value,
            status: document.getElementById('api-status-input').value
        },
        {
            id: 'esocial',
            datetime: document.getElementById('esocial-datetime-input').value,
            description: document.getElementById('esocial-description-input').value,
            status: document.getElementById('esocial-status-input').value
        },
        {
            id: 'error',
            datetime: document.getElementById('error-datetime-input').value,
            description: document.getElementById('error-description-input').value,
            status: document.getElementById('error-status-input').value
        }
    ];

    const isValid = validateStatusData(statusData);
    if (!isValid) {
        alert('Por favor, insira todos os campos corretamente.');
        return;
    }

    statusData.forEach(system => {
        document.getElementById(`${system.id}-datetime`).innerText = system.datetime.replace('T', ' ');
        document.getElementById(`${system.id}-description`).innerText = system.description;

        const statusElement = document.getElementById(`${system.id}-status`);
        statusElement.className = 'status';
        statusElement.classList.add(`status-${system.status}`);
    });
      const importantInfo = document.getElementById('important-info-input').value;
      const infoSection = document.querySelector('.info-section');
      if (importantInfo === 'yes') {
          const importantInfoDescription = document.getElementById('important-info-description-input').value;
          infoSection.querySelector('p').textContent = importantInfoDescription;
          infoSection.classList.remove('hidden');
      } else {
          infoSection.classList.add('hidden');
      }

      saveStatusData(statusData);
      closeModal();
  }

function loadStatus() {
    const statusData = loadStatusData();
    statusData.forEach(system => {
        document.getElementById(`${system.id}-datetime`).innerText = system.datetime.replace('T', ' ');
        document.getElementById(`${system.id}-description`).innerText = system.description;

        const statusElement = document.getElementById(`${system.id}-status`);
        statusElement.className = 'status';
        statusElement.classList.add(`status-${system.status}`);
    });
}

function validateStatusData(statusData) {
    return statusData.every(system => system.datetime && system.description && system.status);
}

function loadStatusData() {
    const defaultStatusData = [
        {
            id: 'onvio',
            datetime: '2024-05-15T14:45',
            description: 'Ambiente de produção normalizado',
            status: 'green'
        },
        {
            id: 'dominio',
            datetime: '2024-05-15T13:20',
            description: 'Indisponibilidade momentânea no Portal WEB devido a problemas de infraestrutura. Web Service segue funcionando',
            status: 'red'
        },
        {
            id: 'api',
            datetime: '2024-04-12T16:30',
            description: 'Ambiente de produção normalizado',
            status: 'green'
        },
        {
            id: 'esocial',
            datetime: '2024-04-10T09:00',
            description: 'Instabilidade na infraestrutura, com impactos no processamento de eventos',
            status: 'yellow'
        },
        {
            id: 'error',
            datetime: '2024-01-18T15:00',
            description: 'Instabilidade na infraestrutura, com impactos no processamento de eventos',
            status: 'yellow'
        }
    ];

    const storedStatusData = localStorage.getItem('statusData');
    return storedStatusData ? JSON.parse(storedStatusData) : defaultStatusData;
}

function saveStatusData(statusData) {
    localStorage.setItem('statusData', JSON.stringify(statusData));
}

document.getElementById('important-info-input').addEventListener('change', function() {
    const importantInfo = this.value;
    const descriptionTextarea = document.getElementById('important-info-description-input');
   const descriptionLabel = document.querySelector('label[for="important-info-description-input"]');
    if (importantInfo === 'yes') {
        descriptionTextarea.style.display = 'block';
        descriptionLabel.style.display = 'block'; 
    } else {
        descriptionTextarea.style.display = 'none';
        descriptionLabel.style.display = 'none';
    }
});
