
(function(){

  /* Feature detect */

  var features = document &&
    document.addEventListener &&
    document.implementation &&
    document.implementation.hasFeature &&
    document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");

  /* Orgaos */

  var orgaos = {};

  var Orgao = function ( id , title , description ) {

    var self = this;

    if ( !id || !title || !description ) {
      return self;
    }

    this.title = title;
    this.description = description;

    if ( $.isArray( id ) ) {

      $.each( id , function(){

        orgaos[ this ] = self;

      } );

    } else {

      orgaos[ id ] = this;

    }

  };

  /* Masculino */

  new Orgao( "testiculos" , "Testículos" ,
    "Os testículos são os responsáveis pela produção de testosterona (hormona sexual). São nos testículos que ocorre a gametogénese, que no caso dos testículos tem o nome de espermatogénese. Exteriormente os testículos são cobertos pelo escroto. A sua temperatura é um pouco abaixo da temperatura normal do corpo, o que é essencial para a produção de espermatozóides viáveis; uma variação, mesmo que pequena, pode ser prejudicial."
  );

  new Orgao( "prostata" , "Próstata" ,
    "A próstata é uma glândula exócrina que faz parte do sistema reprodutor masculino. A  sua função é produzir e armazenar um fluido incolor e ligeiramente alcalino (pH 7.29) que constitui 10-30% do volume do fluido seminal, que juntamente com os espermatozóides constitui o sémen."
  );

  new Orgao( "glande" , "Glande" ,
    "A glande é a parte sensível do órgão sexual masculino, situada na extremidade do pénis, que termina com a abertura da uretra. É uma expansão do corpo esponjoso presente no interior do pénis, ligada ao restante do órgão pelo frénulo e pela coroa. É recoberto pelo prepúcio em indivíduos não circuncidados."
  );

  new Orgao( "vesicula-seminar" , "Vesículas Seminais" ,
    "As vesículas seminais são glândulas que juntamente com a próstata produzem as secreções que envolvem os espermatozóides, constituindo o esperma ou sémen."
  );

  new Orgao( [ "canal-deferente-1" , "canal-deferente-2" ] , "Canais deferentes" ,
    "Os canais deferentes são os locais onde os espermatozóides são armazenados e posteriormente transportados até à uretra."
  );

  new Orgao( "corpo-esponjoso" , "Corpo Esponjoso" ,
    "O corpo esponjoso é um tecido, situado na parte inferior do pénis, que envolve e protege a uretra."
  );

  new Orgao( "epididimo" , "Epidídimo" ,
    "Os epidídimos são os locais onde os espermatozóides são armazenados e onde sofrem a sua maturação."
  );

  new Orgao( "corpo-cavernoso" , "Corpo Cavernoso" ,
    "Os dois corpos cavernosos situam-se um ao lado do outro na parte superior do pénis. São um par de estruturas de tecido erétil parecidas com esponjas, que contêm a maior parte do sangue do pénis durante a ereção."
  );

  /* Feminino */

  new Orgao();

  /* Setup */

  if ( !features ) {

    alert( "Para abrir esta página, necessita de um browser mais moderno. Lamentamos o incómodo." );

  } else {

    $( document ).ready(function(){

      var

      sistema = "feminino", // a seguir ele faz 'toggleSistema'

      $masculino = $( "#masculino" ),

      $feminino = $( "#feminino" ),

      $headerTitle = $( "#header .title" ),

      $container = $( "#container" ),

      $info = $( "#info" ),

      $infoTitle = $info.find( ".title" ),

      $infoDesc = $info.find( ".description" ),

      $svg = $( "svg" ),

      regexp = /canal-deferente/,

      $canaisDeferentes = $( "#canal-deferente-1, #canal-deferente-2" );

      $svg.find( "polygon" ).mouseenter( function ( e ) {

        if ( this.id.match( regexp ) ) {

          $canaisDeferentes.attr( "class" , "see" );

        } else {

          $( this ).attr( "class" , "see" );

        }

      } ).mouseleave( function ( e ) {

        if ( this.id.match( regexp ) ) {

          $canaisDeferentes.attr( "class" , null );

        } else {

          $( this ).attr( "class" , null );

        }

      } ).click( function ( e ) {

        var thisOrgao = orgaos[ this.id ];

        if ( thisOrgao ) {

          $infoTitle.html( thisOrgao.title );
          $infoDesc.html( thisOrgao.description );

          $container.addClass( "seeInfo" );

        }

      } )/*.each( function(){

        var title = orgaos[ this.id ].title;

        $( this ).tooltip( {
          content : title
        } );

      } )*/;

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

      toggleSistema();

      $( "#header .change" ).click( toggleSistema );

    });

  }

})();
