 Code Craft - BasicDOM
=======================

> [Aeon Digital](http://www.aeondigital.com.br)
>
> rianna@aeondigital.com.br


**Code Craft** é um conjunto de soluções front-end e outras server-side para a construção de aplicações web.
Tais soluções aqui apresentadas são a minha forma de compartilhar com a `comunidade online` parte do que aprendi 
(e continuo aprendendo) nos foruns, sites, blogs, livros e etc. assim como na experiência adquirida no contato
direto com profissionais e estudantes que, como eu, amam o universo `Web Developer` e nunca se dão por satisfeitos 
com seu nível atual de conhecimento.


## C.C. - BasicDOM

**BasicDOM** é um conjunto de funcionalidades básicas para facilitar o trabalho de lidar com elementos do DOM 
e seus elementos.


### Manipuladores de elementos DOM.

* `Get`                             : Retorna o/s objeto/s indicado/s conforme o seletor CSS informado.
* `Set`                             : Seta nos objetos encontrados os atributos, classes CSS ou eventos informados.


### Manipuladores de Classes.

* `HasClass`                        : Verifica se o node possui uma determinada classe.
* `SetClass`                        : Adiciona ou remove classes no Node alvo.
* `AddClass`                        : Adiciona uma ou mais classes no Node alvo.
* `RemoveClass`                     : Remove uma ou mais classes no Node alvo.
* `GetClass`                        : Retorna um array contendo as classes do elemento alvo.


### Manipuladores de Atributos.

* `HasAttr`                         : Identifica se o atributo procurado foi setado no node alvo.
* `SetAttr`                         : Seta a propriedade/atributo no node alvo.
* `RemoveAttr`                      : Remove o atributo indicado do node alvo.
* `GetAttr`                         : Retorna o valor do atributo de um elemento.
* `GetBooleanAttr`                  : Retorna o valor do atributo de um elemento em formato booleano.


### Manipuladores de Eventos.

* `SetEvent`                        : Associa o evento indicado garantindo que o evento não seja duplicado para o manipulador informado.
* `RemoveEvent`                     : Remove o evento indicado do manipulador do objeto alvo.


### Manipuladores de elementos complexos.

* `ConvertStringToDOMElement`       : Converte uma string em um objeto DOM.
* `SetColGroup`                     : Seta as classes e styles dos elementos "col" de uma tabela em suas respectivas células.
* `AutoSetColGroup`                 : Automatiza o uso do `SetColGroup` em todas as tabelas da view.


### Sets automáticos para atributos e inicializador de widgets.

* `AutoSetRules.AddRules`           : Adiciona novas regras às existêntes.
* `AutoSetRules.ImplementRules`     : Implementa as regras definidas.
* `AutoSetRules.SetLabelledBy`      : Set dinamico para o atributo 'aria-labelledby'.


#### Dependências

As seguintes bibliotecas são necessárias :

* [BasicTools](http://github.com/AeonDigital/Code-Craft-js_BasicTools)


**Importante**

Tenha em mente que em algumas vezes, neste e em outros projetos **Code Craft** optou-se de forma consciênte em 
não utilizar uma ou outra *regra de otimização* dos artefatos de software quando foi percebida uma maior vantagem para
a equipe de desenvolvimento em flexibilizar tal ponto do que extritamente seguir todas as regras de otimização.


### Compatibilidade

Não é intenção deste nem de outros projetos do conjunto de soluções **Code Craft** em manter 
compatibilidade com navegadores antigos (IE8<).


________________________________________________________________________________________________________________________



## Licença

Para este e outros projetos **Code Craft** é utilizada a [Licença GNUv3](LICENCE.md).
