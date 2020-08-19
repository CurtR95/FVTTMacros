// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// name_generator.js
// written and released to the public domain by drow <drow@bin.sh>
// http://creativecommons.org/publicdomain/zero/1.0/

  var name_set = {};
  var chain_cache = {};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// generator function

  function generate_name (type) {
    var chain; if (chain = markov_chain(type)) {
      return markov_name(chain);
    }
    return '';
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// generate multiple

  function name_list (type, n_of) {
    var list = [];

    var i; for (i = 0; i < n_of; i++) {
      list.push(generate_name(type));
    }
    return list;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// get markov chain by type

  function markov_chain (type) {
    var chain; if (chain = chain_cache[type]) {
      return chain;
    } else {
      var list; if (list = name_set[type]) {
        var chain; if (chain = construct_chain(list)) {
          chain_cache[type] = chain;
          return chain;
        }
      }
    }
    return false;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// construct markov chain from list of names

  function construct_chain (list) {
    var chain = {};

    var i; for (i = 0; i < list.length; i++) {
      var names = list[i].split(/\s+/);
      chain = incr_chain(chain,'parts',names.length);

      var j; for (j = 0; j < names.length; j++) {
        var name = names[j];
        chain = incr_chain(chain,'name_len',name.length);

        var c = name.substr(0,1);
        chain = incr_chain(chain,'initial',c);

        var string = name.substr(1);
        var last_c = c;

        while (string.length > 0) {
          var c = string.substr(0,1);
          chain = incr_chain(chain,last_c,c);

          string = string.substr(1);
          last_c = c;
        }
      }
    }
    return scale_chain(chain);
  }
  function incr_chain (chain, key, token) {
    if (chain[key]) {
      if (chain[key][token]) {
        chain[key][token]++;
      } else {
        chain[key][token] = 1;
      }
    } else {
      chain[key] = {};
      chain[key][token] = 1;
    }
    return chain;
  }
  function scale_chain (chain) {
    var table_len = {};

    var key; for (key in chain) {
      table_len[key] = 0;

      var token; for (token in chain[key]) {
        var count = chain[key][token];
        var weighted = Math.floor(Math.pow(count,1.3));

        chain[key][token] = weighted;
        table_len[key] += weighted;
      }
    }
    chain['table_len'] = table_len;
    return chain;
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// construct name from markov chain

  function markov_name (chain) {
    var parts = select_link(chain,'parts');
    var names = [];

    var i; for (i = 0; i < parts; i++) {
      var name_len = select_link(chain,'name_len');
      var c = select_link(chain,'initial');
      var name = c;
      var last_c = c;

      while (name.length < name_len) {
        c = select_link(chain,last_c);
        name += c;
        last_c = c;
      }
      names.push(name);
    }
    return names.join(' ');
  }
  function select_link (chain, key) {
    var len = chain['table_len'][key];
    var idx = Math.floor(Math.random() * len);

    var t = 0; for (token in chain[key]) {
      t += chain[key][token];
      if (idx < t) { return token; }
    }
    return '-';
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// egyptian_set.js
// drawn from Kate Monk's Onomastikon, (c) 1997 Kate Monk

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// json format
// http://en.wikipedia.org/wiki/JSON

  name_set['egyptian'] = [
    'Aakheperkare',
    'Addaya',
    'Ahhotpe',
    'Ahmes',
    'Ahmose',
    'Ahmose-saneit',
    'Ahmose-sipari',
    'Akencheres',
    'Akunosh',
    'Amenakht',
    'Amenakhte',
    'Amenemhat',
    'Amenemheb',
    'Amenemopet',
    'Amenhirkopshef',
    'Amenhirwenemef',
    'Amenhotpe',
    'Amenmesse',
    'Amenmose',
    'Amennestawy',
    'Amenope',
    'Amenophis',
    'Amenwahsu',
    'Ameny',
    'Amosis-ankh',
    'Amoy',
    'Amunemhat',
    'Amunherpanesha',
    'Amunhotpe',
    'Anen',
    'Ankh-Psamtek',
    'Ankhef',
    'Ankhefenamun',
    'Ankhefenkhons',
    'Ankhefenmut',
    'Ankhsheshonq',
    'Ankhtify',
    'Ankhtyfy',
    'Ankhu',
    'Ankhuemhesut',
    'Any',
    'Apophis',
    'Baba',
    'Baenre',
    'Bak',
    'Bakenkhons',
    'Bakenkhonsu',
    'Bakenmut',
    'Bakennefi',
    'Bakenptah',
    'Baky',
    'Bata',
    'Bay',
    'Bek',
    'Bengay',
    'Besenmut',
    'Butehamun',
    'Denger',
    'Deniuenkhons',
    'Djadjaemankh',
    'Djau',
    'Djedefhor',
    'Djedhor',
    'Djedhoriufankh',
    'Djedi',
    'Djedkhonsiufankh',
    'Djedkhonsuefankh',
    'Djedptahefankh',
    'Djedptahiufankh',
    'Djehutmose',
    'Djehuty',
    'Djehutymose',
    'Djenutymes',
    'Djeserka',
    'Djeserkare',
    'Djeserkheprure',
    'Djesersukhons',
    'Djethutmose',
    'Djhutmose',
    'Genubath',
    'Gua',
    'Haankhef',
    'Hapimen',
    'Hapu',
    'Hapuseneb',
    'Hapymen',
    'Haremakhet',
    'Haremsat',
    'Harkhebi',
    'Harkhuf',
    'Harmhabi',
    'Harnakhte',
    'Harsiese',
    'Hay',
    'Hemaka',
    'Henenu',
    'Henuka',
    'Heqaemeheh',
    'Heqaib',
    'Herenamenpenaef',
    'Herihor',
    'Hesire',
    'Hor',
    'Horapollo',
    'Hordedef',
    'Horemheb',
    'Hori',
    'Hornedjitef',
    'Horpais',
    'Horwebbefer',
    'Hrihor',
    'Hunefer',
    'Huy',
    'Huya',
    'Iawy',
    'Ibana',
    'Ibe',
    'Idy',
    'Ikeni',
    'Ikui',
    'Imhotep',
    'Inarus',
    'Inebni',
    'Ineni',
    'Inyotef',
    'Ipi',
    'Ipuwer',
    'Ipuy',
    'Ipy',
    'Ishpi',
    'Iu-Amun',
    'Iufankh',
    'Iufenamun',
    'Iunmin',
    'Iuseneb',
    'Iuwlot',
    'Iyerniutef',
    'Iyimennuef',
    'Iymeru',
    'Jarha',
    'Kadjadja',
    'Kahma',
    'Kaka',
    'Kanakht',
    'Karnefhere',
    'Katenen',
    'Kawab',
    'Kay',
    'Kemuny',
    'Kenamun',
    'Kenefer',
    'Kerasher',
    'Kha',
    'Khaemhet',
    'Khaemnetjeru',
    'Khaemwaset',
    'Khahor',
    'Khakheperraseneb',
    'Khay',
    'Khensthoth',
    'Kheruef',
    'Khety',
    'Khnemibre',
    'Khnumhotep',
    'Khnumhotpe',
    'Khons',
    'Khonsirdais',
    'Khonskhu',
    'Khonsuemwaset',
    'Khufukhaf',
    'Khui',
    'Kuenre',
    'Kysen',
    'Maakha',
    'Mahu',
    'Mahuhy',
    'Maiherpri',
    'Manakhtuf',
    'Manetho',
    'Masaharta',
    'May',
    'Maya',
    'Mehy',
    'Meketre',
    'Mekhu',
    'Men',
    'Menkheperraseneb',
    'Menkheperre',
    'Menmet-Ra',
    'Menna',
    'Mentuemhat',
    'Mentuherkhepshef',
    'Meremptor',
    'Merenamun',
    'Merenkhons',
    'Merenptah',
    'Mereruka',
    'Merka',
    'Mernebptah',
    'Mery',
    'Meryamun',
    'Meryatum',
    'Meryawy',
    'Merymose',
    'Meryptah',
    'Meryrahashtef',
    'Meryre',
    'Mes',
    'Min',
    'Minkhat',
    'Minmose',
    'Minnakht',
    'Mokhtar',
    'Montjuemhat',
    'Montjuhirkopshef',
    'Montuemhet',
    'Mose',
    'Naga-ed-der',
    'Nakhthorheb',
    'Nakhtimenwast',
    'Nakhtmin',
    'Nakhtnebef',
    'Naneferkeptah',
    'Nebamun',
    'Nebankh',
    'Nebemakst',
    'Nebhotep',
    'Nebimes',
    'Nebitka',
    'Nebmaetre',
    'Nebnefer',
    'Nebnetjeru',
    'Nebseni',
    'Nebseny',
    'Nebwennenef',
    'Nechoutes',
    'Neferhotep',
    'Neferhotpe',
    'Neferkheperuhersekheper',
    'Nefermaet',
    'Nefermenu',
    'Neferrenpet',
    'Neferti',
    'Nehasy',
    'Nehi',
    'Nekau',
    'Nekhwemmut',
    'Nendjbaendjed',
    'Nenedjebaendjed',
    'Neneferkaptah',
    'Nenkhefta',
    'Nes',
    'Nesamun',
    'Neshi',
    'Neshorpakhered',
    'Neskhons',
    'Nesmont',
    'Nespaherenhat',
    'Nespakashuty',
    'Nespatytawy',
    'Nespherenhat',
    'Nessuimenopet',
    'Nestanebetasheru',
    'Nestefnut',
    'Netihur',
    'Nigmed',
    'Nimlot',
    'Niumateped',
    'Pa-Siamun',
    'Pabasa',
    'Pabernefy',
    'Padiamenet',
    'Padiamenipet',
    'Padiamun',
    'Padineith',
    'Paheripedjet',
    'Pairy',
    'Pait',
    'Pakharu',
    'Pakhneter',
    'Pamont',
    'Pamose',
    'Pamu',
    'Panas',
    'Paneb',
    'Paneferher',
    'Panehesy',
    'Paperpa',
    'Paramesse',
    'Parennefer',
    'Pasebakhaenniut',
    'Pasekhonsu',
    'Paser',
    'Pashedbast',
    'Pashedu',
    'Pasherdjehuty',
    'Pawiaeadja',
    'Paynedjem',
    'Payneferher',
    'Pediamun',
    'Pediese',
    'Pedihor',
    'Penamun',
    'Penbuy',
    'Penmaat',
    'Pennestawy',
    'Pentaweret',
    'Pentu',
    'Pepynakhte',
    'Peraha',
    'Pinhasy',
    'Pinotmou',
    'Prahotpe',
    'Pramessu',
    'Preherwenemef',
    'Prehirwennef',
    'Prepayit',
    'Psamtek',
    'Psenamy',
    'Psenmin',
    'Ptahhemakhet',
    'Ptahhemhat-Ty',
    'Ptahhotep',
    'Ptahhudjankhef',
    'Ptahmose',
    'Ptahshepses',
    'Qenymin',
    'Rahotep',
    'Rahotpe',
    'Raia',
    'Ramessenakhte',
    'Ramessu',
    'Rekhmire',
    'Reuser',
    'Rewer',
    'Roma-Roy',
    'Rudamun',
    'Sabef',
    'Sabni',
    'Salatis',
    'Samut',
    'Sanehet',
    'Sasobek',
    'Sawesit',
    'Scepter',
    'Sekhemkare',
    'Sekhmire',
    'Seneb',
    'Senebtyfy',
    'Senemut',
    'Senmen',
    'Sennedjem',
    'Sennefer',
    'Sennufer',
    'Senui',
    'Senwosret',
    'Serapion',
    'Sese',
    'Setau',
    'Setep',
    'Sethe',
    'Sethherwenemef',
    'Sethhirkopshef',
    'Sethnakhte',
    'Sethnakte',
    'Sethy',
    'Setne',
    'Setymerenptah',
    'Shedsunefertum',
    'Shemay',
    'Shepenwepet',
    'Si-Mut',
    'Siamun',
    'Siese',
    'Sinuhe',
    'Sipair',
    'Sneferu',
    'Somtutefnakhte',
    'Surero',
    'Suty',
    'Sutymose',
    'Takairnayu',
    'Takany',
    'Tasetmerydjehuty',
    'Tayenimu',
    'Tefibi',
    'Tenermentu',
    'Teti-en',
    'Tetisheri',
    'Tjaenhebyu',
    'Tjahapimu',
    'Tjaroy',
    'Tjauemdi',
    'Tjenna',
    'Tjety',
    'To',
    'Tui',
    'Tutu',
    'Tymisba',
    'Udjahorresne',
    'Udjahorresneith',
    'Uni',
    'Userhet',
    'Usermontju',
    'Wadjmose',
    'Wahibre-Teni',
    'Wahka',
    'Webaoner',
    'Webensenu',
    'Wedjakhons',
    'Wenamun',
    'Wendjabaendjed',
    'Wendjebaendjed',
    'Weni',
    'Wennefer',
    'Wennufer',
    'Wepmose',
    'Wepwawetmose',
    'Werdiamenniut',
    'Werirenptah',
    'Yanhamu',
    'Yey',
    'Yii',
    'Yuya',
    'Zazamoukh'
  ];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



alert(generate_name('egyptian'));
