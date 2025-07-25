import React, {useState} from 'react';
import s from "./PhoneCodesInput.module.css";


const PhoneCodesInput = ({value, onChange, setCode,error}) => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const [selectedPhonecode, setSelectedPhonecode] = useState({
        "co": "ad",
        "ph": "376",
        "na": "Andorra"
    })
    const [phoneNumber, setPhoneNumber] = useState("")
    const [phoneCode, setPhoneCode] = useState("")

    const phonecodes = [
        {
            "co": "au",
            "ph": "61",
            "na": "Australia"
        },
        {
            "co": "at",
            "ph": "43",
            "na": "Austria"
        },
        {
            "co": "az",
            "ph": "994",
            "na": "Azerbaijan"
        },
        {
            "co": "ax",
            "ph": "35818",
            "na": "Aland Islands"
        },
        {
            "co": "al",
            "ph": "355",
            "na": "Albania"
        },
        {
            "co": "dz",
            "ph": "213",
            "na": "Algeria"
        },
        {
            "co": "ai",
            "ph": "1264",
            "na": "Anguilla"
        },
        {
            "co": "ao",
            "ph": "244",
            "na": "Angola"
        },
        {
            "co": "ad",
            "ph": "376",
            "na": "Andorra"
        },
        {
            "co": "ag",
            "ph": "1268",
            "na": "Antigua and Barbuda"
        },
        {
            "co": "mo",
            "ph": "853",
            "na": "Macao"
        },
        {
            "co": "ar",
            "ph": "54",
            "na": "Argentina"
        },
        {
            "co": "am",
            "ph": "374",
            "na": "Armenia"
        },
        {
            "co": "aw",
            "ph": "297",
            "na": "Aruba"
        },
        {
            "co": "af",
            "ph": "93",
            "na": "Afghanistan"
        },
        {
            "co": "bs",
            "ph": "1242",
            "na": "Bahamas"
        },
        {
            "co": "bd",
            "ph": "880",
            "na": "Bangladesh"
        },
        {
            "co": "bb",
            "ph": "1246",
            "na": "Barbados"
        },
        {
            "co": "bh",
            "ph": "973",
            "na": "Bahrain"
        },
        {
            "co": "by",
            "ph": "375",
            "na": "Belarus"
        },
        {
            "co": "bz",
            "ph": "501",
            "na": "Belize"
        },
        {
            "co": "be",
            "ph": "32",
            "na": "Belgium"
        },
        {
            "co": "bj",
            "ph": "229",
            "na": "Benin"
        },
        {
            "co": "bm",
            "ph": "1441",
            "na": "Bermuda"
        },
        {
            "co": "bg",
            "ph": "359",
            "na": "Bulgaria"
        },
        {
            "co": "bo",
            "ph": "591",
            "na": "Bolivia"
        },
        {
            "co": "bq",
            "ph": "599",
            "na": "Bosnia and Herzegovina"
        },
        {
            "co": "ba",
            "ph": "387",
            "na": "Bosnia"
        },
        {
            "co": "bw",
            "ph": "267",
            "na": "Botswana"
        },
        {
            "co": "br",
            "ph": "55",
            "na": "Brazil"
        },
        {
            "co": "io",
            "ph": "246",
            "na": "British Indian Ocean Territory"
        },
        {
            "co": "vg",
            "ph": "1284",
            "na": "British Virgin Islands"
        },
        {
            "co": "bn",
            "ph": "673",
            "na": "Brunei"
        },
        {
            "co": "bf",
            "ph": "226",
            "na": "Burkina Faso"
        },
        {
            "co": "bi",
            "ph": "257",
            "na": "Burundi"
        },
        {
            "co": "bt",
            "ph": "975",
            "na": "Bhutan"
        },
        {
            "co": "vu",
            "ph": "678",
            "na": "Vanuatu"
        },
        {
            "co": "va",
            "ph": "379",
            "na": "Vatican"
        },
        {
            "co": "gb",
            "ph": "44",
            "na": "Great Britain"
        },
        {
            "co": "hu",
            "ph": "36",
            "na": "Hungary"
        },
        {
            "co": "ve",
            "ph": "58",
            "na": "Venezuela"
        },
        {
            "co": "vi",
            "ph": "1340",
            "na": "Virgin Islands (US)"
        },
        {
            "co": "um",
            "ph": "1",
            "na": "Minor Outlying Islands (USA)"
        },
        {
            "co": "tl",
            "ph": "670",
            "na": "East Timor"
        },
        {
            "co": "vn",
            "ph": "84",
            "na": "Vietnam"
        },
        {
            "co": "ga",
            "ph": "241",
            "na": "Gabon"
        },
        {
            "co": "ht",
            "ph": "509",
            "na": "Haiti"
        },
        {
            "co": "gy",
            "ph": "592",
            "na": "Guyana"
        },
        {
            "co": "gm",
            "ph": "220",
            "na": "Gambia"
        },
        {
            "co": "gh",
            "ph": "233",
            "na": "Ghana"
        },
        {
            "co": "gp",
            "ph": "590",
            "na": "Guadeloupe"
        },
        {
            "co": "gt",
            "ph": "502",
            "na": "Guatemala"
        },
        {
            "co": "gn",
            "ph": "224",
            "na": "Guinea"
        },
        {
            "co": "gw",
            "ph": "245",
            "na": "Guinea-Bissau"
        },
        {
            "co": "de",
            "ph": "49",
            "na": "Germany"
        },
        {
            "co": "gi",
            "ph": "350",
            "na": "Gibraltar"
        },
        {
            "co": "hn",
            "ph": "504",
            "na": "Honduras"
        },
        {
            "co": "hk",
            "ph": "852",
            "na": "Hong Kong"
        },
        {
            "co": "gd",
            "ph": "1473",
            "na": "Grenada"
        },
        {
            "co": "gl",
            "ph": "299",
            "na": "Greenland"
        },
        {
            "co": "gr",
            "ph": "30",
            "na": "Greece"
        },
        {
            "co": "ge",
            "ph": "995",
            "na": "Georgia"
        },
        {
            "co": "gu",
            "ph": "1671",
            "na": "Guam"
        },
        {
            "co": "dk",
            "ph": "45",
            "na": "Denmark"
        },
        {
            "co": "cd",
            "ph": "243",
            "na": "Democratic Republic of the Congo"
        },
        {
            "co": "dj",
            "ph": "253",
            "na": "Djibouti"
        },
        {
            "co": "dm",
            "ph": "1767",
            "na": "Dominica"
        },
        {
            "co": "do",
            "ph": "1809",
            "na": "Dominican Republic"
        },
        {
            "co": "eg",
            "ph": "20",
            "na": "Egypt"
        },
        {
            "co": "zm",
            "ph": "260",
            "na": "Zambia"
        },
        {
            "co": "zw",
            "ph": "263",
            "na": "Zimbabwe"
        },
        {
            "co": "il",
            "ph": "972",
            "na": "Israel"
        },
        {
            "co": "in",
            "ph": "91",
            "na": "India"
        },
        {
            "co": "id",
            "ph": "62",
            "na": "Indonesia"
        },
        {
            "co": "jo",
            "ph": "962",
            "na": "Jordan"
        },
        {
            "co": "iq",
            "ph": "964",
            "na": "Iraq"
        },
        {
            "co": "ir",
            "ph": "98",
            "na": "Iran"
        },
        {
            "co": "ie",
            "ph": "353",
            "na": "Ireland"
        },
        {
            "co": "is",
            "ph": "354",
            "na": "Iceland"
        },
        {
            "co": "es",
            "ph": "34",
            "na": "Spain"
        },
        {
            "co": "it",
            "ph": "39",
            "na": "Italy"
        },
        {
            "co": "ye",
            "ph": "967",
            "na": "Yemen"
        },
        {
            "co": "kz",
            "ph": "7",
            "na": "Kazakhstan"
        },
        {
            "co": "ky",
            "ph": "1345",
            "na": "Cayman islands"
        },
        {
            "co": "kh",
            "ph": "855",
            "na": "Cambodia"
        },
        {
            "co": "cm",
            "ph": "237",
            "na": "Cameroon"
        },
        {
            "co": "ca",
            "ph": "1",
            "na": "Canada"
        },
        {
            "co": "qa",
            "ph": "974",
            "na": "Qatar"
        },
        {
            "co": "ke",
            "ph": "254",
            "na": "Kenya"
        },
        {
            "co": "cy",
            "ph": "357",
            "na": "Cyprus"
        },
        {
            "co": "kg",
            "ph": "996",
            "na": "Kyrgyzstan"
        },
        {
            "co": "ki",
            "ph": "686",
            "na": "Kiribati"
        },
        {
            "co": "cn",
            "ph": "86",
            "na": "China"
        },
        {
            "co": "cc",
            "ph": "61",
            "na": "Cocos Islands"
        },
        {
            "co": "co",
            "ph": "57",
            "na": "Colombia"
        },
        {
            "co": "km",
            "ph": "269",
            "na": "Comoros"
        },
        {
            "co": "cg",
            "ph": "242",
            "na": "Congo"
        },
        {
            "co": "kp",
            "ph": "850",
            "na": "Democratic People's Republic of Korea"
        },
        {
            "co": "cr",
            "ph": "506",
            "na": "Costa Rica"
        },
        {
            "co": "ci",
            "ph": "225",
            "na": "Ivory Coast"
        },
        {
            "co": "cu",
            "ph": "53",
            "na": "Cuba"
        },
        {
            "co": "kw",
            "ph": "965",
            "na": "Kuwait"
        },
        {
            "co": "cw",
            "ph": "599",
            "na": "Curacao"
        },
        {
            "co": "la",
            "ph": "856",
            "na": "Laos"
        },
        {
            "co": "lv",
            "ph": "371",
            "na": "Latvia"
        },
        {
            "co": "ls",
            "ph": "266",
            "na": "Lesotho"
        },
        {
            "co": "lr",
            "ph": "231",
            "na": "Liberia"
        },
        {
            "co": "lb",
            "ph": "961",
            "na": "Lebanon"
        },
        {
            "co": "ly",
            "ph": "218",
            "na": "Libya"
        },
        {
            "co": "lt",
            "ph": "370",
            "na": "Lithuania"
        },
        {
            "co": "li",
            "ph": "423",
            "na": "Liechtenstein"
        },
        {
            "co": "lu",
            "ph": "352",
            "na": "Luxembourg"
        },
        {
            "co": "mu",
            "ph": "230",
            "na": "Mauritius"
        },
        {
            "co": "mr",
            "ph": "222",
            "na": "Mauritania"
        },
        {
            "co": "mg",
            "ph": "261",
            "na": "Madagascar"
        },
        {
            "co": "yt",
            "ph": "262",
            "na": "Mayotte"
        },
        {
            "co": "mk",
            "ph": "389",
            "na": "Macedonia"
        },
        {
            "co": "mw",
            "ph": "265",
            "na": "Malawi"
        },
        {
            "co": "my",
            "ph": "60",
            "na": "Malaysia"
        },
        {
            "co": "ml",
            "ph": "223",
            "na": "Mali"
        },
        {
            "co": "mv",
            "ph": "960",
            "na": "Maldives"
        },
        {
            "co": "mt",
            "ph": "356",
            "na": "Malta"
        },
        {
            "co": "ma",
            "ph": "212",
            "na": "Morocco"
        },
        {
            "co": "mq",
            "ph": "596",
            "na": "Martinique"
        },
        {
            "co": "mh",
            "ph": "692",
            "na": "Marshall Islands"
        },
        {
            "co": "mx",
            "ph": "52",
            "na": "Mexico"
        },
        {
            "co": "fm",
            "ph": "691",
            "na": "micronesia"
        },
        {
            "co": "mz",
            "ph": "258",
            "na": "Mozambique"
        },
        {
            "co": "md",
            "ph": "373",
            "na": "Moldova"
        },
        {
            "co": "mc",
            "ph": "377",
            "na": "Monaco"
        },
        {
            "co": "mn",
            "ph": "976",
            "na": "Mongolia"
        },
        {
            "co": "ms",
            "ph": "1664",
            "na": "Montserrat"
        },
        {
            "co": "mm",
            "ph": "95",
            "na": "Myanmar"
        },
        {
            "co": "na",
            "ph": "264",
            "na": "Namibia"
        },
        {
            "co": "nr",
            "ph": "674",
            "na": "Nauru"
        },
        {
            "co": "np",
            "ph": "977",
            "na": "Nepal"
        },
        {
            "co": "ne",
            "ph": "227",
            "na": "Niger"
        },
        {
            "co": "ng",
            "ph": "234",
            "na": "Nigeria"
        },
        {
            "co": "nl",
            "ph": "31",
            "na": "Netherlands"
        },
        {
            "co": "ni",
            "ph": "505",
            "na": "Nicaragua"
        },
        {
            "co": "nu",
            "ph": "683",
            "na": "Niue"
        },
        {
            "co": "nz",
            "ph": "64",
            "na": "New Zealand"
        },
        {
            "co": "nc",
            "ph": "687",
            "na": "New Caledonia"
        },
        {
            "co": "no",
            "ph": "47",
            "na": "Norway"
        },
        {
            "co": "ae",
            "ph": "971",
            "na": "UAE"
        },
        {
            "co": "om",
            "ph": "968",
            "na": "Oman"
        },
        {
            "co": "nf",
            "ph": "672",
            "na": "Norfolk Island"
        },
        {
            "co": "cx",
            "ph": "61",
            "na": "Christmas Island"
        },
        {
            "co": "bl",
            "ph": "590",
            "na": "Saint Bartholomew Island"
        },
        {
            "co": "mf",
            "ph": "590",
            "na": "Saint Martin's Island"
        },
        {
            "co": "sh",
            "ph": "290",
            "na": "Saint Helena"
        },
        {
            "co": "cv",
            "ph": "238",
            "na": "Cape Verde"
        },
        {
            "co": "ck",
            "ph": "682",
            "na": "Cook Islands"
        },
        {
            "co": "tc",
            "ph": "1649",
            "na": "Turks and Caicos Islands"
        },
        {
            "co": "wf",
            "ph": "681",
            "na": "Wallis and Futuna Islands"
        },
        {
            "co": "pk",
            "ph": "92",
            "na": "Pakistan"
        },
        {
            "co": "pw",
            "ph": "680",
            "na": "Palau"
        },
        {
            "co": "ps",
            "ph": "970",
            "na": "Palestinian territories"
        },
        {
            "co": "pa",
            "ph": "507",
            "na": "Panama"
        },
        {
            "co": "pg",
            "ph": "675",
            "na": "Papua New Guinea"
        },
        {
            "co": "py",
            "ph": "595",
            "na": "Paraguay"
        },
        {
            "co": "pe",
            "ph": "51",
            "na": "Peru"
        },
        {
            "co": "pn",
            "ph": "870",
            "na": "Pitcairn"
        },
        {
            "co": "pl",
            "ph": "48",
            "na": "Poland"
        },
        {
            "co": "pt",
            "ph": "351",
            "na": "Portugal"
        },
        {
            "co": "pr",
            "ph": "1787",
            "na": "Puerto Rico"
        },
        {
            "co": "kr",
            "ph": "82",
            "na": "The Republic of Korea"
        },
        {
            "co": "re",
            "ph": "262",
            "na": "Mayotte"
        },
        {
            "co": "ru",
            "ph": "7",
            "na": "Russian Federation"
        },
        {
            "co": "rw",
            "ph": "250",
            "na": "Rwanda"
        },
        {
            "co": "ro",
            "ph": "40",
            "na": "Romania"
        },
        {
            "co": "sv",
            "ph": "503",
            "na": "Salvador"
        },
        {
            "co": "ws",
            "ph": "685",
            "na": "Samoa"
        },
        {
            "co": "sm",
            "ph": "378",
            "na": "San Marino"
        },
        {
            "co": "st",
            "ph": "239",
            "na": "Sao Tome and Principe"
        },
        {
            "co": "sa",
            "ph": "966",
            "na": "Saudi Arabia"
        },
        {
            "co": "sz",
            "ph": "268",
            "na": "Swaziland"
        },
        {
            "co": "mp",
            "ph": "1670",
            "na": "Northern Mariana Islands"
        },
        {
            "co": "sc",
            "ph": "248",
            "na": "Seychelles"
        },
        {
            "co": "pm",
            "ph": "508",
            "na": "Saint Pierre and Miquelon"
        },
        {
            "co": "sn",
            "ph": "221",
            "na": "Senegal"
        },
        {
            "co": "vc",
            "ph": "1784",
            "na": "Saint Vincent and the Grenadines"
        },
        {
            "co": "kn",
            "ph": "1869",
            "na": "Saint Kitts and Nevis"
        },
        {
            "co": "lc",
            "ph": "1758",
            "na": "Saint Lucia"
        },
        {
            "co": "rs",
            "ph": "381",
            "na": "Serbia"
        },
        {
            "co": "sg",
            "ph": "65",
            "na": "Singapore"
        },
        {
            "co": "sx",
            "ph": "599",
            "na": "Sint Maarten"
        },
        {
            "co": "sy",
            "ph": "963",
            "na": "Syrian Arab Republic"
        },
        {
            "co": "sk",
            "ph": "421",
            "na": "Slovakia"
        },
        {
            "co": "si",
            "ph": "386",
            "na": "Slovenia"
        },
        {
            "co": "us",
            "ph": "1",
            "na": "United States"
        },
        {
            "co": "sb",
            "ph": "677",
            "na": "Solomon islands"
        },
        {
            "co": "so",
            "ph": "252",
            "na": "Somalia"
        },
        {
            "co": "sd",
            "ph": "249",
            "na": "Sudan"
        },
        {
            "co": "sr",
            "ph": "597",
            "na": "Suriname"
        },
        {
            "co": "sl",
            "ph": "232",
            "na": "Sierra Leone"
        },
        {
            "co": "tj",
            "ph": "992",
            "na": "Tajikistan"
        },
        {
            "co": "th",
            "ph": "66",
            "na": "Thailand"
        },
        {
            "co": "tw",
            "ph": "886",
            "na": "Taiwan\n"
        },
        {
            "co": "tz",
            "ph": "255",
            "na": "Tanzania"
        },
        {
            "co": "tg",
            "ph": "228",
            "na": "Togo"
        },
        {
            "co": "tk",
            "ph": "690",
            "na": "Tokelau"
        },
        {
            "co": "to",
            "ph": "676",
            "na": "Tonga"
        },
        {
            "co": "tt",
            "ph": "1868",
            "na": "\nTrinidad and Tobago"
        },
        {
            "co": "tv",
            "ph": "688",
            "na": "Tuvalu"
        },
        {
            "co": "tn",
            "ph": "216",
            "na": "Tunisia"
        },
        {
            "co": "tm",
            "ph": "993",
            "na": "Turkmenistan"
        },
        {
            "co": "tr",
            "ph": "90",
            "na": "Turkey"
        },
        {
            "co": "ug",
            "ph": "256",
            "na": "Uganda"
        },
        {
            "co": "uz",
            "ph": "998",
            "na": "Uzbekistan"
        },
        {
            "co": "ua",
            "ph": "380",
            "na": "Ukraine"
        },
        {
            "co": "uy",
            "ph": "598",
            "na": "Uruguay"
        },
        {
            "co": "fo",
            "ph": "298",
            "na": "Faroe Islands"
        },
        {
            "co": "fj",
            "ph": "679",
            "na": "Fiji"
        },
        {
            "co": "ph",
            "ph": "63",
            "na": "Philippines"
        },
        {
            "co": "fi",
            "ph": "358",
            "na": "Finland"
        },
        {
            "co": "fk",
            "ph": "500",
            "na": "Falkland Islands"
        },
        {
            "co": "fr",
            "ph": "33",
            "na": "France"
        },
        {
            "co": "gf",
            "ph": "594",
            "na": "French guiana"
        },
        {
            "co": "pf",
            "ph": "689",
            "na": "French polynesia"
        },
        {
            "co": "hr",
            "ph": "385",
            "na": "Croatia"
        },
        {
            "co": "cf",
            "ph": "236",
            "na": "Central African Republic"
        },
        {
            "co": "td",
            "ph": "235",
            "na": "Chad"
        },
        {
            "co": "me",
            "ph": "382",
            "na": "Montenegro"
        },
        {
            "co": "cz",
            "ph": "420",
            "na": "Czech"
        },
        {
            "co": "cl",
            "ph": "56",
            "na": "Chile"
        },
        {
            "co": "ch",
            "ph": "41",
            "na": "Switzerland"
        },
        {
            "co": "se",
            "ph": "46",
            "na": "Sweden"
        },
        {
            "co": "lk",
            "ph": "94",
            "na": "Sri Lanka"
        },
        {
            "co": "ec",
            "ph": "593",
            "na": "Ecuador"
        },
        {
            "co": "gq",
            "ph": "240",
            "na": "Equatorial Guinea"
        },
        {
            "co": "er",
            "ph": "291",
            "na": "Eritrea"
        },
        {
            "co": "ee",
            "ph": "372",
            "na": "Estonia"
        },
        {
            "co": "et",
            "ph": "251",
            "na": "Ethiopia"
        },
        {
            "co": "za",
            "ph": "27",
            "na": "South Africa"
        },
        {
            "co": "ss",
            "ph": "211",
            "na": "South Sudan"
        },
        {
            "co": "jm",
            "ph": "1876",
            "na": "Jamaica"
        },
        {
            "co": "jp",
            "ph": "81",
            "na": "Japan"
        }
    ]

    const onSelectPhonecode = async (phoneItem) => {
        setSelectedPhonecode(phoneItem)
        setPhoneCode(phoneItem.ph)
        setCode(phoneItem)
    }


    return (
        <div className={s.input_name_block}>

            <div className={s.phoneInputWrapper}>
                <div className={s.mySelect} onClick={() => {
                    setIsDropdownVisible(prevState => !prevState)
                }}>
                    {selectedPhonecode
                        ? <div className={s.selectedBlock}>

                            <img src={require(`../../assets/img/flags/28/${selectedPhonecode?.co}.png`)} alt=""
                                 className={s.flag}/>
                            <img className={isDropdownVisible ? s.arrowReverse : s.arrow} width={9} height={5}
                                 src={require('../../assets/img/inputArrow.png')} alt=""/>
                            <span className={s.selectedPhonecode}>+ {selectedPhonecode.ph}</span>
                        </div>
                        : <div></div>}

                    <div className={isDropdownVisible ? s.optionsWrapper : s.none}>
                        {
                            phonecodes.map((phoneItem) => <div className={s.option}
                                                               key={phoneItem.co}
                                                               onClick={() => {
                                                                   onSelectPhonecode(phoneItem)
                                                               }}>
                                <div className={s.countryName}>
                                    <img src={require(`../../assets/img/flags/28/${phoneItem.co}.png`)} alt=""
                                         className={s.flag}/>
                                    <div>
                                        {phoneItem.na}
                                    </div>
                                </div>
                                <div> +{phoneItem.ph}</div>
                            </div>)
                        }
                    </div>

                </div>
                <input className={error ? `${s.my_input} ${s.error}`: `${s.my_input}`}
                       type="text"
                       value={value}
                       onChange={(e) => {
                           onChange(e)
                       }}
                />
            </div>
        </div>
    );
};

export default PhoneCodesInput;
