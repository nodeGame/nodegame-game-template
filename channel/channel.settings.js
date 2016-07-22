/**
 * # Channel settings
 * Copyright(c) {YEAR} {AUTHOR} <{AUTHOR_EMAIL}>
 * MIT Licensed
 *
 * The channel is divided into two internal servers: player and admin.
 * Each of those grants different privileges upon connection.
 *
 * Player and admin server share all options specified here. If custom
 * options for each server are needed, they can be specified inside the
 * `playerServer` and `adminServer` properties. 
 *
 * Each server must define an 'endpoint' to which nodeGame clients 
 * can connect. The default server endpoints are:
 *
 *   - player server: name of the game, 
 *   - admin server: name of the game /admin 
 *
 * http://www.nodegame.org
 * ---
 */
module.exports = {

    /**
     * ## name (string) Optional
     *
     * The name of the channel
     *
     * Default: the name of the game, as found in the package.json file.
     */
    // name: '{NAME}',

    /**
     * ## alias (string|array) Optional
     *
     * Alternative name/s for the channel
     *
     * By default, if 'gameName' is the name of the channel, files will
     * be served from the address: `http://myserver/gameName/`.
     * Here you can add aliases to enable urls like: `http://myserver/alias/`.
     */
    // alias: [],

    /**
     * ## playerServer (object|string) Optional
     *
     * Set of custom options applying only to player server
     *
     * If string, it will be interpreted as the name oof the server
     * endpoint for socket.io player connections.
     *
     * If object, the endpoint must be specified in the _endpoint_ property.
     *
     * Default: name-of-the-channel
     */
    // playerServer: '{NAME}',

    /**
     * ## adminServer (object|string) Optional
     *
     * Set of custom options applying only to admin server
     *
     * If string, it will be interpreted as the name oof the server
     * endpoint for socket.io admin connections.
     *
     * If object, the endpoint must be specified in the _endpoint_ property.
     *
     * Default: name-of-the-channel/admin
     */
    // adminServer: '{ADMIN}',

    /**
     * ## getFromAdmins (boolean) Optional
     *
     * If TRUE, players can invoke GET commands on admins
     *
     * Default: FALSE
     */
    getFromAdmins: true,

    /**
     * ## accessDeniedUrl (string) Optional
     *
     * Unauthorized clients will be redirected here.
     *  
     * Default: "/pages/accessdenied.htm"
     */
    // accessDeniedUrl: 'unauth.htm',

    /**
     * ## notify (object) Optional
     *
     * Configuration options controlling what events are notified to players
     *
     * Default: player actions are notified to admins only.
     */
    notify: {

        // When a player connects / disconnects.
        onConnect: false,

        // When a player changes a stage / step.
        onStageUpdate: false,

        // When the 'LOADED' stageLevel is fired (useful to sync players)
        onStageLoadedUpdate: false,

        // When any change of stageLevel happens (e.g. INIT, CALLBACK_EXECUTED)
        // Notice: generates a lot of overhead of messages.
        onStageLevelUpdate: false,

    },

    /**
     * ## enableReconnections (boolean) Optional
     *
     * If TRUE, only one TAB per browser will be allowed 
     *
     * Default: FALSE
     */
    enableReconnections: true

};
