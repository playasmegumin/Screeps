module.exports = {
    HolyTread: function(creep){
        var tt = creep.pos.lookFor(LOOK_STRUCTURES);
        if(creep.store.getUsedCapacity('energy'))
            for(var ss = 0;ss < tt.length;ss++)
                if(tt[ss].hits < tt[ss].hitsMax)
                    creep.repair(tt[ss]);
        return 0;
    },
    GetResource: function(creep,pos,resourceType){
        if(creep.store.getFreeCapacity() == 0){
            creep.say('Full!'); return -1;
        }
        var obj_list = pos.look();
        for(var i of obj_list){
            if(i.type == 'structure' && i.structure.store != undefined){
                var j = i.structure;
                var amount = creep.store.getFreeCapacity(resourceType);
                if(amount > j.store.getUsedCapacity(resourceType)) amount = j.store.getUsedCapacity(resourceType);
                if(amount) creep.withdraw(j,resourceType,amount);
                else return;
            }
            if(i.type == 'ruin' && i.ruin.store != undefined){
                var j = i.ruin;
                var amount = creep.store.getFreeCapacity(resourceType);
                if(amount > j.store.getUsedCapacity(resourceType)) amount = j.store.getUsedCapacity(resourceType);
                if(amount) creep.withdraw(j,resourceType,amount);
                else return;
            }
            if(i.type == 'tombstone' && i.tombstone.store != undefined){
                var j = i.tombstone;
                var amount = creep.store.getFreeCapacity(resourceType);
                if(amount > j.store.getUsedCapacity(resourceType)) amount = j.store.getUsedCapacity(resourceType);
                if(amount) creep.withdraw(j,resourceType,amount);
                else return;
            }
            if(i.type == 'resource' && i.resource.resourceType == resourceType){
                var j = i.resource;
                if(creep.store.getFreeCapacity(resourceType)) creep.pickup(j);
                else return;
            }
        }
    },
    Loot: function(creep,pos){ // Untest yet
        var obj_list = pos.look();
        for(var i of obj_list){
            if((i.type == 'structure' && i.structure.store)){
                var str = i.structure;
                // Letter Ore first!
                for(var j in str.store){
                    if(j != 'energy'){
                        var amount = creep.store.getFreeCapacity();
                        if(amount > str.store.getUsedCapacity(j)) amount = str.store.getUsedCapacity(j);
                        if(amount) creep.say(creep.withdraw(str,j,amount));
                        else return;
                    }
                }
                // Then Energy
                if(str.store['energy']){
                    var amount = creep.store.getFreeCapacity();
                    if(amount > str.store.getUsedCapacity('energy')) amount = str.store.getUsedCapacity('energy');
                    if(amount) creep.withdraw(str,'energy',amount);
                    else return;
                }
            }else if(i.type == 'tombstone' && i.tombstone.store.getUsedCapacity()){
                var tbs = i.tombstone;
                // Letter Ore first!
                for(var j in tbs.store){
                    if(j != 'energy'){
                        var amount = creep.store.getFreeCapacity();
                        if(amount > tbs.store.getUsedCapacity(j)) amount = tbs.store.getUsedCapacity(j);
                        if(amount) creep.say(creep.withdraw(tbs,j,amount));
                        else return;
                    }
                }
                // Then Energy
                if(tbs.store['energy']){
                    var amount = creep.store.getFreeCapacity();
                    if(amount > tbs.store.getUsedCapacity('energy')) amount = tbs.store.getUsedCapacity('energy');
                    if(amount) creep.withdraw(tbs,'energy',amount);
                    else return;
                }
            }else if(i.type == 'ruin' && i.ruin.store.getUsedCapacity()){
                var rin = i.ruin;
                for(var j in rin.store){
                    if(j != 'energy'){
                        var amount = creep.store.getFreeCapacity();
                        if(amount > rin.store.getUsedCapacity(j)) amount = rin.store.getUsedCapacity(j);
                        if(amount) creep.say(creep.withdraw(rin,j,amount));
                        else return;
                    }
                }
                // Then Energy
                if(rin.store['energy']){
                    var amount = creep.store.getFreeCapacity();
                    if(amount > rin.store.getUsedCapacity('energy')) amount = rin.store.getUsedCapacity('energy');
                    if(amount) creep.withdraw(rin,'energy',amount);
                    else return;
                }
            }
        }
    },
    DetectResource: function(pos, resourceType){
        var obj_list = pos.look();
        var amount = 0;
        for(var i of obj_list){
            if(i.type == 'structure' && i.structure.store) amount += i.structure.store[resourceType];
            if(i.type == 'resource' && i.resource.resourceType == resourceType) amount += i.resource.amount;
            if(i.type == 'ruin' && i.ruin.store) amount += i.ruin.store[resourceType];
            if(i.type == 'tombstone' && i.tombstone.store) amount += i.tombstone.store[resourceType];
        }return amount;
    }
};