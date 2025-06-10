// src/utils/db.js
import Dexie from 'dexie';

export const db = new Dexie('BoardBidDB');

// Define schema for campaigns and creatives
db.version(1).stores({
  campaigns: '++id, campaignName, createdAt',
  creatives: '++id, name, url, type'
});

// Optional: helper methods
export const addCampaign = async (campaign) => {
  return await db.campaigns.add(campaign);
};

export const getAllCampaigns = async () => {
  return await db.campaigns.toArray();
};

export const clearCampaigns = async () => {
  return await db.campaigns.clear();
};

export const addCreative = async (creative) => {
  return await db.creatives.add(creative);
};

export const getAllCreatives = async () => {
  return await db.creatives.toArray();
};

export const clearCreatives = async () => {
  return await db.creatives.clear();
};
