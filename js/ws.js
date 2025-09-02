
// webservices
"use strict";
var ws = {
    endpoint: 'https://resource.geosphere.at/graphdb/repositories/GSEU',
    getProject: function (uri) {
        return config.getProject(uri);
    },
    doc: function (query, thenFunc) {
        return fetch(this.endpoint + '?query=' + encodeURIComponent(query) + '&Accept=application%2Fsparql-results%2Bjson').then(thenFunc);
    },
    json: function (uriPart, query, filteredItem, thenFunc) {
        query = ws.processSparql(uriPart, query, filteredItem);
        return fetch(this.endpoint + '?query=' + encodeURIComponent(query) + '&Accept=application%2Fsparql-results%2Bjson')
            .then(res => res.json())
            .then(thenFunc)
            .catch(error => $('#pageContent').append(`<br>no results for <br>URI: <span style="color: red;"><strong>${uriPart}</strong></span> <br>`));
    },
    docJson: function (query, thenFunc) {
        return fetch(this.endpoint + '?query=' + encodeURIComponent(query) + '&Accept=application%2Fsparql-results%2Bjson')
            .then(res => res.json())
            .then(thenFunc);
    },
    projectJson: function (projectId, query, filteredItem, thenFunc) {
        query = ws.processSparql(projectId, query, filteredItem);

        return fetch(this.endpoint + '?query=' + encodeURIComponent(query) + '&Accept=application%2Fsparql-results%2Bjson')
            .then(res => res.json())
            .then(thenFunc)
            .catch(error => {
                if (!$('#outOfService').length) {
                    $('#rightSidebar').append(`<div id="outOfService" class="alert alert-dismissible alert-primary">
                                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                                <h4 class="alert-heading">Service downtime:</h4>
                                                    <p class="mb-0">
                                                        PV is currently not available!
                                                    </p>
                                                </div>`);
                }
            });
    },
    processSparql: function (projectId, query, filteredItem) {
        let project = projectId ? config.projectConfiguration[projectId] : null;
        let filter = project ? config.projectConfiguration[projectId].filter : null;
        if (!filter) {
            filter = "";
        }
        if (!filteredItem) {
            filteredItem = "c";
        }
        query = query.replaceAll('@@filter', filter).replaceAll('@@item', filteredItem);

        let from = project ? project.from : null;
        if (!from) {
            from = "";
        }
        query = query.replaceAll('@@from', from);

        return query;
    },
    getProjUrl: function (projectId, query) {
        return this.endpoint + '?query=' + encodeURIComponent(query) + '&Accept=application%2Fsparql-results%2Bjson';
    },
    getRefUrl: function (query) {
        return this.endpoint + '?query=' + encodeURIComponent(query) + '&Accept=application%2Fsparql-results%2Bjson';
    },
    getMineralUrl: function (query) {
        return this.endpoint + '?query=' + encodeURIComponent(query) + '&Accept=application%2Fsparql-results%2Bjson';
    },
    getMinresUrl: function (query) {
        return this.endpoint + '?query=' + encodeURIComponent(query) + '&Accept=application%2Fsparql-results%2Bjson';
    },
    getStructureUrl: function (query) {
        return this.endpoint + '?query=' + encodeURIComponent(query) + '&Accept=application%2Fsparql-results%2Bjson';
    }
};
