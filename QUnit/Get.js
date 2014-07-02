/**
* @package Code Craft
* @pdesc Conjunto de soluções front-end.
*
* @module Get
* @file Micro DOM Handlers.
*
* @author Rianna Cantarelli <rianna.aeon@gmail.com>
*/










/**
* Métodos básicos para manipulação de objetos DOM.
*
* @class BasicDOM
*
* @memberof CodeCraft
*
* @static
*
* @type {Class}
*/
var BasicDOM = function () {
    var _p = CodeCraft.BasicTools;



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

            if (o.length == 0) { return null; }
            else if (o.length == 1 && _p.TypeOf(o) === '[object NodeList]' && o[0].hasAttribute('id')) {
                var sp = s.split(' ');
                if (sp[sp.length - 1] == '#' + o[0].id) {
                    return o[0];
                }
            }

            // Antes de retornar um array com os objetos elimina todos os que não forem elementos de HTML
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
            var o = Get(s, n);

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
                        o[it].addEventListener(ii, c.event[ii], false);
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
                var c = _p.Trim(allC[i]);


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
            SetClass(n, a, null);
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
            SetClass(n, null, r);
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
                var sp = _p.Trim(n.className).split(' ');
                for (var cl in sp) {
                    var c = _p.Trim(sp[cl]);
                    if (c != '') { aR.push(c); }
                }
            }
            return aR;
        },










        // -------------------------------------
        // MANIPULADORES DE ATRIBUTOS



        /**
        * Identifica se o atributo procurado foi setado no node alvo.
        * 
        * @function HasAttr
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n           Node alvo.
        * @param {String}           a           Nome do atributo.
        *
        * @return {Boolean}
        */
        HasAttr: function (n, a) {
            return n.hasAttribute(a);
        },




        /**
        * Seta o atributo no node alvo.
        * 
        * @function SetAttr
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n           Node alvo.
        * @param {String}           a           Nome do atributo.
        * @param {String}           v           Valor do atributo.
        */
        SetAttr: function (n, a, v) {
            n.setAttribute(a, v);
        },




        /**
        * Retorna o atributo de um elemento. 
        * Caso não o encontre, retorna o valor padrão definido.
        * 
        * @function GetAttr
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n           Node alvo.
        * @param {String}           a           Nome do atributo.
        * @param {Object}           d           Valor padrão do atributo.
        *
        * @return {Object}
        */
        GetAttr: function (n, a, d) {
            return (n.hasAttribute[a]) ? n.attributes[a].value.toString() : d;
        },




        /**
        * Resgata uma propriedade booleana do elemento.
        * 
        * @function GetBooleanAttr
        *
        * @memberof BasicDOM
        *
        * @param {Node}             n           Node alvo.
        * @param {String}           a           Nome do atributo.
        * @param {Object}           d           Valor padrão do atributo.
        *
        * @return {Boolean}
        */
        GetBooleanAttr: function (n, a, d) {
            var r = p.GetAttr(n, a, d);
            return _p.TryParse.ToBoolean(r);
        }


    };




    return p;
};









// --------------------
// Caso não exista, inicia objeto CodeCraft
var CodeCraft = (CodeCraft || function () { });
if(typeof(CodeCraft) === 'function') { CodeCraft = new CodeCraft(); };



// Associa o novo objeto ao "CodeCraft"
CodeCraft.BasicDOM = new BasicDOM();













/**
* Converte uma string em um objeto DOM.
* 
* @function ConvertStringToDOMElement
*
* @global
*
* @param {String}                               s                                   String que será convertida
*
* @return {Object}
*/
var ConvertStringToDOMElement = function (s) {
    var ifr = document.createElement('iframe');
    ifr.style.display = 'none';

    document.body.appendChild(ifr);

    ifr.contentDocument.open();
    ifr.contentDocument.write(s);
    ifr.contentDocument.close();
    
    var nDOM = ifr.contentDocument.body.firstChild;
    document.body.removeChild(ifr);

    return nDOM;
};




































































