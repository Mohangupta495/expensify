const senders= [
    {
      "full_name": "Airtel",
      "name": "Airtel",
      "sender_UID": "9000006",
      "senders": [
        "ARWSVC",
        "AIREXP",
        "121",
        "AIROTP",
        "AIRINF",
        "ARWINF",
        "AIRBIL"
      ]
    },
    {
      "full_name": "Airtel DTH",
      "name": "Airtel DTH",
      "set_account_as_expense": false,
      "sender_UID": "90000011",
      "senders": [
        "AIRDTH",
        "AIRDTV"
      ]
    },
    {
      "full_name": "Allahabad Bank",
      "name": "Allahbad Bk",
      "sender_UID": "90000036",
      "senders": [
        "ALBANK",
        "AICSMS",
        "ALBUPI"
      ]
    },
    {
      "full_name": "American Express",
      "name": "AmEx",
      "sender_UID": "9000004",
      "senders": [
        "MYAMEX",
        "AMEXEP",
        "XXAMEX",
        "AMEXIN",
        "56161940",
        "59039000",
        "5757544",
        "57575480",
        "57575701",
        "67455901",
        "67455902"
      ],
      "sender_regexes": [
        "^5\\d{5}$"
      ]
    },
    {
      "full_name": "Andhra Bank",
      "name": "Andhra Bnk",
      "sender_UID": "90000035",
      "senders": [
        "ANDBNK",
        "ANDHBK",
        "ANKBNK",
        "ANDHRA"
      ]
    },
    {
      "full_name": "Axis Bank",
      "name": "Axis",
      "sender_UID": "9000003",
      "senders": [
        "AXISBK",
        "AXISPG",
        "AXISGP"
      ]
    },
    {
      "full_name": "Bank of Baroda",
      "name": "BOB",
      "sender_UID": "90000021",
      "senders": [
        "BOBTXN",
        "BOBCRD",
        "BOBADC",
        "BOBSMS",
        "MCONEC",
        "BOBFSL"
      ]
    },
    {
      "full_name": "Bank of India",
      "name": "BOI",
      "sender_UID": "90000028",
      "senders": [
        "BOIIND",
        "STARBI",
        "BOITXN",
        "BOIBAL",
        "BOIWLI"
      ]
    },
    {
      "full_name": "Bank of Maharashtra",
      "name": "BOM",
      "sender_UID": "90000026",
      "senders": [
        "MAHABK"
      ]
    },
    {
      "full_name": "BookMyShow",
      "name": "BookMyShow",
      "sender_UID": "9000009",
      "senders": [
        "BMSHOW",
        "AMZBMS"
      ]
    },
    {
      "full_name": "Corporation Bank",
      "name": "CORP BANK",
      "sender_UID": "90000027",
      "senders": [
        "CORPBK",
        "WLICCR"
      ]
    },
    {
      "full_name": "Catholic Syrian Bank",
      "name": "CSB",
      "sender_UID": "90000041",
      "senders": [
        "CSBBNK"
      ]
    },
    {
      "full_name": "Canara Bank",
      "name": "Canara",
      "sender_UID": "90000023",
      "senders": [
        "CANBNK",
        "CANCRD",
        "WLISYA",
        "CNRBNK"
      ]
    },
    {
      "full_name": "Citibank",
      "name": "CitiBank",
      "sender_UID": "9000002",
      "senders": [
        "CITIBK",
        "CITIAT",
        "CITIBA",
        "CITIBN"
      ]
    },
    {
      "full_name": "Cosmos Bank",
      "name": "Cosmos",
      "sender_UID": "90000029",
      "senders": [
        "COSMOS"
      ]
    },
    {
      "full_name": "Deutsche Bank",
      "name": "DeutscheBk",
      "sender_UID": "90000038",
      "senders": [
        "DBALRT"
      ]
    },
    {
      "full_name": "Docomo",
      "name": "Docomo",
      "sender_UID": "90000022",
      "senders": [
        "DOCOMO",
        "MYTTBS"
      ]
    },
    {
      "full_name": "Federal Bank",
      "name": "Federal Bk",
      "sender_UID": "90000037",
      "senders": [
        "FEDBNK",
        "FEDFIB"
      ]
    },
    {
      "full_name": "FlipKart",
      "name": "FlipKart",
      "sender_UID": "90000010",
      "senders": [
        "FLPKRT",
        "FLIPKT",
        "EKARTL",
        "FLPKTM",
        "FPKART"
      ]
    },
    {
      "full_name": "HDFC Bank",
      "name": "HDFC",
      "sender_UID": "9000001",
      "senders": [
        "5676712",
        "HDFCBK",
        "HDFCMP",
        "TXNALE",
        "HDFCBN",
        "HDFCCC",
        "PAYZAP"
      ]
    },
    {
      "full_name": "HSBC",
      "name": "HSBC",
      "sender_UID": "90000017",
      "senders": [
        "HSBCIN",
        "HSBCBK",
        "HSBCIM"
      ]
    },
    {
      "full_name": "ICICI Bank",
      "name": "ICICI",
      "sender_UID": "90000012",
      "senders": [
        "ICICIB",
        "ICIBNK",
        "ICICIT"
      ]
    },
    {
      "full_name": "IDBI Bank",
      "name": "IDBI",
      "sender_UID": "90000018",
      "senders": [
        "IDBIBK",
        "WLIDBI"
      ]
    },
    {
      "full_name": "IRCTC",
      "name": "IRCTC",
      "sender_UID": "90000042",
      "senders": [
        "IRCTCI",
        "IRCMSI",
        "IRSMSA"
      ]
    },
    {
      "full_name": "Idea",
      "name": "Idea",
      "sender_UID": "9000007",
      "senders": [
        "IDEA",
        "!dea"
      ]
    },
    {
      "full_name": "Indian Bank",
      "name": "Indian Bnk",
      "sender_UID": "90000040",
      "senders": [
        "INDBNK",
        "INDBCC",
        "INBUPI"
      ]
    },
    {
      "full_name": "IndusInd Bank",
      "name": "Indus",
      "sender_UID": "90000014",
      "senders": [
        "INDUSB",
        "040801",
        "INDUSA"
      ]
    },
    {
      "full_name": "Kotak Mahindra Bank",
      "name": "Kotak",
      "sender_UID": "90000015",
      "senders": [
        "KOTAKB",
        "KOTAKP",
        "040100",
        "111000"
      ]
    },
    {
      "full_name": "Make My Trip",
      "name": "Make My Trip",
      "sender_UID": "90000043",
      "senders": [
        "MKMYTR",
        "MMTRIP"
      ]
    },
    {
      "full_name": "OlaCab",
      "name": "OlaCab",
      "sender_UID": "9000008",
      "senders": [
        "OLACAB"
      ]
    },
    {
      "full_name": "Punjab National Bank",
      "name": "PNB",
      "sender_UID": "90000024",
      "senders": [
        "PNBSMS",
        "PNBRWD",
        "PNBHFL",
        "PNBCCD",
        "PNBCRC",
        "PNBRTS",
        "PNBMOB",
        "PNBUPI"
      ]
    },
    {
      "full_name": "RBL Bank",
      "name": "RBLBANK",
      "sender_UID": "90000044",
      "senders": [
        "RBLBNK",
        "RBLCRD"
      ]
    },
    {
      "full_name": "State Bank of India",
      "name": "SBI",
      "sender_UID": "90000013",
      "senders": [
        "ATMSBI",
        "CBSSBI",
        "SBICRD",
        "SBIINB",
        "SCISMS",
        "SBIUPI",
        "SBIPSG",
        "SBGMBS",
        "1722",
        "SBIETC",
        "SBIBIL",
        "SBYONO",
        "SBMSMS",
        "SBIDGT",
        "SBIKBP",
        "SBINPS",
        "SBIBNK"
      ]
    },
    {
      "full_name": "Standard Chartered",
      "name": "StanC",
      "sender_UID": "90000016",
      "senders": [
        "FROMSC",
        "MNHTAN",
        "020001",
        "SCBANK"
      ]
    },
    {
      "full_name": "TATA Credit Card",
      "name": "TATA",
      "sender_UID": "90000025",
      "senders": [
        "TATACD"
      ]
    },
    {
      "full_name": "Union Bank of India",
      "name": "Union Bank",
      "sender_UID": "90000020",
      "senders": [
        "UNIONB",
        "IPRSMS"
      ]
    },
    {
      "full_name": "Vodafone",
      "name": "Vodafone",
      "sender_UID": "9000005",
      "senders": [
        "VFCARE",
        "VDFONE",
        "VODAFONE",
        "DAFONE",
        "111",
        "VICARE"
      ]
    },
    {
      "full_name": "Walnut",
      "name": "Walnut",
      "sender_UID": "90000039",
      "senders": [
        "WALNUT"
      ]
    },
    {
      "full_name": "Yes Bank",
      "name": "YesBank",
      "sender_UID": "90000019",
      "senders": [
        "YESBNK",
        "YESBAK"
      ]
    },
    {
      "full_name": "Aircel",
      "name": "Aircel",
      "sender_UID": "90000045",
      "senders": [
        "AIRCEL"
      ]
    },
    {
      "full_name": "Reliance Communications",
      "name": "RCom",
      "sender_UID": "90000046",
      "senders": [
        "RELIANCE",
        "53738"
      ]
    },
    {
      "sender_UID": "90000047",
      "full_name": "Central Bank of India",
      "name": "CNTRLBK",
      "senders": [
        "CENTBK",
        "CBIOTP"
      ]
    },
    {
      "sender_UID": "90000049",
      "full_name": "UCO Bank",
      "name": "UCO",
      "senders": [
        "UCOBNK"
      ]
    },
    {
      "sender_UID": "90000050",
      "full_name": "Oriental Bank of Commerce",
      "name": "OBC",
      "senders": [
        "OBCBNK",
        "EMPBNK"
      ]
    },
    {
      "full_name": "GOIBIBO",
      "name": "GOIBIBO",
      "sender_UID": "90000051",
      "senders": [
        "GOIBIB"
      ]
    },
    {
      "full_name": "Cleartrip",
      "name": "Cleartrip",
      "sender_UID": "90000052",
      "senders": [
        "CLRTRP"
      ]
    },
    {
      "full_name": "Yatra",
      "name": "Yatra",
      "sender_UID": "90000053",
      "senders": [
        "YATRAA"
      ]
    },
    {
      "full_name": "BSNL",
      "name": "BSNL",
      "sender_UID": "90000054",
      "senders": [
        "BSNLCARE",
        "BSNL",
        "BSNLKL",
        "BSNLPB",
        "BSNLBB",
        "BSNLBILL",
        "BSNLKT",
        "BSNLDC",
        "BSNLCF",
        "BSNLNZ",
        "NZBSNL",
        "BSNLBR"
      ]
    },
    {
      "full_name": "Vijaya Bank",
      "name": "VIJAYA",
      "sender_UID": "90000055",
      "senders": [
        "VIJBNK",
        "VIJBCC",
        "VBKCCD"
      ]
    },
    {
      "sender_UID": "90000056",
      "full_name": "Dena Bank",
      "name": "DENA",
      "senders": [
        "BKDENA",
        "DENABK"
      ]
    },
    {
      "sender_UID": "90000057",
      "full_name": "MTNL",
      "name": "MTNL",
      "senders": [
        "MTNLCB",
        "MTNLBL",
        "MTNLPRS",
        "LLBILL"
      ]
    },
    {
      "sender_UID": "90000058",
      "full_name": "Syndicate Bank",
      "name": "Syndicate",
      "senders": [
        "SYNDBK",
        "SYBANK",
        "SYNBNK",
        "SYNTST",
        "SYNMOB"
      ]
    },
    {
      "full_name": "Paytm wallet and Bank",
      "name": "PAYTM",
      "set_account_as_expense": false,
      "sender_UID": "90000059",
      "senders": [
        "IPAYTM",
        "VPAYTM",
        "PAYTMB",
        "PYTMBK"
      ]
    },
    {
      "full_name": "PayZapp",
      "name": "PayZapp",
      "set_account_as_expense": false,
      "sender_UID": "90000060",
      "senders": [
        "PAYZAP"
      ]
    },
    {
      "full_name": "IMONEY",
      "name": "IMONEY",
      "set_account_as_expense": false,
      "sender_UID": "90000061",
      "senders": [
        "IMONEY"
      ]
    },
    {
      "full_name": "MoboMoney",
      "name": "MoboMoney",
      "set_account_as_expense": false,
      "sender_UID": "90000062",
      "senders": [
        "MYMOBO"
      ]
    },
    {
      "full_name": "MobiKwik",
      "name": "MobiKwik",
      "set_account_as_expense": false,
      "sender_UID": "90000063",
      "senders": [
        "MOBIKW"
      ]
    },
    {
      "full_name": "Airtel Payments Bank",
      "name": "Airtel Money",
      "set_account_as_expense": false,
      "sender_UID": "90000064",
      "senders": [
        "AIRMNY",
        "AIRBNK"
      ]
    },
    {
      "full_name": "Indian Overseas Bank",
      "name": "IOB",
      "sender_UID": "90000065",
      "senders": [
        "IOBCHN"
      ]
    },
    {
      "full_name": "Karur Vysya Bank",
      "name": "KVB",
      "sender_UID": "90000066",
      "senders": [
        "KVBANK",
        "KVBUPI",
        "KVBMPY"
      ]
    },
    {
      "full_name": "South Indian Bank",
      "name": "South Indian",
      "sender_UID": "90000067",
      "senders": [
        "SIBSMS",
        "NKOTP"
      ]
    },
    {
      "full_name": "City Union Bank",
      "name": "CUB",
      "sender_UID": "90000068",
      "senders": [
        "CUBANK",
        "CUBLTD",
        "CUBSMS",
        "CUBCRD"
      ]
    },
    {
      "full_name": "Jammu & Kashmir Bank",
      "name": "J&K Bank",
      "sender_UID": "90000069",
      "senders": [
        "JKBANK",
        "JKCARD"
      ]
    },
    {
      "full_name": "Saraswat Bank",
      "name": "Saraswat Bank",
      "sender_UID": "90000070",
      "senders": [
        "SARBNK",
        "SRCBNK",
        "SBCARD"
      ]
    },
    {
      "full_name": "United Bank of India",
      "name": "United Bank",
      "sender_UID": "90000072",
      "senders": [
        "UBIBNK",
        "UBICCR",
        "UNBMPY",
        "WLIUBC"
      ]
    },
    {
      "full_name": "Dhanlaxmi Bank",
      "name": "Dhanlaxmi Bank",
      "sender_UID": "90000074",
      "senders": [
        "DHANBK"
      ]
    },
    {
      "full_name": "Tamilnad Mercantile Bank",
      "name": "TMB",
      "sender_UID": "90000076",
      "senders": [
        "TMBANK"
      ]
    },
    {
      "full_name": "Lakshmi Vilas Bank",
      "name": "Lakshmi Vilas",
      "sender_UID": "90000077",
      "senders": [
        "LVBANK",
        "LVBSMS"
      ]
    },
    {
      "full_name": "Royal Bank of Scotland",
      "name": "RBS",
      "sender_UID": "90000078",
      "senders": [
        "RBSIND"
      ]
    },
    {
      "full_name": "IDFC First Bank",
      "name": "IDFC",
      "sender_UID": "90000075",
      "senders": [
        "IDFCBK",
        "IDFCFB",
        "IDFCTS",
        "FAMPAY"
      ]
    },
    {
      "full_name": "DBS Bank",
      "name": "DBS",
      "sender_UID": "90000079",
      "senders": [
        "DBSBNK",
        "DIGIBK",
        "DBSLVB"
      ]
    },
    {
      "full_name": "Karnataka Bank",
      "name": "Karnataka Bank",
      "sender_UID": "90000080",
      "senders": [
        "KTKBNK",
        "KBLBNK"
      ]
    },
    {
      "full_name": "Shamrao Vithal Co-operative Bank",
      "name": "SVC Bank",
      "sender_UID": "90000081",
      "senders": [
        "SVCBNK"
      ]
    },
    {
      "full_name": "DCB Bank",
      "name": "DCB",
      "sender_UID": "90000082",
      "senders": [
        "DCBANK",
        "DCBBNK"
      ]
    },
    {
      "full_name": "Ticket",
      "name": "Ticket",
      "set_account_as_expense": false,
      "sender_UID": "90000083",
      "senders": [
        "TICKET",
        "WLITIC",
        "EDENRD"
      ]
    },
    {
      "full_name": "Tata Sky",
      "name": "Tata Sky",
      "set_account_as_expense": false,
      "sender_UID": "90000084",
      "senders": [
        "MYTSKY",
        "TPPLAY"
      ]
    },
    {
      "full_name": "Videocon D2H",
      "name": "Videocon D2H",
      "set_account_as_expense": false,
      "sender_UID": "90000085",
      "senders": [
        "VIDDTH",
        "DTHVID",
        "MYDTUH"
      ]
    },
    {
      "full_name": "Sun DTH",
      "name": "Sun DTH",
      "set_account_as_expense": false,
      "sender_UID": "90000086",
      "senders": [
        "SUNDTH"
      ]
    },
    {
      "full_name": "Dish TV",
      "name": "Dish TV",
      "set_account_as_expense": false,
      "sender_UID": "90000087",
      "senders": [
        "DISHTV"
      ]
    },
    {
      "full_name": "Sodexo",
      "name": "Sodexo",
      "sender_UID": "90000088",
      "senders": [
        "SODEXO",
        "ZETAAA",
        "ZETAMB",
        "57575701"
      ]
    },
    {
      "full_name": "MSEB",
      "name": "MSEB",
      "sender_UID": "90000089",
      "senders": [
        "BILINF",
        "MSEDCL"
      ]
    },
    {
      "full_name": "BESCOM",
      "name": "BESCOM",
      "sender_UID": "90000090",
      "senders": [
        "BESCOM"
      ]
    },
    {
      "full_name": "Tata Power",
      "name": "Tata Power",
      "sender_UID": "90000091",
      "senders": [
        "TATAPR",
        "TPDDLD"
      ]
    },
    {
      "full_name": "BSES",
      "name": "BSES",
      "sender_UID": "90000092",
      "senders": [
        "BSESRP",
        "BSESYP"
      ]
    },
    {
      "full_name": "GUVNL",
      "name": "GUVNL",
      "sender_UID": "90000093",
      "senders": [
        "DGVCLG",
        "MGVCLG",
        "UGVCLG",
        "PGVCLG"
      ]
    },
    {
      "full_name": "UPPCL",
      "name": "UPPCL",
      "sender_UID": "90000094",
      "senders": [
        "UPPCLT",
        "BIJILI"
      ]
    },
    {
      "full_name": "TSSPDCL",
      "name": "TSSPDCL",
      "sender_UID": "90000095",
      "senders": [
        "TSSPDC"
      ]
    },
    {
      "full_name": "CESC",
      "name": "CESC",
      "sender_UID": "90000096",
      "senders": [
        "CESCLM",
        "CESCMY"
      ]
    },
    {
      "full_name": "Life Insurance Corporation",
      "name": "LIC",
      "sender_UID": "90000097",
      "senders": [
        "LICIND",
        "LICCRD"
      ]
    },
    {
      "full_name": "SBI Life Insurance Company",
      "name": "SBI Life",
      "sender_UID": "90000098",
      "senders": [
        "SBILIF",
        "SBLIFE",
        "SBIGEN"
      ]
    },
    {
      "full_name": "Max Life Insurance",
      "name": "Max Life",
      "sender_UID": "90000099",
      "senders": [
        "MAXLIT",
        "MXLIFE"
      ]
    },
    {
      "full_name": "Kotak Life Insurance",
      "name": "Kotak Life",
      "sender_UID": "90000111",
      "senders": [
        "KOTAKL"
      ]
    },
    {
      "full_name": "HDFC Life",
      "name": "HDFC Life",
      "sender_UID": "90000112",
      "senders": [
        "HDFCSL",
        "HDFCLI",
        "HDFCSA",
        "HDFCLE"
      ]
    },
    {
      "full_name": "HDFC Home",
      "name": "HDFC Home",
      "sender_UID": "90000113",
      "senders": [
        "HDFCLD"
      ]
    },
    {
      "full_name": "Bajaj Finserv",
      "name": "Bajaj Finserv",
      "sender_UID": "90000114",
      "senders": [
        "BAJAJF",
        "SPRCRD",
        "BAJAJC",
        "BAJAJH",
        "BJAZLI",
        "DBSBFL"
      ]
    },
    {
      "full_name": "ICICI Prudential Life Insurance",
      "name": "ICICI Prudential",
      "sender_UID": "90000115",
      "senders": [
        "ICICIP"
      ]
    },
    {
      "full_name": "JioMoney",
      "name": "JioMoney",
      "set_account_as_expense": false,
      "sender_UID": "90000116",
      "senders": [
        "JIOMNY",
        "JIOPBL"
      ]
    },
    {
      "full_name": "TANGEDCO",
      "name": "TANGEDCO",
      "sender_UID": "90000117",
      "senders": [
        "TANGED"
      ]
    },
    {
      "full_name": "FreeCharge",
      "name": "FreeCharge",
      "set_account_as_expense": false,
      "sender_UID": "90000118",
      "senders": [
        "FCHRGE",
        "FRCHGE",
        "FTRANS",
        "FCHARG"
      ]
    },
    {
      "full_name": "Punjab & Sind Bank",
      "name": "PSB",
      "sender_UID": "90000119",
      "senders": [
        "PSBANK"
      ]
    },
    {
      "full_name": "Punjab & Maharashtra Co-op Bank",
      "name": "PMC",
      "sender_UID": "90000121",
      "senders": [
        "PMCBNK"
      ]
    },
    {
      "full_name": "PhonePe",
      "name": "PhonePe",
      "set_account_as_expense": false,
      "sender_UID": "90000122",
      "senders": [
        "PHONPE"
      ]
    },
    {
      "full_name": "Mahanagar Gas",
      "name": "Mahanagar Gas",
      "sender_UID": "90000123",
      "senders": [
        "MGLLTD"
      ]
    },
    {
      "full_name": "Adani Gas",
      "name": "Adani Gas",
      "sender_UID": "90000124",
      "senders": [
        "AGLGAS",
        "ATGLTD"
      ]
    },
    {
      "full_name": "Sabarmati Gas",
      "name": "Sabarmati Gas",
      "sender_UID": "90000125",
      "senders": [
        "SABGAS",
        "SGLINF"
      ]
    },
    {
      "full_name": "Gujarat Gas",
      "name": "Gujarat Gas",
      "sender_UID": "90000126",
      "senders": [
        "GUJGAS"
      ]
    },
    {
      "full_name": "India Post Payments Bank",
      "name": "India Post",
      "sender_UID": "90000127",
      "senders": [
        "DOPBNK",
        "IPBMSG"
      ]
    },
    {
      "full_name": "APEPDCL",
      "name": "APEPDCL",
      "sender_UID": "90000128",
      "senders": [
        "APEPDC"
      ]
    },
    {
      "full_name": "APSPDCL",
      "name": "APSPDCL",
      "sender_UID": "90000129",
      "senders": [
        "APSPDC",
        "APSPSC"
      ]
    },
    {
      "full_name": "UHBVN",
      "name": "UHBVN",
      "sender_UID": "90000131",
      "senders": [
        "UHBVNL"
      ]
    },
    {
      "full_name": "DHBVN",
      "name": "DHBVN",
      "sender_UID": "90000132",
      "senders": [
        "DHBVNL"
      ]
    },
    {
      "full_name": "Bandhan Bank",
      "name": "Bandhan",
      "sender_UID": "90000133",
      "senders": [
        "BNDNBK",
        "BDNSMS"
      ]
    },
    {
      "full_name": "TJSB Sahakari Bank Ltd.",
      "name": "TJSB",
      "sender_UID": "90000134",
      "senders": [
        "TJSBNK",
        "TJSBSB",
        "TJCARD",
        "TJIMPS",
        "TJUPIS"
      ]
    },
    {
      "full_name": "PayGo",
      "name": "PayGo",
      "set_account_as_expense": false,
      "sender_UID": "90000135",
      "senders": [
        "IPAYGO"
      ]
    },
    {
      "full_name": "Amazon Pay",
      "name": "Amazon Pay",
      "set_account_as_expense": false,
      "sender_UID": "90000136",
      "senders": [
        "AMAZON",
        "51466",
        "57575858",
        "50350375",
        "56161940",
        "5676734",
        "57273",
        "59039000",
        "51460",
        "50350301",
        "56070",
        "59039029",
        "57575022",
        "57273111",
        "67455902",
        "CFLOAT",
        "50270000",
        "50350555",
        "AXIOFS",
        "51471",
        "50350144",
        "50350145",
        "50350142",
        "50350147",
        "50350146",
        "50350141",
        "50350143"
      ],
      "sender_regexes": [
        "^5\\d{5,7}$"
      ]
    },
    {
      "full_name": "ACT Broadband",
      "name": "ACT Broadband",
      "sender_UID": "90000137",
      "senders": [
        "ACTTEL",
        "ACTGRP",
        "ACTFBT"
      ]
    },
    {
      "full_name": "Equitas Small Finance Bank",
      "name": "Equitas",
      "sender_UID": "90000139",
      "senders": [
        "EQUTAS",
        "EQUTAT",
        "EQUTAX"
      ]
    },
    {
      "full_name": "LazyPay",
      "name": "LazyPay",
      "sender_UID": "90000141",
      "senders": [
        "LZYPAY",
        "LAZPAY"
      ]
    },
    {
      "full_name": "DHFL",
      "name": "DHFL",
      "sender_UID": "90000142",
      "senders": [
        "DHFLTD",
        "DHFLHL"
      ]
    },
    {
      "full_name": "Tata Capital",
      "name": "Tata Capital",
      "sender_UID": "90000143",
      "senders": [
        "TATACP",
        "TATACL"
      ]
    },
    {
      "full_name": "Indiabulls",
      "name": "Indiabulls",
      "sender_UID": "90000144",
      "senders": [
        "IBULLS",
        "IDHANI",
        "DHANIP"
      ]
    },
    {
      "full_name": "Maharashtra Natural Gas Ltd.",
      "name": "MNGL",
      "sender_UID": "90000146",
      "senders": [
        "MNGLPU"
      ]
    },
    {
      "full_name": "OlaMoney",
      "name": "OlaMoney",
      "set_account_as_expense": false,
      "sender_UID": "90000147",
      "senders": [
        "OLAMNY",
        "OLACAB"
      ]
    },
    {
      "full_name": "Aegon Life Insurance Company",
      "name": "Aegon",
      "sender_UID": "90000148",
      "senders": [
        "AEGONL"
      ]
    },
    {
      "full_name": "Bharat Bank",
      "name": "Bharat Bank",
      "sender_UID": "90000149",
      "senders": [
        "BHARAT",
        "BCBANK"
      ]
    },
    {
      "full_name": "Adani Electricity",
      "name": "Adani Electricity",
      "sender_UID": "90000151",
      "senders": [
        "ADANIE"
      ]
    },
    {
      "full_name": "NIYO",
      "name": "NIYO",
      "set_account_as_expense": false,
      "sender_UID": "90000165",
      "senders": [
        "GONIYO"
      ]
    },
    {
      "full_name": "Capital Float",
      "name": "Capital Float",
      "sender_UID": "90000152",
      "senders": [
        "CAPFLT",
        "CFLOAN",
        "CFLOAT"
      ]
    },
    {
      "full_name": "Hathway Broadband",
      "name": "Hathway Broadband",
      "sender_UID": "90000154",
      "senders": [
        "HATHWY",
        "040801"
      ]
    },
    {
      "full_name": "Aviva",
      "name": "Aviva",
      "sender_UID": "90000155",
      "senders": [
        "ALICIL",
        "AVIVAA"
      ]
    },
    {
      "full_name": "Avantika Gas",
      "name": "Avantika Gas",
      "sender_UID": "90000156",
      "senders": [
        "AGLIND",
        "AVNTKA",
        "AAVPNG"
      ]
    },
    {
      "full_name": "NDMC",
      "name": "NDMC",
      "sender_UID": "90000157",
      "senders": [
        "EWNDMC"
      ]
    },
    {
      "full_name": "WBSEDCL",
      "name": "WBSEDCL",
      "sender_UID": "90000158",
      "senders": [
        "WBELEC",
        "WBSEDC"
      ]
    },
    {
      "full_name": "Torrent Power",
      "name": "Torrent Power",
      "sender_UID": "90000159",
      "senders": [
        "TPOWER"
      ]
    },
    {
      "full_name": "HPSEBL",
      "name": "HPSEBL",
      "sender_UID": "90000161",
      "senders": [
        "HPSEBL"
      ]
    },
    {
      "full_name": "Jio",
      "name": "Jio",
      "sender_UID": "90000162",
      "senders": [
        "JIOPAY",
        "JIOFIB",
        "JIOFBR"
      ]
    },
    {
      "full_name": "ABHYUDAYA CO-OP BANK",
      "name": "Abhyudaya",
      "sender_UID": "90000163",
      "senders": [
        "ACBLBK"
      ]
    },
    {
      "full_name": "Andhra Pradesh Grameena Vikas Bank",
      "name": "APGV",
      "sender_UID": "90000164",
      "senders": [
        "APGVBK"
      ]
    },
    {
      "full_name": "Fino Payments Bank",
      "name": "Fino",
      "sender_UID": "90000166",
      "senders": [
        "FINOBK",
        "FINOIN"
      ]
    },
    {
      "full_name": "Ujjivan Small Finance Bank",
      "name": "Ujjivan",
      "sender_UID": "90000167",
      "senders": [
        "UJJIVN"
      ]
    },
    {
      "full_name": "AP Mahesh Bank",
      "name": "AP Mahesh",
      "sender_UID": "90000168",
      "senders": [
        "APMBNK",
        "APMCUB"
      ]
    },
    {
      "full_name": "NKGSB Cooperative Bank",
      "name": "NKGSB",
      "sender_UID": "90000169",
      "senders": [
        "NKGSBK"
      ]
    },
    {
      "full_name": "Zaggle",
      "name": "Zaggle",
      "set_account_as_expense": false,
      "sender_UID": "90000171",
      "senders": [
        "ZAGGLE"
      ]
    },
    {
      "full_name": "Simpl",
      "name": "Simpl",
      "sender_UID": "90000172",
      "senders": [
        "GSIMPL",
        "SIMPLX",
        "MYSMPL",
        "SMPLPL"
      ]
    },
    {
      "full_name": "AU Small Finance Bank",
      "name": "AU Bank",
      "sender_UID": "90000173",
      "senders": [
        "AUBANK"
      ]
    },
    {
      "full_name": "PSPCL",
      "name": "PSPCL",
      "sender_UID": "90000174",
      "senders": [
        "PBGOVT"
      ]
    },
    {
      "full_name": "Bharti AXA Life Insurance",
      "name": "Bharti AXA Life",
      "sender_UID": "90000175",
      "senders": [
        "BAXALI"
      ]
    },
    {
      "full_name": "Aditya Birla Sun Life Insurance",
      "name": "Aditya Birla Sun Life",
      "sender_UID": "90000176",
      "senders": [
        "ABCPRO",
        "ABCABS",
        "ABCAPS"
      ]
    },
    {
      "full_name": "Unique Central Piped Gas",
      "name": "UCPGPL",
      "sender_UID": "90000177",
      "senders": [
        "UCPGPL"
      ]
    },
    {
      "full_name": "Connect Broadband",
      "name": "Connect Broadband",
      "sender_UID": "90000178",
      "senders": [
        "CONECT"
      ]
    },
    {
      "full_name": "Canara HSBC OBC Life Insurance Company Limited",
      "name": "Canara HSBC OBC Life",
      "sender_UID": "90000179",
      "senders": [
        "CHOINS"
      ]
    },
    {
      "full_name": "DHFL Pramerica Life Insurance",
      "name": "DHFL Pramerica Life",
      "sender_UID": "90000181",
      "senders": [
        "PLILTD"
      ]
    },
    {
      "full_name": "HDFC ERGO General Insurance",
      "name": "HDFC ERGO",
      "sender_UID": "90000182",
      "senders": [
        "HDFCHI",
        "HDFCGI"
      ]
    },
    {
      "full_name": "IDBI Federal Life Insurance",
      "name": "IDBI Federal Life",
      "sender_UID": "90000183",
      "senders": [
        "IDBIFL"
      ]
    },
    {
      "full_name": "India First Life Insurance",
      "name": "India First Life",
      "sender_UID": "90000184",
      "senders": [
        "INDIAF"
      ]
    },
    {
      "full_name": "APDCL",
      "name": "APDCL",
      "sender_UID": "90000185",
      "senders": [
        "DAPDCL"
      ]
    },
    {
      "full_name": "Brihanmumbai Electric Supply and Transport",
      "name": "BEST",
      "sender_UID": "90000186",
      "senders": [
        "BESTSM"
      ]
    },
    {
      "full_name": "CSEB",
      "name": "CSEB",
      "sender_UID": "90000187",
      "senders": [
        "CSPDCL"
      ]
    },
    {
      "full_name": "Edelweiss Tokio Life Insurance",
      "name": "Edelweiss Tokio Life",
      "sender_UID": "90000188",
      "senders": [
        "ETLIFE"
      ]
    },
    {
      "full_name": "Haryana City Gas",
      "name": "Haryana City Gas",
      "sender_UID": "90000189",
      "senders": [
        "HCGKCE",
        "HCGPNG",
        "HCGDLG"
      ]
    },
    {
      "full_name": "HESCOM",
      "name": "HESCOM",
      "sender_UID": "90000191",
      "senders": [
        "HESCOM"
      ]
    },
    {
      "full_name": "Indraprastha Gas",
      "name": "Indraprastha Gas",
      "sender_UID": "90000192",
      "senders": [
        "IGLDEL",
        "IGLGAS"
      ]
    },
    {
      "full_name": "Kanpur Electricity",
      "name": "KESCO",
      "sender_UID": "90000193",
      "senders": [
        "KESCOK"
      ]
    },
    {
      "full_name": "Kota Electricity Distribution Limited",
      "name": "KEDL",
      "sender_UID": "90000194",
      "senders": [
        "KEDLLM"
      ]
    },
    {
      "full_name": "Tikona",
      "name": "Tikona",
      "sender_UID": "90000195",
      "senders": [
        "TIKONA"
      ]
    },
    {
      "full_name": "Mangalore Electricity Supply",
      "name": "MESCOM",
      "sender_UID": "90000196",
      "senders": [
        "MESCOM"
      ]
    },
    {
      "full_name": "Noida Power Co Limited",
      "name": "NPCL",
      "sender_UID": "90000197",
      "senders": [
        "NPCLCC"
      ]
    },
    {
      "full_name": "NBPDCL",
      "name": "NBPDCL",
      "sender_UID": "90000198",
      "senders": [
        "NBPDCL"
      ]
    },
    {
      "full_name": "PNB Metlife Insurance",
      "name": "PNB Metlife",
      "sender_UID": "90000199",
      "senders": [
        "PNBMET",
        "METCOM"
      ]
    },
    {
      "full_name": "Reliance Nippon Life Insurance",
      "name": "Reliance Nippon Life",
      "sender_UID": "90000201",
      "senders": [
        "RNLICL"
      ]
    },
    {
      "full_name": "Nextra Broadband",
      "name": "Nextra Broadband",
      "sender_UID": "90000202",
      "senders": [
        "NEXTRA"
      ]
    },
    {
      "full_name": "SBPDCL",
      "name": "SBPDCL",
      "sender_UID": "90000203",
      "senders": [
        "SBPDCL"
      ]
    },
    {
      "full_name": "Spectra Broadband",
      "name": "Spectra Broadband",
      "sender_UID": "90000204",
      "senders": [
        "SPCTRA",
        "SPETRA"
      ]
    },
    {
      "full_name": "Tata AIA Life Insurance",
      "name": "Tata AIA Life",
      "sender_UID": "90000205",
      "senders": [
        "TATALI",
        "TATAAI"
      ]
    },
    {
      "full_name": "TSECL",
      "name": "TSECL",
      "sender_UID": "90000206",
      "senders": [
        "TSECLI"
      ]
    },
    {
      "full_name": "Tripura Natural Gas",
      "name": "Tripura Natural Gas",
      "sender_UID": "90000207",
      "senders": [
        "TNGCLT"
      ]
    },
    {
      "full_name": "Uttarakhand Power Corporation",
      "name": "UPCL",
      "sender_UID": "90000208",
      "senders": [
        "UPCLUK"
      ]
    },
    {
      "full_name": "Vadodara Gas",
      "name": "Vadodara Gas",
      "sender_UID": "90000209",
      "senders": [
        "VGLBIL"
      ]
    },
    {
      "full_name": "Bharatpur Electricity",
      "name": "BESL",
      "sender_UID": "90000211",
      "senders": [
        "BESLLM",
        "BESLSM"
      ]
    },
    {
      "full_name": "Bikaner Electricity Supply",
      "name": "BKESLM",
      "sender_UID": "90000212",
      "senders": [
        "BKESLM",
        "BKSLSM"
      ]
    },
    {
      "full_name": "Daman & Diu electricity",
      "name": "DDED",
      "sender_UID": "90000213",
      "senders": [
        "DDEDIN"
      ]
    },
    {
      "full_name": "JUSCO",
      "name": "JUSCO",
      "sender_UID": "90000214",
      "senders": [
        "JUSCOL"
      ]
    },
    {
      "full_name": "TTN BroadBand",
      "name": "TTN BroadBand",
      "sender_UID": "90000215",
      "senders": [
        "TTNNET",
        "SHRTCN"
      ]
    },
    {
      "full_name": "M.P. Madhya Kshetra Vidyut Vitaran",
      "name": "MPMKVVCL",
      "sender_UID": "90000216",
      "senders": [
        "CCMPCZ"
      ]
    },
    {
      "full_name": "M.P. Poorv Kshetra Vidyut Vitaran",
      "name": "MPPKVVCL-EAST",
      "sender_UID": "90000217",
      "senders": [
        "MPEAST"
      ]
    },
    {
      "full_name": "M.P. Paschim Kshetra Vidyut Vitaran",
      "name": "MPPKVVCL-WEST",
      "sender_UID": "90000218",
      "senders": [
        "MPSEBW"
      ]
    },
    {
      "full_name": "One Card",
      "name": "One Card",
      "sender_UID": "90000219",
      "senders": [
        "ONECRD"
      ]
    },
    {
      "full_name": "Slice",
      "name": "Slice",
      "sender_UID": "90000221",
      "senders": [
        "SLCEIT"
      ]
    },
    {
      "full_name": "Sezzle",
      "name": "Sezzle",
      "sender_UID": "90000222",
      "senders": [
        "SEZZLE"
      ]
    },
    {
      "full_name": "ZestMoney",
      "name": "ZestMoney",
      "sender_UID": "90000223",
      "senders": [
        "ZESTMN",
        "ZESTMO"
      ]
    },
    {
      "full_name": "Bullet",
      "name": "Bullet",
      "sender_UID": "90000224",
      "senders": [
        "BULAPP"
      ]
    },
    {
      "full_name": "Uni Card",
      "name": "Uni Card",
      "sender_UID": "90000225",
      "senders": [
        "UNICRD"
      ]
    },
    {
      "full_name": "Swiggy Money",
      "name": "Swiggy Money",
      "set_account_as_expense": false,
      "sender_UID": "90000227",
      "senders": [
        "SWIGGY"
      ]
    },
    {
      "full_name": "SBM Bank",
      "name": "SBM Bnk",
      "sender_UID": "90000228",
      "senders": [
        "SBMIND"
      ]
    },
    {
      "full_name": "Happay",
      "name": "Happay",
      "set_account_as_expense": false,
      "sender_UID": "90000229",
      "senders": [
        "HAPPAY"
      ]
    },
    {
      "full_name": "PostPe",
      "name": "PostPe",
      "sender_UID": "90000231",
      "senders": [
        "POSTPE"
      ]
    },
    {
      "full_name": "APCPDCL",
      "name": "APCPDCL",
      "sender_UID": "90000232",
      "senders": [
        "APCPDC"
      ]
    },
    {
      "full_name": "Jupiter",
      "name": "Jupiter",
      "sender_UID": "90000233",
      "senders": [
        "ONJPTR",
        "JTEDGE"
      ]
    },
    {
      "full_name": "axio",
      "name": "axio",
      "sender_UID": "90000234",
      "senders": [
        "AXIOIN",
        "AXIOFS"
      ]
    },
    {
      "full_name": "Pluxee",
      "name": "Pluxee",
      "sender_UID": "90000235",
      "senders": [
        "PLUXEE"
      ]
    },
    {
      "full_name": "Scapia",
      "name": "Scapia",
      "sender_UID": "90000236",
      "senders": [
        "SCAPIA",
        "SCPFED",
        "FEDSCP"
      ]
    },
    {
      "full_name": "Kancheepuram Central Cooperative Bank",
      "name": "KPMCCB",
      "sender_UID": "90000237",
      "senders": [
        "KPMCCB"
      ]
    },
    {
      "full_name": "Thane Bharat Sahakari Bank",
      "name": "TBSB",
      "sender_UID": "90000238",
      "senders": [
        "TBSBNK"
      ]
    },
    {
      "full_name": "Nalgonda District Cooperative Central Bank",
      "name": "Nalgonda DCC",
      "sender_UID": "90000239",
      "senders": [
        "NLGCCB"
      ]
    },
    {
      "full_name": "Kerala Gramin Bank",
      "name": "Kerala Gramin",
      "sender_UID": "90000240",
      "senders": [
        "KGBANK"
      ]
    },
    {
      "full_name": "Utkarsh Small Finance Bank",
      "name": "Utkarsh-SF",
      "sender_UID": "90000241",
      "senders": [
        "UTKSPR",
        "UTKBNK"
      ]
    },
    {
      "full_name": "Bassein Catholic Co-operative Bank",
      "name": "Bassein CCB",
      "sender_UID": "90000242",
      "senders": [
        "BCCBNK"
      ]
    },
    {
      "full_name": "NSDL Payments Bank",
      "name": "NSDL Payments",
      "sender_UID": "90000243",
      "senders": [
        "NSDLPB"
      ]
    }
  ]

  export default senders;