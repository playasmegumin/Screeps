var CB = require('behaviors');
module.exports = {
    run: function(creep){
        var CS = creep.pos.lookFor(LOOK_CONSTRUCTION_SITES);

        if(true){
            var src = Game.getObjectById(creep.memory.src);
            var posi;
            if(creep.name == 'ESH A') posi = Game.flags['ESP A'];
            if(creep.name == 'ESH B') posi = Game.flags['ESP B'];
            if((creep.pos.isEqualTo(posi))) creep.harvest(src);
            else creep.moveTo(posi,{reuse:200});

            if(CS.length) creep.build(CS[0]);
            CB.HolyTread(creep);
            creep.drop(RESOURCE_ENERGY);
            return;
        }


        if(creep.memory.mining == undefined) creep.memory.mining = 0;
        if(creep.store.getUsedCapacity() == 0) creep.memory.mining = 1;
        if(creep.store.getFreeCapacity() == 0 || creep.ticksToLive < 250) creep.memory.mining = 0;

        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if(!creep.memory.mining && creep.store.getUsedCapacity() > 0 && target != null){
            if(creep.pos.inRangeTo(target,3)) creep.build(target);
            else creep.moveTo(target);
            return;
        }

        if(creep.memory.mining){
            var src = Game.getObjectById(creep.memory.src);
            if(creep.pos.isNearTo(Game.flags[creep.name])) creep.harvest(src);
            else creep.moveTo(Game.flags[creep.name],{reuse:200});
        }else{
            var storage;
            if(creep.name == 'ESH A') storage = Game.rooms['W35N28'].storage;
            if(creep.name == 'ESH B') storage = Game.rooms['W34N28'].storage;
            if(creep.pos.isNearTo(storage)) creep.transfer(storage,RESOURCE_ENERGY);
            else creep.moveTo(storage,{reuse:200});
        }

        CB.HolyTread(creep);
    }
};