/**
* Seta em uma tabela do documento o funcionamento das configurações definidas em suas "colgroup".
*
* @function SetColGroup
*
* @global
*
* @param {Node}             t               Node "table" alvo.
* @param {Boolean}          [h = true]      Indica se as configurações devem ser setadas no cabeçalho da tabela.
* @param {Boolean}          [f = true]      Indica se as configurações devem ser setadas no rodapé da tabela.
*/
var SetColGroup = function (t, h, f) {
    h = (h === undefined) ? true : h;
    f = (f === undefined) ? true : f;

    var aClass = [];
    var aStyle = [];



    // Resgata todas as classes e estilos setados para cada "col" da tabela
    var cols = Get('colgroup col', t);
    for (var c in cols) {
        aClass.push(GetProp(cols[c], 'class', ''));
        aStyle.push(GetProp(cols[c], 'style', ''));
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
        var aTr = Get('tr', pN);

        // Para cada linha filha...
        for (var r in aTr) {
            var aTd = Get('td', aTr[r]);
            if(aTd == null) {
                aTd = Get('th', aTr[r]);
            }

            // Para cada set de colunas...
            for (var i = 0; i < aClass.length; i++) {
                var aC = aClass[i];
                var aS = aStyle[i];

                if (i < aTd.length) {
                    var td = aTd[i];
                    aC += ' ' + GetProp(td, 'class', '');
                    aS += ' ' + GetProp(td, 'style', '');

                    if (aC != ' ') { td.setAttribute('class', aC); }
                    if (aS != ' ') { td.setAttribute('style', aS); }

                    var cs = GetProp(td, 'colspan', 0);
                    i += parseInt(cs, 10);
                }
            }
        }

    };



    // Seta regras para o header
    if (h == true) {
        var tH = Get('thead', t);
        if (tH != null) {
            __setColRules(tH[0]);
        }
    }



    // Seta regras para o header
    if (f == true) {
        var tF = Get('tfoot', t);
        if (tF != null) {
            __setColRules(tF[0]);
        }
    }



    // Seta regras para o body
    var tB = Get('tbody', t);
    if (tB == null) {
        tB = t;
    }
    else { tB = tB[0]; }

    __setColRules(tB);
};



/**
* Percorre todas as tabelas do documento em busca do atributo "data-autosetcolgroup".
* Encontrando este atributo, efetua o set automático dos atributos em colgroup.
* Elementos "thead" e "tfoot" podem ser marcados com o atributo "data-autosetcolgroup-ignore".
*
* @function AutoSetColGroup
*
* @global
*/
var AutoSetColGroup = function () {
    var aT = Get('table');
    
    // Para cada tabela...
    for (var it in aT) {
        var t = aT[it];
        var isSet = HasProp(t, 'data-autosetcolgroup');

        if (isSet) {
            var setH = false;
            var setF = false;

            var th = Get('thead', t);
            var tf = Get('tfoot', t);

            if (th != null) { th = th[0]; }
            if (tf != null) { tf = tf[0]; }



            if (th != null) {
                setH = !HasProp(th, 'data-autosetcolgroup-ignore');
            }
            if (tf != null) {
                setF = !HasProp(tf, 'data-autosetcolgroup-ignore');
            }

            SetColGroup(t, setH, setF);
        }
    }
};





















/**
* Objeto para sets de configurações wai-aria e widgets.
*
* @class WaiAriaWidgets
*
* @global
*
* @static
*
* @type {Class}
*/
var WaiAriaWidgets = new (function () {

    /**
    * Armazena todos os sets das configurações de aria para a aplicação e view atual.
    * O objeto deve ser um JSON onde :
    *
    * "key"     : deve ser um seletor CSS indicando quais objetos devem ser setados.
    * "value"   : { 'propriedade wai-aria' : 'valor ou evento(key[i])' }
    *
    *
    * @memberof WaiAriaWidgets
    *
    * @private
    *
    * @type {Object}
    */
    _waiariarules = {};





    var public = this.Control = {
        /**
        * Adiciona novas regras às existêntes.
        * 
        * @function AddRules
        *
        * @memberof WaiAriaWidgets
        *
        * @paran{Object}                rules                   Objeto JSON contendo as regras que serão implementadas.
        * @paran{Boolean}               [reset]                 Indica se, junto com o set das regras o objeto interno 
        *                                                       deve ser resetado.
        */
        AddRules: function (rules, reset) {
            reset = (reset === undefined) ? false : reset;
            if (reset == true) { _waiariarules = {}; }

            // Adiciona labels locais aos labels globais
            for (var it in rules) { _waiariarules[it] = rules[it]; }
        },
        /*
        * Implementa as regras definidas.
        *
        * @function ImplementRules
        *
        * @memberof WaiAriaWidgets
        *
        * @private
        */
        ImplementRules: function () {
            // Para cada regra definida...
            for (var css in _waiariarules) {
                var targets = Get(css);
                var rules = _waiariarules[css];

                // Encontrando os elementos
                if (targets != null) {

                    // Para cada elemento encontrado...
                    for (var it in targets) {
                        var el = targets[it];

                        // para cada set de propriedade...
                        for (var attr in rules) {
                            var v = rules[attr];

                            // Remove o atributo aria
                            if (v === null) {
                                el.removeAttribute(attr);
                            }
                            else if (TypeOf(v) == '[object String]') {
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
        * @memberof WaiAriaWidgets
        *
        * @private
        *
        * @param {Node}         e                   Elemento que se quer completar com as regras de aria.
        * @param {String[]}     tgts                Conjunto de seletores CSS para os possíveis elementos alvos.
        */
        SetLabelledBy : function (e, tgts) {
            var lbl = null;


            // Para cada possível legenda...
            for (var it in tgts) {
                // enquanto não achar uma...
                if (lbl == null) {
                    // Encontrando qualquer set definido. Seta-o como legenda.
                    var l = Get(tgts[it], e);

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





    return public;
});