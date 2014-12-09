
(function(){

  /* Feature detect */

  var features = document &&
    document.addEventListener &&
    document.implementation &&
    document.implementation.hasFeature &&
    document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");

  /* Orgaos */

  var orgaos = {};

  var Orgao = function ( gender , id , title , description ) {

    if ( !id || !title || !description ) {
      return this;
    }

    this.title = title;
    this.description = description;
    this.$el = $( "polygon[title=" + id + "]" );
    this.gender = gender;

    orgaos[ id ] = this;

  };

  var build = function(){

    /* Masculino */

    new Orgao( "male" , "testiculos" , "Testículos" ,
      "Os testículos são os responsáveis pela produção de testosterona (hormona sexual). São nos testículos que ocorre a gametogénese, que no caso dos testículos tem o nome de espermatogénese. Exteriormente os testículos são cobertos pelo escroto. A sua temperatura é um pouco abaixo da temperatura normal do corpo, o que é essencial para a produção de espermatozóides viáveis; uma variação, mesmo que pequena, pode ser prejudicial."
    );

    new Orgao( "male" , "prostata" , "Próstata" ,
      "A próstata é uma glândula exócrina que faz parte do sistema reprodutor masculino. A  sua função é produzir e armazenar um fluido incolor e ligeiramente alcalino (pH 7.29) que constitui 10-30% do volume do fluido seminal, que juntamente com os espermatozóides constitui o sémen."
    );

    new Orgao( "male" , "glande" , "Glande" ,
      "A glande é a parte sensível do órgão sexual masculino, situada na extremidade do pénis, que termina com a abertura da uretra. É uma expansão do corpo esponjoso presente no interior do pénis, ligada ao restante do órgão pelo frénulo e pela coroa. É recoberto pelo prepúcio em indivíduos não circuncidados."
    );

    new Orgao( "male" , "vesicula-seminar" , "Vesículas Seminais" ,
      "As vesículas seminais são glândulas que juntamente com a próstata produzem as secreções que envolvem os espermatozóides, constituindo o esperma ou sémen."
    );

    new Orgao( "male" , "canal-deferente" , "Canais deferentes" ,
      "Os canais deferentes são os locais onde os espermatozóides são armazenados e posteriormente transportados até à uretra."
    );

    new Orgao( "male" , "corpo-esponjoso" , "Corpo Esponjoso" ,
      "O corpo esponjoso é um tecido, situado na parte inferior do pénis, que envolve e protege a uretra."
    );

    new Orgao( "male" , "epididimo" , "Epidídimo" ,
      "Os epidídimos são os locais onde os espermatozóides são armazenados e onde sofrem a sua maturação."
    );

    new Orgao( "male" , "corpo-cavernoso" , "Corpo Cavernoso" ,
      "Os dois corpos cavernosos situam-se um ao lado do outro na parte superior do pénis. São um par de estruturas de tecido erétil parecidas com esponjas, que contêm a maior parte do sangue do pénis durante a ereção."
    );

    /* Feminino */

    new Orgao( "female" , "trompas-de-falopio" , "Trompas de Falópio" ,
      "As trompas de Falópio são os locais por onde é feita a condução dos óvulos ao útero que têm uma zona franjada no início a que se dá o nome de pavilhão da trompa. É possível ocorrer fecundação nas trompas de Falópio, o que é muito prejudicial, levando muitas vezes à morte."
    );

    new Orgao( "female" , "utero" , "Útero" ,
      "O útero é um órgão de parede muscular onde ocorre a fixação e desenvolvimento do ser após a implantação do embrião no endométrio, até ao nascimento."
    );

    new Orgao( "female" , "vagina" , "Vagina" ,
      "Canal de comunicação com o exterior e de receção do esperma aquando de uma relação sexual."
    );

    new Orgao( "female" , "vulva" , "Vulva" ,
      "A vulva é a parte externa do órgão genital feminino. Externamente pode ser revestida por pêlos púbicos."
    );

    new Orgao( "female" , "ovarios" , "Ovários" ,
      "Os ovários são os responsáveis pela produção de oócitos e de hormonas sexuais. São nos ovários que ocorre a oogénese."
    );

  };

  /* Setup */

  if ( !features ) {

    alert( "Para abrir esta página, necessita de um browser mais moderno. Lamentamos o incómodo." );

  } else {

    $( document ).ready(function(){

      var

      sistema = "feminino", // a seguir ele faz 'toggleSistema'

      $masculino = $( ".masculino" ),

      $feminino = $( ".feminino" ),

      $headerTitle = $( "#header .title" ),

      $container = $( "#container" ),

      $info = $( "#info" ),

      $infoTitle = $info.find( ".title" ),

      $infoDesc = $info.find( ".description" ),

      $svg = $( "svg" ),

      mudarDescricao = function ( id ) {

        var thisOrgao = orgaos[ id ];

        if ( thisOrgao ) {

          $infoTitle.html( thisOrgao.title );
          $infoDesc.html( thisOrgao.description );

          $container.addClass( "seeInfo" );

        }

      };

      // Build
      build();

      $svg.find( "polygon" ).mouseenter( function ( e ) {

        var thisOrgao = orgaos[ this.getAttribute( "title" ) ];

        if ( thisOrgao ) {
          // "addClass" não funciona com SVG
          thisOrgao.$el.attr( "class" , "see" );
        }

      } ).mouseleave( function ( e ) {

        var thisOrgao = orgaos[ this.getAttribute( "title" ) ];

        if ( thisOrgao ) {
          // "removeClass" não funciona com SVG
          thisOrgao.$el.attr( "class" , null );
        }

      } ).click( function(){
        mudarDescricao( this.getAttribute( "title" ) );
      } );

      $( ".button" ).button();

      $info.find( ".close" ).click( function(){
        $container.removeClass( "seeInfo" );
      } );

      var toggleSistema = function(){

        $container.removeClass( "seeInfo" );

        if ( sistema === "masculino" ) {

          sistema = "feminino";

          $masculino.css( "display" , "none" );
          $feminino.css( "display" , "block" );

        } else {

          sistema = "masculino";

          $feminino.css( "display" , "none" );
          $masculino.css( "display" , "block" );

        }

        $headerTitle.html(
          sistema === "masculino" ?
            "Projeto de Biologia - Sistema reprodutor masculino" :
            "Projeto de Biologia - Sistema reprodutor feminino"
        );

      };

      // toggleSistema

      toggleSistema();

      $( "#header .change" ).click( toggleSistema );

      // Prevenir seleção em certos elementos
      $( "*" ).on( "selectstart" , function ( e ) {
        if ( !$( e.target ).hasClass( "selection" ) ) {
          e.preventDefault();
        }
      } );

      $( "div:not(.selection)" ).addClass( "noselection" );

      // Menu

      var
      $menuMasculino = $( ".menu.masculino ul" ),
      $menuFeminino = $( ".menu.feminino ul" );

      $.each( orgaos , function ( id , object ) {

        var item = $( "<li><a><span></span>" +  object.title + "</a></li>" ).on( "click" , function(){

          mudarDescricao( id );

          orgaos[ id ].$el.attr( "class" , "see" );

          setTimeout( function(){
            orgaos[ id ].$el.attr( "class" , "" );
          } , 2000 );

        } );

        if ( object.gender === "male" ) {
          $menuMasculino.append( item );
        } else {
          $menuFeminino.append( item );
        }

      } );

    });

  }

})();
