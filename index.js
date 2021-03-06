const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Json2csvParser = require('json2csv').Parser;

const programs = [
   "cbench-automotive-bitcount",
   "cbench-automotive-qsort1",  
   "cbench-automotive-susan", 
   "cbench-bzip2",
   "cbench-consumer-jpeg-c",
   "cbench-consumer-jpeg-d",  
   "cbench-consumer-tiff2bw",
   "cbench-consumer-tiff2dither",
   "cbench-consumer-tiff2median",
   "cbench-consumer-tiff2rgba",
   "cbench-network-dijkstra",
   "cbench-network-patricia", 
   "cbench-office-stringsearch2",
   "cbench-security-rijndael",
   "cbench-security-sha",
   "cbench-telecom-adpcm-c",
   "cbench-telecom-adpcm-d",
   "cbench-telecom-crc32",
   "cbench-telecom-gsm",
   "polybench-cpu-3mm",
   "polybench-cpu-trmm",
   "polybench-cpu-lu",
   "polybench-cpu-doitgen",
   "polybench-cpu-jacobi-2d-imper",
   "polybench-cpu-fdtd-2d",
   "polybench-cpu-symm",
   "polybench-cpu-atax",
   "polybench-cpu-durbin",
   "polybench-cpu-bicg",
   "polybench-cpu-adi",
   "polybench-cpu-gemm",
   "polybench-cpu-jacobi-1d-imper",
   "polybench-cpu-gramschmidt",
   "polybench-cpu-fdtd-apml",
   "polybench-cpu-ludcmp",
   "polybench-cpu-trisolv",
   "polybench-cpu-gesummv",
   "polybench-cpu-mvt", 
   "polybench-cpu-syr2k",
   "polybench-cpu-cholesky",
   "polybench-cpu-dynprog",
   "polybench-cpu-medley-reg-detect",
   "polybench-cpu-medley-floyd-warshall",
   "polybench-cpu-syrk",
   "polybench-cpu-2mm",
   "polybench-cpu-seidel-2d",
   "polybench-cpu-gemver",  
   "asci_purple",
   "asc_sequoia_amgmk",
   "asc_sequoia_crystalmk",
   "asc_sequoia_irsmk", 
   "bitbench-drop3",
   "bitbench-five11",
   "bitbench-uudecode",
   "bitbench-uuencode",
   "coyote-alma",
   "coyote-huff",
   "coyote-lp",
   "csmith-ackies",
   "csmith-adams",
   "csmith-affagato",
   "csmith-ahmad",
   "csmith-akin",
   "csmith-albertson",
   "csmith-alcorn",
   "csmith-alexander",
   "csmith-alford",
   "csmith-allen",
   "csmith-alvarado",
   "csmith-amado",
   "csmith-ambrose",
   "csmith-anders",
   "csmith-anderson",
   "csmith-andrada",
   "csmith-anguiano",
   "csmith-ansley",
   "csmith-ardis",
   "csmith-arends",
   "csmith-armitage",
   "csmith-armstead",
   "csmith-arnold",
   "csmith-ash",
   "csmith-atchison",
   "csmith-athearn",
   "csmith-athey",
   "csmith-atkeson",
   "csmith-atkinson",
   "csmith-babel",
   "csmith-bacher",
   "csmith-bacich",
   "csmith-backes",
   "csmith-baggett",
   "csmith-bailey",
   "csmith-baird",
   "csmith-baker",
   "csmith-balderas",
   "csmith-balkcom",
   "csmith-balke",
   "csmith-ballard",
   "csmith-balmos",
   "csmith-banks",
   "csmith-baptiste",
   "csmith-barajas",
   "csmith-baranowski",
   "csmith-barbour",
   "csmith-barnes",
   "csmith-barnett",
   "csmith-barrett",
   "csmith-barrios",
   "csmith-barrocas",
   "csmith-barrow",
   "csmith-barton",
   "csmith-bates",
   "csmith-battle",
   "csmith-batun",
   "csmith-baver",
   "csmith-beaman",
   "csmith-beckman",
   "csmith-becnel",
   "csmith-becwar",
   "csmith-behan",
   "csmith-behm",
   "csmith-belanger",
   "csmith-bendel",
   "csmith-bennett",
   "csmith-bentley",
   "csmith-bequette",
   "csmith-berger",
   "csmith-bertolami",
   "csmith-bettendorf",
   "csmith-betzer",
   "csmith-bevington",
   "csmith-beyer",
   "csmith-bierlein",
   "csmith-biggs",
   "csmith-biglin",
   "csmith-billington",
   "csmith-billiter",
   "csmith-bingham",
   "csmith-black",
   "csmith-blackerby",
   "csmith-blair",
   "csmith-bledsoe",
   "csmith-blount",
   "csmith-blue",
   "csmith-bodi",
   "csmith-boland",
   "csmith-booker",
   "csmith-booth",
   "csmith-bordner",
   "csmith-botelho",
   "csmith-botello",
   "csmith-bourgeois",
   "csmith-bowman",
   "csmith-boyer",
   "csmith-boyle",
   "csmith-brackeen",
   "csmith-bradford",
   "csmith-braun",
   "csmith-brechbiel",
   "csmith-brewster",
   "csmith-brightharp",
   "csmith-brimer",
   "csmith-brito",
   "csmith-britt",
   "csmith-broadnax",
   "csmith-browne",
   "csmith-bruce",
   "csmith-brumfield",
   "csmith-bryant",
   "csmith-bublitz",
   "csmith-buchanan",
   "csmith-buckner",
   "csmith-bullock",
   "csmith-burch",
   "csmith-burgess",
   "csmith-burke",
   "csmith-burkhart",
   "csmith-burns",
   "csmith-burroughs",
   "csmith-burrus",
   "csmith-burton",
   "csmith-busch",
   "csmith-bustamente",
   "csmith-bustos",
   "csmith-butcher",
   "csmith-butler",
   "csmith-byrd",
   "csmith-cain",
   "csmith-caldwell",
   "csmith-caligiuri",
   "csmith-calles",
   "csmith-cameron",
   "csmith-campbell",
   "csmith-campos",
   "csmith-cannon",
   "csmith-cantu",
   "csmith-carnahan",
   "csmith-carol",
   "csmith-carr",
   "csmith-carrico",
   "csmith-carson",
   "csmith-carter",
   "csmith-cartwright",
   "csmith-carvalho",
   "csmith-casey",
   "csmith-cash",
   "csmith-castillo",
   "csmith-castorena",
   "csmith-castro",
   "csmith-cathcart",
   "csmith-causey",
   "csmith-cervantes",
   "csmith-chambers",
   "csmith-chang",
   "csmith-chase",
   "csmith-chatman",
   "csmith-chauvin",
   "csmith-chavez",
   "csmith-chenault",
   "csmith-cheshire",
   "csmith-chicas",
   "csmith-childers",
   "csmith-christensen",
   "csmith-christofferso",
   "csmith-claar",
   "csmith-clark",
   "csmith-claybrook",
   "csmith-cleaver",
   "csmith-clinard",
   "csmith-cline",
   "csmith-coats",
   "csmith-cobb",
   "csmith-coe",
   "csmith-cohen",
   "csmith-colella",
   "csmith-coleman",
   "csmith-coll",
   "csmith-collins",
   "csmith-colon",
   "csmith-combs",
   "csmith-conner",
   "csmith-contreras",
   "csmith-cook",
   "csmith-cooper",
   "csmith-correa",
   "csmith-costales",
   "csmith-cox",
   "csmith-crafton",
   "csmith-craig",
   "csmith-crawford",
   "csmith-creamer",
   "csmith-creekmur",
   "csmith-crespo",
   "csmith-crock",
   "csmith-crossmon",
   "csmith-crosson",
   "csmith-crouchet",
   "csmith-crowe",
   "csmith-crutcher",
   "csmith-cruz",
   "csmith-culp",
   "csmith-cunningham",
   "csmith-curtis",
   "csmith-cuthbertson",
   "csmith-cygan",
   "csmith-daddio",
   "csmith-daking",
   "csmith-danforth",
   "csmith-daniels",
   "csmith-darnell",
   "csmith-davidson",
   "csmith-davis",
   "csmith-day",
   "csmith-deal",
   "csmith-deer",
   "csmith-dehart",
   "csmith-deldonno",
   "csmith-delgadillo",
   "csmith-demars",
   "csmith-demers",
   "csmith-demeter",
   "csmith-demps",
   "csmith-denby",
   "csmith-dennis",
   "csmith-derks",
   "csmith-deshong",
   "csmith-dieppa",
   "csmith-difonzo",
   "csmith-digiovanni",
   "csmith-ditch",
   "csmith-divine",
   "csmith-dixon",
   "csmith-dodimead",
   "csmith-donaldson",
   "csmith-donnerberg",
   "csmith-dorrance",
   "csmith-dossey",
   "csmith-draggoo",
   "csmith-dray",
   "csmith-dubie",
   "csmith-dudenhoeffer",
   "csmith-duncan",
   "csmith-dunnings",
   "csmith-durfee",
   "csmith-dvorak",
   "csmith-dwyer",
   "csmith-dykas",
   "csmith-eads",
   "csmith-earl",
   "csmith-easterling",
   "csmith-eberle",
   "csmith-eddy",
   "csmith-edgar",
   "csmith-egersdorf",
   "csmith-ekberg",
   "csmith-ekstrom",
   "csmith-elderidge",
   "csmith-elkins",
   "csmith-elliott",
   "csmith-elmore",
   "csmith-elrod",
   "csmith-encarnacion",
   "csmith-engleberg",
   "csmith-enoch",
   "csmith-escovedo",
   "csmith-esmond",
   "csmith-espinoza",
   "csmith-essig",
   "csmith-evans",
   "csmith-everett",
   "csmith-fairchild",
   "csmith-falls",
   "csmith-faltus",
   "csmith-faulds",
   "csmith-faust",
   "csmith-faz",
   "csmith-feder",
   "csmith-felton",
   "csmith-ferdinand",
   "csmith-ferguson",
   "csmith-ferkovich",
   "csmith-fernandez",
   "csmith-fichter",
   "csmith-fields",
   "csmith-fierro",
   "csmith-filip",
   "csmith-finch",
   "csmith-finger",
   "csmith-fischer",
   "csmith-fisher",
   "csmith-flagg",
   "csmith-flanders",
   "csmith-fleniken",
   "csmith-fletcher",
   "csmith-flores",
   "csmith-floyd",
   "csmith-fontenot",
   "csmith-foor",
   "csmith-forbis",
   "csmith-foss",
   "csmith-foster",
   "csmith-fouts",
   "csmith-fox",
   "csmith-francis",
   "csmith-frank",
   "csmith-franklin",
   "csmith-frantz",
   "csmith-freeman",
   "csmith-french",
   "csmith-frost",
   "csmith-fuller",
   "csmith-fung",
   "csmith-funk",
   "csmith-gaddy",
   "csmith-gainer",
   "csmith-gaither",
   "csmith-galan",
   "csmith-galbraith",
   "csmith-galloway",
   "csmith-gambone",
   "csmith-garay",
   "csmith-garcia",
   "csmith-garner",
   "csmith-garrison",
   "csmith-garrity",
   "csmith-gaskin",
   "csmith-gaylord",
   "csmith-geist",
   "csmith-geter",
   "csmith-gibson",
   "csmith-giebler",
   "csmith-gilbert",
   "csmith-gill",
   "csmith-gilliss",
   "csmith-gionet",
   "csmith-githens",
   "csmith-glenn",
   "csmith-glomb",
   "csmith-godwin",
   "csmith-goers",
   "csmith-goguen",
   "csmith-gold",
   "csmith-goldbach",
   "csmith-gomez",
   "csmith-gonsalves",
   "csmith-gonzales",
   "csmith-gonzalez",
   "csmith-goodwin",
   "csmith-gooslin",
   "csmith-gordon",
   "csmith-goslee",
   "csmith-gough",
   "csmith-goulet",
   "csmith-gowans",
   "csmith-green",
   "csmith-greene",
   "csmith-greigo",
   "csmith-gresham",
   "csmith-grimes",
   "csmith-grimsley",
   "csmith-grissom",
   "csmith-grossen",
   "csmith-gruber",
   "csmith-guillory",
   "csmith-gunn",
   "csmith-guthrie",
   "csmith-gutierrez",
   "csmith-gutshall",
   "csmith-guy",
   "csmith-hacher",
   "csmith-hackathorn",
   "csmith-hageman",
   "csmith-hagen",
   "csmith-haight",
   "csmith-haines",
   "csmith-hall",
   "csmith-hamilton",
   "csmith-hamlin",
   "csmith-hammett",
   "csmith-hanks",
   "csmith-hansen",
   "csmith-harder",
   "csmith-hardin",
   "csmith-harding",
   "csmith-hare",
   "csmith-harper",
   "csmith-harris",
   "csmith-hartage",
   "csmith-hartman",
   "csmith-harty",
   "csmith-hasselman",
   "csmith-hastings",
   "csmith-havlik",
   "csmith-hayes",
   "csmith-haymond",
   "csmith-haynes",
   "csmith-hays",
   "csmith-haywood",
   "csmith-heaberlin",
   "csmith-head",
   "csmith-hedges",
   "csmith-hedgespeth",
   "csmith-heiman",
   "csmith-helmick",
   "csmith-henderson",
   "csmith-hendricks",
   "csmith-hennings",
   "csmith-henry",
   "csmith-hernandez",
   "csmith-herrera",
   "csmith-hester",
   "csmith-hicks",
   "csmith-highland",
   "csmith-hightower",
   "csmith-hill",
   "csmith-hinojos",
   "csmith-hinz",
   "csmith-hirota",
   "csmith-hite",
   "csmith-hittle",
   "csmith-hobbs",
   "csmith-hodgkins",
   "csmith-hoekstra",
   "csmith-holden",
   "csmith-holladay",
   "csmith-holland",
   "csmith-hollister",
   "csmith-holmes",
   "csmith-honaker",
   "csmith-hooper",
   "csmith-hopkins",
   "csmith-hopping",
   "csmith-horney",
   "csmith-horrigan",
   "csmith-horwath",
   "csmith-houston",
   "csmith-howard",
   "csmith-hoy",
   "csmith-hoyle",
   "csmith-hubbard",
   "csmith-huff",
   "csmith-hughes",
   "csmith-hulsey",
   "csmith-humphrey",
   "csmith-hunter",
   "csmith-hwang",
   "csmith-irland",
   "csmith-isbrecht",
   "csmith-israels",
   "csmith-ivory",
   "csmith-ivy",
   "csmith-jackson",
   "csmith-jacob",
   "csmith-jacobs",
   "csmith-jaimes",
   "csmith-james",
   "csmith-jaques",
   "csmith-jaramillo",
   "csmith-jenkins",
   "csmith-jensen",
   "csmith-jimenez",
   "csmith-johnson",
   "csmith-johnston",
   "csmith-jonas",
   "csmith-jones",
   "csmith-jordan",
   "csmith-joseph",
   "csmith-jovich",
   "csmith-juel",
   "csmith-juran",
   "csmith-kabat",
   "csmith-kammerer",
   "csmith-kaster",
   "csmith-kauffman",
   "csmith-keller",
   "csmith-kelly",
   "csmith-kelsey",
   "csmith-kemp",
   "csmith-kern",
   "csmith-ketterling",
   "csmith-killian",
   "csmith-kim",
   "csmith-king",
   "csmith-kingsley",
   "csmith-kinkel",
   "csmith-kirkham",
   "csmith-kiser",
   "csmith-kline",
   "csmith-knight",
   "csmith-kodadek",
   "csmith-komar",
   "csmith-korczynski",
   "csmith-kral",
   "csmith-kruger",
   "csmith-kujawski",
   "csmith-kunzel",
   "csmith-kwan",
   "csmith-lachley",
   "csmith-lamper",
   "csmith-lampley",
   "csmith-lane",
   "csmith-lang",
   "csmith-lanning",
   "csmith-larrison",
   "csmith-larsen",
   "csmith-laundree",
   "csmith-lebrecque",
   "csmith-lederman",
   "csmith-lee",
   "csmith-lefort",
   "csmith-lehmann",
   "csmith-lemm",
   "csmith-lemon",
   "csmith-lendon",
   "csmith-leneave",
   "csmith-leon",
   "csmith-levine",
   "csmith-lewis",
   "csmith-liberty",
   "csmith-lieber",
   "csmith-limon",
   "csmith-lincourt",
   "csmith-linden",
   "csmith-lites",
   "csmith-livezey",
   "csmith-longo",
   "csmith-lopez",
   "csmith-lovejoy",
   "csmith-lowry",
   "csmith-lunford",
   "csmith-luongo",
   "csmith-lusk",
   "csmith-macdonald",
   "csmith-mackay",
   "csmith-macklin",
   "csmith-macvane",
   "csmith-madison",
   "csmith-maggard",
   "csmith-major",
   "csmith-mandolini",
   "csmith-manley",
   "csmith-mannino",
   "csmith-marc",
   "csmith-markarian",
   "csmith-markham",
   "csmith-markus",
   "csmith-marshall",
   "csmith-martinez",
   "csmith-mason",
   "csmith-massiah",
   "csmith-mastroianni",
   "csmith-mathis",
   "csmith-mattie",
   "csmith-mattos",
   "csmith-mattox",
   "csmith-mayoras",
   "csmith-mazzola",
   "csmith-mcalister",
   "csmith-mcbride",
   "csmith-mccants",
   "csmith-mccarroll",
   "csmith-mccarter",
   "csmith-mcchristian",
   "csmith-mcclary",
   "csmith-mcclurg",
   "csmith-mccoy",
   "csmith-mccurry",
   "csmith-mcdill",
   "csmith-mcdonald",
   "csmith-mcdougal",
   "csmith-mcelrath",
   "csmith-mcfarlane",
   "csmith-mcgarey",
   "csmith-mcgraw",
   "csmith-mckay",
   "csmith-mckenzie",
   "csmith-mckoan",
   "csmith-mclarney",
   "csmith-mclaughlin",
   "csmith-mclaurin",
   "csmith-mclean",
   "csmith-mclellan",
   "csmith-mcleod",
   "csmith-mcmahon",
   "csmith-mcmurray",
   "csmith-mcrae",
   "csmith-mcwhorter",
   "csmith-meade",
   "csmith-meadows",
   "csmith-medders",
   "csmith-medina",
   "csmith-melody",
   "csmith-melton",
   "csmith-melvin",
   "csmith-mendez",
   "csmith-menendez",
   "csmith-menke",
   "csmith-merchant",
   "csmith-merritt",
   "csmith-mestad",
   "csmith-meyers",
   "csmith-mickle",
   "csmith-middaugh",
   "csmith-miller",
   "csmith-milton",
   "csmith-ming",
   "csmith-mitchell",
   "csmith-monopoli",
   "csmith-mooneyham",
   "csmith-moore",
   "csmith-moralez",
   "csmith-moran",
   "csmith-morey",
   "csmith-morin",
   "csmith-moris",
   "csmith-morrell",
   "csmith-morrical",
   "csmith-morris",
   "csmith-morrison",
   "csmith-mortimer",
   "csmith-moskowitz",
   "csmith-moua",
   "csmith-mueller",
   "csmith-muller",
   "csmith-mullins",
   "csmith-mulvaney",
   "csmith-munger",
   "csmith-muni",
   "csmith-munoz",
   "csmith-murawski",
   "csmith-murphy",
   "csmith-murray",
   "csmith-nadal",
   "csmith-nakamura",
   "csmith-nall",
   "csmith-navarrete",
   "csmith-naylor",
   "csmith-neal",
   "csmith-negron",
   "csmith-nelson",
   "csmith-nesmith",
   "csmith-newman",
   "csmith-newton",
   "csmith-nguyen",
   "csmith-nicholas",
   "csmith-nicholson",
   "csmith-nickels",
   "csmith-numbers",
   "csmith-nunn",
   "csmith-obrien",
   "csmith-obyrne",
   "csmith-ochoa",
   "csmith-oconnell",
   "csmith-oconnor",
   "csmith-ogg",
   "csmith-ohmen",
   "csmith-olson",
   "csmith-oneal",
   "csmith-oneil",
   "csmith-ortiz",
   "csmith-osgood",
   "csmith-otto",
   "csmith-ownby",
   "csmith-pagani",
   "csmith-palazzola",
   "csmith-parke",
   "csmith-parnell",
   "csmith-passe",
   "csmith-patel",
   "csmith-patrick",
   "csmith-paxson",
   "csmith-payne",
   "csmith-pearl",
   "csmith-pearson",
   "csmith-pease",
   "csmith-peatross",
   "csmith-pedlow",
   "csmith-pedroza",
   "csmith-pefferkorn",
   "csmith-peiper",
   "csmith-pelayo",
   "csmith-pelosi",
   "csmith-pena",
   "csmith-pendergrass",
   "csmith-peoples",
   "csmith-pepin",
   "csmith-perez",
   "csmith-perng",
   "csmith-perrien",
   "csmith-perry",
   "csmith-peters",
   "csmith-peterson",
   "csmith-petter",
   "csmith-phelps",
   "csmith-phillips",
   "csmith-phipps",
   "csmith-piccolomini",
   "csmith-pierce",
   "csmith-pinc",
   "csmith-pinto",
   "csmith-pittman",
   "csmith-pitts",
   "csmith-pixley",
   "csmith-plateroti",
   "csmith-pogue",
   "csmith-poissant",
   "csmith-polin",
   "csmith-pollock",
   "csmith-poole",
   "csmith-poteet",
   "csmith-potocki",
   "csmith-potter",
   "csmith-pousson",
   "csmith-powell",
   "csmith-prater",
   "csmith-preston",
   "csmith-prewitt",
   "csmith-prickett",
   "csmith-priestley",
   "csmith-propheter",
   "csmith-propst",
   "csmith-puckett",
   "csmith-ragasa",
   "csmith-ramirez",
   "csmith-ramsey",
   "csmith-rapelyea",
   "csmith-rathbone",
   "csmith-rayl",
   "csmith-reale",
   "csmith-reardon",
   "csmith-reaume",
   "csmith-rebuck",
   "csmith-rebuldela",
   "csmith-red",
   "csmith-reece",
   "csmith-reed",
   "csmith-reevers",
   "csmith-reff",
   "csmith-rehling",
   "csmith-reid",
   "csmith-renner",
   "csmith-renteria",
   "csmith-resendez",
   "csmith-resnick",
   "csmith-respess",
   "csmith-reyna",
   "csmith-rhoades",
   "csmith-rhodes",
   "csmith-rice",
   "csmith-richardson",
   "csmith-ricketts",
   "csmith-rider",
   "csmith-riggins",
   "csmith-rinehart",
   "csmith-rivera",
   "csmith-roan",
   "csmith-roberts",
   "csmith-robertson",
   "csmith-robinette",
   "csmith-robinson",
   "csmith-robledo",
   "csmith-rocha",
   "csmith-rodas",
   "csmith-rodriguez",
   "csmith-rodriquez",
   "csmith-rogers",
   "csmith-rokus",
   "csmith-rollinger",
   "csmith-roman",
   "csmith-roose",
   "csmith-rosario",
   "csmith-rose",
   "csmith-ross",
   "csmith-rossman",
   "csmith-rothfeld",
   "csmith-roudebush",
   "csmith-rowland",
   "csmith-roy",
   "csmith-rubinson",
   "csmith-rubio",
   "csmith-rucker",
   "csmith-ruiz",
   "csmith-russell",
   "csmith-rutledge",
   "csmith-saiz",
   "csmith-salinas",
   "csmith-salmi",
   "csmith-samuels",
   "csmith-sanchez",
   "csmith-sanders",
   "csmith-sanderson",
   "csmith-sandy",
   "csmith-santiago",
   "csmith-saunders",
   "csmith-schade",
   "csmith-scheer",
   "csmith-schilling",
   "csmith-schlau",
   "csmith-schmidt",
   "csmith-schmitmeyer",
   "csmith-schmitz",
   "csmith-schneider",
   "csmith-schrimsher",
   "csmith-schuster",
   "csmith-scott",
   "csmith-segal",
   "csmith-sellers",
   "csmith-seltzer",
   "csmith-serrano",
   "csmith-session",
   "csmith-sevy",
   "csmith-shabel",
   "csmith-shadle",
   "csmith-shaefer",
   "csmith-shah",
   "csmith-shamp",
   "csmith-sharpe",
   "csmith-sheline",
   "csmith-shelton",
   "csmith-shepherd",
   "csmith-sheppard",
   "csmith-sherbert",
   "csmith-shinn",
   "csmith-shively",
   "csmith-shoop",
   "csmith-sideris",
   "csmith-siefkes",
   "csmith-simmons",
   "csmith-simpson",
   "csmith-sims",
   "csmith-sinclair",
   "csmith-singer",
   "csmith-slack",
   "csmith-slayton",
   "csmith-sloan",
   "csmith-smallwood",
   "csmith-smith",
   "csmith-soders",
   "csmith-soehl",
   "csmith-sommers",
   "csmith-sorensen",
   "csmith-sotomayor",
   "csmith-souliere",
   "csmith-sowell",
   "csmith-spaniel",
   "csmith-sparks",
   "csmith-spera",
   "csmith-spicer",
   "csmith-spivey",
   "csmith-sprouse",
   "csmith-stackhouse",
   "csmith-stade",
   "csmith-stahl",
   "csmith-staley",
   "csmith-stallard",
   "csmith-stancill",
   "csmith-starr",
   "csmith-stavrositu",
   "csmith-steele",
   "csmith-stevens",
   "csmith-stevenson",
   "csmith-stewart",
   "csmith-stogsdill",
   "csmith-stoneback",
   "csmith-stonge",
   "csmith-strange",
   "csmith-street",
   "csmith-strickland",
   "csmith-striegel",
   "csmith-strubbe",
   "csmith-stubblefield",
   "csmith-stucker",
   "csmith-sturmer",
   "csmith-suggett",
   "csmith-sullivan",
   "csmith-surratt",
   "csmith-susko",
   "csmith-sykes",
   "csmith-sykora",
   "csmith-tackett",
   "csmith-tacy",
   "csmith-tangerman",
   "csmith-tart",
   "csmith-tarter",
   "csmith-taylor",
   "csmith-terrell",
   "csmith-terry",
   "csmith-tharp",
   "csmith-thero",
   "csmith-therrien",
   "csmith-theus",
   "csmith-thigpen",
   "csmith-thomas",
   "csmith-thompson",
   "csmith-thong",
   "csmith-thornhill",
   "csmith-thurman",
   "csmith-tillery",
   "csmith-tompkins",
   "csmith-toppin",
   "csmith-torbus",
   "csmith-torres",
   "csmith-toussaint",
   "csmith-townsend",
   "csmith-tracy",
   "csmith-tran",
   "csmith-treadway",
   "csmith-treece",
   "csmith-trilli",
   "csmith-trinkle",
   "csmith-truitt",
   "csmith-turner",
   "csmith-ullmann",
   "csmith-urie",
   "csmith-vacheresse",
   "csmith-valdez",
   "csmith-valentine",
   "csmith-vanwinkle",
   "csmith-vasquez",
   "csmith-vaughn",
   "csmith-vayner",
   "csmith-vazquez",
   "csmith-vega",
   "csmith-veliz",
   "csmith-villalva",
   "csmith-villanueva",
   "csmith-visser",
   "csmith-waddell",
   "csmith-wadding",
   "csmith-wagner",
   "csmith-wahlen",
   "csmith-waldrop",
   "csmith-walker",
   "csmith-wallace",
   "csmith-wang",
   "csmith-warburton",
   "csmith-ward",
   "csmith-warren",
   "csmith-warrington",
   "csmith-washington",
   "csmith-waters",
   "csmith-watkins",
   "csmith-watson",
   "csmith-wearing",
   "csmith-weaver",
   "csmith-weinberger",
   "csmith-weir",
   "csmith-welch",
   "csmith-wells",
   "csmith-welsh",
   "csmith-wemmer",
   "csmith-wesley",
   "csmith-west",
   "csmith-westmark",
   "csmith-westmoreland",
   "csmith-wheeler",
   "csmith-whitaker",
   "csmith-white",
   "csmith-whitfield",
   "csmith-whitt",
   "csmith-whitworth",
   "csmith-widell",
   "csmith-wiedmann",
   "csmith-wiens",
   "csmith-wietzel",
   "csmith-wilbert",
   "csmith-wilcox",
   "csmith-wilkerson",
   "csmith-wilkins",
   "csmith-wilkowitz",
   "csmith-wilks",
   "csmith-williams",
   "csmith-williamson",
   "csmith-wills",
   "csmith-wilson",
   "csmith-wiren",
   "csmith-witt",
   "csmith-wolff",
   "csmith-wolpert",
   "csmith-wolsted",
   "csmith-wood",
   "csmith-woods",
   "csmith-worth",
   "csmith-wright",
   "csmith-wu",
   "csmith-wyatt",
   "csmith-wynia",
   "csmith-yager",
   "csmith-yaney",
   "csmith-yepez",
   "csmith-york",
   "csmith-young",
   "csmith-zaldana",
   "csmith-zanella",
   "csmith-zarate",
   "csmith-zeller",
   "csmith-zepeda",
   "dhrystone-dry",
   "dhrystone-fldry",
   "doe_proxyapps_miniamr",
   "doe_proxyapps_minigmg",
   "doe_proxyapps_pathfinder",
   "doe_proxyapps_rsbench",
   "doe_proxyapps_simple_moc",
   "doe_proxyapps_xsbench",
   "fhourstones",
   "fhourstones_31",
   "freebench-analyzer",
   "freebench-distray",
   "freebench-fourinarow",
   "freebench-mason",
   "freebench-neural",
   "freebench-pcompress2",
   "freebench-pifft",
   "game-fannkuch",
   "game-n-body",
   "game-nsieve-bits",
   "game-partialsums",
   "game-puzzle",
   "game-recursive",
   "game-spectral-norm",
   "linpack",
   "llubenchmark",
   "mafft",
   "mallocbench-cfrac",
   "mccat-main",
   "mccat-bintr",
   "mccat-bisect",
   "mccat-eks",
   "mccat-qbsort",
   "mccat-iotest",
   "mccat-vor",
   "mccat-testtrie",
   "mccat-trie",
   "mcgill-chomp",
   "mcgill-queens",
   "mcgill-exptree",
   "mcgill-misr",
   "mediabench-g721-encode",
   "mediabench-adpcm-rawcaudio",
   "mediabench-gsm-toast",
   "mediabench-adpcm-rawdaudio",
   "mediabench-mpeg2-dec",
   "misc-oourafft",
   "misc-flops-6",
   "misc-mandel-2",
   "misc-evalloop",
   "misc-salsa20",
   "misc-fp-convert",
   "misc-whetstone",
   "misc-dt",
   "misc-flops-2",
   "misc-perlin",
   "misc-flops-3",
   "misc-himenobmtxpa",
   "misc-flops-1",
   "misc-flops",
   "misc-reed-solomon",
   "misc-mandel",
   "misc-flops-7",
   "misc-flops-4",
   "misc-matmul_f64_4x4",
   "misc-pi",
   "misc-fbench",
   "misc-flops-8",
   "misc-revert-bits",
   "misc-ffbench",
   "misc-lowercase",
   "misc-flops-5",
   "misc-richards",
   "nbench",
   "npb-serial-dc",
   "npb-serial-is",
   "olden-bh",
   "olden-bisort",
   "olden-em3d",
   "olden-health",
   "olden-mst",
   "olden-perimeter",
   "olden-power",
   "olden-treeadd",
   "olden-tsp",
   "olden-voronoi",
   "prolangs-agrep",
   "prolangs-allroots",
   "prolangs-archie-client",
   "prolangs-assembler",
   "prolangs-bison",
   "prolangs-cdecl",
   "prolangs-compiler",
   "prolangs-fixoutput",
   "prolangs-gnugo",
   "prolangs-loader",
   "prolangs-unix-smail",
   "ptrdist-anagram",
   "ptrdist-bc",
   "ptrdist-ft",
   "ptrdist-ks",
   "ptrdist-yacr2",
   "scimark2-c",
   "shootout-ackermann",
   "shootout-ary3",
   "shootout-fib2",
   "shootout-hash",
   "shootout-heapsort",
   "shootout-hello",
   "shootout-lists",
   "shootout-matrix",
   "shootout-methcall",
   "shootout-nestedloop",
   "shootout-objinst",
   "shootout-random",
   "shootout-sieve",
   "shootout-strcat",
   "sim",
   "stanford-bubblesort",
   "stanford-floatmm",
   "stanford-intmm",
   "stanford-oscar",
   "stanford-puzzle",
   "stanford-queens",
   "stanford-quicksort",
   "stanford-realmm",
   "stanford-towers",
   "stanford-treesort",
   "trimaran-enc3des",
   "trimaran-encmd5",
   "trimaran-encpc1",
   "trimaran-encrc4",
   "trimaran-netbenchcrc",
   "trimaran-netbenchurl",
   "tsvc-controlflow-dbl",
   "tsvc-controlflow-flt",
   "tsvc-controlloops-dbl",
   "tsvc-controlloops-flt",
   "tsvc-crossingthresholds-dbl",
   "tsvc-crossingthresholds-flt",
   "tsvc-equivalencing-dbl",
   "tsvc-equivalencing-flt",
   "tsvc-expansion-dbl",
   "tsvc-expansion-flt",
   "tsvc-globaldataflow-dbl",
   "tsvc-globaldataflow-flt",
   "tsvc-indirectadressing-dbl",
   "tsvc-indirectadressing-flt",
   "tsvc-inductionvariable-dbl",
   "tsvc-inductionvariable-flt",
   "tsvc-lineardependence-dbl",
   "tsvc-lineardependence-flt",
   "tsvc-looprerolling-dbl",
   "tsvc-looprerolling-flt",
   "tsvc-looprestructuring-dbl",
   "tsvc-looprestructuring-flt",
   "tsvc-nodesplitting-dbl",
   "tsvc-nodesplitting-flt",
   "tsvc-packing-dbl",
   "tsvc-packing-flt",
   "tsvc-recurrences-dbl",
   "tsvc-recurrences-flt",
   "tsvc-reductions-dbl",
   "tsvc-reductions-flt",
   "tsvc-searching-dbl",
   "tsvc-searching-flt",
   "tsvc-statementreordering-dbl",
   "tsvc-statementreordering-flt",
   "tsvc-symbolics-dbl",
   "tsvc-symbolics-flt",
   "versabench-8b10b",
   "versabench-beamformer",
   "versabench-bmm",
   "versabench-dbms",
   "versabench-ecbdes"
   ]    

   const inputs = [
      { program : "cbench-automotive-susan", value: "--cmd_key=edges", name: "edges"},
      { program : "cbench-automotive-susan", value: "--cmd_key=corners", name : "corners"},
      { program : "cbench-automotive-susan", value: "--cmd_key=smoothing", name : "smoothing"},
      { program : "cbench-bzip2", value: "--cmd_key=decode", name : "decode"},
      { program : "cbench-bzip2", value: "--cmd_key=encode", name : "encode"},
      { program : "cbench-security-rijndael", value: "--cmd_key=encode", name : "encode"},
      { program : "cbench-security-rijndael", value: "--cmd_key=decode", name : "decode"}
    ]
 
