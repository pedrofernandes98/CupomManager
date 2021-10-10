let tarefas = [];
let filtros = {};

onload = () => {
  let tabs = document.querySelectorAll('.navBar .tab');

  const mostra = (elem) => {
    if (elem) {
      for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
      elem.classList.add('active');
    }

    for (let i = 0; i < tabs.length; i++) {
      let comp = tabs[i].getAttribute('for');
      if (tabs[i].classList.contains('active'))
        document.querySelector('#' + comp).classList.remove('hidden');
      else document.querySelector('#' + comp).classList.add('hidden');
    }
  };

  for (let i = 0; i < tabs.length; i++)
    tabs[i].onclick = (e) => {
      mostra(e.target);
    };

  mostra();
  
  const t = JSON.parse(localStorage.getItem('tarefas'));
  const f = JSON.parse(localStorage.getItem('filtros'));
  if (t) tarefas = t;
  if (f) filtros = f;
  mostraTarefas();

  document.querySelector('#btnAdic').onclick = () => {
    document.querySelector('#btnInc').disabled = false;
    ativa('tela2');
  };

  document.querySelector('#btnCanc1').onclick = () => {
    document.querySelector('#inputCupom').value = '';
    document.querySelector('#inputDescricao').value = '';
    document.querySelector('#inputPercentual').value = '';
    document.querySelector('#inputValorMinimo').value = '';
    document.querySelector('#inputDataExpiracao').value = '';
    document.querySelector('#inputCodigo').value = '';
    ativa('tela1');
  };

  document.querySelector('#btnCanc2').onclick = () => {
    let campoLojaCupom = document.querySelector('#tela3 #inputCupom');
    let campoDescricao = document.querySelector('#tela3 #inputDescricao');
    let campoPercentual = document.querySelector('#tela3 #inputPercentual');
    let campoValorMin = document.querySelector('#tela3 #inputValorMinimo');
    let campoDataExpiracao = document.querySelector('#tela3 #inputDataExpiracao');
    let campoCodigo = document.querySelector('#tela3 #inputCodigo');
    
    campoLojaCupom.value = ''; 
    campoDescricao.value = '';
    campoPercentual.value = '';
    campoValorMin.value = '';
    campoDataExpiracao.value = '';
    campoCodigo.value = '';
    
    campoLojaCupom.removeAttribute('data-id');
    ativa('tela1');
  };

  document.querySelector('#btnInc').onclick = () => {
    adicionaCupom();
  };

  document.querySelector('#btnAlt').onclick = () => {
    alteraTarefa();
  };

  document.querySelector('#btnDel').onclick = () => {
    apagaTarefa();
  };

  document.querySelector('#btnFiltro').onclick = () => {
    ativa('tela4');
  };

  document.querySelector('#btnFiltro').onclick = () => {
    ativa('tela4');
  };

  // document.querySelector('#btnFiltrar').onclick = () => {
  //   adicionaFiltro();
  //   salvaFiltro();
  //   ativa('tela1');
  //   mostraTarefas();
  // };
};

