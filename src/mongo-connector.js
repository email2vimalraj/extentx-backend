const { Logger, MongoClient } = require('mongodb');
const MONGO_URL = 'mongodb://localhost:27017/extent';

module.exports = async () => {
    const db = await MongoClient.connect(MONGO_URL);

    let logCount = 0;
    Logger.setCurrentLogger((msg, state) => {
        console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`);
    });
    Logger.setLevel('debug');
    Logger.filter('class', ['Cursor']);

    return {
        Projects: db.collection('project'),
        Reports: db.collection('report'),
        Tests: db.collection('test'),
        Exceptions: db.collection('exception'),
    };
}
