var CB = require('behaviors');

module.exports = {
    run: function(creep){
        if(creep.memory.pick == undefined) creep.memory.pick = 1;
        if(creep.store.getFreeCapacity() == 0) creep.memory.pick = 0;
        if(creep.store.getUsedCapacity() == 0) creep.memory.pick = 1;

        if(creep.memory.pick){
            if(creep.pos.isNearTo(Game.flags[creep.memory.role])){
                
                var target = Game.flags[creep.memory.role].pos.lookFor(LOOK_STRUCTURES);
                var dsrc = Game.flags[creep.memory.role].pos.lookFor(LOOK_RESOURCES);
                
                for(var dd of dsrc){
                    creep.pickup(dd);
                }
                for(var ss of target){
                    if(ss.structureType == STRUCTURE_CONTAINER){
                        var amount = ss.store[RESOURCE_ENERGY];
                        if(creep.store.getFreeCapacity() < amount) amount = creep.store.getFreeCapacity();
                        creep.withdraw(ss, RESOURCE_ENERGY, amount);
                    }
                }
            }else creep.moveTo(Game.flags[creep.memory.role]);
        }else{
            var storage;
            if(creep.memory.role == 'ESP A') storage = Game.rooms['W35N28'].terminal;
            if(creep.memory.role == 'ESP B') storage = Game.rooms['W34N28'].storage;

            if(creep.pos.isNearTo(storage)) creep.transfer(storage, RESOURCE_ENERGY);
            else creep.moveTo(storage);
            creep.say('Emmm');
        }

        CB.HolyTread(creep);
    }
};