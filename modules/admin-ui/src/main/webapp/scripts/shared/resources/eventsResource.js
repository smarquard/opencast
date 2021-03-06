angular.module('adminNg.resources')
.factory('EventsResource', ['$resource', 'Language', '$translate', 'ResourceHelper', function ($resource, Language, $translate, ResourceHelper) {

    /*
     * Here's an example for how we can fetch mock data from the server:
     * ...
     * return $resource('events/events.json', {}, {
     * ...,
     * this resource does not have a leading slash, hence the mock-data will be fetched from admin-ng/events/events.json
     *
     * In order to fetch real data, just add a leading slash:
     * ...
     * return $resource('/events/events.json', {}, {
     * ...,
     * then the real data will be fetched from /events/events.json
     */

    // We are live and are getting the real thing.
    return $resource('/admin-ng/event/:id', { id: '@id' }, {
        query: {method: 'GET', params: { id: 'events.json' }, isArray: false, transformResponse: function (data) {
            return ResourceHelper.parseResponse(data, function (r) {
                var row = {};
                row.id = r.id;
                row.title = r.title;
                row.presenter = r.presenters.join(', ');
                row.technical_presenter = r.technical_presenters.join(', ');
                if (angular.isDefined(r.series)) {
                    row.series_name = r.series.title;
                    row.series_id = r.series.id;
                }
                row.review_status = r.review_status;
                row.event_status_raw = r.event_status;
                $translate(r.event_status).then(function (translation) {
                	row.event_status = translation;
                });
                row.source = r.source;
                row.scheduling_status = r.scheduling_status;
                $translate(r.scheduling_status).then(function (translation) {
                    row.scheduling_status = translation;
                });
                row.workflow_state = r.workflow_state;
                row.date = Language.formatDate('short', r.start_date);
                row.technical_date = Language.formatDate('short', r.technical_start);
                row.publications = r.publications;
                row.start_date = Language.formatTime('short', r.start_date);
                row.technical_start = Language.formatTime('short', r.technical_start);
                row.end_date = Language.formatTime('short', r.end_date);
                row.technical_end = Language.formatTime('short', r.technical_end);
                row.has_comments = r.has_comments;
                row.has_open_comments = r.has_open_comments;
                row.needs_cutting = r.needs_cutting;
                row.has_preview = r.has_preview;
                row.location = r.location;
                row.agent_id = r.agent_id;
                row.managed_acl = r.managedAcl;
                row.type = "EVENT";
                return row;
            });

        }}
    });
}]);
