/**
 * @param {String} db - db name for migration [eha|notifications|weather]
 * @returns {Object|Array} - db config
 */

const eha = [
  {
    source: 'Users',
    target: 'Users',
    columns: 'id,identityId,firstName,lastName,avatarUrl,email,createdAt,updatedAt,' +
      'loginCount,initMarketSyncAt'
  },
  {
    source: 'WeatherApiLocations',
    target: 'WeatherApiLocations',
    columns: 'id,name,type,c,zmw,tz,tzs,l,ll,lat,lon,isActive,createdAt,updatedAt,alertsLastCheck'
  },
  {
    source: 'Addresses',
    target: 'Addresses',
    columns: 'id,city,country,countryCode,latitude,longitude,serviceAddress,state,photo,zip,'+
      'formatted,isActive,createdAt,updatedAt'
  },
  {
    source: 'Steps',
    target: 'Steps',
    columns: 'id,isAcUnitsStepMarked,isCarbonMonoxideDetectors,isDetectors,isEleWaterHeat,' +
      'isFilters,isGasWaterHeat,isHeatPumps,isHotTub,isInFloorHeating,isPools,isProgrammableThermostats,' +
      'isSmartThermostats,isSolarPanels,isTanklessWaterHeat,isThermostats,isWindowAcUnits'
  },
  {
    source: 'AppSettings',
    target: 'AppSettings',
    columns: 'id,temperatureScale,isHaveEnergyBill,isJustEnergyCustomer,userId,createdAt,updatedAt'
  },
  {
    source: 'Homes',
    target: 'Homes',
    columns: 'id,externalId,marketId,userId,isActive,square,isEnterSquare,age,isEnterAge,numberOfPeople,' +
      'orderNumber,isCurrent,isRent,homeTypeId,stepsId,addressId,weatherApiLocationId,marketData,createdAt,updatedAt'
  },
  {
    source: 'EquipmentFolders',
    target: 'EquipmentFolders',
    columns: 'id,title,isEditable,tag,homeId,iconId,isActive,createdAt,updatedAt'
  },
  {
    source: 'Equipments',
    target: 'Equipments',
    columns: 'id,title,description,size,age,folderId,tag,isActive,createdAt,updatedAt'
  },
  {
    source: 'EquipmentPhotos',
    target: 'EquipmentPhotos',
    columns: 'id,url,equipmentId,isActive,createdAt,updatedAt'
  },
  {
    source: 'EnergyBills',
    target: 'EnergyBills',
    columns: 'id,marketId,totalMonthlyBillAmount,lastBillDate,currentMonthUsage,billingPeriod,currentRate,monthlyUtilityFees,utilName,utilCode,accountMaskComment,accountLabel,friendlyName,jurisdictionShortIdentifier,marketParticipantIdentifier,marketParticipantShortIdentifier,accountValidationRegularExpression,accountMaskPublic,accountNumber,commodityTypeIdentifier,homeId,isActive,createdAt,updatedAt'
  },
  {
    source: 'UsersMarkets',
    target: 'UserMarkets',
    columns: 'id,userId,marketId,internalMarketId,createdAt,updatedAt'
  },
  {
    source: 'UsersTips',
    target: 'UserTips',
    columns: 'id,userId,tipId,createdAt,updatedAt'
  }
];
const weather = [
  {
    source: 'Locations',
    target: 'Locations',
    columns: 'id,city,country,location,alertsLastCheck,forecastNowLastCheck,forecast10DaysLastCheck,createdAt,updatedAt'
  }
];
const notifications = {
  campaigns: {
    source: 'Campaigns',
    target: 'Campaigns',
    columns: 'id,campaignName,applicationName,description,groupId,groupName,isPublic,statusName,isActive,createBy,createByEmail,startDate,endDate,repeatEndDate,repeatPeriod,requesterId,createdAt,updatedAt'
  },
  notifications: {
    source: 'Notifications',
    target: 'Notifications',
    columns: 'id,campaignId,title,body,identityId,statusName,applicationName,typeName,createBy,startDate,endDate,isRead,isActive,readCount,firstReadDate,lastReadDate,additionalInfo,createdAt,updatedAt'
  },
  devices: {
    source: 'Devices',
    target: 'Devices',
    columns: 'id,arn,token,identityId,userEmail,isActive,isPushNotificationsOn,isRemindersOn,platformId,timeZoneName,applicationName,createdAt,updatedAt'
  }
};

module.exports = (db) => {
  switch (db) {
    case 'eha':
      return eha;
    case 'weather':
      return weather;
    case 'notifications':
      return notifications;
  }
};
