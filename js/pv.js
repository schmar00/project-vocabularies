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
            //console.log('uri', uri, );
            let uriArr = uri.split('/');
            if (uriArr[4]=='faults') {
                let hikeData = ["1065","1069","1070","1071","1072","1073","1074","1076","1077","1078","1079","1081","1086","1087","1088","1089","1090","1091","1092","1093","1094","1095","1096","1097","1098","1099","1100","1101","1102","1103","1105","1106","1107","1108","1110","1111","1113","1114","1115","1116","1117","1118","1122","1123","1124","1125","11257","11258","11259","11260","11261","11262","11263","11264","11265","11266","11267","11268","11269","11270","11271","11272","11273","11274","11275","11276","11277","11278","11279","11280","11281","11282","11283","11284","11285","11286","11287","11288","11289","11290","11291","11292","11293","11294","11295","11296","11297","11298","11299","11300","11301","11302","11303","11304","11305","11306","11307","11308","11309","11310","11311","11312","11313","11314","11315","11316","11317","11318","11319","11320","11321","11322","11323","11325","11326","11327","11328","11329","11330","11331","11332","11333","11334","11335","11336","11337","11338","11339","11340","11341","11342","11343","11344","11345","11346","11347","11348","11349","11350","11351","11352","11353","11354","11355","11356","11357","11358","11359","11360","11361","11362","11363","11365","11366","11367","11368","11369","11370","11371","11372","11373","11374","11375","11376","11377","11378","11379","11380","11381","11382","11383","11384","11385","11386","11387","11388","11389","11390","11391","11392","11393","11394","11395","11396","11397","11398","11399","11400","11401","11402","11403","11404","11405","11406","11407","11408","11409","11410","11411","11412","11413","11414","11415","11416","11417","11418","11419","11420","11421","11422","11423","11424","11426","11427","11428","11429","11430","11431","11432","11433","11434","11435","11436","11437","11438","11439","11440","11441","11442","11443","11444","11445","11446","11447","11448","11449","11450","11451","11452","11453","11454","11455","11456","11457","11458","11459","11460","11461","11462","11463","11464","11465","11466","11467","11468","11469","11470","11471","11472","11473","11474","11475","11476","11477","11478","11479","11481","11482","11483","11484","11485","11486","11487","11488","11489","11490","11491","11492","11493","11494","11495","11496","11497","11498","11499","11500","11501","11502","11503","11504","11505","11506","11507","11508","11509","11510","11511","11512","11513","11514","11515","11516","11517","11518","11519","11520","11521","11522","11523","11524","11525","11526","11527","11528","1176","1177","1178","1179","1180","1181","1182","1183","1184","1185","1186","1187","1189","1190","1191","1192","1193","1194","1195","1196","1197","1198","1199","1200","1201","1202","1203","1204","1205","1206","1207","1208","1209","1210","1211","1212","1213","1214","1215","1216","1217","1218","1219","1220","1221","1222","1223","1224","1225","1226","1227","1228","1229","1230","1231","1232","1233","1234","1235","1236","1237","1238","12424","12425","12426","12429","3445","3446","3447","3448","3449","3451","3452","3454","3455","3456","3457","3460","3461","3462","3463","3464","3465","3466","3467","3468","3469","3470","3471","3472","3473","3474","3475","3476","3477","3478","3479","3482","3483","3484","3485","3486","3487","3488","3489","3490","3491","3492","3493","3495","3496","3497","3499","3500","3501","3502","3503","3504","3505","3506","3507","3508","3509","3510","3511","3513","3514","3515","3516","3517","3518","3519","3520","3521","3522","3523","3524","3525","3526","3527","3528","3529","3530","3531","3532","3533","3534","3535","3536","3537","3538","3539","3540","3541","3542","3543","3544","3545","3546","3547","3548","3549","3550","3551","3552","3553","3554","3555","3556","3557","3558","3559","3560","3561","3562","3563","3564","3565","3566","3567","3568","3569","3570","3571","3572","3573","3574","3575","3576","3577","3578","3579","3580","3581","3582","3583","3584","3585","3586","3587","3588","3589","3590","3591","3592","3593","3594","3595","3596","3597","3598","3599","3600","3601","3602","3603","3604","3605","3606","3607","3610","3611","3612","3613","3614","3615","3616","3617","3618","3619","3620","3621","3622","3623","3624","3625","3626","3628","3629","3630","3631","3632","3633","3634","3635","3636","3637","3638","3639","3640","3641","3642","3643","3644","3645","3646","3647","3648","3649","3650","3651","3652","3653","3654","3655","3656","3657","3658","3659","3660","3661","3662","3663","3664","3665","3666","3667","3668","3669","3670","3671","3672","3673","3674","3675","3676","3677","3678","3679","3680","3681","3682","3683","3684","3685","3686","3687","3688","3689","3690","3691","3692","3693","3694","3695","3696","3697","3698","3699","3700","3701","3702","3703","3704","3705","3706","3707","3708","3709","3710","3711","3714","3715","3716","3717","3718","3719","3720","3721","3722","3725","3726","3727","3728","3729","3730","3731","3732","3733","3734","3735","3736","3737","3738","3739","3740","3741","3742","3743","3744","3754","3755","3756","3757","3758","3759","3760","3761","3762","3763","3764","3766","3767","3769","3770","3771","3772","3773","3775","3776","3779","3780","3781","3782","3783","3784","3785","3786","3787","3788","3790","3792","3793","3794","3795","3796","3797","3798","3799","3800","3801","3802","3803","3804","3805","3806","3807","3808","3809","3810","3811","3812","3813","3814","3815","3818","3819","3820","3821","3822","3823","3824","3825","3826","3827","3828","3829","3830","3831","3832","3833","3834","3835","3836","3837","3838","3839","3840","3841","3842","3843","3844","3845","3846","3847","3848","3849","3850","3851","3852","3853","3854","3855","3856","3857","3858","3859","3860","3861","3862","3863","3864","3865","3866","3867","3868","3869","3870","3871","3872","3873","4337","4339","4340","4341","4342","4345","4346","4348","4349","4350","4351","4352","4354","4355","4356","4357","4359","4361","4362","4364","4365","4366","4367","4369","4370","4372","4373","4376","4377","4378","4379","4380","4381","4382","4383","4384","4385","4386","4387","4388","4389","4390","4391","4392","4393","4394","4395","4396","4397","4398","4400","4401","4402","4403","4405","4406","4407","4408","4409","4410","4411","4412","4413","4414","4415","4416","4418","4419","4420","4421","4423","4425","4427","4428","4429","4430","4431","4432","4434","4435","4436","4438","4439","4440","4441","4443","4444","4445","4446","4447","4449","4450","4451","4452","4453","4454","4455","4456","4457","4458","4459","4461","4462","4464","4465","4466","4468","4469","4470","4471","4472","4473","4474","4475","4476","4477","4478","4479","4480","4481","4482","4483","4485","4486","4487","4488","4489","4490","4492","4493","4494","4495","4496","4497","4499","4500","4501","4502","4503","4505","4506","4507","4508","4509","4510","4520","4523","4524","4526","4527","4529","4530","4532","4534","4535","4536","4539","4540","4541","4542","4544","4545","4547","4548","4551","4552","4553","4555","4556","4558","4559","4561","4562","4564","4565","4567","4568","4570","4571","4573","4574","4576","4577","4579","4580","4581","4582","4583","4586","4587","4589","4590","4592","4593","4595","4596","4598","4599","4601","4602","4603","4611","4612","4613","4621","4622","4623","4624","4625","4626","4628","4629","4630","4631","4632","4633","4634","4635","4636","4637","4638","4639","4640","4641","4642","4643","4644","4645","4646","4647","4648","4649","4650","4651","4652","4653","4654","4655","4656","4657","4658","4659","4660","4661","4663","4664","4665","4666","4667","4668","4669","4670","4671","4672","4673","4674","4675","4676","4677","4678","4679","4680","4681","4682","4685","4686","4688","4689","4691","4692","4693","4694","4695","4696","4697","4698","4699","470","4700","4701","4702","4703","4704","4705","4706","4707","4708","4709","471","4710","4711","4712","4713","4714","4715","4716","4718","4719","4720","4721","4722","4724","4725","4729","473","4730","4731","4732","4733","4734","4735","4736","4737","4738","4739","474","4740","4741","4742","4743","4744","4745","4746","4747","4748","4749","4750","4751","4752","4753","4754","4755","4756","4757","4758","4759","4760","4761","4762","4763","4764","478","4802","4804","4805","4806","4809","482","484","485","487","492","494","495","496","499","503","504","506","509","510","511","515","516","520","521","524","526","527","532","533","537","538","539","540","542","544","545","546","547","549","551","552","554","555","557","559","560","562","563","565","566","570","572","573","574","575","576","577","578","579","581","583","584","588","592","593","594","595","596","597","598","600","601","604","605","607","608","610","611","6118","6119","612","6120","6121","6122","6123","6124","6125","6126","6127","6128","6129","613","6130","6131","6132","6133","6134","6136","6137","6139","6140","6141","6142","6143","6144","6145","6146","6147","6149","615","6150","6151","6152","6153","6154","6155","6157","6158","6159","6160","6162","6163","6164","6165","6167","6168","6169","6170","6171","6172","6173","6174","6175","6176","6177","6178","6179","618","6180","6181","6182","6183","6184","6185","6186","6187","6188","6189","6190","6191","6192","6193","6194","6195","6196","6197","6198","6199","6200","6201","6202","6203","6204","6205","6206","6207","6208","6209","6210","6211","6212","6213","6214","6215","6216","6217","6218","6219","622","6220","6221","6222","6223","6224","6225","6226","6227","6228","6229","6230","6231","6233","6234","6235","6236","6237","6238","6239","624","6240","6241","6242","6243","6244","6245","6246","6247","6248","6249","625","6250","6251","6252","6253","6254","626","627","628","629","630","632","633","634","6354","636","637","641","642","643","645","646","647","648","649","650","651","652","7015","7017","7018","7019","7020","7021","7023","7025","7026","7027","7028","7029","7030","7031","7033","7034","7036","7037","7038","7039","7040","7041","7042","7043","7044","7045","7046","7047","7048","7049","7050","7051","7052","7053","7054","7055","7056","7057","7059","7060","7062","7063","7064","7065","7067","7068","7069","7070","7071","7072","7073","7074","7075","7077","7078","7079","7080","7081","7082","7083","7084","7085","7086","7087","7090","7091","7092","7093","7095","7097","7098","7099","7100","7101","7102","7103","7104","7105","7106","7108","7109","7111","7112","7114","7115","7116","7119","7121","7122","7123","7125","7126","7128","7130","7132","7133","7134","7135","7136","7137","7139","7140","7142","7143","7146","7147","7148","7152","7156","7157","7158","7163","7245","7254","7430","7440","7716","7720","7722","7724","7728","7729","7735","7736","7749","7757","7776","7777","7778","7781","7791","7793","7795","7796","7798","7802","7803","7810","7813","7815","7816","7817","7822","7826","7827","7828","7833","7834","7835","7840","7842","8234","8235","8236","8237","8238","8239","8240","8241","8242","8243","8244","8245","8246","8247","8248","8249","8250","8251","8252","8253","8254","8256","8257","8258","8259","8260","8261","8262","8263","8264","8265","8266","8267","8268","8269","8270","8271","8273","8274","8283","8284","8285","8286","8287","8288","8289","8290","8291","8292","8293","8294","8295","8296","8297","8298","8299","8300","8301","8302","8303","8304","8305","8306","8307","8308","8309","8311","8312","8314","8315","8316","8317","8318","8322","8323","8324","8325","8326","8327","8328","8329","8330","8331","8332","8333","8334","8335","8337","8338","8340","8341","8342","8343","8344","8345","8346","8347","8348","8349","8350","8351","8352","8353","8354","8355","8357","8359","8360","8543","8544","8545","8546","8547","8548","8549","8550","8552","8553","8554","8555","8556","8557","8558","8560","8561","8562","8563","8564","8565","8566","8567","8568","8569","8715","8718","8789","879","8790","8791","8792","8793","8794","8795","8796","8797","8798","8799","880","8800","8801","8802","8803","8804","8806","8808","8809","881","8811","8812","8813","8814","8815","8816","8817","8819","882","8820","8821","8822","8823","8824","8826","8827","8828","883","8830","8831","8832","8833","8834","8835","8836","8837","8838","8839","884","8840","8841","8842","8844","8845","8846","8847","8848","8849","885","8850","8851","8853","8855","8856","8857","8858","8859","886","8861","8862","8863","8864","8865","8867","8869","887","8872","8873","8874","8875","8877","8878","8879","8880","8882","8883","8885","8886","8888","8889","8891","8892","8893","8894","8895","8896","8898","8899","890","8904","8907","8909","891","8910","8913","8917","8918","8919","8920","8923","8924","8925","8926","8927","893","8930","8931","8932","8933","8934","8935","8936","8937","8939","894","8940","8941","8942","8944","8945","8948","8949","895","8950","8951","8953","8954","8955","8957","8958","8959","8961","8962","8963","8967","8969","897","8970","8971","8972","8973","8974","8975","8976","8977","8978","8979","898","8980","8981","8982","8983","8984","8985","9001","9006","9008","9018","9020","9022","9023","9025","9026","9027","9029","9030","9031","9032","9033","9034","9037","9038","9040","9041","9042","9043","9045","9046","9047","9048","9050","9056","9059","9062","9063","9066","9067","9068","9072","9078","9085","9086","9087","9090","9091","9092","9093","9094","9095","9098","9099","9100","9101","9105","9106","9107","9114","9116","9118","9130","9132","9133","9134","9138","9139","9140","9141","9142","9143","9144","9145","9146","9147","9148","9149","9150","9151","9152","9153","9154","9155","9156","9157","9158","9159","9161","9162","9163","9164","9165","9166","9167","9168","9169","9170","9171","9172","9173","9174","9178","9183","9185","9186","9187","9188","9189","9190","9191","9192","9193","9194","9197","9200","9201","9202","9203","9205","9206","9208","9209","9211","9212","9213","9215","9216","9217","9218","9222","9223","9224","9225","9226","9229","9232","9233","9237","9239","9240","9243","9248","9249","9251","9252","9264","9266","9272","9277","9283","9286","9290","9291","9298","9303","9304","9306","9307","9314","9318","9319","9320","9324","9326","9327","9328","9329","9344","9345","9346","9347","9348","9349","9350","9352","9354","9356","9357","9358","9359","9362","9363","9364","9365","9366","9367","9368","9376","9377","9379","945"];
                insertDataViewer(uri, hikeData);
            }

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
    geosparql: 'http://www.opengis.net/ont/geosparql#',
    prov: 'http://www.w3.org/ns/prov#'
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
const RELATIONS_EGDI = [n.gc3d + 'limitedBy', n.gc3d + 'limitTo', n.geosparql + 'sfTouches', n.geosparql + 'sfCrosses', n.geosparql + 'sfIntersects', n.prov + 'atLocation'];
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
                //console.log('narrower:', jsonData.results.bindings.filter(a => a.p.value == 'http://www.w3.org/2004/02/skos/core#narrower'));
                let r = `<span style="margin-right:7px;">
                            <a href="javascript:rdfTS('<${uri}> ${r_links}')" title="RDF download">
                                <i class="fas fa-cube"></i>
                            </a>
                        </span>`;

                if (jsonData.results.bindings.filter(a => a.p.value == 'http://www.w3.org/2004/02/skos/core#narrower').length > 0) {
                    r += `<span style="margin-right:3px;">
                            <a href="tbl.html?uri=${uri}" title="table view" target="_blank">
                                <i class="far fa-list-alt"></i>
                            </a>
                        </span>
                        <span style="margin-right:15px;">
                            <a href="diagram.html?uri=${uri}" title="table view" target="_blank">
                                <i class="fas fa-sitemap fa-rotate-270"></i>
                            </a>
                        </span>`;
                }
                

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
                        onclick="javascript: toggleRead(\'detailsBtn\', \'detailsToggle\', \'RDF statements\');"><i class="fas fa-caret-right fa-lg"></i><em>&nbsp;&nbsp;RDF statements</em>
                        </div>
                        <div style="display:none;position: relative;" id="detailsToggle">
                        <br>
                        <table id="details"></table>
                        ${updateBtn}
                        </div>`);
                //https://schmar00.github.io/HIKE/hike_map.html?uri=https://data.geoscience.earth/ncl/geoera/hike/faults/7495
                let mapCheckArr = jsonData.results.bindings.map(a => [a.p.value, a.o.value]);
                if (mapCheckArr.find(b => b[1] == 'https://voc.europe-geology.eu/hike/faults')) {
                    if (mapCheckArr.find(c => c[0] == 'http://www.w3.org/2004/02/skos/core#topConceptOf') == undefined) {
                        //console.log('mapCheckArr', mapCheckArr);
                        $('#appsInsert').append(`<span style="margin-right:15px; margin-left: -8px;">
                                                    <a href="https://schmar00.github.io/HIKE/hike_map.html?uri=${uri.replace('voc.europe-geology.eu','data.geoscience.earth/ncl/geoera')}" title="HIKE map" target="_blank">
                                                        <i class="fas fa-map-marked-alt"></i>
                                                    </a>
                                                </span>`);
                    }
                }
                //console.log('jsonData: ', jsonData.results.bindings);


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
    let txt = $('#' + divTxt).is(':visible') ? '<i class="fas fa-caret-right fa-lg"></i><em>&nbsp;&nbsp;' + text + '</em>' : '<i class="fas fa-caret-down fa-lg"></i><em>&nbsp;&nbsp;' + text + '</em>';
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
                    html += '<table><tr><td class="skosRel' + i.search('Match') + ' skosRel">' + i.replace(n.skos, '').replace(n.gc3d, '').replace(n.geosparql, '').replace(n.prov, '') + '</td><td class="skosRelUl"><ul><li>' + shortenText(Array.from(ul).join('</li><li>')) + '</li></ul></td></tr></table>';

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
        let capt = decodeURIComponent(i.split('\/').pop().split('.')[0]).replace(/_/g, ' ');
        $('#' + divID).append(`
                <div class="card my-4">
                    <div class="card-body">
                        <figure>
                            <a href="${i}">
                              <img class="img-fluid" src="${i}" alt="Chania" title="">
                              <figcaption>${i.indexOf('wikimedia')>0?'<img src="../img/wikimedia.png" alt="Wikimedia" height="12">':''} ${capt}</figcaption>
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
        //console.log(project);

        $('#' + divID).append(`
        <div class="card my-4">
            <h5 class="card-header">
                <strong>${project.acronym}</strong><small> - ${project.title}</small>
            </h5>
            <div class="card-body">
                ${project.description.slice(0, 490)}..<br>
                <div class="text-muted" style="margin-top: 5px;">
                    <strong>Website:</strong>
                    <a title="website" target="_blank" href="${project.project_page}"><i class="fas fa-external-link-alt uriImp"></i></a>&nbsp;&nbsp;
                    <strong>Download:</strong> ${rdf_dl}
                </div>
            </div>
        </div>`);                 

    }
}

