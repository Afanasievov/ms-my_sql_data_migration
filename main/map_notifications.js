const uuid = require('uuid/v4');

const correlations = {
  applications: {
    eha: 1
  },
  statuses: {
    active: 1,
    sending: 2,
    done: 3,
    canceled: 4,
    new: 5,
    processed: 6,
    notifications_disabled: 7,
    notifications_not_active: 8
  },
  repeatPeriods: {
    none: 1,
    day: 2,
    week: 3,
    month: 4,
    year: 5
  },
  requesters: {
    eha: 1
  },
  notificationTypes: {
    reminder: 2
  }
};

const mapCampaign = (campaign) => {
  const applicationId = correlations.applications[campaign.applicationName || 'eha'];
  const statusId = correlations.statuses[campaign.statusName];
  const repeatPeriodId = correlations.repeatPeriods[campaign.repeatPeriod];
  const requesterId = correlations.requesters[campaign.requesterId || 'eha'];

  delete campaign.applicationName;
  delete campaign.statusName;
  delete campaign.repeatPeriod;

  return {
    id: campaign.id,
    campaignName: campaign.campaignName,
    applicationId,
    description: campaign.description,
    groupId: campaign.groupId,
    groupName: campaign.groupName,
    isPublic: campaign.isPublic,
    statusId,
    isActive: campaign.isActive,
    createBy: campaign.createBy,
    createByEmail: campaign.createByEmail,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    repeatEndDate: campaign.repeatEndDate,
    repeatPeriodId,
    requesterId,
    createdAt: campaign.createdAt,
    updatedAt: campaign.updatedAt
  };
};

const mapNotification = (notification) => {
  const statusId = correlations.statuses[notification.statusName];
  const applicationId = correlations.applications[notification.applicationName];
  const typeId = correlations.notificationTypes[notification.typeName];

  delete notification.statusName;
  delete notification.applicationName;
  delete notification.typeName;

  return {
    id: uuid(),
    campaignId: notification.campaignId,
    title: notification.title,
    body: notification.body,
    identityId: notification.identityId,
    statusId,
    applicationId,
    typeId,
    createBy: notification.createBy,
    startDate: notification.startDate,
    endDate: notification.endDate,
    isRead: notification.isRead,
    isActive: notification.isActive,
    readCount: notification.readCount,
    firstReadDate: notification.firstReadDate,
    lastReadDate: notification.lastReadDate,
    additionalInfo: notification.additionalInfo,
    createdAt: notification.createdAt,
    updatedAt: notification.updatedAt
  };
};

const mapDevice = (device) => {
  const applicationId = correlations.applications[device.applicationName];

  delete device.applicationName;

  return {
    id: device.id,
    arn: device.arn,
    token: device.token,
    identityId: device.identityId,
    userEmail: device.userEmail,
    isActive: device.isActive,
    isPushNotificationsOn: device.isPushNotificationsOn,
    isRemindersOn: device.isRemindersOn,
    platformId: device.platformId,
    timeZoneName: device.timeZoneName,
    applicationId,
    createdAt: device.createdAt,
    updatedAt: device.updatedAt
  };
};

module.exports = {
  mapCampaign,
  mapNotification,
  mapDevice
};
