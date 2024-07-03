const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

// Função para adicionar uma nova tarefa à lista
function adicionarNovaTarefa() {
  const novaTarefa = {
    tarefa: input.value,
    concluida: false,
  };
  
  minhaListaDeItens.push(novaTarefa);
  input.value = '';

  mostrarTarefas();
}


function mostrarTarefas() {
  listaCompleta.innerHTML = '';
  
  minhaListaDeItens.forEach((item, posicao) => {
    const li = document.createElement('li');
    li.className = `task ${item.concluida ? 'done' : ''}`;

    const checkbox = document.createElement('img');
    checkbox.src = "./img/checked.png";
    checkbox.alt = "check-na-tarefa";
    checkbox.onclick = () => concluirTarefa(posicao);

    const textoTarefa = document.createElement('p');
    textoTarefa.textContent = item.tarefa;

    const botaoEditar = document.createElement('img');
    botaoEditar.src = "./img/editar tarefa.png";
    botaoEditar.alt = "editar-tarefa";
    botaoEditar.onclick = () => editarTarefa(posicao);

    const botaoRemover = document.createElement('img');
    botaoRemover.src = "./img/trash.png";
    botaoRemover.alt = "tarefa-para-o-lixo";
    botaoRemover.onclick = () => deletarTarefa(posicao);

    li.appendChild(checkbox);
    li.appendChild(textoTarefa);
    li.appendChild(botaoEditar);
    li.appendChild(botaoRemover);

    listaCompleta.appendChild(li);
  });

  salvarListaLocal();
}


function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
  mostrarTarefas();
}


function editarTarefa(posicao) {
  const novoTexto = prompt('Editar tarefa:', minhaListaDeItens[posicao].tarefa);
  if (novoTexto !== null) {
    minhaListaDeItens[posicao].tarefa = novoTexto.trim();
    mostrarTarefas();
  }
}


function deletarTarefa(posicao) {
  minhaListaDeItens.splice(posicao, 1);
  mostrarTarefas();
}


function carregarListaLocal() {
  const tarefasLocalStorage = localStorage.getItem('lista');
  if (tarefasLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasLocalStorage);
  }
}


function salvarListaLocal() {
  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}


button.addEventListener('click', adicionarNovaTarefa);


carregarListaLocal();
mostrarTarefas();
