var roadBuilder = {

    /** @param {Creep} creep **/
    run: function(spawn) {
        //console.log(spawn.pos)
        let sources = spawn.room.find(FIND_SOURCES)
        let terran = spawn.room.getTerrain();
        //console.log(terran.get(27,24))
    }
}

module.exports = roadBuilder;