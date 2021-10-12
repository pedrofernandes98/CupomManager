//Declaração das listas de registros da aplicação
let cupons = [];
let filtros = {};

//Ao carregar a página este método é executado
onload = () => {
  let tabs = document.querySelectorAll('.navBar .tab');

  //Exibe o elemente passo como parâmetro
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
  
  //Busca os itens armazenados no LocalStorage e inicializa na aplicação
  const t = JSON.parse(localStorage.getItem('cupons'));
  const f = JSON.parse(localStorage.getItem('filtros'));
  if (t) cupons = t;
  if (f) filtros = f;
  mostraCupons();
  
  //Adiciona evento de clique ao botão "btnAdic" que redireciona para página de cadastro
  document.querySelector('#btnAdic').onclick = () => {
    document.querySelector('#btnInc').disabled = false;
    ativa('tela2');
  };

  //Adiciona evento de clique ao botão "btnCanc1" que cancela a inclusão de um novo registro e limpa os inputs
  document.querySelector('#btnCanc1').onclick = () => {
    document.querySelector('#inputCupom').value = '';
    document.querySelector('#inputDescricao').value = '';
    document.querySelector('#inputPercentual').value = '';
    document.querySelector('#inputValorMinimo').value = '';
    document.querySelector('#inputDataExpiracao').value = '';
    document.querySelector('#inputCodigo').value = '';
    ativa('tela1');
  };

  //Adiciona evento de clique ao botão "btnCanc2" que cancela a inclusão de um novo registro e limpa os inputs
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

  //Adiciona evento de clique aos botão da aplicação e chama para o método correspondente às ações do evento
  document.querySelector('#btnInc').onclick = () => {
    adicionaCupom();
  };

  document.querySelector('#btnAlt').onclick = () => {
    alteraCupom();
  };

  document.querySelector('#btnDel').onclick = () => {
    apagaCupom();
  };

  document.querySelector('#btnFiltro').onclick = () => {
    mostraFiltroAdicional();
  };

  document.querySelector('#btnClearExpirados').onclick = () => {
    ExcluirExpirados();
  };
  
};


