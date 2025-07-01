// src/utils/db.js
import Dexie from 'dexie';

export const db = new Dexie('BoardBidDB');

// Define schema for campaigns and creatives
db.version(1).stores({
  campaigns: '++id, campaignName, createdAt',
  creatives: '++id, name, url, type'
});

// v2 adds blog posts
db.version(2).stores({
  campaigns: '++id, campaignName, createdAt',
  creatives: '++id, name, url, type',
  posts: '++id, title, createdAt'
});

// v3 adds styling fields and cover images for blog posts
db.version(3).stores({
  campaigns: '++id, campaignName, createdAt',
  creatives: '++id, name, url, type',
  posts:
    '++id, title, createdAt, font, textColor, bgColor, coverImage'
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

// Blog post helpers
export const addPost = async (post) => {
  return await db.posts.add(post);
};

export const getAllPosts = async () => {
  return await db.posts.orderBy('createdAt').reverse().toArray();
};

export const getPost = async (id) => {
  return await db.posts.get(id);
};

export const updatePost = async (id, updates) => {
  return await db.posts.update(id, updates);
};

export const deletePost = async (id) => {
  return await db.posts.delete(id);
};