const static_features_size = 65;
const maxBuffer = Infinity

function isDebug(){
   return process.env.DEBUG;
}

function getEnvUID(){
   //ck show env, get milepost uid
   return process.env.UID ? process.env.UID : '9ba414baaedb8ca4';
}

async function load_static_features_from_program_bkp(program) {
   const { stdout } = await exec(`ck load program.static.features:${program}`, { maxBuffer : maxBuffer});
   const stdout_json = JSON.parse(stdout);
   const static_features_on_function_level = stdout_json.dict.features.program_static_milepost_features;
   let static_program_features = Array.apply(null, {length: static_features_size}).map(Number.prototype.valueOf, 0)
   for (let property of Object.getOwnPropertyNames(static_features_on_function_level)) {
      let function_features = static_features_on_function_level[property];
      static_program_features = static_program_features.map((e, index) => e + (function_features[index + 1] || 0))
   }
   return static_program_features;
 }

async function load_static_features_from_program(program, input) {
  await exec(`ck pipeline program:${program} ${input ? input.value : ""} --compiler_env_uoa=${getEnvUID()} --milepost --no_run --milepost_out_file=extracted-features.json`, { maxBuffer : maxBuffer/* , timeout: 35000 */});
  const { stdout } = await exec(`cat \`ck find program:${program}\`/tmp/extracted-features.json `)
  
  const stdout_json = JSON.parse(stdout);
  let static_program_features = Array.apply(null, {length: static_features_size}).map(Number.prototype.valueOf, 0)
  for (let property of Object.getOwnPropertyNames(stdout_json)) {
     let function_features = stdout_json[property];
     static_program_features = static_program_features.map((e, index) => e + (function_features[index + 1] || 0))
  }
  return static_program_features;
}

