/**
 * Copy data from MySQL to MSSQL DB
 *
 * Parameters:
 * sourceDB - MySQL DB config, targetDB - MSSQL DB config (from config.js file)
 * db - database to migrate [eha|notifications|weather]
 * [notificationUsers] users with reminders (for Notifications DB)
 * chunkSize - amount of rows to insert (max 1000 for MSSQL)
 */

//          PARAMETERS

const db = 'eha'; // [eha|notifications|weather]
const sourceDB = 'my_devs';
const targetDB = 'ms_development';
const notificationUsers = ['migracus@mobidev.biz', 'kris@kris.biz', 'star@star.star', 'tx.dev.single@mobidev.biz'];
const chunkSize = 200; // max 1000 rows in a chunk for MSSQL
//

const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const config = require('./config');
const tables = require('./tables')(db);
const { getSelectQuery, getInsertQuery, getCountQuery } = require('./query_builder');
const log = (str) => console.log(`----- ${str} -----`);

const seqMY = new Sequelize(config(db, sourceDB));
const seqMS = new Sequelize(config(db, targetDB));

const bulkInsertMSSQL = (table, records, isAutoIncrement) => new Promise((resolve) => {
  const promises = [];

  while (records.length) {
    const chunk = records.splice(0, chunkSize);

    promises.push(seqMS.query(getInsertQuery(table, chunk, isAutoIncrement)));
  }

  return resolve(Promise.all(promises));
});

log(`Migrate ${db} data from ${sourceDB} to ${targetDB}`);

/**
 * Returns a chain of promises (Promise.resolve().then(() => select()).then((data) => insert(data)))
 * based on data from tables.js file
 * @returns {Promise}
 */
const buildSequenceQueries = () => new Promise((resolve, reject) => {
  const promises = tables.reduce(
    (memo, curr) => memo.then(() =>
      log(`${curr.source}: selecting`) || seqMY.query(getSelectQuery(curr), { type: seqMY.QueryTypes.SELECT })
        .then((data) => log(`${curr.target}: inserting`) || bulkInsertMSSQL(curr, data, true))
    ),
    Promise.resolve()
  );

  return promises
    .then(() => resolve())
    .catch((err) => log(`err ${err}`) || reject(err));
});

/**
 * Count rows in migrating tables and compare results
 */
const compareRowsCount = () => new Promise((resolve, reject) => {
  const promises = tables.reduce(
    (memo, curr) => memo.then(() =>
      Promise.all([
        seqMY.query(getCountQuery(curr.source), { type: seqMY.QueryTypes.SELECT }),
        seqMS.query(getCountQuery(curr.target), { type: seqMY.QueryTypes.SELECT })
      ])
        .then(([[countSource], [countTarget]]) => countSource.count === countTarget.count
          ? log(`Rows: ${curr.source}-${curr.target}:${countSource.count}-${countTarget.count}`)
          : reject(`Count mismatch: ${curr.source}-${curr.target}:${countSource.count}${countTarget.count}`)
        )
    ),
    Promise.resolve()
  );

  return promises
    .then(() => resolve())
    .catch((err) => log(`err ${err}`) || reject(err));
});

const migrateNotifications = () => {
  let campaigns = null;
  let notifications = null;
  let ids = null;

  return new Promise((resolve, reject) =>
    log(`${tables.campaigns.source}: selecting`) ||
      seqMY.query(getSelectQuery(tables.campaigns,
        `WHERE isPublic = 0
        AND (repeatEndDate != '0000-00-00 00:00:00' OR repeatEndDate IS NULL)
        ${notificationUsers.length ? ("AND createByEmail IN ('" + notificationUsers.join("','") + "')") : ''}`), {
        type: seqMY.QueryTypes.SELECT
      })
        .then((data) => {
          campaigns = data;
          log(`${tables.notifications.source}: selecting`);

          ids = data.map((item) => item.id);
          return seqMY.query(getSelectQuery(tables.notifications, `WHERE campaignId IN (${ids.join(',')})`), {
            type: seqMY.QueryTypes.SELECT
          });
        })
        .then((data) => {
          notifications = data;

          notifications.forEach((notification) => notification.id = uuid());

          log('Converting ids');
          return ids.forEach((id) => {
            const newId = uuid();

            campaigns.forEach((campaign) => campaign.id === id && (campaign.id = newId));
            notifications.forEach((notification) =>
              notification.campaignId === id
              && (notification.campaignId = newId)
            );
          });
        })
        .then(() =>
          log(`${tables.campaigns.target}: inserting`)
          || bulkInsertMSSQL(tables.campaigns, campaigns, false)
        )
        .then(() =>
          log(`${tables.notifications.target}: inserting`)
          || bulkInsertMSSQL(tables.notifications, notifications, false)
        )
        .then(() =>
          log(`${tables.devices.source}: selecting`)
          || seqMY.query(getSelectQuery(tables.devices, 'WHERE isActive = 1', null), {
            type: seqMY.QueryTypes.SELECT
          })
        )
        .then((data) =>
          log(`${tables.devices.target}: inserting`)
          || bulkInsertMSSQL(tables.devices, data, true)
        )
        .then(() => resolve())
        .catch((err) => log(`error ${err}`) || reject(err))
  );
};

const runQueries = () => db === 'notifications'
  ? migrateNotifications()
  : buildSequenceQueries()
    .then(() => compareRowsCount());

const runMigration = () => runQueries()
  .then(() => log('Migration successful') || process.exit(0))
  .catch((err) => log(`Migration error: ${JSON.stringify(err)}`) || process.exit(1));

runMigration();
