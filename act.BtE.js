var B = require('behaviors');
var fac = Game.getObjectById('5e03dd3cc6101bb747cc9377');
var tasks = require('tasks');

module.exports = {
    run: function(){
        var fac = Game.getObjectById('5e03dd3cc6101bb747cc9377');
        if(!Game.creeps['BtE']){
            Game.spawns['R1S2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],'BtE');
        }else if(Game.creeps['BtE'].spawning) return;

        var creep = Game.creeps['BtE'];
        if(fac.store['battery'] > 10000 || (creep.room.storage.store['battery'] == 0 && creep.store['battery'] == 0) || fac.store.getFreeCapacity('battery') == 0 || fac.store['energy'] > 10000) creep.memory.pick = 'energy';
        else creep.memory.pick = 'battery';

        if(creep.memory.pick == 'battery') tasks.transport(creep.room.storage, fac, 'battery', creep);
        else tasks.transport(fac, creep.room.storage, 'energy', creep);

        console.log('Now BtE:'+fac.produce('energy')); 
    }
}