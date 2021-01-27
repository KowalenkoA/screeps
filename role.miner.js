let roleBuilder = require('role.builder');

var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //console.log(creep.memory.sourceId)
        /*let source = Game.getObjectById(creep.memory.sourceId);
        //creep.moveTo(source)
        let terran = creep.room.getTerrain();
        //console.log(terran.get(creep.pos))
        let dropRes = creep.room.find(FIND_DROPPED_RESOURCES)[0]
        console.log(Game.getObjectById(dropRes.id).store.getCapacity())
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }*/
        let source = Game.getObjectById(creep.memory.sourceId);
        //console.log(source)
        if (creep.store.getFreeCapacity() > 0){
            //let sources = creep.room.find(FIND_SOURCES);
            //console.log('true')
            if (creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source, {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            //console.log(targets.length)
            if (targets.length > 0){
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}})
                }
            }/*else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller, {reusePath: 20, visualizePathStyle: {stroke: '#bbaa11'}})
            }*/else{
                //creep.moveTo(Game.spawns['Spawn1'], {reusePath: 20, visualizePathStyle: {stroke: '#ffaa00'}})
                roleBuilder.run(creep);
            }
            
        }
        //console.log(creep.store.getCapacity())
	    /*if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }*/
	}
};

module.exports = roleMiner;