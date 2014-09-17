/**
* @package Code Craft
* @pdesc Conjunto de soluções front-end.
*
* @module BasicDOM
* @file Micro DOM Handlers.
*
* @requires BasicTools
*
* @author Rianna Cantarelli <rianna.aeon@gmail.com>
*/
'use strict';




// --------------------
// Caso não exista, inicia objeto CodeCraft
var CodeCraft = (CodeCraft || function () { });
if(typeof(CodeCraft) === 'function') { CodeCraft = new CodeCraft(); };





/**
* Métodos versáteis para inúmeras aplicações.
*
* @class BasicDOM
*
* @memberof CodeCraft
*
* @static
*
* @type {Class}
*/
CodeCraft.BasicDOM = new (function () {
    var _bt = CodeCraft.BasicTools;



    /**
    * OBJETO PÚBLICO QUE SERÁ EXPOSTO.
    */
    var p = this.Control = {





        // -------------------------------------
        // DEFINIÇÃO DE TIPOS



        /**
        * Objeto que traz configurações para serem aplicadas a um grupo de objetos HTML.
        * 
        * @deftype {ElementConfig}
        *
        * @property {Node}             node         Node base onde o seletor CSS deve ser aplicado.
        * @property {Object}           attr         Objeto Key|Value para os Atributos HTML que serão setados.
        * @property {Object}           prop         Objeto Key|Value para as Propriedades CSS que serão setadas.
        * @property {Object}           event        Objeto Key|Value para os Eventos que serão setados.
        */










        // -------------------------------------
        // GET ELEMENTS E SET PROPERTIES



        /**
        * Retorna o/s objeto/s indicado/s conforme o seletor CSS informado.
        * Retorna apenas 1 node se a pesquisa foi por um ID e "null" quando não encontrar objeto algum.
        * 
        * @function Get
        *
        * @memberof BasicDOM
        *
        * @param {String}           s           Seletor CSS.
        * @param {Node}             [n]         Node base onde o seletor CSS deve ser aplicado.
        *
        * @return {?Node[]}
        */
        Get: function (s, n) {
            var o = (n === undefined) ? document.querySelectorAll(s) : n.querySelectorAll(s);

            var l = o.length;
            switch (l) {
                case 0:
                    return null;

                    break;
                case 1:
                    var sp = s.split(' ');
                    if (o[0].hasAttribute('id') && sp[sp.length - 1] == '#' + o[0].id) {
                        return o[0];
                    }

                    break;
            }


            // Elimina todos objetos que não forem elementos de HTML
            var nO = [];
            for (var i in o) {
                if (o[i].nodeType === 1) { nO.push(o[i]); }
            }

            return nO;
        },




        /**
        * Configura os atributos, propriedades CSS e eventos informados para todos os elementos
        * indicados no seletor CSS.
        * 
        * @function Set
        *
        * @memberof BasicDOM
        *
        * @param {String}           s           Seletor CSS.
        * @param {ElementConfig}    c           Configurações que serão setadas.
        */
        Set: function (s, c) {
            var n = (typeof (c.node) !== 'undefined') ? c.node : undefined;
            var o = p.Get(s, n);

            for (var it in o) {

                // Havendo set de atributos
                if (typeof (c.attr) !== 'undefined') {
                    for (var ii in c.attr) {
                        o[it].setAttribute(ii, c.attr[ii]);
                    }
                }

                // Havendo set de propriedades css
                if (typeof (c.prop) !== 'undefined') {
                    for (var ii in c.prop) {
                        o[it].style[ii] = c.prop[ii];
                    }
                }

                // Havendo set de eventos
                if (typeof (c.event) !== 'undefined') {
                    for (var ii in c.event) {
                        p.SetEvent(o[it], ii, c.event[ii]);
                    }
                }
            }
        },










        // -------------------------------------
        // MANIPULADORES DE CLASSES



        /**
        * Verifica se o node possui uma determinada classe.
        * 
        * @function HasClass
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n           Elemento que será verificado.
        * @param {String}           c           Nome da classe procurada.
        *
        * @return {Boolean}
        */
        HasClass: function (n, c) {
            var sC = n.className.split(' ');
            for (var i in sC) {
                if (sC[i] == c) { return true; }
            }

            return false;
        },




        /**
        * Adiciona ou remove classes no Node alvo.
        * 
        * @function SetClass
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n           Node alvo.
        * @param {String|String[]}  a           Classes que serão adicionadas. Use null ou '' para ignorar.
        * @param {String|String[]}  r           Classes que serão removidas. Use null ou '' para ignorar.
        */
        SetClass: function (n, a, r) {
            var nC = '';
            var allC = n.className.split(' ');

            a = (a === null || a === '') ? [] : (typeof (a) === 'string') ? [a] : a;
            r = (r === null || r === '') ? [] : (typeof (r) === 'string') ? [r] : r;


            for (var i in allC) {
                var rm = false;
                var c = _bt.Trim(allC[i]);


                if (c != '') {

                    // Verifica se a classe setada está na lista de remoção
                    for (var j in r) {
                        if (c == r[j]) { rm = true; }
                    }

                    // Se a classe não estiver na lista de remoção, adiciona ela
                    if (!rm) { a.push(allC[i]); }
                }
            }

            // Para cada classe que deve ser adicionada...
            for (var i in a) { nC += a[i] + ' '; }
            n.className = (nC.substr(0, nC.length - 1));
        },




        /**
        * Adiciona classes no Node alvo.
        *
        * @function AddClass
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n           Node alvo.
        * @param {String|String[]}  a           Classes que serão adicionadas.
        */
        AddClass: function (n, a) {
            p.SetClass(n, a, null);
        },




        /**
        * Remove classes do Node alvo.
        *
        * @function RemoveClass
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n           Node alvo.
        * @param {String|String[]}  r           Classes que serão removidas.
        */
        RemoveClass: function (n, r) {
            p.SetClass(n, null, r);
        },




        /**
        * Retorna um array contendo as classes do elemento alvo.
        * 
        * @function GetClass
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n           Node alvo.
        *
        * @return {String[]}
        */
        GetClass: function (n) {
            var aR = [];
            if (n.hasAttribute('class')) {
                var sp = _bt.Trim(n.className).split(' ');
                for (var cl in sp) {
                    var c = _bt.Trim(sp[cl]);
                    if (c != '') { aR.push(c); }
                }
            }
            return aR;
        },










        // -------------------------------------
        // MANIPULADORES DE ATRIBUTOS



        /**
        * Retorna o valor do atributo de um elemento.
        * Caso não o encontre, retorna o valor padrão definido.
        * 
        * @function GetAttr
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n                   Node alvo.
        * @param {String}           a                   Nome do atributo.
        * @param {Object}           [d = undefined]     Valor padrão do atributo.
        *
        * @return {String}
        */
        GetAttr: function (n, a, d) {
            return (n.hasAttribute(a)) ? n.attributes[a].value.toString() : d;
        },




        /**
        * Retorna o valor do atributo de um elemento em formato booleano.
        * Caso não o encontre, retorna o valor padrão definido.
        * 
        * @function GetBooleanAttr
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n                   Node alvo.
        * @param {String}           a                   Nome do atributo.
        * @param {Object}           [d = undefined]     Valor padrão do atributo.
        *
        * @return {Boolean}
        */
        GetBooleanAttr: function (n, a, d) {
            return _bt.TryParse.ToBoolean(p.GetAttr(n, a, d));
        },










        // -------------------------------------
        // MANIPULADORES DE EVENTOS



        /**
        * Associa o evento indicado ao manipulador do objeto alvo.
        * Garante que o evento não seja adicionado mais de 1 vez ao mesmo objeto.
        * Para o correto funcionamento não use funções anonimas e sim objetos nomeados.
        * Isto permite garantir que apenas 1 evento será definido para aquele objeto naquele manipulador.
        * 
        * @function SetEvent
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n           Elemento que ganhará o evento.
        * @param {String}           e           Manipulador do evento [click | blur | mouseover].
        * @param {Function}         f           Função do evento que será adicionado.
        */
        SetEvent: function (n, e, f) {
            n.removeEventListener(e, f, false);
            n.addEventListener(e, f, false);
        },




        /**
        * Remove o evento indicado do manipulador do objeto alvo.
        * Este método funciona apenas com funções nomeadas.
        *
        * @function RemoveEvent
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n           Elemento que perderá o evento.
        * @param {String}           e           Manipulador do evento [click | blur | mouseover].
        * @param {Function}         f           Função do evento que será removido.
        */
        RemoveEvent: function (n, e, f) {
            n.removeEventListener(e, f, false);
        },











        // -------------------------------------
        // MANIPULADORES DE ELEMENTOS COMPLEXOS



        /**
        * Cria um novo elemento conforme as definições passadas.
        * 
        * @function CreateElement
        *
        * @memberof BasicDOM
        *
        * @paran {String}                   tag                 Nome da tag.
        * @paran {!String}                  [text]              Texto a ser inserido no node.
        * @paran {Object}                   [attrs]             Objeto contendo chaves e valores de atributos a serem associados.
        *
        * @return {Node}
        */
        CreateElement : function (tag, text, attrs) {
            var n = document.createElement(tag);

            if (attrs != undefined && attrs != null) {
                for (var it in attrs) {
                    n.setAttribute(it, attrs[it]);
                }
            }

            if (text != undefined && attrs != null) {
                n.textContent = text;
            }

            return n;
        },




        /**
        * Converte uma string em um objeto DOM.
        * 
        * @function ConvertStringToDOMElement
        *
        * @memberof BasicDOM
        *
        * @param {String}           s           String que será convertida.
        *
        * @return {Object}
        */
        ConvertStringToDOMElement: function (s) {
            var ifr = document.createElement('iframe');
            ifr.style.display = 'none';

            document.body.appendChild(ifr);

            ifr.contentDocument.open();
            ifr.contentDocument.write(s);
            ifr.contentDocument.close();

            var nDOM = ifr.contentDocument.body.firstChild.cloneNode(true);
            document.body.removeChild(ifr);

            return nDOM;
        },




        /**
        * Seta em uma tabela do documento o funcionamento das configurações definidas em suas "colgroup".
        *
        * @function SetColGroup
        *
        * @memberof BasicDOM
        *
        * @param {Node}             t               Node "table" alvo.
        * @param {Boolean}          [h = true]      Indica se as configurações devem ser setadas no cabeçalho da tabela.
        * @param {Boolean}          [f = true]      Indica se as configurações devem ser setadas no rodapé da tabela.
        */
        SetColGroup: function (t, h, f) {
            h = (h === undefined) ? true : h;
            f = (f === undefined) ? true : f;

            var aClass = [];
            var aStyle = [];



            // Resgata todas as classes e estilos setados para cada "col" da tabela
            var cols = p.Get('colgroup col', t);
            for (var c in cols) {
                aClass.push(p.GetAttr(cols[c], 'class', ''));
                aStyle.push(p.GetAttr(cols[c], 'style', ''));
            }



            /**
            * Define as regras resgatadas nas colunas alvo.
            * 
            * @function __setColRules
            *
            * @memberof SetCoolGroup
            *
            * @paran{Node}              pN                  Parent node das "tr > td" que serão setadas.
            */
            var __setColRules = function (pN) {
                var aTr = p.Get('tr', pN);

                // Para cada linha filha...
                for (var r in aTr) {
                    var aTd = p.Get('td', aTr[r]);
                    if (aTd == null) {
                        aTd = p.Get('th', aTr[r]);
                    }

                    // Para cada set de colunas...
                    for (var i = 0; i < aClass.length; i++) {
                        var aC = aClass[i];
                        var aS = aStyle[i];

                        if (i < aTd.length) {
                            var td = aTd[i];
                            aC += ' ' + p.GetAttr(td, 'class', '');
                            aS += ' ' + p.GetAttr(td, 'style', '');

                            if (aC != ' ') { p.GetAttr(td, 'class', aC); }
                            if (aS != ' ') { p.GetAttr(td, 'style', aS); }

                            var cs = p.GetAttr(td, 'colspan', 0);
                            i += parseInt(cs, 10);
                        }
                    }
                }

            };



            // Seta regras para o header
            if (h == true) {
                var tH = p.Get('thead', t);
                if (tH != null) {
                    __setColRules(tH[0]);
                }
            }



            // Seta regras para o header
            if (f == true) {
                var tF = p.Get('tfoot', t);
                if (tF != null) {
                    __setColRules(tF[0]);
                }
            }



            // Seta regras para o body
            var tB = p.Get('tbody', t);
            if (tB == null) {
                tB = t;
            }
            else { tB = tB[0]; }

            __setColRules(tB);
        },




        /**
        * Percorre todas as tabelas do documento em busca do atributo "data-cc-autosetcolgroup".
        * Encontrando este atributo, efetua o set automático dos atributos em colgroup.
        * Elementos "thead" e "tfoot" podem ser marcados com o atributo "data-cc-autosetcolgroup-ignore".
        *
        * @function AutoSetColGroup
        *
        * @memberof BasicDOM
        */
        AutoSetColGroup: function () {
            var aT = p.Get('table');

            // Para cada tabela...
            for (var it in aT) {
                var t = aT[it];

                if (t.hasAttribute('data-cc-autosetcolgroup')) {
                    var setH = false;
                    var setF = false;

                    var th = p.Get('thead', t);
                    var tf = p.Get('tfoot', t);

                    if (th != null) { th = th[0]; }
                    if (tf != null) { tf = tf[0]; }



                    if (th != null) {
                        setH = !th.hasAttribute('data-cc-autosetcolgroup-ignore');
                    }
                    if (tf != null) {
                        setF = !tf.hasAttribute('data-cc-autosetcolgroup-ignore');
                    }

                    p.SetColGroup(t, setH, setF);
                }
            }
        },










        // -------------------------------------
        // SET AUTOMÁTICO DE ATRIBUTOS E INICIALIZADOR DE WIDGETS



        /**
        * Objeto que traz funcionalidades para set de atributos dinamicamente e 
        * também permite inicializar widgets a partir da verificação de existência de
        * nodes compatíveis com sua execução.
        *
        * @class AutoSetRules
        *
        * @memberof BasicDOM
        */
        AutoSetRules: new (function () {

            /**
            * Armazena todos os sets das configurações para a view atual.
            *
            * @example
            * O objeto deve ser um JSON onde :
            *
            * "key"     : deve ser um seletor CSS indicando quais objetos devem ser setados.
            * "value"   : { 'propriedade' : 'valor ou evento(key[i])' }
            *
            * @memberof AutoSetRules
            *
            * @private
            *
            * @type {Object}
            */
            var _autoSetRules = {};










            /**
            * OBJETO PÚBLICO QUE SERÁ EXPOSTO.
            */
            var pp = this.Control = {



                /**
                * Adiciona novas regras.
                * 
                * @function AddRules
                *
                * @memberof AutoSetRules
                *
                * @paran{Object}                rules                   Objeto JSON contendo as regras que serão implementadas.
                * @paran{Boolean}               [reset]                 Indica se, junto com o set das regras o objeto interno 
                *                                                       deve ser resetado.
                */
                AddRules: function (rules, reset) {
                    reset = (reset === undefined) ? false : reset;
                    if (reset == true) { _autoSetRules = {}; }

                    // Adiciona novos valores
                    for (var it in rules) {
                        _autoSetRules[it] = rules[it];
                    }
                },




                /**
                * Implementa as regras definidas.
                *
                * @function ImplementRules
                *
                * @memberof AutoSetRules
                */
                ImplementRules: function () {

                    // Para cada regra definida...
                    for (var css in _autoSetRules) {

                        var tg = p.Get(css);
                        var rl = _autoSetRules[css];

                        // Encontrando os elementos
                        if (tg != null) {

                            // Para cada elemento encontrado...
                            for (var it in tg) {
                                var el = tg[it];

                                // para cada set de propriedade...
                                for (var attr in rl) {
                                    var v = rl[attr];

                                    // Remove o atributo
                                    if (v === null) {
                                        el.removeAttribute(attr);
                                    }
                                    else if (_bt.IsString(v)) {
                                        el.setAttribute(attr, v);
                                    }
                                    else {
                                        v(el);
                                    }


                                }
                            }
                        }
                    }
                },




                /**
                * Evento padrão para set do atributo 'aria-labelledby'.
                * Esta regra de configuração prevê que o label esteja contido em algum ponto do node do elemento alvo.
                *
                * @function SetLabelledBy
                *
                * @memberof AutoSetRules
                *
                * @private
                *
                * @param {Node}         e                   Elemento que se quer completar com as regras de aria.
                * @param {String[]}     tgts                Conjunto de seletores CSS para os possíveis elementos alvos.
                */
                SetLabelledBy: function (e, tgts) {
                    var lbl = null;


                    // Para cada possível legenda...
                    for (var it in tgts) {
                        // enquanto não achar uma...
                        if (lbl == null) {
                            // Encontrando qualquer set definido. Seta-o como legenda.
                            var l = p.Get(tgts[it], e);

                            if (l != null) {
                                lbl = l[0];
                            }
                        }
                    }


                    // Encontrando algum elemento
                    if (lbl != null) {
                        // Resgata o Id do elemento e do seu label
                        var eId = (e.hasAttribute('id')) ? e.id : null;
                        var lblId = (lbl.hasAttribute('id')) ? lbl.id : null;

                        if (lblId != null) {
                            e.setAttribute('aria-labelledby', lblId);
                        }
                        else if (lblId == null && eId != null) {
                            var lblId = eId + '_lblid';
                            lbl.setAttribute('id', lblId);
                            e.setAttribute('aria-labelledby', lblId);
                        }
                    }
                }

            };





            return pp;
        })


    };




    return p;
});