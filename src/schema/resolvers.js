module.exports = {
    Query: {
        allProjects: async (root, data, {mongo: {Projects}}) => {
            return await Projects.find({}).toArray();
        },

        allReports: async (root, data, {mongo: {Reports}}) => {
            return await Reports.find({}).toArray();
        },
    },

    Project: {
        id: root => root._id || root.id,
        reports: async ({_id}, data, {mongo: {Reports}}) => {
            return await Reports.find({
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
    },
};
