const firebaseAdmin = require('firebase-admin');

const { getUserByUID, userResolver } = require('./resolvers/users');
const { getAppByID, getAllApps, addApp } = require('./resolvers/app');

/**
 * 
 * @param {firebaseAdmin} admin 
 */
const getResolvers = (admin) => {
    const resolvers = {
        Query: {
            user: async (root, { UID }) => {
                return await getUserByUID(UID);
            },
            app: async (root, { ID }) => {
                return await getAppByID(ID);
            },
            apps: async (root) => {
                return await getAllApps();
            }
        },
        Mutation: {
            addApp: async (root, args, context) => {
                return await addApp({
                    ...args.app
                });
            }
        },
        User: userResolver
    };

    return resolvers;
};

module.exports = getResolvers;