fields = () => {
  let features_fields = Array.apply(null, {length: 65}).map(Number.call, Number);
  return ['name'].concat(features_fields.map((e, index) => `ft${Number(index + 1).toString().padStart(2, '0')}`))
}

function get_programs() {
    return process.env.programs ? process.env.programs.split(',') : programs;
}

async function run(){
   let features_from_all_programs_json = [];
   for (let program of get_programs()) {
      let program_inputs = inputs.filter(e => e.program === program);
      if (program_inputs.length){
         for (let input of program_inputs) {
            if (isDebug()){
               console.log(`Extracting from ${program}-${input.name}`);
            }
            let features = await load_static_features_from_program(program, input);
            let featuresJson = { name : program.concat('-').concat(input.name)};
            features.forEach((e, index) => featuresJson[`ft${Number(index + 1).toString().padStart(2, '0')}`] = e)
            features_from_all_programs_json.push(featuresJson)

         }
      } else {
         if (isDebug()){
            console.log(`Extracting from ${program}`);
         }
         let features = await load_static_features_from_program(program);
         let featuresJson = { name : program};
         features.forEach((e, index) => featuresJson[`ft${Number(index + 1).toString().padStart(2, '0')}`] = e)
         features_from_all_programs_json.push(featuresJson)
      }
   }

    const json_csv_parser = new Json2csvParser({ fields : fields(), delimiter : ';'});
    const csv = json_csv_parser.parse(features_from_all_programs_json);
    console.log(csv);
}

run();