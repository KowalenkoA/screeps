var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roadBuilder = require('roadBuilder');

let start = true;
let sourceObj = [];
let chet = 0;

module.exports.loop = function () {
    chet += 1;
    let miner1 = [WORK, CARRY, MOVE];
    let worker1 = [WORK, CARRY, MOVE];
    
    let sources = Game.spawns['Spawn1'].pos.findClosestByRange(FIND_SOURCES);
       // console.log(sources.pos)
    for(let name in Game.creeps){
        
        let creep = Game.creeps[name];
        if (creep.memory.role == 'miner'){
            roleMiner.run(creep);
        }else if (creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }else if (creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
    }
    
    let spn = Game.spawns['Spawn1'];
    //console.log(spn.store.getFreeCapacity(RESOURCE_ENERGY))
    if (spn.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && chet === 5){
        let miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if (miners.length < 2){
            let sources = Game.spawns['Spawn1'].pos.findClosestByRange(FIND_SOURCES);
            //console.log(sources.pos)
            let minersName = 'Miner' + miners.length + 1;
            console.log('Spawning miner: ' + minersName);
            spn.spawnCreep(miner1, minersName, {memory: {role: 'miner', sourcePos: sources.pos, sourceId: sources.id}})
        }else if (upgraders.length < 2){
            let upgraderName = 'Upgrader' + upgraders.length + 1;
            console.log('Spawning upgrader: ' + upgraderName);
            spn.spawnCreep(worker1, upgraderName, {memory: {role: 'upgrader'}})
        }else if (builders.length < 2){
            let builderName = 'Builder' + builders.length + 1;
            console.log('Spawning builder: ' + builderName);
            spn.spawnCreep(worker1, builderName, {memory: {role: 'builder'}})
        }
    }
    //console.log(spn.pos)
    /*if (spn.room.createConstructionSite(spn.pos.x + 2, spn.pos.y + 2, STRUCTURE_ROAD)){
        spn.room.createConstructionSite(spn.pos.x + 2, spn.pos.y + 2, STRUCTURE_ROAD)
    };*/
    
    if (start){
        let spawn = Game.spawns['Spawn1']
        roadBuilder.run(spawn)
    }
    
    if (chet === 11){
        chet = 0;
    }

    /*var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }*/
}