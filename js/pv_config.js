//let ENDPOINT = 'https://resource.geolba.ac.at/PoolParty/sparql/geoera';
let ENDPOINT = 'https://resource.geosphere.at/graphdb/repositories/GSEU';

function addVocProj(vocProjects) {

    vocProjects.set('geoconnect3d', {
        acronym: 'GeoConnect³d',
        title: 'Cross-border, cross-thematic multiscale framework for combining geological models and data for resource appraisal and policy support',
        description: 'The GeoConnect³d project develops and tests a new methodological approach to prepare and disclose geological information for policy support and subsurface management. The improved approach uses two regional case studies – the Roer-to-Rhine region and the Pannonian Basin. These regional, cross-border case studies are chosen to be complementary and sufficiently different in geological setting and degree of implementation of subsurface exploitation and management, in order to maximize their pan-European relevance. A novel bottom-up approach introduces two concepts that increase the geological understanding of an area and are aimed at providing a coherent geological context for evaluating subsurface applications and resolving subsurface management issues. The first new concept is the structural framework as a means of joining existing models of different scale and resolution to clarify the importance of planar structures in a way that makes the geology understandable to stakeholders involved in subsurface management. The second concept is that of geomanifestations. These specific expressions of geological processes are important sources of information for improving geological understanding. The structural framework models annotated with geomanifestations allow the integration and evaluation of complex cross-thematic research. The two bottom-up regional case studies form the study material for a top-down, more generic evaluation of potentially interacting subsurface activities that allows revisiting and refining state-of-the-art methods. Valorisation of regional results at pan-European level is ensured by testing the methodologies in two smaller pilot areas in Germany and Ireland.',
        image: 'geoera.png',
        project_page: 'https://geoera.eu/projects/geoconnect3d6/',
        rdf_download: ['geoconnect3d.rdf', 'geoconnect3d.ttl']
    });

    vocProjects.set('hike', {
        acronym: 'HIKE',
        title: 'Hazard and Impact Knowledge for Europe',
        description: 'The HIKE project aims to support research and assessments of induced hazards and impacts that are related to the exploitation of subsurface resources and capacities throughout Europe. This will be achieved through development, demonstration and implementation of harmonized subsurface data sets and methodologies, investigation of applied use cases, and facilitation of knowledge shared between geological surveys and stakeholders. WP-2 focuses on the development of a European fault database covering a comprehensive set of static and dynamic geological and physical characteristics needed for the assessment of seismic hazards, ground movements, leakage and fluid migration, sealing capacities, fluid flow and other types of dynamic behaviour. This database will be developed, populated and tested in conjunction with several other GeoERA projects and external stakeholder involvement. WP-3 establishes novel hazard and impact research methods and investigates the added value of the established fault information in several case studies and geological settings across Europe. WP-4 concludes the research activities with future recommendations and the establishment of a share point for information, knowledge and preferred practices related to hazard and impact research. This share point is intended to provide a collaboration and knowledge exchange platform for future research by geological surveys and other stakeholders. WP-5 governs the embedding of the results into the GeoERA Information Platform.',
        image: 'rock.webp',
        project_page: 'https://geoera.eu/projects/hike10/',
        rdf_download: ['hike.rdf', 'hike.ttl']
    });

    vocProjects.set('hotLime', {
        acronym: 'HotLime',
        title: 'Mapping and Assessment of Geothermal Plays in Deep Carbonate Rocks – Cross-domain Implications and Impacts',
        description: 'Hydrothermal systems in deep carbonate rocks are the most promising low-enthalpy geothermal systems across Europe. Their assessment requires the mapping and characterization of the fault network, as fault density determines the groundwater yield of the reservoirs, thus the capability of the hydrothermal system. As the only one of crucial factors that can be a reliably assessed at the forefront of exploration, the detailed inventory of tectonic boundaries has been prime focus of HotLime.',
        image: 'rock.webp',
        project_page: 'https://geoera.eu/projects/hotlime6/',
        rdf_download: ['hotlime.rdf', 'hotlime.ttl']
    });

    vocProjects.set('hover', {
        acronym: 'HOVER',
        title: 'Hydrological processes and Geological settings over Europe controlling dissolved geogenic and anthropogenic elements in groundwater of relevance to human health and the status of dependent ecosystems',
        description: 'The challenge is to gain understanding of the controls on groundwater quality across Europe using the combined expertise and data held by member states. The project will address groundwater management issues related to drinking water, human and ecosystem health across Europe in relation to both geogenic elements and anthropogenic pollutants by data sharing, technical and scientific exchange between European GSOs[1]. We will link our knowledge of geological settings and understanding of hydrogeological processes to the natural variability of groundwater quality and to the risk of transfer of anthropogenic dissolved compounds to aquifers. For natural water quality this will include evaluating health risks and spatial variability of concentrations of geogenic elements and using a common approach to assessing thermal and mineral water. For diffuse pollutant behaviour we will increase understanding of ecology and microbial diversity controls on transforming pollutants at groundwater-surface water transition zones, quantify groundwater age distributions and nitrate and pesticide travel times in the subsurface and their attenuation patterns for evaluating the efficiency of programme of measures, the design and assessment of monitoring programmes, pollution trends, and create EU-wide aquifer vulnerability maps by comparing assessment methods across Europe. New compounds will be addressed by developing a consistent approach to groundwater monitoring for organic emerging contaminants. Common standards, databases and maps will be developed and project outputs will include thematic maps and web service tools at pan-European scale and databases available through the Information Platform to increase political and public awareness and improve groundwater management at the EU scale.',
        image: 'water.webp',
        project_page: 'https://geoera.eu/projects/hover8/',
        rdf_download: ['hover.rdf', 'hover.ttl']
    });

    vocProjects.set('muse', {
        acronym: 'MUSE',
        title: 'Managing Urban Shallow geothermal Energy',
        description: 'MUSE investigates resources and possible conflicts of use associated with the use of shallow geothermal energy (SGE) in European urban areas and delivers key geoscientific subsurface data to stakeholders via a user-friendly web based GeoERA information platform (GIP). The assessment of geothermal resources and conflicts of use will lead to the development of management strategies considering both efficient planning and monitoring of environmental impacts to feed into general framework strategies of cities like Sustainable Energy Action Plans (SEAPs). The developed methods and approaches will be tested and evaluated together with input from local stakeholders in 14 urban pilot areas across Europe representative for different conditions of SGE use. The pilot areas are geologically and climatologically diverse and have a range of heating and cooling degree day characteristics, making the project outcomes and shared learnings relevant to the whole of Europe and beyond. In the MUSE project, we want to address all relevant aspects by capitalising upon existing knowledge, identifying and closing specific knowledge gaps and providing joint proposals on methodologies, criteria and concepts on SGE management. We adapt workflows to focus on local scale investigations suitable for densely-populated urban areas, where national heating and cooling demand is generally highest, and which will represent the most important SGE market in the future. The outcomes of the project represent a comprehensive collection of methods, approaches and tools, which can be transferred to other urban regions in Europe and adapted by other organisations.',
        image: 'MUSE-logo-1.png',
        project_page: 'https://geoera.eu/projects/muse3/',
        rdf_download: ['muse.rdf', 'muse.ttl']
    });

    vocProjects.set('eurolithos', {
        acronym: 'EuroLithos',
        title: 'European Ornamental stone resources',
        description: 'Ornamental stone has contributed significantly in shaping our rural and urban landscapes, through its use in our built heritage from different historical periods. Ornamental stone is today a raw material produced with great skills all over Europe, exploiting the vast diversity of European natural stone resources. Yet, the actual use of local and regional stone resources in Europe is decreasing, and so is the knowledge of the resources, traditions and skills.',
        image: 'Eurolithos-logo.png',
        project_page: 'https://geoera.eu/projects/eurolithos1/',
        rdf_download: ['eurolithos.rdf', 'eurolithos.ttl']
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
