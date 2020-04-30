let ENDPOINT = 'https://resource.geolba.ac.at/PoolParty/sparql/geoera';

function addVocProj(vocProjects) {
    /*    vocProjects.set('hike', {
            acronym: 'HIKE',
            title: 'Hazard and Impact Knowledge for Europe',
            description: 'The HIKE project aims to support research and assessments of induced hazards and impacts that are related to the exploitation of subsurface resources and capacities throughout Europe. This will be achieved through development, demonstration and implementation of harmonized subsurface data sets and methodologies, investigation of applied use cases, and facilitation of knowledge shared between geological surveys and stakeholders. WP-2 focuses on the development of a European fault database covering a comprehensive set of static and dynamic geological and physical characteristics needed for the assessment of seismic hazards, ground movements, leakage and fluid migration, sealing capacities, fluid flow and other types of dynamic behaviour. This database will be developed, populated and tested in conjunction with several other GeoERA projects and external stakeholder involvement. WP-3 establishes novel hazard and impact research methods and investigates the added value of the established fault information in several case studies and geological settings across Europe. WP-4 concludes the research activities with future recommendations and the establishment of a share point for information, knowledge and preferred practices related to hazard and impact research. This share point is intended to provide a collaboration and knowledge exchange platform for future research by geological surveys and other stakeholders. WP-5 governs the embedding of the results into the GeoERA Information Platform.',
            image: 'falte.png',
            project_page: 'http://geoera.eu/projects/hike/',
            rdf_download: 'https://egdi.geology.cz/records/123'
        });

        vocProjects.set('structure', {
            acronym: 'HIKE-GBA',
            title: 'Fault systems from Maps of the Geological Survey of Austria',
            description: 'The Theme Geologic Structures includes linear and planar predominantly deformation structures in geologic maps. Shear sense indicators and fold structures are also covered by this theme.',
            image: 'HIKE.png',
            project_page: 'http://resource.geolba.ac.at/structure.html',
            rdf_download: 'http://resource.geolba.ac.at/structure/export/structure.rdf'
        });*/

    vocProjects.set('geoconnect3d', {
        acronym: 'GeoConnect³d',
        title: 'Cross-border, cross-thematic multiscale framework for combining geological models and data for resource appraisal and policy support',
        description: 'The GeoConnect³d project develops and tests a new methodological approach to prepare and disclose geological information for policy support and subsurface management. The improved approach uses two regional case studies – the Roer-to-Rhine region and the Pannonian Basin. These regional, cross-border case studies are chosen to be complementary and sufficiently different in geological setting and degree of implementation of subsurface exploitation and management, in order to maximize their pan-European relevance. A novel bottom-up approach introduces two concepts that increase the geological understanding of an area and are aimed at providing a coherent geological context for evaluating subsurface applications and resolving subsurface management issues. The first new concept is the structural framework as a means of joining existing models of different scale and resolution to clarify the importance of planar structures in a way that makes the geology understandable to stakeholders involved in subsurface management. The second concept is that of geomanifestations. These specific expressions of geological processes are important sources of information for improving geological understanding. The structural framework models annotated with geomanifestations allow the integration and evaluation of complex cross-thematic research. The two bottom-up regional case studies form the study material for a top-down, more generic evaluation of potentially interacting subsurface activities that allows revisiting and refining state-of-the-art methods. Valorisation of regional results at pan-European level is ensured by testing the methodologies in two smaller pilot areas in Germany and Ireland.',
        image: 'geoera.png',
        project_page: 'https://geoera.eu/projects/geoconnect3d6/',
        rdf_download: ['geoconnect3d.rdf', 'geoconnect3d.trig']
    });

    vocProjects.set('hotLime', {
        acronym: 'HotLime',
        title: 'Mapping and Assessment of Geothermal Plays in Deep Carbonate Rocks – Cross-domain Implications and Impacts (Hotlime)',
        description: 'Hydrothermal systems in deep carbonate bedrock are among the most promising low-enthalpy geothermal plays across Europe. Apart from a few areas where viability of hydrothermal heat and power generation has been proved, most deep carbonate bedrock has received relatively little attention, because such rocks are perceived as ‘tight’. Exploration and development of the deep subsurface is an acknowledged high-risk investment, particularly in low-enthalpy systems, where tapping suitable temperatures for geothermal energy commonly requires drilling to depths of more than 3 km. In order to de-risk these challenging geothermal plays, it is crucial to improve our understanding of geological conditions that determine the distribution and technical recoverability of their potential resources. The efficacy of carbonate-bedrock geothermal plays is crucially dependent on groundwater yield controlled by fracture conduits and karstification. This project will identify the generic structural controls in deep carbonate formations, through a comparison of geological situations and their structural inventory, as well as collation of deep borehole data and their petro- and hydro-physical characteristics. A consistent assessment and the sharing of knowledge – bringing all partners to a common high level – will result in uniformly applicable best practice workflows for estimation, comparison and prospectranking of hydrothermal resources in deep carbonate bedrock. Applied in specific target areas by means of 2D or 3D mapping and characterization, these spatial assessments will help in de-risking the setup or maturation of regional plays, will reveal possible cross-domain implications, and will support sustainable subsurface management.',
        image: 'geoera.png',
        project_page: 'https://geoera.eu/projects/hotlime6/',
        rdf_download: ['hotlime.rdf', 'hotlime.trig']
    });


    /*    vocProjects.set('keywords', {
            acronym: 'GIP-P keywords',
            title: 'Compilation of a keyword thesaurus',
            description: 'GIP-P WP4 introduces Linked Data technology to GeoERA projects is to enable a Semantic Text Search. Search for data is the basic task for all data infrastructures. It needs to put all keywords used to tag datasets into a single hierarchy like a thesaurus. Data queries then can use this kind of a word net also to get search results for similar keywords within a semantic radius. For metadata descriptions, the clarification of the meaning of textual attributes applies mainly to keywords and the implementation of a semantic search within a metadata catalog. Here WP4 strives for a compilation (SKOS thesaurus) of keywords with URIs suitable for tagging metadata (-> use case: Multilingual Semantic Text Search).',
            image: 'falte.png',
            project_page: 'http://geoera.eu/gip-p/',
            rdf_download: 'http://resource.geolba.ac.at/structure/export/keywords.rdf'
        });  */
}