function insertDataViewer(uri, hikeData){
    //<data-viewer ids="8568,8567" basemap-style="data-viz-white">
    let query = encodeURIComponent(`PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                SELECT (GROUP_CONCAT(DISTINCT(STRAFTER(STR(?o),'faults/')); separator=",") AS ?ids) 
                (GROUP_CONCAT(DISTINCT(?o); separator=",") AS ?uris)
                where {
                    VALUES ?s {<${uri}>}
                    ?s skos:narrower* ?o .
                } GROUP BY ?s`);

    fetch(ENDPOINT + '?query=' + query + '&Accept=application%2Fsparql-results%2Bjson')
        .then(res => res.json())
        .then(jsonData => {
            let ids = jsonData.results.bindings[0].ids.value;
            //console.log('ids: ', ids, hikeData.filter(x => ids.split(',').includes(x)));

            if (hikeData.filter(x => ids.split(',').includes(x)).length > 0){
                $('#' + 'egdi_maps').append(`
                <div class="card my-4">
                    <div class="card-body">
                        <div class="text-muted" style="margin-top: 5px;">
                                <div style="height: 250px;">
                                    <data-viewer uris="${jsonData.results.bindings[0].uris.value}" basemap-style="data-viz-white">
                                    </data-viewer>
                                </div>
                            <strong>maps.europe-geology.eu </strong>
                            <a title="EGDI Map Viewer" target="_blank" href="https://maps.europe-geology.eu/#baslay=baseMapGEUS&extent=-210215.9420289849,951005.7589626252,6557404.057971016,5142697.170099162&layers=hike_overview_layer">
                                <i class="fas fa-external-link-alt uriImp"></i>
                            </a>
                        </div>
                    </div>
                </div>`); 
            }
        });
}

