module.exports = {
    Query: {
        allProjects: async (root, data, {mongo: {Projects}}) => {
            return await Projects.find({}).toArray();
        },
    },

    Project: {
        id: root => root._id || root.id,
    },
};