const mostraTarefas = () => {
  const listaDeTarefas = document.querySelector('#listaDeTarefas');
  listaDeTarefas.innerHTML = '';
  //let listaFiltrada = [];

    // if(filtros){
    //   var str = filtros.texto.toLowerCase();
    //   tarefas.forEach((t) => {
    //     if(t.lojaCupom.toLowerCase().includes(str) || t.descricao.toLowerCase().includes(str)){
    //       listaFiltrada.push(t);
    //     }
    //   });

    //   tarefas = listaFiltrada;
    // }
  
  console.log(tarefas);
  tarefas.forEach((t) => {
    console.log(t)
    let elemTarefa = document.createElement('li');
    elemTarefa.innerHTML = `<div class="" style="border: solid 1px;">
    <div class="containerCupom">
        <div class="percentCupom">
            ${t.percentual}%
        </div>

        <div class="descriptionCupom">
            <h2>${t.lojaCupom}</h2>
            <p>${t.descricao}</p>
              <p><span>Valor Mínimo:</span> R$${t.valorMin}</p>
            <p><span>Data de Expiração:</span> ${t.dataExpiracao}</p>
            <p><span>Status: </span>${t.status? 'Válido' : 'Expirado'}</p>
            
        </div>
    </div>
    <button class="button" style="width: 100%;
    margin: 5px 0px 5px 0px;">Ver cupom</button>
    </div> `;
    elemTarefa.setAttribute('data-id', t.id)
    elemTarefa.onclick = () => {
      let campoLojaCupom = document.querySelector('#tela3 #inputCupom');
      let campoDescricao = document.querySelector('#tela3 #inputDescricao');
      let campoPercentual = document.querySelector('#tela3 #inputPercentual');
      let campoValorMin = document.querySelector('#tela3 #inputValorMinimo');
      let campoDataExpiracao = document.querySelector('#tela3 #inputDataExpiracao');
      let campoCodigo = document.querySelector('#tela3 #inputCodigo');
      ativa('tela3');

      console.log(t.lojaCupom)
      
      campoLojaCupom.value = t.lojaCupom; 
      campoDescricao.value = t.descricao;
      campoPercentual.value = t.percentual;
      campoValorMin.value = t.valorMin;
      campoDataExpiracao.value = t.dataExpiracao;
      campoCodigo.value = t.codigo;
      
      campoLojaCupom.setAttribute('data-id', t.id);
      campoLojaCupom.focus();
    };
    listaDeTarefas.appendChild(elemTarefa);
  });
  //document.querySelector('#estado').innerText = tarefas.length;
  if (tarefas.length > 0) {
    listaDeTarefas.classList.remove('hidden');
    document.querySelector('#blank').classList.add('hidden');
  } else {
    listaDeTarefas.classList.add('hidden');
    document.querySelector('#blank').classList.remove('hidden');
  }
};



