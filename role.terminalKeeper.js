module.exports = {
    run: function(creep){
        if(false){
            if(creep.store.getFreeCapacity() == 0){
                for(var resource in creep.store){
                    if(creep.pos.isNearTo(creep.room.storage)) creep.transfer(creep.room.storage,resource);
                    else creep.moveTo(creep.room.storage);
                }
            }else{
                for(var resource in creep.room.terminal.store){
                    var amount = creep.room.terminal.store[resource];
                    if(amount > creep.store.getFreeCapacity()) amount = creep.store.getFreeCapacity();
                    if(creep.pos.isNearTo(creep.room.terminal)) creep.say(creep.withdraw(creep.room.terminal ,resource ,amount));
                    else creep.moveTo(creep.room.terminal);
                }
            }

            return;
        }

        if(!creep.pos.isEqualTo(22,27)){
            creep.moveTo(22,27);
            return;
        }

        if(creep.room.terminal.store.getFreeCapacity() >= 0 && creep.room.storage.store[RESOURCE_ENERGY] > 200000){
            if(creep.store.getUsedCapacity() == 0){
                var amount = creep.room.terminal.store.getFreeCapacity();
                if(amount > creep.store.getFreeCapacity()) amount = creep.store.getFreeCapacity();
                if(creep.pos.isNearTo(creep.room.storage)) creep.withdraw(creep.room.storage,RESOURCE_ENERGY,amount);
                else creep.moveTo(creep.room.storage);
            }else{
                if(creep.pos.isNearTo(creep.room.terminal)) creep.transfer(creep.room.terminal,RESOURCE_ENERGY);
                else creep.moveTo(creep.room.terminal);
            }
        }else{

            return;
            if(creep.store.getFreeCapacity() == 0){
                if(creep.pos.isNearTo(creep.room.storage)) creep.transfer(creep.room.storage,RESOURCE_ENERGY);
                else creep.moveTo(creep.room.storage);
            }else{
                var amount = creep.room.terminal.store[RESOURCE_ENERGY]-100000;
                if(amount > creep.store.getFreeCapacity()) amount = creep.store.getFreeCapacity();
                if(creep.pos.isNearTo(creep.room.terminal)) creep.say(creep.withdraw(creep.room.terminal,RESOURCE_ENERGY,amount));
                else creep.moveTo(creep.room.terminal);
            }
        }
    }
};