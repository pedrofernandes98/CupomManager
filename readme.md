# CUPOM MANAGER

**Pedro Henrique Fernandes de Souza**

O aplicativo CupomManager consiste em uma aplicação que permite aos usuários cadastrarem, atualizarem e gerenciarem seus códigos de cupons virtuais para serem aplicados em e-commerces e demais transações online. Desta forma, a aplicação visa facilitar a recuperação e utilização de cupons que foram adquiridos fora do ambiente virtual da loja (como em eventos, sites especializados na divulgação de cupons, promoões especiais, entre outros) e desta forma não foram diretamente associados a conta.

## 1. Interfaces

### Tela principal

A tela principal apresenta a visão inicial do usuário com todos os cupons cadastrados no sistema, sendo possível visualizar os seguindes dados sobre o mesmo: 

- Percentual de desconto do cupom
- Nome da Loja
- Descrição do cupom
- Valor mínimo necessário para o cupom poder ser aplicado
- Data de expiração do cupom (mm-dd-yyyy)
- Status do cupom (Válido / Inválido) - O status compara o dia atual de acesso da aplicação com a data de expiração, caso a data já tenha passado exibe o valor INVÁLIDO caso contrário exibe o valor válido
- Código do cupom - que consiste no código a ser aplicado para habilitar o desconto

No topo da tela também é possível acessar as seguintes funcionalidades:

- **Filtro por texto livre** - Ao inserir qualquer caractere no campo de entrada de dados com placeholder "Digite um texto de pesquisa", o sistem a irá percorrer a lista de cupons cadastrados e retornar apenas aqueles cupons que tiverem aquela texto em algum de seus campos de dados. Por exemplo ao digitar a palavra "PUC" só irá ser exibido os cupons que contém o texto "PUC" nos seus campos.

- **Excluir cupons expirados** - Ao lado do campo de filtro por texto livre, é possível clicar em um botão com um íconde de um "Filtro com um +" que ao ser clicado, exibe um botão escrito "Excluir cupons expirados", ao clicar neste botão, o sistema irá excluir da listagens todos os cupons que estejam com o valor "Status: Expirado"

A tela também permite acesso às telas de cadastro (através do botão "+" localizado no canto inferior esquerdo da tela) e edição dos cupons (clicando no botão "Ver cupom") conforme descrito abaixo:

### Tela de Cadastro

Para acessar esta tela, o usuário deve clicar no botão com ícone "+" no canto inferior direito. 

Esta tela possibilita ao usuário cadastrar um novo cupom do sistema, sendo possível inserir os seguintes valores: 

- Percentual de desconto do cupom
- Nome da Loja
- Descrição do cupom
- Valor mínimo necessário para o cupom poder ser aplicado
- Data de expiração do cupom (mm-dd-yyyy)
- Status do cupom (Válido / Inválido) - O status compara o dia atual de acesso da aplicação com a data de expiração, caso a data já tenha passado exibe o valor INVÁLIDO caso contrário exibe o valor válido
- Código do cupom - que consiste no código a ser aplicado para habilitar o desconto

Ao clicar no botão "Incluir", o cupom é salvo no sistema e passa aparecer na listagem da Tela Princial. Caso clique em "Cancelar" o novo cupom não é salvo e o usuário é redirecionado para a Tela Principal.

### Tela de Edição e Exclução

Para acessar esta tela, o usuário deve clicar no botão "Ver cupom" em um dado cupom da Tela Principal do sistema.

Esta tela possibilita ao usuário editar e/ou excluir um cupom do sistema, sendo possível editar os seguintes valores: 

- Percentual de desconto do cupom
- Nome da Loja
- Descrição do cupom
- Valor mínimo necessário para o cupom poder ser aplicado
- Data de expiração do cupom (mm-dd-yyyy)
- Status do cupom (Válido / Inválido) - O status compara o dia atual de acesso da aplicação com a data de expiração, caso a data já tenha passado exibe o valor INVÁLIDO caso contrário exibe o valor válido
- Código do cupom - que consiste no código a ser aplicado para habilitar o desconto

Ao clicar no botão "Editar", o cupom é salvo no sistema e passa aparecer na listagem da Tela Princial. Caso clique em "Cancelar" o novo cupom não é salvo e o usuário é redirecionado para a Tela Principal.

Caso clique no botão "Apagar cupom", o cupom é excluído da listagem do sistema e não aparece mais na listagem.

## 2. Dados do usuário

Nesta aplicação, os dados do usuário que são armazenados são uma lista de cupons nos quais cada qual possuem os seguintes campos:

- Percentual de desconto do cupom
- Nome da Loja
- Descrição do cupom
- Valor mínimo necessário para o cupom poder ser aplicado
- Data de expiração do cupom (mm-dd-yyyy)
- Status do cupom (Válido / Inválido) - O status compara o dia atual de acesso da aplicação com a data de expiração, caso a data já tenha passado exibe o valor INVÁLIDO caso contrário exibe o valor válido
- Código do cupom - que consiste no código a ser aplicado para habilitar o desconto

## 3. Checklist de implementação

- A aplicação é original e não uma cópia da aplicação de um colega ou de uma aplicação já existente? **Sim**
- A aplicação tem pelo menos duas interfaces (telas ou páginas) independentes? **Sim**
- A aplicação armazena e usa de forma relevante dados complexos do usuário? **Sim**
- A aplicação possui um manifesto para instalação no dispositivo do usuário? **Sim**
- A aplicação possui um _service worker_ que permite o funcionamento off-line? **Sim**
- O código da minha aplicação possui comentários explicando cada operação? **Sim**
- A aplicação está funcionando corretamente? **Sim**
- A aplicação está completa? Sim
