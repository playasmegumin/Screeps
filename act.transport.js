module.exports = {
    creep: function(creep){
        if(!creep.pos.isEqualTo(23,27)) creep.moveTo(23,27);
        if(Game.rooms['W34N28'].terminal.store["O"] < 100000 && Game.rooms['W34N28'].storage.store["O"] > 43556){
            var storage = Game.rooms['W34N28'].storage;
            var terminal = Game.rooms['W34N28'].terminal;
            if(creep.store.getUsedCapacity() == 0){
                if(creep.pos.isNearTo(storage)) creep.withdraw(storage, "O", creep.store.getFreeCapacity());
                else creep.moveTo(storage);
            }else{
                if(creep.pos.isNearTo(terminal)) creep.transfer(terminal, "O", creep.store.getUsedCapacity());
                else creep.moveTo(terminal);
            }
        }else if(creep.store.getFreeCapacity() == 0) 
                if(creep.pos.isNearTo(terminal)) creep.transfer(terminal, "O", creep.store.getUsedCapacity());
                else creep.moveTo(terminal);
        else creep.say('DONE!');
    },
    BtA: function(creep,resourceType){
        if(creep.memory.load == undefined) creep.memory.load = 0;
        if(creep.store[resourceType] == 0) creep.memory.load = 0;
        if(creep.store.getFreeCapacity() == 0 || creep.ticksToLive < 100) creep.memory.load = 1;

        if(creep.memory.load){
            var As = Game.rooms['W35N28'].storage;
            if(creep.pos.isNearTo(As)) creep.transfer(As,resourceType);
            else creep.moveTo(As,{reuse:200});
        }else{
            var Bs = Game.rooms['W34N28'].storage;
            if(creep.pos.isNearTo(Bs)){
                var amount = creep.store.getFreeCapacity(resourceType);
                if(amount > Bs.store[resourceType]) amount = Bs.store[resourceType];
                creep.withdraw(Bs,resourceType,amount);
            }else creep.moveTo(Bs,{reuse:200});
        }
    },
    
};