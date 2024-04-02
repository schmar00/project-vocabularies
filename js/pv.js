//******************************************************************************************************
//*****START********************************************************************************************

let USER_LANG = 'en';
let BASE = location.protocol + '//' + location.host + location.pathname;

$(document).ready(function () {
    let vocProjects = new Map(); //key of vocProjects is identical with URI path!
    addVocProj(vocProjects); //-> var assigned in projects.js
    let urlParams = new URLSearchParams(window.location.search);

    insertSearchCard('search_widget'); //inserts search widget only

    if (urlParams.has('search')) {
        search(decodeURI(urlParams.get('search')), vocProjects);

    } else if (urlParams.has('uri')) {
        let baseURIs = ['https://data.geoscience.earth/ncl/geoera', 'https://voc.europe-geology.eu'];
        let uri = decodeURI(urlParams.get('uri').replace(/["';><]/gi, '')); //avoid injection
        let voc_uri = uri.includes(baseURIs[0]) != uri.includes(baseURIs[1]); //true for geoscience.earth or europe-geology
        $('#pageContent').empty();
        details('pageContent', uri, voc_uri);
        if (voc_uri) {
            insertProjCards('proj_links', vocProjects, uri.includes(baseURIs[0])?uri.split('\/')[5]:uri.split('\/')[3]);
        }

    } else {
        insertPageDesc(); //general intro
        insertVocDesc(vocProjects, 'proj_desc');
        $('#proj_links').append(`<hr><div style="text-align:center;"><strong>latest projects</strong></div><hr>`);
        insertProjCards('proj_links', vocProjects);   
    }
    initSearch(); //provides js for fuse search
});



//********set the title of PV homepage********************************************************************

function insertPageDesc() {

    $('#page_desc').append(`<br><h1 id="title"><span style="color: lightgray;">project</span> Vocabularies</h1>`);//&nbsp;&nbsp;<img src="img/egdi.png" style="height: 40px;"></h1>`);
    $('#page_desc').append('<h5>EGDI - European Geological Data Infrastructure</h5>');
    $('#page_desc').append(`<p>project-specific, created during the project, scientific knowledge concepts, 
    used to annotate datasets and webservices, semantically modeled, downloadable/reusable RDF files, published as Linked Open Data, 
    and possibly drafts for future standards</p>`);
}

//*********************descriptions insert of vocabularies for the start page******************************

function insertVocDesc(vocProjects, divID) { 
    let query = encodeURIComponent(`PREFIX dcterms:<http://purl.org/dc/terms/>
PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
PREFIX prov:<https://www.w3.org/TR/prov-o/#>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX adms:<http://www.w3.org/ns/adms#>
SELECT ?cs ?csl ?D ?date ?stat
(COUNT(DISTINCT ?c) AS ?count) (COUNT(DISTINCT ?x) AS ?new) 
(GROUP_CONCAT(DISTINCT ?N; separator = "|") as ?authors)
(GROUP_CONCAT(DISTINCT ?ref; separator = "|") as ?isRefBy)
(GROUP_CONCAT(DISTINCT ?L; separator = "|") as ?topConcepts)
WHERE {
    ?cs skos:hasTopConcept ?tc; dcterms:title ?csl; 
    dcterms:created ?date; dcterms:description ?D; adms:status ?stat . 
    FILTER(lang(?D)="en")
    ?tc skos:narrower* ?c; skos:prefLabel ?tcl . FILTER(lang(?csl)="en")
    FILTER(lang(?tcl)="en")
    BIND(CONCAT(STR(?tcl),"$",STR(?tc)) AS ?L)
    OPTIONAL{?cs prov:qualifiedAttribution ?ctr . ?ctr foaf:lastName ?n 
    BIND(CONCAT(STR(?ctr),"§",?n) AS ?N)}
    OPTIONAL {?cs dcterms:isReferencedBy ?ref}
    OPTIONAL{BIND(?c AS ?x) FILTER(STRSTARTS(STR(?c), STR(?cs)))}
} GROUP BY ?cs ?csl ?date ?D ?stat
ORDER BY ?cs`);
    
    fetch(ENDPOINT + '?query=' + query + '&Accept=application%2Fsparql-results%2Bjson')
                                    
        .then(res => res.json())
        .then(jsonData => { //console.log(jsonData);
            for (let [key, value] of vocProjects.entries()) {
                let uri_path = new RegExp(key);
                jsonData.results.bindings.filter(item => uri_path.test(item.cs.value)).forEach(function (item) {
                    let tc = item.topConcepts.value.split('|'); 
                    tc.sort(); //console.log(item);
                    let topConcepts = tc.map(a => `<a href="${BASE}?uri=${a.split('$')[1]}&lang=${USER_LANG}">${a.split('$')[0]}</a>`).join(', ');
                    $('#' + divID).append(`
                    <div class="card bg-light mb-4" style="">
                        <div class="card-body" style="font-size: 1rem; background: #f8f8f8;">
                            <h4><strong>${item.csl.value}</strong> (${value.acronym})</h4>
                        
                            <div style="">
                                ${item.D.value}<br>
                                <strong>Top concepts:</strong> ${topConcepts}
                            </div>
                        </div>
                        <div class="card-footer text-muted" style="font-size: smaller; background: white;">
                            <strong>Concepts:</strong> ${item.count.value}
                            ${(item.new.value!=item.count.value)?('('+ (parseInt(item.count.value) - parseInt(item.new.value)) + ' reused)'):''}
                            &nbsp;&nbsp;&nbsp;
                            <strong><a href="http://purl.org/dc/terms/issued">Issued:</a></strong> ${item.date.value.split('T')[0]}
                            &nbsp;&nbsp;&nbsp;
                            <strong><a href="https://www.w3.org/TR/prov-o/#qualifiedAttribution">Edited by:</a></strong> ${doiLinks(item.authors.value)}
                            <br>
                            <strong><a href="http://www.w3.org/ns/adms#status">Status:</a></strong> <a href="${item.stat.value}">${doiLinks(item.stat.value.replace('http://purl.org/spar/pso/',''))}</a>
                            &nbsp;&nbsp;&nbsp;
                            <strong><a href="http://purl.org/dc/terms/isReferencedBy">Referenced by:</a></strong> ${doiLinks(item.isRefBy.value)}
                            &nbsp;&nbsp;&nbsp;
                            <strong>Download:</strong> 
                            <a href="javascript:rdfCS('${item.cs.value}')" title="RDF download">RDF</a>, 
                            <a href="tbl.html?uri=${item.cs.value}" title="table view" target="_blank">HTML</a>
                        </div>
                    </div>`);
                });
            }
            $('.progress-bar').css('width', '100%').attr('aria-valuenow', 100);
            setTimeout(() => {$('.progress').hide();}, 300);
        });
}

function doiLinks(a) {
    //https://doi.org/10.5281/zenodo.10057197|https://doi.org/10.13140/RG.2.2.35909.52968
    a = a == undefined ? '' : a;
    if (a.includes('§')) { //create <a>
        return a.split('|').map(a => `<a href="${a.split('§')[0]}" target="_blank">${a.split('§')[1]}</a>`).join(', ')
    } else {
         return a.split('|').map(a => a.includes('zenodo') ? `<a href="${a}" target="_blank">zenodo</a>` : a)
        .map(a => a.includes('egu') ? `<a href="${a}" target="_blank">EGU</a>` : a)
        .map(a => a.includes('RG') ? `<a href="${a}" target="_blank">ResearchGate</a>` : a)
        .map(a => a.includes('researchgate') ? `<a href="${a}" target="_blank">ResearchGate</a>` : a)
        .map(a => a.includes('orcid') ? `<a href="${a}" target="_blank">ORCID</a>` : a)
        .join(', ')
    }
}

function rdfCS(v) { //create concept scheme RDF for download IN PROGRESS
    $('#other_desc').append(`<form id="irdfForm" target="_blank" style="display:none;" method="post" action="${ENDPOINT}">
                            <input type="hidden" name="query" id="irdfQuery"/>
                            </form>`);
    document.getElementById('irdfQuery').value = `PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                CONSTRUCT {?s ?p ?o} 
                WHERE {
                select distinct ?s ?p ?o
                where { 
                VALUES ?v {<${v}>} #a skos:ConceptScheme
                ?v skos:hasTopConcept ?tc . ?tc skos:narrower* ?n
                    {?v ?p ?o BIND(?v as ?s)}
                    UNION
                    {?tc ?p ?o BIND(?tc as ?s)}
                    UNION
                    {?n ?p ?o BIND(?n as ?s)}
                } 
                }`;
//"CONSTRUCT {?s ?p ?o} WHERE {VALUES ?s {" + v + "} ?s ?p ?o}";
    document.getElementById('irdfForm').submit();
}

//***********************set the input box for concept search****************************************

function insertSearchCard(widgetID) {

    $('#searchInput').keydown(function (e) {
        if (e.which == 13 && $('#searchInput').val().length > 0) {
            openSearchList('search=' + encodeURI($('#searchInput').val()));
            $('#dropdown').empty();
            $('#searchInput').val('');
        }
    });

    $('#searchBtn').click(function (e) { //provide search results
        if ($('#searchInput').val().length > 0) {
            openSearchList('search=' + encodeURI($('#searchInput').val()));
            $('#dropdown').empty();
            $('#searchInput').val('');
        }
    });

    $('#searchInput').focusout(function () {
        $('#dropdown').delay(300).hide(0, function () {
            $('#dropdown').empty();
            $('#searchInput').val('');
        });
    });

    let timer;
    $('#searchInput').on('input', function () {
        clearTimeout(timer);
        $('#dropdown').empty();
        timer = setTimeout(function () {
            if ($('#searchInput').val().length > 0) {
                $('#dropdown').show();
                let autoSuggest = window.fuse.search($('#searchInput').val());
                let c = [];
                $.each(autoSuggest.slice(0, 10), function (index, value) {
                    c.push(value.L.value)
                });
                $.each(autoSuggest.slice(0, 10), function (index, value) {
                    let entry = value.L.value;
                    if (c.indexOf(entry) !== c.lastIndexOf(entry)) {
                        entry = entry + ' <span class="addVoc">(' + value.s.value.split('\/')[5] + ')</span>';
                    }
                    $('#dropdown').append('<tr><td class="searchLink dropdown-item" onclick="document.location.href = \'' + BASE + '?uri=' + value.s.value + '&lang=' + USER_LANG + '\';">' + entry + '</td></tr>');
                });
            }
        }, 200);
    });
}

//**********************the initial sparql query to build the fuse (trie) object - stored in window*****************************

function initSearch() {

    let query = encodeURIComponent(`PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
                                    PREFIX dcterms:<http://purl.org/dc/terms/>
                                    PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                                    SELECT ?s ?L
                                    WHERE {
                                    VALUES ?p {skos:prefLabel skos:altLabel}
                                    ?s a skos:Concept; ?p ?lEN . FILTER(lang(?lEN)="en")
                                    FILTER(!regex(str(?lEN), "\\\\["))
                                    FILTER NOT EXISTS {?s rdf:type dcterms:BibliographicResource}
                                    OPTIONAL{?s ?p ?l . FILTER(lang(?l)="${USER_LANG}")}
                                    BIND(COALESCE(?l, ?lEN) AS ?L)
                                    }
                                    ORDER BY STRLEN(STR(?L)) ?L`);

    fetch(ENDPOINT + '?query=' + query + '&Accept=application%2Fsparql-results%2Bjson')
        .then(res => res.json())
        .then(jsonData => {
            const options = {
                shouldSort: true,
                tokenize: true,
                keys: ['L.value']
            };
            window.fuse = new Fuse(jsonData.results.bindings, options);
        });
}

//********************set the page for search results************************************************

function openSearchList(queryString) { //zB 'info=disclaimer'
    window.open(BASE + '?' + queryString + '&lang=' + USER_LANG, '_self', '', 'false');
}


function sparqlEncode(str) {
    var hex, i;
    str = str.toLowerCase();
    var result = "";
    for (i = 0; i < str.length; i++) {
        hex = str.charCodeAt(i);
        if (hex < 32 || hex > 128)
            result += "\\u" + ("000" + hex.toString(16)).slice(-4);
        else
            result += str.charAt(i);
    }

    return result
}



//************************perform the search for a term typed in the inputbox************************

function search(searchText, vocProjects) {
    let HITS_SEARCHRESULTS = '0 results for ';
    $('#pageContent').empty();
    $('#pageContent').append('<br><h1>Search results</h1><p id="hits" class="lead">' + HITS_SEARCHRESULTS +
        '\"' + searchText + '\"</p><hr><ul id="searchresults" class="searchresults"></ul>');
    $('#searchresults').bind("DOMSubtreeModified", function () {
        $('#hits').html(HITS_SEARCHRESULTS.replace('0', $('#searchresults li').length) + '\"' + searchText + '\"');
    });

    //NEU*******************************
    let query = encodeURIComponent(`PREFIX dcterms:<http://purl.org/dc/terms/>
                                    PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
                                    SELECT DISTINCT ?s ?title ?text
                                    WHERE {
                                    VALUES ?n {"${sparqlEncode(searchText.toLowerCase())}"}
                                    VALUES ?p {skos:prefLabel skos:altLabel skos:definition skos:scopeNote dcterms:description}
                                    ?s a skos:Concept; ?p ?lEN . FILTER((lang(?lEN)="en"))
                                    OPTIONAL{?s ?p ?l . FILTER(lang(?l)="${USER_LANG}")}
                                    BIND(COALESCE(?l, ?lEN) AS ?L) . FILTER(regex(?L,?n,"i"))
                                    ?s skos:prefLabel ?plEN . FILTER((lang(?plEN)="en"))
                                    OPTIONAL{?s skos:prefLabel ?pl . FILTER(lang(?pl)="${USER_LANG}")}
                                    BIND(COALESCE(?pl, ?plEN) AS ?title)
                                    BIND(CONCAT(STR(?p),"|",STR(?L)) AS ?text)
                                    BIND(IF(?p=skos:prefLabel,1,2) AS ?sort)
                                    }
                                    ORDER BY ?sort
                                    LIMIT 100`);

    fetch(ENDPOINT + '?query=' + query + '&Accept=application%2Fsparql-results%2Bjson')
        .then(res => res.json())
        .then(jsonData => { //console.log(jsonData);
            jsonData.results.bindings.forEach(function (a) { // insert project name ${vocProjects.get(a.s.value.split('\/')[3]).acronym}
                let projName = '';
                try {
                    projName = '(' + vocProjects.get(a.s.value.split('\/')[3]).acronym + ')';
                } catch (e) {
                    //Catch Statement
                }

                $('#searchresults').append(`<li>
                                        <a href="${BASE}?uri=${a.s.value}&lang=${USER_LANG}">
                                            <strong>${a.title.value}</strong> ${projName}
                                        </a>
                                        <br>
                                        <span class="searchPropTyp">URI: </span>
                                        <span class="searchResultURI">
                                            ${a.s.value}
                                        </span>
                                        <br>
                                        <p class="searchResultText">
                                            ${createSearchResultsText(a.text.value, searchText)}
                                        </p>
                                        </li>`);
                if ($('#searchresults li').length > 99) {
                    $('#hits').prepend('>');
                }
            });

        }).catch(function (error) {
            //console.log(error);
        });
}

//***************************prepare the character string what is actually used to search***************************

function createSearchResultsText(sparqlText, searchText) {

    let searchText1 = searchText.toLowerCase();
    var regex1 = new RegExp(searchText1, "g");
    let searchText2 = searchText.charAt(0).toUpperCase() + searchText.slice(1);
    var regex2 = new RegExp(searchText2, "g");
    let resultText = '';

    for (let propPart of sparqlText.split('\$')) {
        resultText += propPart.split('|')[0].replace('http:\/\/www.w3.org\/2004\/02\/skos\/core#', '<span class="searchPropTyp">skos:').replace('http://purl.org/dc/terms/', '<span class="searchPropTyp">dcterms:') + '</span> - ';
        let textArr = propPart.split('|')[1].split('\. ');
        for (let i of textArr) {
            if (i.search(new RegExp(searchText, "i")) > -1) {
                resultText += i.replace(regex1, '<strong>' + searchText1 + '</strong>').replace(regex2, '<strong>' + searchText2 + '</strong>') + ' .. ';
            }
        }
        resultText += '<br>';
    }
    return resultText;
}

//**************************************************************************************
//*******definition of selected RDF properties******************************************

const n = {
    skos: 'http://www.w3.org/2004/02/skos/core#',
    dcterms: 'http://purl.org/dc/terms/',
    foaf: 'http://xmlns.com/foaf/0.1/',
    geo: 'http://www.w3.org/2003/01/geo/wgs84_pos#',
    owl: 'http://www.w3.org/2002/07/owl#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    dbpo: 'http://dbpedia.org/ontology/',
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    gc3d: 'https://data.geoscience.earth/def/geoconnect3d#',
    schema: 'https://schema.org/',
    geosparql: 'http://www.opengis.net/ont/geosparql#'
};

const PREF_LABEL = [n.skos + 'prefLabel'];
const REPLACES = [n.dcterms + 'replaces'];
const PICTURE = [n.foaf + 'depiction'];
const SYNONYMS = [n.skos + 'altLabel'];
const NOTATION = [n.skos + 'notation'];
const DESCRIPTION_1 = [n.skos + 'definition'];
const DESCRIPTION_2 = [n.rdf + 'type', n.dcterms + 'type', n.gc3d + 'unitType', n.gc3d + 'limitType', n.skos + 'inScheme', n.skos + 'scopeNote', n.dcterms + 'description', n.dcterms + 'abstract'];
const DESCRIPTION_3 = [n.skos + 'scopeNote'];
const CITATION = [n.dcterms + 'bibliographicCitation'];
const REF_LINKS = [n.dcterms + 'references'];
const RELATIONS_1 = [n.skos + 'broader', n.skos + 'narrower', n.skos + 'related'];
const RELATIONS_2 = [n.skos + 'exactMatch', n.skos + 'closeMatch', n.skos + 'relatedMatch', n.skos + 'broadMatch', n.skos + 'narrowMatch'];
const RELATIONS_3 = [n.dbpo + 'category', n.rdfs + 'seeAlso', n.owl + 'sameAs', n.dcterms + 'relation', n.dcterms + 'hasPart', n.dcterms + 'isPartOf', n.dcterms + 'conformsTo'];
const RELATIONS_EGDI = [n.gc3d + 'limitedBy', n.gc3d + 'limitTo', n.geosparql + 'sfTouches', n.geosparql + 'sfCrosses', n.geosparql + 'sfIntersects'];
const WEB_LINK = [n.dcterms + 'source', n.dcterms + 'isReferencedBy', n.dcterms + 'subject', n.dcterms + 'isRequiredBy', n.dcterms + 'identifier', n.foaf + 'isPrimaryTopicOf', n.schema + 'subjectOf', n.foaf + 'page', n.schema + 'hasMap'];
const ICONS = [n.foaf + 'isPrimaryTopicOf', n.schema + 'subjectOf', n.foaf + 'page', n.dcterms + 'isPartOf', n.dcterms + 'hasPart'];
const MAPS = [n.schema + 'hasMap'];
const appIcons = ['<i class="fab fa-twitter"></i>', '<i class="fas fa-blog"></i>', '<i class="fab fa-youtube"></i>', '<i class="fab fa-wikipedia-w"></i>'];
const VISUALIZATION = [n.dbpo + 'colourHexCode'];
const LOCATION = [n.geo + 'lat', n.geo + 'long', n.geo + 'location', n.dcterms + 'spatial'];
const CREATOR = [n.dcterms + 'creator', n.dcterms + 'contributor', n.dcterms + 'created', n.dcterms + 'modified'];

const FRONT_LIST = {
    prefLabel: PREF_LABEL,
    picture: PICTURE,
    altLabel: [...PREF_LABEL, ...SYNONYMS],
    notation: NOTATION,
    apps: ICONS,
    maps: MAPS,
    abstract: DESCRIPTION_1,
    scope: DESCRIPTION_3,
    citation: CITATION,
    relatedConcepts: [...RELATIONS_1, ...RELATIONS_2, ...RELATIONS_EGDI]
};
const TECHNICAL_LIST = {
    descriptions: [...REPLACES, ...NOTATION, ...PREF_LABEL, ...SYNONYMS, ...DESCRIPTION_1, ...DESCRIPTION_2],
    scientificReferences: [...CITATION, ...REF_LINKS],
    semanticRelations: [...RELATIONS_1, ...RELATIONS_2, ...RELATIONS_3],
    topologyRelations: [...RELATIONS_EGDI],
    seeAlso: [...WEB_LINK],
    images: [...PICTURE, ...VISUALIZATION],
    location: LOCATION,
    creator: CREATOR
};

function rdfTS(v) { //create RDF narrowers for download
    document.getElementById('irdfQuery').value = "CONSTRUCT {?s ?p ?o} WHERE {VALUES ?s {" + v + "} ?s ?p ?o}";
    document.getElementById('irdfForm').submit();
}



//************set the "details page" to view a single concept ***********************************************************************

function details(divID, uri, voc_uri) { //build the web page content
    $('#' + divID).append(`<form id="irdfForm" target="_blank" style="display:none;" method="post" action="${ENDPOINT}"><input type="hidden" name="query" id="irdfQuery"/></form>`);
    
    let query = encodeURIComponent(`PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX adms: <http://www.w3.org/ns/adms#>
        SELECT DISTINCT ?s ?p ?o (GROUP_CONCAT(DISTINCT CONCAT(STR(?L), "@", lang(?L)) ; separator="|") AS ?Label)
        (COUNT(distinct(?sr)) AS ?count) (GROUP_CONCAT(?source ; separator="|") AS ?pdf)
        #(IRI(STRBEFORE(STR(?s),(CONCAT("/",REPLACE(STR(?s), "^.*/([^/]*)$", "$1"))))) as ?x) only test
        (COALESCE(?stat,"") AS ?status)  
        WHERE {
        VALUES ?uri {<${uri}>}
        OPTIONAL{?new dcterms:replaces ?uri} BIND(COALESCE(?new,?uri) AS ?s)
        {?s ?p ?o .
        OPTIONAL {?o skos:prefLabel ?L}
        OPTIONAL {?o skos:narrower|skos:related ?sr}
        OPTIONAL {?o adms:status ?stat}
        }UNION{
        VALUES ?p {<http://purl.org/dc/terms/bibliographicCitation>}
        ?s ?x ?r . ?r ?p ?o
        OPTIONAL{?r <http://purl.org/dc/terms/source> ?source}
        }
        }
        GROUP BY ?s ?p ?o ?stat
        ORDER BY ?Label`);

    fetch(ENDPOINT + '?query=' + query + '&Accept=application%2Fsparql-results%2Bjson')
        .then(res => res.json())
        .then(jsonData => {
            //console.log(jsonData);

            if (jsonData.results.bindings.length > 1) {
                uri = jsonData.results.bindings[0].s.value;
                for (key in FRONT_LIST) createFrontPart(divID, uri, jsonData, Array.from(FRONT_LIST[key].values()), voc_uri);

                // RDF download icon added to apps (notation div or altLabel div)
                let r_links = jsonData.results.bindings.map(a => [a.p.value, '<' + a.o.value + '>']).filter(b => b[0] == REF_LINKS[0]).map(c => c[1]).join(' ');

                let r = `<span style="margin-right:7px;">
                            <a href="javascript:rdfTS('<${uri}> ${r_links}')" title="RDF download">
                                <i class="fas fa-cube"></i>
                            </a>
                        </span>
                        <span style="margin-right:15px;">
                            <a href="tbl.html?uri=${uri}" title="table view" target="_blank">
                                <i class="far fa-list-alt"></i>
                            </a>
                        </span>`;

                if ($('#appsInsert').length > 0) {
                    $('#appsInsert').append(r);
                } else if ($('#notation').length > 0) {
                    $('#notation').after('<div id="appsInsert" style="float:right;">' + r + '</div>');
                } else {
                    $('#altLabel').after('<div id="appsInsert" style="float:right;">' + r + '</div>');
                }

                let updateBtn = `<button class="btn btn-outline-primary btn-sm" id="editorLink" onclick="Editor.start();" style="position:absolute;top:0px;right:20px;"><i class="fas fa-pen"></i>&nbsp;&nbsp;edit texts</button>`;
                if (jsonData.results.bindings.map(a=>a.status.value).includes('http://purl.org/spar/pso/archived')) {
                    updateBtn = '';
                }
                
                $('#' + divID).append(`<hr>
                        <div style="cursor: pointer; color: #777;" id="detailsBtn"
                        onclick="javascript: toggleRead(\'detailsBtn\', \'detailsToggle\', \'read more\');"><i class="fas fa-caret-right fa-lg"></i><em>&nbsp;&nbsp;read more ..</em>
                        </div>
                        <div style="display:none;position: relative;" id="detailsToggle">
                        <br>
                        <table id="details"></table>
                        ${updateBtn}
                        </div>`);

                let mapCheckArr = jsonData.results.bindings.map(a => [a.p.value, a.o.value]);
                if (mapCheckArr.find(b => b[1] == 'https://voc.europe-geology.eu/hike/faults')) {
                    if (mapCheckArr.find(c => c[0] == 'http://www.w3.org/2004/02/skos/core#topConceptOf') == undefined) {
                        console.log('OK');
                        $('#appsInsert').append(`<span style="margin-right:15px; margin-left: -8px;">
                                                    <a href="hike_map.html?uri=${uri}" title="HIKE map" target="_blank">
                                                        <i class="fas fa-map-marked-alt"></i>
                                                    </a>
                                                </span>`);
                    }
                }


                for (key in TECHNICAL_LIST) createTechnicalPart('details', jsonData, Array.from(TECHNICAL_LIST[key].values()));
                $('#' + divID).append('');

                insertConceptBrowser(divID, uri, 50);

            } else if (uri == 'https://data.geoscience.earth/ncl/geoera/keyword') {
                //alert(uri);
                window.location.href = 'https://github.com/GeoEra-GIP/WP4-Semantics/blob/master/Keyword%20Thesaurus/GeoERA-Keyword-Thesaurus_v21.zip';

            } else if (uri.indexOf('keyword') > 0) {
                //alert(uri);
                window.location.href = 'https://schmar00.github.io/keyword/?uri=' + uri;

            } else if (uri.indexOf('https://data.geoscience.earth/ncl/geoera') == 0) {
                //console.log(uri);
                //console.log('javascript:window.location.href = BASE;');
                window.location.href = BASE;

            } else {
                console.log(uri);
                $('#' + divID).append(`<hr><div class="alert alert-dismissible alert-warning">
                          <button type="button" class="close" data-dismiss="alert">&times;</button>
                          <h4 class="alert-heading">Can´t open the page!</h4>
                          <p class="mb-0">404 Resource Not Found<br>${uri}</p>
                        </div>`);
            }
        });
}

//************************toggle the hidden details / because HTML5 is not fully supported by MS Edge**************

function toggleRead(divBtn, divTxt, text) {
    let txt = $('#' + divTxt).is(':visible') ? '<i class="fas fa-caret-right fa-lg"></i><em>&nbsp;&nbsp;' + text + ' ..</em>' : '<i class="fas fa-caret-down fa-lg"></i><em>&nbsp;&nbsp;' + text + ' ..</em>';
    $('#' + divBtn).html(txt);
    $('#' + divTxt).slideToggle();
}

//*************create the upper part of details page - always visible *********************************************************************

function createFrontPart(divID, uri, data, props, voc_uri) {

    let sourceLinks = data.results.bindings.map(a => [a.pdf.value, a.o.value]).filter(b => b[0].length > 0);
    //console.log(sourceLinks);

    let html = '';
    let pL = '';
    let uris4rdf = '<' + uri + '>';
    //console.log(data);
    //let hyperlinksAbstract = []; //HotLime hyperlinked description texts
    props.forEach((i) => {
        let ul = getObj(data, i); //console.log(i, ul);
        if (ul.size > 0) {
            switch (key) {
                case 'prefLabel':
                    //console.log(ul);
                    pL = setUserLang(Array.from(ul).join('|').replace(/  <span class="lang">/g, '@').replace(/<\/span>/g, ''));
                    html += `<h1 id="prefLabel" class="mt-4${(!voc_uri?` text-muted`:'')}">${pL}</h1>`;

                    html += `<p class="${(!voc_uri?' text-muted">':'">')}
                        <a id="uriBtn"
                            href="javascript:
                            var dummy = $('<input>').val('${uri}').appendTo('body').select();
                            document.execCommand('copy');
                            dummy.remove();"><strong>URI:</strong>
                        </a>
                        <span id="uri" style="word-wrap: break-word;">
                            &nbsp;${uri}
                        </span>
                        ${(!voc_uri?'&nbsp;&nbsp;&nbsp;<a title="external URI" href="' + uri + '"><i class="fas fa-external-link-alt uriImp"></i></a>':'')}
                    </p>
                    <hr>`; //console.log(pL);
                    break;
                case 'altLabel':
                    html += '<ul id="altLabel" class="' + key + '"><li>' + Array.from(ul).join('</li><li>') + '</li></ul>';
                    break;
                case 'notation':
                    $('#' + divID).append('<hr><span></span>');
                    html += '<ul id="notation" class="' + key + '"><li>Notation:</li><li>' + Array.from(ul).join('</li><li>') + '</li></ul>';
                    break;
                case 'apps':
                    html += '<div style="float:right;" id="appsInsert">';

                    for (let i of ul) { //inserted by string occurrence in url
                        let iconExists = false;
                        for (let j of appIcons) {
                            let tag = j.split('-')[1].split('\"')[0];
                            if (i.search(tag) > -1) {
                                html += `<span style="margin-right: 5px;">
                                            <a title="${tag}" href="${i.split('\"')[1]}">${j}</a>
                                        </span>`;
                                iconExists = true;
                            }
                        }
                        if (!iconExists) {
                            html += `<span style="margin-right: 5px;">
                                    <a>${i.split('>')[0]+'><i class="fas fa-paperclip"></i></a>'}
                                </span>`;
                        }
                    }
                    html += `</div>`;
                    break;
                case 'maps':
                    html += '<div style="float:right;" id="mapsInsert">';
                    for (let i of ul) {
                        html += `<span style="margin: 5px;">
                                    ${i.split('>')[0]+'><i style="" class="fas fa-map"></i></a>'}
                                </span>`;
                    }
                    html += `</div>`;
                    break;
                case 'abstract':
                    html += '<hr><div class="' + key + '">' + setUserLang(Array.from(ul).join('|').replace(/  <span class="lang">/g, '@').replace(/<\/span>/g, '')) + '</div>';
                    break;
                case 'scope':
                    //console.log(ul);
                    //html += '<br><p class="text-secondary">Interpretation: ' + setUserLang(Array.from(ul).join('|').replace(/  <span class="lang">/g, '@').replace(/<\/span>/g, '')) + '</p>';
                    html += '<br><p class="text-secondary">Interpretation:<br>' + Array.from(ul).map(a => a.split('<')[0]).join('<br><br>') + '</p>';
                    break;
                case 'citation':
                    let a = []; //console.log(ul);
                    for (let i of ul) {
                        let pdf = '';
                        for (let k of sourceLinks) {
                            if (k[1] + '  ' === i) {
                                pdf = `<a href="${k[0]}">&nbsp;<i class="fas fa-sm fa-external-link-alt"></i></a>`;
                            }
                        }
                        a.push(i.replace('\:', ':<cite title="Source Title">') + '</cite>' + pdf);
                    }
                    html += '<br><footer class="blockquote-footer">' + Array.from(a).join('</footer><footer class="blockquote-footer">') + '</footer>';
                    break;
                case 'relatedConcepts':

                    if (html.search('<h4') == -1) {
                        html += '<hr><h4 style="margin-bottom: 1rem;">Concept relations</h4>';
                    }
                    //hyperlinksAbstract = hyperlinksAbstract.concat(Array.from(ul).map(a => a.split('</a>')[0].split('href="')[1].split('&lang=en">')));
                    html += '<table><tr><td class="skosRel' + i.search('Match') + ' skosRel">' + i.replace(n.skos, '').replace(n.gc3d, '').replace(n.geosparql, '') + '</td><td class="skosRelUl"><ul><li>' + shortenText(Array.from(ul).join('</li><li>')) + '</li></ul></td></tr></table>';

                    //hyperlinksAbstract = hyperlinksAbstract.sort((a, b) => b[1].length - a[1].length);
                    //console.log(hyperlinksAbstract);
                    break;
                case 'picture':
                    insertImage(Array.from(ul).map(a => a.split('\"')[1]), 'image_links');
                    break;
            }
        }
    });
    $('#' + divID).append(html);


}


function insertImage(links, divID) {
    links.forEach((i) => {
        let capt = i.split('\/').pop().split('.')[0].replace(/_/g, ' ').replace(/%20/g, ' ');
        $('#' + divID).append(`
                <div class="card my-4">
                    <div class="card-body">
                        <figure>
                            <a href="${i}">
                              <img class="img-fluid" src="${i}" alt="Chania" title="">
                              <figcaption>${capt}</figcaption>
                            </a>
                        </figure>
                    </div>
                </div>`);
    });
}

//*******************replace long URIs by acronyms************************************************************************

function shortenText(htmlText) {

    let abbrev = {
        INSPIRE: 'http://inspire.ec.europa.eu/codelist/',
        INSPIRE: 'http://inspire.ec.europa.eu/featureconcept/',
        CGI: 'http://resource.geosciml.org/classifier/cgi/',
        CGI: 'http://resource.geosciml.org/classifier/cgi/faulttype/',
        ICS: 'http://resource.geosciml.org/classifier/ics/',
        DBpedia: 'http://dbpedia.org/resource/',
        nlDBpedia: 'http://nl.dbpedia.org/resource/',
        BGS: 'http://data.bgs.ac.uk/id/EarthMaterialClass/',
        WIKIDATA: 'http://www.wikidata.org/entity/',
        GBA: 'http://resource.geolba.ac.at/',
        GeoConnect3D: 'https://data.geoscience.earth/ncl/geoera/geoconnect3d/',
        GeoERA: 'https://data.geoscience.earth/ncl/geoera/',
        BGR: 'https://vocabulary.bgr.de/'
    };
    for (let i in abbrev) {
        htmlText = htmlText.split('>' + abbrev[i]).map(a => a.replace('<', ` (${i})<`)).join('>').replace(` (${i})`, '');
    }
    return htmlText;
}

//******************create the hidden part of concept descriptions ***********************************************************************

function createTechnicalPart(divID, data, props) { //loop all single properties
    let html = '';
    let geoPath = 'http://www.w3.org/2003/01/geo/wgs84_pos#';
    let coord = {};

    props.forEach((i) => {
        let ul = getObj(data, i); //console.log(ul);
        if (ul.size > 0) {
            html += '<tr><td class="propTech">' + createHref(i) + '</td><td><ul><li>' + shortenText(Array.from(ul).join('</li><li>')) + '</li></ul></td></tr>';

            if (i == geoPath + 'lat') {
                coord.lat = Number(ul.values().next().value);
            }
            if (i == geoPath + 'long') {
                coord.long = Number(ul.values().next().value);
            }
        }
    });

    if (html.length > 0) {
        $('#' + divID).append(`
                    <tr id="${key}">
                        <th></th>
                        <th>
                            ${key}
                        </th>
                    </tr>
                    <tr>
                        ${html}
                    </tr>`);
    }
}
//******************transform the sparql json query result into a set of HTML elements like <a> *************************************

function getObj(data, i) { //console.log(data, i);
    return new Set($.map(data.results.bindings.filter(item => item.p.value === i), (a => (a.Label.value !== '' ? '<a href="' + BASE +
        '?uri=' + a.o.value + '&lang=' + USER_LANG + '">' + setUserLang(a.Label.value) + '</a> ' + ' ' + addPlusSign(a.count['value']) : createHref(a.o.value) + ' ' + createDTLink(a.o.datatype) + ' ' + langTag(a.o['xml:lang'])))));
}

//*******************count of further concepts if > 0*******************
function addPlusSign(x) {
    if (x == "0") {
        x = '';
    } else {
        x = `<span class="plusSign">(${x})</span>`; //cycled plus for narrower concepts
    }




    //console.log(x);
    return x;
}

//*******************prepare HTML links for browsing the vocabulary***************************************************

function createHref(x) {
    if (x.substring(0, 4) == 'http') {
        let a = x;
        for (const [key, value] of Object.entries(n)) a = a.replace(value, key + ':');
        x = '<a href="' + x + '">' + a.replace(/_/g, ' ') + '</a>';
    }
    return x;
}

//*******************create beautiful language tags*******************************************************************

function langTag(x) {
    if (typeof x !== 'undefined') {
        x = '<span class="lang">' + x + '</span>';
    } else {
        x = '';
    }
    return x;
}

//********************create beautiful xsd data format tags******************************************************************************

function createDTLink(x) {
    if (typeof x !== 'undefined') {
        if (x.indexOf('XMLSchema') > 0) {
            x = '<a class="datatype" href="' + x + '">' + x.replace('http://www.w3.org/2001/XMLSchema#', 'xsd:') + '</a>';
        }
    } else {
        x = '';
    }
    return x;
}

//********************select the adequate language *********************************************************************

function setUserLang(x) {
    if (x.indexOf('@' + USER_LANG) > 0) {
        return x.substr(0, x.indexOf('@' + USER_LANG)).split('|').slice(-1).pop();
    } else if (x.indexOf('@en') > 0) {
        return x.substr(0, x.indexOf('@en')).split('|').slice(-1).pop();
    } else if (x.indexOf('@') > 0) {
        return x.substr(0, x.indexOf('@')).split('|').slice(-1).pop();
    } else {
        return x.split('|')[0];
    }
}

//********************************************************************************************************
//************************insert the corresponding vocabulary description*********************************

function insertProjCards(divID, projects, p) {
    if (projects.has(p)) {
        //console.log(p);
        iPC(projects.get(p), divID, false);
    } else {
        for (let project of projects.values()) {
            iPC(project, divID, true);
        }
    }
}

//***************************get the corresponding vocabulary description********************************

function iPC(project, divID, startPage) {
    let rdf_dl = project.rdf_download.map(a => `<a href="${'rdf/' + a}">${a.split('.')[1].toUpperCase()}</a>`).join(', ')

    if (startPage) {
        $('#' + divID).append(`
                <div class="">
                    
                    <div class="">
                    <strong>${project.acronym} - </strong>${project.title}
                        <div class="text-muted" style="font-size: smaller; margin-top: 5px;">
                            <strong>Website:</strong>
                            <a title="website" href="${project.project_page}"><i class="fas fa-external-link-alt uriImp"></i></a>&nbsp;&nbsp;
                            <strong>Download:</strong> ${rdf_dl}
                        </div>
                    </div>
                    <hr>
                </div>`);
    } else {
        $('#' + divID).append(`
                <div class="card my-4">
                    <h5 class="card-header">
                        <strong>${project.acronym}</strong><small> - ${project.title}</small>
                    </h5>
                    <div class="card-body">
                        ${project.description.slice(0, 490)}..<br>
                        <div class="text-muted" style="margin-top: 5px;">
                            <strong>Website:</strong>
                            <a title="website" href="${project.project_page}"><i class="fas fa-external-link-alt uriImp"></i></a>&nbsp;&nbsp;
                            <strong>Download:</strong> ${rdf_dl}
                        </div>
                    </div>
                </div>`);
    }
}

//*******************************************************************************************************
//***************create a bootstrap card with all concept links within a concept scheme******************

function insertConceptBrowser(divID, uri, offset) {

    $('#' + divID).append(`
        <hr>
        <div class="card my-4">
            <ul id="coBr" class="pagination mb-4 cardHeaderRight" style="margin-top: -3px;">
                <li>
                    <button type="button" id="leftBtn" class="btn btn-outline-dark btn-sm" onclick="provideAll('allConcepts', '${uri}', Number(this.value)-50)">
                        <i class="fas fa-caret-left fa-lg"></i>
                    </button>
                </li>
                <li>
                    <button type="button" id="rightBtn" class="btn btn-outline-dark btn-sm" onclick="provideAll('allConcepts', '${uri}', Number(this.value)+50)">
                        <i class="fas fa-caret-right fa-lg"></i>
                    </button>
                </li>
            </ul>
            <h5 id="allConceptsHeader" class="card-header"></h5>
            <div id="allConcepts" class="card-body"></div>
        </div>`);
    provideAll('allConcepts', uri, 0);
}
//*******************the query to provide all concept links within a concept scheme****************************************************

function provideAll(divID, uri, offset) { //provide all available concepts for navigation

    let query = encodeURIComponent(`PREFIX dcterms:<http://purl.org/dc/terms/>
                                    PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
                                    SELECT DISTINCT ?c (COALESCE(?l, ?lEN) AS ?Label) (COALESCE(?csl, ?cslEN) AS ?Title)
                                    (COALESCE(?csd, ?csdEN, "") AS ?Desc) (EXISTS{?cs skos:hasTopConcept ?c} AS ?isTopConcept)
                                    WHERE {
                                    ?cs a skos:ConceptScheme; skos:hasTopConcept ?tc; dcterms:title ?cslEN . FILTER(lang(?cslEN)="en") .
                                    <${uri}> skos:broader* ?tc . ?cs skos:hasTopConcept ?tc2 .
                                    ?c skos:broader* ?tc2; skos:prefLabel ?lEN . FILTER(lang(?lEN)="en")
                                    OPTIONAL {?c skos:prefLabel ?l . FILTER(lang(?l)="${USER_LANG}")}
                                    OPTIONAL {?cs dcterms:title ?csl . FILTER(lang(?csl)="${USER_LANG}")}
                                    OPTIONAL {?cs dcterms:description ?csd . FILTER(lang(?csd)="${USER_LANG}")}
                                    OPTIONAL {?cs dcterms:description ?csdEN . FILTER(lang(?csdEN)="en")}
                                    }
                                    ORDER BY ?Label
                                    LIMIT 50
                                    OFFSET ${offset}`);

    fetch(ENDPOINT + '?query=' + query + '&Accept=application%2Fsparql-results%2Bjson')
        .then(res => res.json())
        .then(jsonData => {
            let a = [];
            $('#' + divID).append('');
            $('#allConceptsHeader').html(jsonData.results.bindings[0].Title.value + ' (' + Number(offset + 1) + ' .. ' + Number(offset + jsonData.results.bindings.length) + ')');
            $('#allConcepts').empty();
            $('#allConcepts').append('<div>' + jsonData.results.bindings[0].Desc.value.slice(0, 400) + '.. </div><br>');

            jsonData.results.bindings.forEach((i) => {
                if (i.isTopConcept.value == 'true') {
                    a.push('<a href="' + BASE + '?uri=' + i.c.value + '&lang=' + USER_LANG + '"><strong>' + i.Label.value + '</strong></a> (top concept)');
                } else {
                    a.push('<a href="' + BASE + '?uri=' + i.c.value + '&lang=' + USER_LANG + '">' + i.Label.value + '</a>');
                }
            });
            if (offset !== 0) {
                $('#allConcepts').append('.. ');
            }
            $('#allConcepts').append(a.join(', '));

            document.getElementById("leftBtn").value = offset;
            document.getElementById("rightBtn").value = offset;
            if (document.getElementById("leftBtn").value == "0") {
                $('#leftBtn').prop('disabled', true);
                if (Object.keys(jsonData.results.bindings).length < 50) {
                    $("#coBr").hide();
                }
            } else {
                $('#leftBtn').prop('disabled', false);
            }
            if (Object.keys(jsonData.results.bindings).length < 50) {
                $('#rightBtn').prop('disabled', true);
            } else {
                $('#rightBtn').prop('disabled', false);
                $('#allConcepts').append(' ...');
            }
        });
}

//***********************************************************************************************************
//********************************END************************************************************************