//Função responsável por exibir os cupons na Tela Principal
const mostraCupons = () => {
  //Carrega a <ul> do DOM para inserir elementos
  const listaCupons = document.querySelector('#listaCupons');
  listaCupons.innerHTML = '';
  
  //Para cada cupom presente na lista "cupons" armazenadas na variável 't'
  cupons.forEach((t) => {
    //Cria um elemento <li>
    let elemCupom = document.createElement('li');
    //Adiciona a classe "cupomItem"
    elemCupom.classList.add("cupomItem");
    //Cria o HTML do elemento de cupom interpolando com os valores das variáveis cadastrados pro cupom
    elemCupom.innerHTML = `<div class="" style="border: solid 1px;">
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
    elemCupom.setAttribute('data-id', t.id)
    //Adicona evento de clique ao elemento
    elemCupom.onclick = () => {
      let campoLojaCupom = document.querySelector('#tela3 #inputCupom');
      let campoDescricao = document.querySelector('#tela3 #inputDescricao');
      let campoPercentual = document.querySelector('#tela3 #inputPercentual');
      let campoValorMin = document.querySelector('#tela3 #inputValorMinimo');
      let campoDataExpiracao = document.querySelector('#tela3 #inputDataExpiracao');
      let campoCodigo = document.querySelector('#tela3 #inputCodigo');
      ativa('tela3');
      
      campoLojaCupom.value = t.lojaCupom; 
      campoDescricao.value = t.descricao;
      campoPercentual.value = t.percentual;
      campoValorMin.value = t.valorMin;
      campoDataExpiracao.value = t.dataExpiracao;
      campoCodigo.value = t.codigo;
      
      campoLojaCupom.setAttribute('data-id', t.id);
      campoLojaCupom.focus();
    };
    listaCupons.appendChild(elemCupom);
  });

  if (cupons.length > 0) {
    listaCupons.classList.remove('hidden');
    document.querySelector('#blank').classList.add('hidden');
  } else {
    listaCupons.classList.add('hidden');
    document.querySelector('#blank').classList.remove('hidden');
  }
};

//Função que torna visível um componente do DOM
const ativa = (comp) => {
  let listaDeTelas = document.querySelectorAll('body > .component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
};

//Função que adiciona um novo cupom no LocalStorage da aplicação
const adicionaCupom = () => {
  //Busca valor dos campos
  let campoLojaCupom = document.querySelector('#inputCupom');
  let campoDescricao = document.querySelector('#inputDescricao');
  let campoPercentual = document.querySelector('#inputPercentual');
  let campoValorMin = document.querySelector('#inputValorMinimo');
  let campoDataExpiracao = document.querySelector('#inputDataExpiracao');
  let campoCodigo = document.querySelector('#inputCodigo');

  //Atribui às variáveis
  let lojaCupom = campoLojaCupom.value;
  let descricao = campoDescricao.value;
  let percentual = campoPercentual.value;
  let valorMin = campoValorMin.value;
  let dataExpiracao = campoDataExpiracao.value;
  let codigo = campoCodigo.value;
  let dataAtual = new Date();
  let status = Date.parse(dataExpiracao) < dataAtual.getDate();
  console.log(status);
  //Adiciona a lista
  if (descricao != '') {
    cupons.push({
      id: Math.random().toString().replace('0.', ''),
      lojaCupom: lojaCupom,
      descricao: descricao,
      percentual: percentual,
      valorMin: valorMin,
      dataExpiracao: dataExpiracao,
      codigo: codigo,
      status: status
    });

    console.log(cupons);
    //Limpa os campos
    campoLojaCupom.value = ''; 
    campoDescricao.value = '';
    campoPercentual.value = '';
    campoValorMin.value = '';
    campoDataExpiracao.value = '';
    campoCodigo.value = '';

    //Salva a lista com o novo cupom e retorna a tela principal
    ativa('tela1');
    salvaCupons();
    mostraCupons();
  }
};

const monitoraCampoAdic = (e) => {
  let botao = document.querySelector('#btnInc');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

//Função que altera cupom no LocalStorage da aplicação
const alteraCupom = () => {
  
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
  let status = Date.parse(dataExpiracao) < dataAtual.getDate();
  console.log(status);
  let idCupom = campoLojaCupom.getAttribute('data-id');
  
  let i = cupons.findIndex((t) => t.id == idCupom);

  console.log(cupons[i])
  cupons[i] = {
    id: idCupom,
    lojaCupom: lojaCupom,
    descricao: descricao,
    percentual: percentual,
    valorMin: valorMin,
    dataExpiracao: dataExpiracao,
    codigo: codigo,
    status: status
  };
  cupons[i].status = status;

  console.log(cupons[i].status)
  campoLojaCupom.value = ''; 
  campoDescricao.value = '';
  campoPercentual.value = '';
  campoValorMin.value = '';
  campoDataExpiracao.value = '';
  campoCodigo.value = '';

  campoLojaCupom.removeAttribute('data-id');

  ativa('tela1');
  salvaCupons();
  mostraCupons();
};

//Função que remove um cupom da aplicação
const apagaCupom = () => {
  let campoLojaCupom = document.querySelector('#tela3 #inputCupom');
  let campoDescricao = document.querySelector('#tela3 #inputDescricao');
  let campoPercentual = document.querySelector('#tela3 #inputPercentual');
  let campoValorMin = document.querySelector('#tela3 #inputValorMinimo');
  let campoDataExpiracao = document.querySelector('#tela3 #inputDataExpiracao');
  let campoCodigo = document.querySelector('#tela3 #inputCodigo');
  
  let idCupom = campoLojaCupom.getAttribute('data-id');
  cupons = cupons.filter((t) => t.id != idCupom);
  
  campoLojaCupom.value = ''; 
  campoDescricao.value = '';
  campoPercentual.value = '';
  campoValorMin.value = '';
  campoDataExpiracao.value = '';
  campoCodigo.value = '';

  campoLojaCupom.removeAttribute('data-id');
  ativa('tela1');
  salvaCupons();
  mostraCupons();
};

const monitoraCampoAlt = (e) => {
  let botao = document.querySelector('#btnAlt');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const salvaCupons = () => {
  localStorage.setItem('cupons', JSON.stringify(cupons));
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

//Função que filtra os elementos que possuem o texto digitado no input de filtro
const removeCuponsByInput = (elementInput) => {
  console.log(elementInput);
  const inputValue = elementInput.value.toLowerCase();
  const cuponsList = document.querySelectorAll(".cupomItem");

  cuponsList.forEach(item => {

    const percentCupomText = item.querySelector(".percentCupom").textContent.toLowerCase();
    const descriptionCupomText = item.querySelector(".descriptionCupom").textContent.toLowerCase();

    //Verifica se os elementos do cupom possuem o texto digita
    if(percentCupomText.includes(inputValue) || descriptionCupomText.includes(inputValue)){
      //Se sim, exibe na lista
      item.style.display = 'list-item';
      return;
    }
    //Se não, esconde da lista a ser exibida
    item.style.display = 'none';

  });
};

const salvaFiltro = () => {
  localStorage.setItem('filtros', JSON.stringify(filtros));
};

//Função responsável por exibir e esconder o botão de "Excluir todos os expirados"
const mostraFiltroAdicional = () => {
  const elementAdicionalFiltro = document.querySelector('.componentSecundaryHeader');
  const elementContent = document.querySelector('.componentContent');
  const displayComponent = elementAdicionalFiltro.style.display;
  const displayDefault = 'none';

  if(displayComponent === displayDefault){
    elementAdicionalFiltro.style.display = 'flex';
    elementContent.style.padding = '1rem';
    window.scrollTo(0,0);
    return;
  }

  elementAdicionalFiltro.style.display = displayDefault;
  elementContent.style.padding = '5rem 1rem 1rem 1rem';
  
};

//Função responsável por remover da lista da aplicação os cupons expirados
const ExcluirExpirados = () => {
  console.log(cupons);
  
  cupons.forEach(item => {
    if(!item.status){
      cupons = cupons.filter((i) => i.id != item.id);
    }
  });

  console.log(cupons);
  salvaCupons();
  document.getElementById('inputCupomFilter').value = '';
  mostraCupons();
  alert("Cupons expirados excluídos com sucesso!");
  mostraFiltroAdicional();
}

//Registra service worker da aplicação
navigator.serviceWorker.register('./serviceworker.js');
