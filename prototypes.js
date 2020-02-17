'use strict'

Creep.prototype.getResource = function(pos,resourceType){
    if(this.store.getFreeCapacity() == 0) return 'Full';

    var obj_list = pos.look();
    for(var i of obj_list){
        if(i.type == 'structure' && i.structure.store != undefined){
            var j = i.structure;
            var amount = this.store.getFreeCapacity(resourceType);
            if(amount > j.store[resourceType]) amount = j.store[resourceType];
            if(amount) this.withdraw(j,resourceType,amount);
            else return 'Empty';
        }
        if(i.type == 'ruin' && i.ruin.store != undefined){
            var j = i.ruin;
            var amount = this.store.getFreeCapacity(resourceType);
            if(amount > j.store[resourceType]) amount = j.store[resourceType];
            if(amount) this.withdraw(j,resourceType,amount);
            else return 'Empty';
        }
        if(i.type == 'tombstone' && i.tombstone.store != undefined){
            var j = i.tombstone;
            var amount = this.store.getFreeCapacity(resourceType);
            if(amount > j.store[resourceType]) amount = j.store[resourceType];
            if(amount) this.withdraw(j,resourceType,amount);
            else return 'Empty';
        }
        if(i.type == 'resource' && i.resource.resourceType == resourceType){
            var j = i.resource;
            if(this.store.getFreeCapacity(resourceType)) creep.pickup(j);
            else return 'Empty';
        }
    }
};

Creep.prototype.transferResource = function(pos, resourceType, amount = -1){
    if(amount == -1) amount = this.store[resourceType];
    let obj_list = pos.lookFor("structure");
    for(let it_str of obj_list){
        if(it_str.store && it_str.store.getFree(resourceType)){
            if(amount > it_str.store.getFree(resourceType)) amount = it_str.store.getFree(resourceType);
            if(amount) return this.transfer(it_str,resourceType,amount);
        }
    }
}

Creep.prototype.bottomMaintain = function(){
    if(!this.getActiveBodyparts(WORK)) return 'NoWORK';
    let obj_list = this.pos.lookFor("structure");
    for(let obj of obj_list){
        if(obj.hits < obj.hitsMax){
            this.repair(obj);
            return 0;
        }
    }
};

Creep.prototype.clear = function(pool_id = 'storage'){
    let pool = Game.getObjectById(pool_id);
    if(pool_id == 'storage') pool = this.room.storage;
    if(pool && pool.store.getFreeCapacity()){
        if(this.pos.isNearTo(pool)){
            for(let resType in this.store){
                this.transfer(pool,resType);
            }
        }else this.moveTo(pool,{visualizePathStyle:{stroke:'#006400'},reusePath:10});
    }else this.say('xClear');
}

RoomPosition.prototype.countResource = function(resourceType = 'energy'){
    let amount = 0;
    let obj_list = this.look();
    if(obj_list.length == 0) return 'None';
    for(let obj of obj_list){
        if(obj.type == 'structure' && obj.structure.store) amount += obj.structure.store[resourceType];
        if(obj.type == 'ruin') amount += obj.ruin.store[resourceType];
        if(obj.type == 'deposit') amount += (obj.deposit.depositType==resourceType)?999999:0;
        if(obj.type == 'mineral') amount += (obj.mineral.mineralType==resourceType)?obj.mineral.mineralAmount:0;
        if(obj.type == 'resource') amount += (obj.resource.resourceType==resourceType)?obj.resource.amount:0;
        if(obj.type == 'tombstone') amount += obj.tombstone.store[resourceType];
    }return amount;
};

Object.defineProperties(Store.prototype,{
    "getFree":{
        value: function(resourceType = undefined){
            let type = this.getCapacity();
            if(type){ // Mixed up
                return this.getCapacity()-this.getUsedCapacity();
            }else{ // Seperate
                return this.getFreeCapacity(resourceType);
            }
        },
        enumerable: false
    }
});

//------------------------Task.express----------------------------
var express = require('task.express');

Creep.prototype.checkSrc = function(src_id,resType){
    let src = Game.getObjectById(src_id);
    let amount = 0;
    if(src != null && src.store && src.store.getUsedCapacity(resType)) amount = src.store.getUsedCapacity(resType);
    amount += this.store.getUsedCapacity(amount);
    return amount;
};

