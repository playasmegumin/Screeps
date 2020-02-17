var config = require('config.room');
var tasks = require('tasks');

module.exports = {
    W35N28: function(){
        var storage = Game.rooms['W35N28'].storage;
        var fac = Game.getObjectById(config.W35N28.factory);
        if(storage.store['energy'] > config.W35N28.energy){
            if(Game.creeps['HCW35N28_energy'] && !Game.creeps['HCW35N28_energy'].spawning) tasks.transport(Game.rooms['W35N28'].storage, fac, 'energy', Game.creeps['HCW35N28_energy']);
            else if(!Game.spawns['R1S2'].spawning) Game.spawns['R1S2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],'HCW35N28_energy');
        }

        if(storage.store['L'] > config.W35N28.L){
            if(Game.creeps['HCW35N28_L'] && !Game.creeps['HCW35N28_L'].spawning) tasks.transport(Game.rooms['W35N28'].storage, fac, 'L', Game.creeps['HCW35N28_L']);
            else if(!Game.spawns['R1S2'].spawning) Game.spawns['R1S2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],'HCW35N28_L');
        }

        if(fac.store['battery'] || (Game.creeps['BTW35N28_all'] && Game.creeps['BTW35N28_all'].store)){
            if(Game.creeps['BTW35N28_all'] && !Game.creeps['BTW35N28_all'].spawning) tasks.transport(fac, storage, 'battery', Game.creeps['BTW35N28_all']);
            else if(!Game.spawns['R1S2'].spawning) Game.spawns['R1S2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],'BTW35N28_all');
        }else if(fac.store['lemergium_bar']){
            if(Game.creeps['BTW35N28_all'] && !Game.creeps['BTW35N28_all'].spawning) tasks.transport(fac, storage, 'lemergium_bar', Game.creeps['BTW35N28_all']);
            else if(!Game.spawns['R1S2'].spawning) Game.spawns['R1S2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],'BTW35N28_all');
        }

        if(fac.store['L'] > 500 && fac.store['energy'] > 200 && fac.cooldown == 0) fac.produce('lemergium_bar'); 
        if(fac.store.getFreeCapacity() < 0.5*fac.store.getCapacity() && fac.cooldown == 0) fac.produce('battery'); 
    }
}