# egdi-vocabularies  

## Technical Summary

This repository is a static, client-side vocabulary portal for EGDI/GeoERA/GSEU project vocabularies and concept schemes. The application is implemented with plain HTML, CSS, and JavaScript (plus jQuery), and relies on remote semantic services rather than a local backend. The main entry point is `index.html`, which loads the runtime scripts `js/pv_config.js` and `js/pv.js` to initialize project metadata, route URL parameters, and render either the homepage, concept detail views, or search results. Query-string routing (`?search=...` and `?uri=...`) is used as the primary navigation mechanism.

The core data layer is SPARQL-first. Browser-side code issues `fetch` calls to a GraphDB repository endpoint (`https://resource.geosphere.at/graphdb/repositories/GSEU`) and processes JSON bindings in the UI. `js/ws.js` encapsulates endpoint access helpers and project-aware query templating. `js/pv.js` contains most of the page orchestration logic: project card rendering, concept scheme summaries, details views, RDF download query construction, and Fuse.js-backed full-text autocomplete/search over labels. Search data is loaded from SPARQL and indexed in-memory in the browser, which keeps deployment simple while still supporting responsive filtering.

Beyond the main portal page, the project includes specialized views for different exploration workflows. `diagram.html` visualizes concept hierarchies using D3/ECharts (`js/d3_data.js`, `js/d3_tree.js`, `js/echarts_tree.js`) and provides interactive expand/collapse plus URI navigation behavior. `tbl.html` generates a tabular export-like HTML view of a selected concept subtree. The repository also ships curated RDF/Turtle assets in `rdf/` and ontology artifacts in `ont/`, plus static assets (`css/`, `img/`, `fonts/`).

Operationally, this is a zero-build static site intended for straightforward hosting (e.g., GitHub Pages with `CNAME`). Runtime behavior depends on external services (GraphDB endpoint, map/WMS/WFS services, and CDN libraries in some pages), so availability and performance are tied to those upstream systems. The architecture favors transparency and portability: vocabulary content remains in standards-based RDF/SKOS, while the UI remains lightweight and inspectable in the browser.

## Built With

* HTML5, CSS, Javascript, ES6, JQuery
* Fuse.js for fuzzy search - https://github.com/krisk/Fuse
* Bootstrap (Blog Post), Bootswatch free themes
* see the [LICENSE.md](LICENSE) file for details

## Authors

* **Martin Schiegl** - *Initial work* 
* **Mira Janata** - *code review, revision*
* **Marie-Anne Barxell** - *code review, revision*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
