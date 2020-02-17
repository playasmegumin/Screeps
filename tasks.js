var B = require('behaviors');

module.exports = {
    transport: function(src,target,resourceType,creep){
        if(creep.store.getUsedCapacity() > creep.store[resourceType] || creep.ticksToLive < 30){ //Clear
            if(creep.pos.isNearTo(creep.room.storage)){
                for(var res in creep.store){
                    if(res != resourceType || creep.ticksToLive < 30) creep.transfer(creep.room.storage, res);
                }
            }else creep.moveTo(creep.room.storage);
            creep.say('Ha?');
            return;
        }

        if((!src.store.getUsedCapacity(resourceType) && !creep.store[resourceType]) || !target.store.getFreeCapacity(resourceType) || !creep) return creep.say('Break!');
        creep.say('Ohayo!');
        if(creep.store.getUsedCapacity() == 0){
            if(creep.pos.isNearTo(src)){
                B.GetResource(creep, src.pos, resourceType);
            }else creep.moveTo(src,{reuse:100});
        }else{
            if(creep.pos.isNearTo(target)) creep.transfer(target, resourceType);
            else creep.moveTo(target,{reuse:100});
        }
    }
}