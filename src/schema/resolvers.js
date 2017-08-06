const {ObjectID} = require('mongodb');

function buildProjectFilter({id, name}) {
    const filter = (id || name) ? {} : null;
    if (id) {
        filter._id = new ObjectID(id);
    }
    if (name) {
        filter.name = name;
    }

    return filter ? [filter] : [];
}

module.exports = {
    Query: {
        project: async (root, {filter}, {mongo: {Projects}}) => {
            let query = filter ? {$or: buildProjectFilter(filter)} : {};
            return await Projects.find(query).toArray();
        },

        allReports: async (root, data, {mongo: {Reports}}) => {
            return await Reports.find({}).toArray();
        },

        allTests: async (root, data, {mongo: {Tests}}) => {
            return await Tests.find({}).toArray();
        },
    },

    Project: {
        id: root => root._id || root.id,
        reports: async ({_id}, data, {mongo: {Reports}}) => {
            return await Reports.find({
                project: _id
            }).toArray();
        },
        tests: async ({_id}, data, {mongo: {Tests}}) => {
            return await Tests.find({
                project: _id
            }).toArray();
        },
    },

    Report: {
        id: root => root._id || root.id,
        project: async({project}, data, {mongo: {Projects}}) => {
            return await Projects.findOne({
                _id: project
            });
        },
        tests: async ({_id}, data, {mongo: {Tests}}) => {
            return await Tests.find({
                report: _id
            }).toArray();
        },
    },

    Test: {
        id: root => root._id || root.id,
        parent: async({parent}, data, {mongo: {Tests}}) => {
            return await Tests.findOne({
                _id: parent
            });
        },
        project: async({project}, data, {mongo: {Projects}}) => {
            return await Projects.findOne({
                _id: project
            });
        },
        report: async({report}, data, {mongo: {Reports}}) => {
            return await Reports.findOne({
                _id: report
            });
        },
        exception: async({exception}, data, {mongo: {Exceptions}}) => {
            return await Exceptions.findOne({
                _id: exception
            });
        },
    },

    Exception: {
        id: root => root._id || root.id,
        project: async({project}, data, {mongo: {Projects}}) => {
            return await Projects.findOne({
                _id: project
            });
        },
        report: async({report}, data, {mongo: {Reports}}) => {
            return await Reports.findOne({
                _id: report
            });
        },
    }
};
