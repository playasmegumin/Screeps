//require('prototype');
var express = require('task.express');

let lab0 = '5e371fc6ed9c294f0418d240';
let lab1 = '5e37457eaa99574f84caa14c';
let lab2 = '5e3758866b03923c91e9e877';
let lab3 = '5e37a593edfc9523106ba8e6';
let lab4 = '5e37cf87809e566d536dcb55';
let lab5 = '5e36fcaa51cc18f74cbe8c53';
let lab6 = '5e370e04fcec036c2a72ac82';
let lab7 = '5e37324bfcec03ff3572b7f5';
let lab8 = '5e376e974ef265c2d07117f7';
let lab9 = '5e37842d1bfbaa6d0da2db38';
let A_res = 'Z';
let B_res = 'H';
let Final_res = 'ZH';

module.exports = {
    creep: function(creep){
        const room = creep.room.name;
        if(creep.memory.task && creep.memory.task.amount == 0) creep.abandonTask();
        if(creep.ticksToLive <= 50 && creep.memory.task) creep.pushTask(room); // Prepare for Death

        if(creep.memory.task == null){
            console.log('No but creep.memory.task == ?');
            creep.say("🔍");
            if(creep.store.getUsedCapacity() == 0 && creep.ticksToLive > 50) creep.pullTask(creep.room.name);
            else creep.clear();
        }else{
            console.log('Now creep.memory.task == '+creep.memory.task.timestamp);
            let resType = creep.memory.task.resType;
            let src = Game.getObjectById(creep.memory.task.src);
            let tgt = Game.getObjectById(creep.memory.task.tgt);
            let src_floor = creep.memory.task.src_floor;
            let tgt_cell = (creep.memory.task.tgt_cell==-1)?tgt.store.getCapacity(resType):creep.memory.task.tgt_cell;

            if(creep.checkSrc(creep.memory.task.src, resType) <= src_floor) return creep.pushTask(room); // No more src
            if(creep.checkTgt(creep.memory.task.tgt, resType) >= tgt_cell) return creep.pushTask(room); // tgt full
            if(creep.store.getUsedCapacity() > creep.store.getUsedCapacity(resType)) return creep.pushTask(room); // Un Clear Yet

            if(creep.store.getFreeCapacity(resType) == 0 || (creep.store.getUsedCapacity(resType) && src && src.store.getUsedCapacity(resType) <= src_floor))
                creep.memory.deliver = 1;
            if(creep.store.getUsedCapacity(resType) == 0)
                creep.memory.deliver = 0;

            if(creep.memory.deliver){
                if(creep.pos.isNearTo(tgt)) creep.deliver();
                else creep.moveTo(tgt,{visualizePathStyle:{stroke:'#FFFFFF'},reusePath:10});
            }else{
                if(creep.pos.isNearTo(src)) creep.fetch();
                else creep.moveTo(src,{visualizePathStyle:{stroke:'#FFFFFF'},reusePath:10});
            }
        }
    },
    room: function(roomName){
        let room = Game.rooms[roomName];
        let stamp = 0;
        let task = null;
        
        if(!Game.creeps['me']) Game.spawns['Ber'].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],'me',{memory:{role:'me'}});
        if(roomName == 'W35N28'){
            if(room.terminal.store.getUsedCapacity('ZH') == 5000){
                A_res = 'ZH',B_res = 'OH',Final_res = 'ZH2O';
                express.keepBelow('W35N28',lab0,room.terminal.id,Final_res,0,1000);
                express.keepBelow('W35N28',lab1,room.terminal.id,Final_res,0,1000);

                express.keepBelow('W35N28',room.terminal.id,lab2,    A_res,0,1000);

                express.keepBelow('W35N28',lab3,room.terminal.id,Final_res,0,1000);
                express.keepBelow('W35N28',lab4,room.terminal.id,Final_res,0,1000);
                express.keepBelow('W35N28',lab5,room.terminal.id,Final_res,0,1000);
                express.keepBelow('W35N28',lab6,room.terminal.id,Final_res,0,1000);

                express.keepBelow('W35N28',room.storage.id,lab7,    B_res,49245,1000);

                express.keepBelow('W35N28',lab8,room.terminal.id,Final_res,0,1000);
                express.keepBelow('W35N28',lab9,room.terminal.id,Final_res,0,1000);
            }else{
                express.keepBelow('W35N28',lab0,room.terminal.id,Final_res,0,1000);
                express.keepBelow('W35N28',lab1,room.terminal.id,Final_res,0,1000);

                express.keepBelow('W35N28',room.terminal.id,lab2,    A_res,0,1000);

                express.keepBelow('W35N28',lab3,room.terminal.id,Final_res,0,1000);
                express.keepBelow('W35N28',lab4,room.terminal.id,Final_res,0,1000);
                express.keepBelow('W35N28',lab5,room.terminal.id,Final_res,0,1000);
                express.keepBelow('W35N28',lab6,room.terminal.id,Final_res,0,1000);

                express.keepBelow('W35N28',room.terminal.id,lab7,    B_res,11204,1000);

                express.keepBelow('W35N28',lab8,room.terminal.id,Final_res,0,1000);
                express.keepBelow('W35N28',lab9,room.terminal.id,Final_res,0,1000);
            }
            let A = Game.getObjectById(lab2);
            let B = Game.getObjectById(lab7);
            Game.getObjectById(lab0).runReaction(A,B);
            Game.getObjectById(lab1).runReaction(A,B);
            Game.getObjectById(lab3).runReaction(A,B);
            Game.getObjectById(lab4).runReaction(A,B);
            Game.getObjectById(lab5).runReaction(A,B);
            Game.getObjectById(lab6).runReaction(A,B);
            Game.getObjectById(lab7).runReaction(A,B);
            Game.getObjectById(lab8).runReaction(A,B);
        }
    }
};

/**
 * let lab7 = '5e37324bfcec03ff3572b7f5';var express = require('task.express');let B_res = 'H';let room = Game.rooms[roomName];express.keepBelow('W35N28',room.terminal.id,lab7,    B_res,11054,1000);
 */