//*******************************************************************************************************
//***************create a bootstrap card with all concept links within a concept scheme******************

function insertConceptBrowser(divID, uri, offset) {
    $('#' + divID).append(`
        <hr>
            <details id="conceptsList">
            <summary>
            <i class="fas fa-caret-right fa-lg caret"></i>
            <em id="allConceptsHeader" style="display:inline-block;"></em>
            </summary>
            <div id="allConcepts" class="card-body"></div>
            </details>
        <hr>
		`);

    provideAll('allConcepts', uri, 0);

    /* $('#' + divID).append(`
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
        </div>`); */
    provideAll('allConcepts', uri, 0);
}
//*******************the query to provide all concept links within a concept scheme****************************************************

function provideAll(divID, uri, offset) { //provide all available concepts for navigation
    let AT = "";
    let query = encodeURIComponent(`PREFIX dcterms:<http://purl.org/dc/terms/>
                                    PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
                                    PREFIX dbpo:<http://dbpedia.org/ontology/>
                                    SELECT DISTINCT 
                                    ?c (MIN(COALESCE(?l, ?lEN)) AS ?Label) (MIN(?t) AS ?Title) (MIN(?d) AS ?Desc) ?sColor
                                    (MIN(EXISTS{?cs skos:hasTopConcept ?c}) AS ?isTopConcept)
                                    WHERE {
                                    VALUES ?cs {<${uri.split('/').slice(0, -1).join('/')}>}
                                    ?cs skos:hasTopConcept ?tc; dcterms:title ?t . ?tc skos:narrower* ?c .
                                    ?c skos:prefLabel ?lEN . FILTER(lang(?lEN)="en") .
                                    FILTER(REGEX(STR(?c),STR(?cs))||!REGEX(STR(?c),'europe-geology|earth')) .  
                                    OPTIONAL {?c skos:prefLabel ?l . FILTER(lang(?l)="${USER_LANG}")}
                                    OPTIONAL {?cs dcterms:description ?d . FILTER(lang(?d)="en")}
                                    OPTIONAL {?c dbpo:colourHexCode ?sColor}
                                    } GROUP BY ?c ?sColor
                                    ORDER BY ?Label
                                    LIMIT 100
                                    OFFSET ${offset}`);

    fetch(ENDPOINT + '?query=' + query + '&Accept=application%2Fsparql-results%2Bjson')
        .then(res => res.json())
        .then(jsonData => {
            let data = jsonData; 
            var allConcepts = $('#allConcepts');
            let a = [];
            $('#' + divID).append('');
            if(data.results.bindings.length <1){
                console.log(data.results.bindings.length);
                $('#conceptsList').hide();
            } else if (offset == 0) {
                $('#allConceptsHeader').html(data.results.bindings[0].Title.value + ' (alphabetical list of concepts)');
                allConcepts.empty().append('<div class="allConceptsPerex">' + data.results.bindings[0].Desc.value.slice(0, 400) + '</div><br>');
                data.results.bindings.forEach((i) => {
                    let color = i.sColor && i.sColor.value ? ' style="background-color:' + i.sColor.value + ';" ' : '';
                      if (i.isTopConcept.value == 'true') {
                        a.push('<div' + color + '><a ' + AT + 'data-toggle="tooltip" data-placement="right" data-html="true" title="' + i.Label.value + ' - ' + i.Desc.value.slice(0, 230) + '.." href="' + BASE + '?uri=' + i.c.value + '&lang=' + USER_LANG + '"><strong>' + i.Label.value + '</strong></a> (&#8658; top concept)</div>');
                        } else {
                            a.push('<div' + color + '><a ' + AT + 'data-toggle="tooltip" data-placement="right" data-html="true" title="' + i.Label.value + ' - ' + i.Desc.value.slice(0, 230) + '.." href="' + BASE + '?uri=' + i.c.value + '&lang=' + USER_LANG + '">' + i.Label.value + '</a></div>');
                        }  
                });
                let links = a.join('\n\n');
                allConcepts.append('<div class="allConceptsCards">' + links + '</div>');
                allConcepts.append(`<div id="coBr" style="justify-content: center; display:flex; margin:5px;">
                    <button type="button" id="rightBtn" class="btn" style="background-color: #004953; color:white;" onclick="provideAll('allConcepts', '${uri}', Number(this.value)+100)">
                        Show next 100...
                    </button>
            </div>
                `);
            } else {
                data.results.bindings.forEach((i) => {
                    if (i.isTopConcept.value == 'true') {
                        a.push('<div><a ' + AT + 'data-toggle="tooltip" data-placement="right" data-html="true" title="' + i.Label.value + ' - ' + i.Desc.value.slice(0, 230) + '.." href="' + BASE + '?uri=' + i.c.value + '&lang=' + USER_LANG + '"><strong>' + i.Label.value + '</strong></a> (&#8658; top concept)</div>');
                    } else {
                        a.push('<div><a ' + AT + 'data-toggle="tooltip" data-placement="right" data-html="true" title="' + i.Label.value + ' - ' + i.Desc.value.slice(0, 230) + '.." href="' + BASE + '?uri=' + i.c.value + '&lang=' + USER_LANG + '">' + i.Label.value + '</a></div>');
                    }

                });
                let links = a.join('\n\n');
                $(".allConceptsCards").append(links);
            }
            document.getElementById("rightBtn").value = offset;
            if (Object.keys(jsonData.results.bindings).length < 100) {
                $("#coBr").hide();
            }
        });
}


function dataViewerInsert() {
    
}

/* function provideAll(divID, uri, offset) { //provide all available concepts for navigation

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
} */

//***********************************************************************************************************
//********************************END************************************************************************