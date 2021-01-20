var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roadBuilder = require('roadBuilder');

let start = true;

module.exports.loop = function () {
    let worker1 = [WORK, CARRY, MOVE];
    
    
    for(let name in Game.creeps){
        let creep = Game.creeps[name];
        if (creep.memory.role == 'worker'){
            roleHarvester.run(creep);
        }else if (creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }else if (creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
    }
    
    let spn = Game.spawns['Spawn1'];
    //console.log(spn.store.getFreeCapacity(RESOURCE_ENERGY))
    if (spn.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
        let workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if (workers.length < 2){
            let workerName = 'Worker' + workers.length + 1;
            console.log('Spawning worker: ' + workerName);
            spn.spawnCreep(worker1, workerName, {memory: {role: 'worker'}})
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
    if (spn.room.createConstructionSite(spn.pos.x + 2, spn.pos.y + 2, STRUCTURE_ROAD)){
        spn.room.createConstructionSite(spn.pos.x + 2, spn.pos.y + 2, STRUCTURE_ROAD)
    };
    
    if (start){
        let spawn = Game.spawns['Spawn1']
        roadBuilder.run(spawn)
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