Creep.prototype.checkTgt = function(tgt_id,resType){
    let tgt = Game.getObjectById(tgt_id);
    let amount = 0;
    if(tgt && tgt.store) amount = tgt.store.getUsedCapacity(resType);
    return amount;
};

Creep.prototype.pullTask = function(room){
    if(global[room] == undefined) express.init(room);
    for(let task of global[room].expressQueue){
        let src = task.src;
        let tgt = task.tgt;
        let resType = task.resType;
        let tgt_cell = task.tgt_cell == -1?Game.getObjectById(tgt).store.getCapacity(resType):task.tgt_cell;
        let src_floor = task.src_floor;
        if(this.checkSrc(src,resType) > src_floor && this.checkTgt(tgt,resType) < tgt_cell){
            this.memory.task = global[room].expressQueue.shift();
            express.cancelGlobal(this.memory.task.timestamp);
            express.registerMemory(this.memory.task.timestamp);
            return 0;
        }
    }this.memory.task = null; 
    return 'NoTask';
};

Creep.prototype.deliver = function(){
    // Exception
    if(this.memory.task == null) return 'NoTask';
    let tgt = Game.getObjectById(this.memory.task.tgt);
    let tgt_cell = (this.memory.task.tgt_cell==-1)?tgt.store.getCapacity(this.memory.task.resType):this.memory.task.tgt_cell;
    if(tgt == null) return 'NoTarget';
    if(tgt.store.getUsedCapacity(this.memory.task.resType) >= tgt_cell) return 'NoSpace';
    if(this.store.getUsedCapacity(this.memory.task.resType) == 0) return 'NoRes';
    if(!this.pos.isNearTo(tgt)) return 'TooFar';
    if(this.memory.task.amount == 0){ this.memory.history = this.memory.task; this.memory.task = null; return 'NoNeed'; }
    // Delivering
    let amount = this.store.getUsedCapacity(this.memory.task.resType);
    if(amount > tgt_cell-tgt.store.getUsedCapacity(this.memory.task.resType)) amount = tgt_cell-tgt.store.getUsedCapacity(this.memory.task.resType);
    if(amount > this.memory.task.amount) amount = this.memory.task.amount;
    let err = this.transfer(tgt,this.memory.task.resType,amount);
    if(err == 0){
        this.memory.task.amount -= amount;
        if(this.memory.task.amount == 0){
            express.cancelMemory(this.memory.task.timestamp);
            this.memory.history = this.memory.task;
            this.memory.task = null;
        }return 0;
    }else switch(err){
        case -1: return 'NotOwned';
        case -4: return 'Spawning';
    }
};

Creep.prototype.fetch = function(){
    // Exception
    if(this.memory.task == null) return 'NoTask';
    let src = Game.getObjectById(this.memory.task.src);
    let src_floor = this.memory.task.src_floor;
    if(src == null) return 'NoSource';
    if(this.store.getFreeCapacity(this.memory.task.resType) == 0) return 'NoSpace';
    if(src.store.getUsedCapacity(this.memory.task.resType) <= src_floor) return 'NoRes';
    if(!this.pos.isNearTo(src)) return 'TooFar';
    if(this.memory.task.amount == 0){ this.memory.history = this.memory.task; this.memory.task = null; return 'NoNeed'; }
    // Fetch
    let amount = this.store.getFree(this.memory.task.resType);
    if(amount > src.store.getUsedCapacity(this.memory.task.resType)-src_floor) amount = src.store.getUsedCapacity(this.memory.task.resType)-src_floor;
    if(amount > this.memory.task.amount) amount = this.memory.task.amount;
    let err = this.withdraw(src,this.memory.task.resType,amount);
    switch(err){
        case 0: return 0;
        case -1: if(this.my) return 'UnderRampart';
                 else return 'NotOwned';
        case -4: return 'Spawning';
    }
}

Creep.prototype.pushTask = function(room){
    if(!this.memory.task || this.memory.task.amount == 0) return 'NoTask';
    if(global[room] == undefined) express.init(room);
    global[room].expressQueue.push(this.memory.task);

    express.cancelMemory(this.memory.task.timestamp);
    express.registerGlobal(this.memory.task.timestamp);
    this.memory.history = this.memory.task;
    this.memory.task = null;
}

Creep.prototype.abandonTask = function(){
    if(this.memory.task == null) return;
    express.cancelMemory(this.memory.task.timestamp);
    this.memory.history = this.memory.task;
    this.memory.task = null;
}