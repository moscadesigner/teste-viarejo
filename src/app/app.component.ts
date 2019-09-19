import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
  title = 'teste-via-varejo';
  
  //função transação
  //================================================
  chamarTransacao = function() {
    //Variaveis
    //var Tipotransacao = document.getElementById("tipoTransacao");
    var Tipotransacao:HTMLInputElement = <HTMLInputElement>document.getElementById('tipoTransacao');
    var Nomemercadoria:HTMLInputElement = <HTMLInputElement>document.getElementById("nomeMercadoria");
    var Valormercadoria:HTMLInputElement = <HTMLInputElement>document.getElementById("valorMercadoria");
    var wls = window.localStorage;

    //Condição - validação
    if (Tipotransacao.value == "")
    { 
      alert("Escolha o tipo de transação");
      return false;
    }

    if (Nomemercadoria.value == "")
    { 
      alert("A mercadoria é de preenchimento obrgatório");
      Nomemercadoria.focus();
      return false;
    }

    if (Valormercadoria.value == "")
    { 
      alert("Valor da mercadoria é de preenchimento obrgatório");
      Valormercadoria.focus();
      return false;
    }

    //Variaveis
    var conc_tipoTrans = Tipotransacao.value;
    var conc_nomeMerc = Nomemercadoria.value;
    var conc_valorMerc = Valormercadoria.value;

    //Condição verficação do localStorage
    if (wls.getItem("ls_Tipotransacao"))
    {
      var valorLS_tipotransacao = wls.getItem("ls_Tipotransacao");
      conc_tipoTrans = valorLS_tipotransacao + '##' + Tipotransacao.value;
    }

    if (wls.getItem("ls_Nomemercadoria"))
    {
      var valorLS_nomemercadoria = wls.getItem("ls_Nomemercadoria");
      conc_nomeMerc = valorLS_nomemercadoria + '##' + Nomemercadoria.value;
    }

    if (wls.getItem("ls_Valormercadoria"))
    {
      var valorLS_Valormercadoria = wls.getItem("ls_Valormercadoria");
      conc_valorMerc = valorLS_Valormercadoria + '##' + Valormercadoria.value;
    }

    //Armazenamento de dados
    wls.setItem("ls_Tipotransacao", conc_tipoTrans);
    wls.setItem("ls_Nomemercadoria", conc_nomeMerc);
    wls.setItem("ls_Valormercadoria", conc_valorMerc);

    //chamada de funcao -> this = referenciando a mesma class
    this.consultarTrasacoes();

    /*
    var a_Tipotransacao = conc_tipoTrans.split("##");
    var a_Nomemercadoria = conc_nomeMerc.split("##");
    var a_Valormercadoria = conc_valorMerc.split("##");

    var html= '';

    for( var contador = 0; contador < a_Nomemercadoria.length; contador++ )
    {
      if(a_Tipotransacao[contador] == 'compra'){
        html += '<tr><td>+ ' + a_Nomemercadoria[contador] + '</td><td>' + a_Valormercadoria[contador] + '</td></tr>';
      } else {
        html += '<tr><td>- ' + a_Nomemercadoria[contador] + '</td><td>' + a_Valormercadoria[contador] + '</td></tr>';
      }
    }
    
    document.getElementById("table-tr").innerHTML = html;*/

    return false;
  }
  //fim função transação
  //================================================

    //Função de exibir extrato no display 
  //================================================== 
  consultarTrasacoes = function()
  {
    var wls_busca = window.localStorage;

    if( wls_busca.getItem('ls_Valormercadoria'))
    {
      //Resgatando valores do local store
      var a_Tipotransacao = wls_busca.getItem('ls_Tipotransacao').split("##"); 
      var a_Nomemercadoria = wls_busca.getItem('ls_Nomemercadoria').split("##"); 
      var a_Valormercadoria = wls_busca.getItem('ls_Valormercadoria').split("##");
      
      var html= '';

      for( var contador = 0; contador < a_Nomemercadoria.length; contador++ )
      {
        if(a_Tipotransacao[contador] == 'compra'){
          html += '<tr><td>- ' + a_Nomemercadoria[contador] + '</td><td>' + a_Valormercadoria[contador] + '</td></tr>';
        } else {
          html += '<tr><td>+ ' + a_Nomemercadoria[contador] + '</td><td>' + a_Valormercadoria[contador] + '</td></tr>';
        }
      }
      
      document.getElementById("table-tr").innerHTML = html;
    }
    this.somarTransacao();
  }
  
  //fim Função de exibir extrato no display 
  //================================================== 


  //função somar transação
  //================================================
  somarTransacao = function()
  {
    var Totaltransacao:HTMLElement = <HTMLElement>document.getElementById('totalTransacao');
    //var totalTransacao = document.getElementById('totalTransacao');
    var wls = window.localStorage;
    var a_Valormercadoria = wls.getItem('ls_Valormercadoria').split('##');
    var totalSoma = 0;

    for( var contador = 0; contador < a_Valormercadoria.length; contador++)
    {
        totalSoma += new Number(a_Valormercadoria[contador].replace(',','.'));
    }

    totalTransacao.innerHTML = totalSoma;
  }

  // Mascara de preco
  //================================================
  mascaraPreco = function () 
  {
    var valorMercadoria:HTMLInputElement = <HTMLInputElement>document.getElementById('valorMercadoria');
    var valorTratado = valorMercadoria.value.replace(/\D/g,'');

    valorTratado = (valorTratado/100).toFixed(2) + '';
    valorTratado = valorTratado.replace(".", ",");
    valorTratado = valorTratado.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    valorTratado = valorTratado.replace(/(\d)(\d{3}),/g, "$1.$2,");
    valorMercadoria.value = valorTratado;
  }
  //fim Mascara de preco
  //================================================
}

//Controller  
var app = angular.module('DemoApp', [])

app.controller('akuaController', function($scope) 
{
  $scope.load = function() 
  {
    var obj = new AppComponent();
    obj.consultarTrasacoes();
    //obj.somarTransacao();
  }

});