const ativa = (comp) => {
  let listaDeTelas = document.querySelectorAll('body > .component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
};

const adicionaTarefa = () => {
  let campo = document.querySelector('#inputNovaTarefa');
  let descricao = campo.value;
  if (descricao != '') {
    tarefas.push({
      id: Math.random().toString().replace('0.', ''),
      descricao: descricao,
    });
    campo.value = '';
    ativa('tela1');
    salvaTarefas();
    mostraTarefas();
  }
};


const adicionaCupom = () => {
  let campoLojaCupom = document.querySelector('#inputCupom');
  let campoDescricao = document.querySelector('#inputDescricao');
  let campoPercentual = document.querySelector('#inputPercentual');
  let campoValorMin = document.querySelector('#inputValorMinimo');
  let campoDataExpiracao = document.querySelector('#inputDataExpiracao');
  let campoCodigo = document.querySelector('#inputCodigo');


  let lojaCupom = campoLojaCupom.value;
  let descricao = campoDescricao.value;
  let percentual = campoPercentual.value;
  let valorMin = campoValorMin.value;
  let dataExpiracao = campoDataExpiracao.value;
  let codigo = campoCodigo.value;
  let dataAtual = new Date();
  let status = Date.parse(dataExpiracao) < dataAtual.getDate();

  //Realizar validações de formulários
  if (descricao != '') {
    tarefas.push({
      id: Math.random().toString().replace('0.', ''),
      lojaCupom: lojaCupom,
      descricao: descricao,
      percentual: percentual,
      valorMin: valorMin,
      dataExpiracao: dataExpiracao,
      codigo: codigo,
      status: status
    });

    campoLojaCupom.value = ''; 
    campoDescricao.value = '';
    campoPercentual.value = '';
    campoValorMin.value = '';
    campoDataExpiracao.value = '';
    campoCodigo.value = '';

    ativa('tela1');
    salvaTarefas();
    mostraTarefas();
  }

  console.log(tarefas);
};

const monitoraCampoAdic = (e) => {
  let botao = document.querySelector('#btnInc');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const alteraTarefa = () => {
  
  let campoLojaCupom = document.querySelector('#tela3 #inputCupom');
  let campoDescricao = document.querySelector('#tela3 #inputDescricao');
  let campoPercentual = document.querySelector('#tela3 #inputPercentual');
  let campoValorMin = document.querySelector('#tela3 #inputValorMinimo');
  let campoDataExpiracao = document.querySelector('#tela3 #inputDataExpiracao');
  let campoCodigo = document.querySelector('#tela3 #inputCodigo');

  console.log(campoCodigo);
  let lojaCupom = campoLojaCupom.value;
  let descricao = campoDescricao.value;
  let percentual = campoPercentual.value;
  let valorMin = campoValorMin.value;
  let dataExpiracao = campoDataExpiracao.value;
  let codigo = campoCodigo.value;
  console.log(codigo);
  let dataAtual = new Date();
  let status = Date.parse(dataExpiracao) << dataAtual.getDate();

  let idTarefa = campoLojaCupom.getAttribute('data-id');
  
  let i = tarefas.findIndex((t) => t.id == idTarefa);

  console.log(tarefas[i])
  tarefas[i] = {
    id: idTarefa,
    lojaCupom: lojaCupom,
    descricao: descricao,
    percentual: percentual,
    valorMin: valorMin,
    dataExpiracao: dataExpiracao,
    codigo: codigo,
    status: status
  };
  
  campoLojaCupom.value = ''; 
  campoDescricao.value = '';
  campoPercentual.value = '';
  campoValorMin.value = '';
  campoDataExpiracao.value = '';
  campoCodigo.value = '';

  campoLojaCupom.removeAttribute('data-id');

  ativa('tela1');
  salvaTarefas();
  mostraTarefas();
};

const alteraCupom = () => {
  let campo = document.querySelector('#inputAlteraTarefa');
  let idTarefa = campo.getAttribute('data-id');
  let i = tarefas.findIndex((t) => t.id == idTarefa);
  tarefas[i].descricao = campo.value;
  campo.value = '';
  campo.removeAttribute('data-id');
  ativa('tela1');
  salvaTarefas();
  mostraTarefas();
};

const apagaTarefa = () => {
  let campoLojaCupom = document.querySelector('#tela3 #inputCupom');
  let campoDescricao = document.querySelector('#tela3 #inputDescricao');
  let campoPercentual = document.querySelector('#tela3 #inputPercentual');
  let campoValorMin = document.querySelector('#tela3 #inputValorMinimo');
  let campoDataExpiracao = document.querySelector('#tela3 #inputDataExpiracao');
  let campoCodigo = document.querySelector('#tela3 #inputCodigo');
  
  let idTarefa = campoLojaCupom.getAttribute('data-id');
  tarefas = tarefas.filter((t) => t.id != idTarefa);
  
  campoLojaCupom.value = ''; 
  campoDescricao.value = '';
  campoPercentual.value = '';
  campoValorMin.value = '';
  campoDataExpiracao.value = '';
  campoCodigo.value = '';

  campoLojaCupom.removeAttribute('data-id');
  ativa('tela1');
  salvaTarefas();
  mostraTarefas();
};

const monitoraCampoAlt = (e) => {
  let botao = document.querySelector('#btnAlt');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const salvaTarefas = () => {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
};

const adicionaFiltro = () => {
  let campoLojaCupom = document.querySelector('#tela4 #inputCupom');
  let dataInicio = document.querySelector('#tela4 #inputDataExpiracaoInicio');
  let dataFinal = document.querySelector('#tela4 #inputDataExpiracaoFim');

  filtros = {
    texto: campoLojaCupom.value,
    dataInicial: dataInicio.value,
    dataFinal: dataFinal.value
  }
}

const salvaFiltro = () => {
  localStorage.setItem('filtros', JSON.stringify(filtros));
};
